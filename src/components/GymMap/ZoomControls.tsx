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
      className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#141414] text-[#BF9655] transition hover:border-[#BF9655] disabled:opacity-30"
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
