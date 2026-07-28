// ============================================================
// CHAMADOS DE MANUTENÇÃO
// Store em memória: qualquer tela que use os hooks abaixo
// reage na hora quando um chamado é aberto. Quando existir
// back-end, só `abrirChamado` e a carga inicial mudam.
// ============================================================

import { useMemo, useSyncExternalStore } from 'react'

export type ProblemaId =
  | 'nao-liga'
  | 'ruido'
  | 'peca-quebrada'
  | 'cabo-polia'
  | 'estofado'
  | 'painel'
  | 'outro'

export const problemas: { id: ProblemaId; label: string }[] = [
  { id: 'nao-liga', label: 'Não liga / sem energia' },
  { id: 'ruido', label: 'Barulho ou trepidação' },
  { id: 'peca-quebrada', label: 'Peça quebrada ou solta' },
  { id: 'cabo-polia', label: 'Cabo ou polia com folga' },
  { id: 'estofado', label: 'Estofado danificado' },
  { id: 'painel', label: 'Painel / display com defeito' },
  { id: 'outro', label: 'Outro problema' },
]

export interface ChamadoManutencao {
  id: string
  /** id da unidade instalada (ex.: "PK17LT21-1") */
  equipamentoId: string
  problema: ProblemaId
  descricao: string
  /** quem abriu — opcional, o totem é de uso livre */
  autor?: string
  criadoEm: string
}

let chamados: ChamadoManutencao[] = []
const ouvintes = new Set<() => void>()

function assinar(ouvinte: () => void) {
  ouvintes.add(ouvinte)
  return () => {
    ouvintes.delete(ouvinte)
  }
}

function lerChamados() {
  return chamados
}

export function abrirChamado(
  dados: Omit<ChamadoManutencao, 'id' | 'criadoEm'>
): ChamadoManutencao {
  const chamado: ChamadoManutencao = {
    ...dados,
    id: `chamado-${chamados.length + 1}`,
    criadoEm: new Date().toISOString(),
  }
  // lista nova a cada chamado: o useSyncExternalStore compara por referência
  chamados = [chamado, ...chamados]
  ouvintes.forEach((ouvinte) => ouvinte())
  return chamado
}

export function useChamados(): ChamadoManutencao[] {
  return useSyncExternalStore(assinar, lerChamados, lerChamados)
}

/** Ids das unidades com chamado aberto — usado para marcar o mapa. */
export function useEquipamentosEmManutencao(): Set<string> {
  const lista = useChamados()
  return useMemo(() => new Set(lista.map((c) => c.equipamentoId)), [lista])
}

export function problemaLabel(id: ProblemaId): string {
  return problemas.find((p) => p.id === id)?.label ?? id
}
