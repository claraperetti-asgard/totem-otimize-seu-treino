// ============================================================
// PALETA DE APOIO
// O dourado (#BF9655) continua sendo a cor da marca e dos títulos.
// As cores abaixo entram só como pontos de cor, sempre na mesma
// intensidade (texto -400, fundo /10, borda /40), para dar leitura
// rápida sem competir com o dourado.
//
// Cada cor tem um significado fixo no sistema:
//   verde    -> progresso, disponível, concluído
//   azul     -> informação, comunidade, identidade
//   amarelo  -> recompensa, energia, XP
//   vermelho -> urgência, dificuldade, manutenção
//   laranja  -> streak, cardio, calor
//   roxo     -> força, peso livre
// ============================================================

import type { CategoriaId } from '../data/equipamentos'

export interface Cor {
  /** fundo + texto, para chips e ícones */
  chip: string
  texto: string
  borda: string
  /** cor sólida, para barras de progresso */
  barra: string
}

export const paleta: Record<
  'verde' | 'azul' | 'amarelo' | 'vermelho' | 'laranja' | 'roxo',
  Cor
> = {
  verde: {
    chip: 'bg-emerald-500/10 text-emerald-400',
    texto: 'text-emerald-400',
    borda: 'border-emerald-500/40',
    barra: 'bg-emerald-500',
  },
  azul: {
    chip: 'bg-sky-500/10 text-sky-400',
    texto: 'text-sky-400',
    borda: 'border-sky-500/40',
    barra: 'bg-sky-500',
  },
  amarelo: {
    chip: 'bg-amber-500/10 text-amber-400',
    texto: 'text-amber-400',
    borda: 'border-amber-500/40',
    barra: 'bg-amber-500',
  },
  vermelho: {
    chip: 'bg-rose-500/10 text-rose-400',
    texto: 'text-rose-400',
    borda: 'border-rose-500/40',
    barra: 'bg-rose-500',
  },
  laranja: {
    chip: 'bg-orange-500/10 text-orange-400',
    texto: 'text-orange-400',
    borda: 'border-orange-500/40',
    barra: 'bg-orange-500',
  },
  roxo: {
    chip: 'bg-violet-500/10 text-violet-400',
    texto: 'text-violet-400',
    borda: 'border-violet-500/40',
    barra: 'bg-violet-500',
  },
}

/** Cor fixa de cada grupo muscular — a mesma em todas as telas. */
export const corDaCategoria: Record<CategoriaId, Cor> = {
  peito: paleta.vermelho,
  costas: paleta.azul,
  pernas: paleta.verde,
  ombros: paleta.amarelo,
  bracos: paleta.roxo,
  cardio: paleta.laranja,
  acessorios: paleta.azul,
}
