import { useCallback, useMemo, useState } from 'react'
import {
  buscarEquipamento,
  categorias,
  equipamentos as todosEquipamentos,
  equipamentosDaCategoria,
  type CategoriaId,
  type Equipamento,
} from '../data/equipamentos'

export const ZOOM_MIN = 1
export const ZOOM_MAX = 2.5
export const ZOOM_PASSO = 0.25

interface UseGymMapOptions {
  categoriaInicial?: CategoriaId
  /** filtro opcional por nome — já pronto para uma futura busca */
  busca?: string
}

/**
 * Estado único do mapa: categoria, seleção, zoom e favoritos.
 * Mapa e lista consomem daqui, então nunca saem de sincronia.
 */
export function useGymMap({
  categoriaInicial = categorias[0].id,
  busca = '',
}: UseGymMapOptions = {}) {
  const [categoria, setCategoria] = useState<CategoriaId>(categoriaInicial)
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null)
  const [zoom, setZoom] = useState(ZOOM_MIN)
  const [favoritos, setFavoritos] = useState<string[]>(() =>
    todosEquipamentos.filter((e) => e.favorito).map((e) => e.id)
  )

  const equipamentosFiltrados = useMemo(() => {
    const daCategoria = equipamentosDaCategoria(categoria)
    const termo = busca.trim().toLowerCase()
    if (!termo) return daCategoria
    return daCategoria.filter((e) => e.nome.toLowerCase().includes(termo))
  }, [categoria, busca])

  const equipamentoSelecionado: Equipamento | null = selectedEquipment
    ? buscarEquipamento(selectedEquipment) ?? null
    : null

  /** Clicar de novo no mesmo equipamento desmarca. */
  const selecionarEquipamento = useCallback((id: string) => {
    setSelectedEquipment((atual) => (atual === id ? null : id))
  }, [])

  const limparSelecao = useCallback(() => setSelectedEquipment(null), [])

  const trocarCategoria = useCallback((novaCategoria: CategoriaId) => {
    setCategoria(novaCategoria)
    setSelectedEquipment(null)
  }, [])

  const aumentarZoom = useCallback(
    () => setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_PASSO).toFixed(2))),
    []
  )
  const diminuirZoom = useCallback(
    () => setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_PASSO).toFixed(2))),
    []
  )
  const resetarZoom = useCallback(() => setZoom(ZOOM_MIN), [])

  const alternarFavorito = useCallback((id: string) => {
    setFavoritos((atuais) =>
      atuais.includes(id)
        ? atuais.filter((f) => f !== id)
        : [...atuais, id]
    )
  }, [])

  const ehFavorito = useCallback(
    (id: string) => favoritos.includes(id),
    [favoritos]
  )

  return {
    categoria,
    trocarCategoria,
    equipamentosFiltrados,
    selectedEquipment,
    equipamentoSelecionado,
    selecionarEquipamento,
    limparSelecao,
    zoom,
    aumentarZoom,
    diminuirZoom,
    resetarZoom,
    favoritos,
    ehFavorito,
    alternarFavorito,
  }
}
