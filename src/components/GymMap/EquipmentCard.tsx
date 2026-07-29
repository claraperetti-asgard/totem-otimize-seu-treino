import { Dumbbell, Heart } from 'lucide-react'
import {
  descricaoStatus,
  type Equipamento,
  type StatusEquipamento,
} from '../../data/equipamentos'

const corStatus: Record<StatusEquipamento, string> = {
  livre: 'text-emerald-300/80',
  'em-uso': 'text-orange-300/80',
  manutencao: 'text-rose-300/80',
}

/** bolinha de status ao lado do nome */
const pontoStatus: Record<StatusEquipamento, string> = {
  livre: 'bg-emerald-400',
  'em-uso': 'bg-orange-400',
  manutencao: 'bg-rose-400',
}

interface EquipmentCardProps {
  equipamento: Equipamento
  selecionado: boolean
  favorito: boolean
  onSelecionar: (id: string) => void
  onAlternarFavorito: (id: string) => void
}

export default function EquipmentCard({
  equipamento,
  selecionado,
  favorito,
  onSelecionar,
  onAlternarFavorito,
}: EquipmentCardProps) {
  const status = equipamento.status ?? 'livre'

  return (
    <button
      onClick={() => onSelecionar(equipamento.id)}
      aria-pressed={selecionado}
      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
        selecionado
          ? 'border-[#FAF7F1] bg-[#1E2B44]'
          : 'border-[#24334D] bg-[#16233A] hover:border-[#FAF7F1]/50'
      }`}
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition ${
          selecionado
            ? 'bg-[#FAF7F1] text-black'
            : 'bg-[#101A2B] text-[#FAF7F1]/60'
        }`}
      >
        <Dumbbell size={22} />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={`block truncate text-sm font-bold uppercase tracking-wide ${
            selecionado ? 'text-[#FAF7F1]' : 'text-white'
          }`}
        >
          {equipamento.nome}
          <span className="ml-2 text-[10px] tracking-widest text-gray-500">
            {equipamento.codigo}
          </span>
        </span>
        <span className="mt-0.5 flex items-center gap-1.5 text-xs uppercase tracking-wide text-gray-500">
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${pontoStatus[status]}`}
          />
          <span className="text-[#C4CEDC]">
            {equipamento.localizacao.area}
          </span>
          ·
          <span className={corStatus[status]}>
            {descricaoStatus(equipamento)}
          </span>
        </span>
      </span>

      <span
        role="button"
        tabIndex={0}
        aria-label={
          favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
        }
        onClick={(e) => {
          e.stopPropagation()
          onAlternarFavorito(equipamento.id)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            onAlternarFavorito(equipamento.id)
          }
        }}
        className="shrink-0 p-1 text-[#FAF7F1] transition hover:brightness-125"
      >
        <Heart size={20} fill={favorito ? '#FAF7F1' : 'none'} />
      </span>
    </button>
  )
}
