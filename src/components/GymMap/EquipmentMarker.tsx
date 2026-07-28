import { MapPin } from 'lucide-react'
import type { StatusEquipamento } from '../../data/equipamentos'

/** Cor de destaque do equipamento selecionado (dourado do sistema). */
export const COR_SELECAO = '#BF9655'

interface EquipmentMarkerProps {
  /** posição do equipamento na planta, em % (0-100) */
  x: number
  y: number
  nome: string
  selecionado?: boolean
  status?: StatusEquipamento
  /** ausente = marcador apenas informativo (modal) */
  onClick?: () => void
}

/**
 * Pino de localização posicionado sobre a planta.
 * Fica fora do <svg> de propósito: como o overlay é esticado para
 * casar com o PNG, um ícone desenhado lá dentro sairia deformado.
 * A ponta do pino é ancorada exatamente na coordenada.
 */
export default function EquipmentMarker({
  x,
  y,
  nome,
  selecionado = false,
  status = 'livre',
  onClick,
}: EquipmentMarkerProps) {
  const emManutencao = status === 'manutencao'
  const interativo = Boolean(onClick)

  return (
    <div
      className={`absolute flex -translate-x-1/2 -translate-y-full flex-col items-center gap-0.5 ${
        interativo ? 'pointer-events-auto' : ''
      }`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {selecionado && (
        <span className="whitespace-nowrap rounded-full bg-[#BF9655] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black shadow-lg">
          {nome}
        </span>
      )}

      {onClick ? (
        <button
          onClick={(e) => {
            // sem isso o clique borbulha e o mapa limparia a seleção
            e.stopPropagation()
            onClick()
          }}
          aria-label={nome}
          aria-pressed={selecionado}
          className="transition-transform duration-200 hover:scale-110"
        >
          <Pino selecionado={selecionado} emManutencao={emManutencao} />
        </button>
      ) : (
        <Pino selecionado={selecionado} emManutencao={emManutencao} />
      )}
    </div>
  )
}

function Pino({
  selecionado,
  emManutencao,
}: {
  selecionado: boolean
  emManutencao: boolean
}) {
  return (
    <MapPin
      size={selecionado ? 30 : 24}
      strokeWidth={2}
      className="transition-all duration-200"
      color={COR_SELECAO}
      fill={selecionado ? COR_SELECAO : '#0D0D0D'}
      style={{
        opacity: emManutencao && !selecionado ? 0.35 : 1,
        filter: selecionado
          ? `drop-shadow(0 0 6px ${COR_SELECAO})`
          : 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))',
      }}
    />
  )
}
