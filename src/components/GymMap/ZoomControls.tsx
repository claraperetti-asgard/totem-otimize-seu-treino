import { Crosshair, Minus, Plus } from 'lucide-react'

interface ZoomControlsProps {
  onAumentar: () => void
  onDiminuir: () => void
  onResetar: () => void
  podeAumentar: boolean
  podeDiminuir: boolean
}

function BotaoZoom({
  children,
  onClick,
  desabilitado,
  label,
}: {
  children: React.ReactNode
  onClick: () => void
  desabilitado?: boolean
  label: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={desabilitado}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#24334D] bg-[#16233A] text-[#FAF7F1] transition hover:border-[#FAF7F1] disabled:opacity-30"
    >
      {children}
    </button>
  )
}

export default function ZoomControls({
  onAumentar,
  onDiminuir,
  onResetar,
  podeAumentar,
  podeDiminuir,
}: ZoomControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
      <BotaoZoom onClick={onAumentar} desabilitado={!podeAumentar} label="Aproximar">
        <Plus size={20} />
      </BotaoZoom>
      <BotaoZoom onClick={onDiminuir} desabilitado={!podeDiminuir} label="Afastar">
        <Minus size={20} />
      </BotaoZoom>
      <BotaoZoom onClick={onResetar} label="Centralizar mapa">
        <Crosshair size={20} />
      </BotaoZoom>
    </div>
  )
}
