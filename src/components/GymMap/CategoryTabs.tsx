import { categorias, type CategoriaId } from '../../data/equipamentos'
import { corDaCategoria } from '../../theme/cores'

interface CategoryTabsProps {
  /** `null` = nenhuma categoria filtrada (aba "Todas") */
  categoriaAtiva: CategoriaId | null
  onSelecionar: (categoria: CategoriaId | null) => void
  /** adiciona a aba "Todas" no início */
  incluirTodas?: boolean
  /** contador opcional por categoria, exibido ao lado do rótulo */
  contar?: (categoria: CategoriaId | null) => number
}

export default function CategoryTabs({
  categoriaAtiva,
  onSelecionar,
  incluirTodas = false,
  contar,
}: CategoryTabsProps) {
  const abas: { id: CategoriaId | null; label: string }[] = [
    ...(incluirTodas ? [{ id: null, label: 'Todas' }] : []),
    ...categorias,
  ]

  return (
    <div className="mb-6 flex gap-3 overflow-x-auto pb-1">
      {abas.map((aba) => {
        const ativa = aba.id === categoriaAtiva
        const total = contar?.(aba.id)
        // cada grupo muscular tem uma cor fixa no sistema
        const cor = aba.id ? corDaCategoria[aba.id] : null
        return (
          <button
            key={aba.id ?? 'todas'}
            onClick={() => onSelecionar(aba.id)}
            aria-pressed={ativa}
            className={`flex shrink-0 items-center gap-2 rounded-xl border px-6 py-3 text-sm font-bold uppercase tracking-wide transition ${
              ativa
                ? 'border-[#FAF7F1] bg-[#FAF7F1] text-black'
                : 'border-[#24334D] bg-[#16233A] text-gray-300 hover:border-[#FAF7F1] hover:text-[#FAF7F1]'
            }`}
          >
            {/* pontinho da cor do grupo, para achar a aba de relance */}
            {cor && (
              <span
                className={`h-2 w-2 rounded-full ${
                  ativa ? 'bg-black/40' : cor.barra
                }`}
              />
            )}
            {aba.label}
            {total !== undefined && (
              <span
                className={`text-[10px] ${
                  ativa ? 'text-black/60' : 'text-gray-500'
                }`}
              >
                {total}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
