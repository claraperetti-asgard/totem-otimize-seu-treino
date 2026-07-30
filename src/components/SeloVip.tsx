import { Star } from 'lucide-react'

interface SeloVipProps {
  /** só a estrela, sem a palavra VIP */
  compacto?: boolean
  /** para usar sobre fundo claro (cards creme, QR) */
  claro?: boolean
  className?: string
}

/**
 * Marca as funcionalidades que dependem de conta paga.
 * Uma estrelinha discreta, sempre no mesmo tom, para o morador
 * associar o símbolo ao recurso VIP em qualquer tela.
 */
export default function SeloVip({
  compacto = false,
  claro = false,
  className = '',
}: SeloVipProps) {
  const tom = claro
    ? 'border-amber-500/40 bg-amber-100 text-amber-700'
    : 'border-amber-300/40 bg-amber-300/15 text-amber-300'

  return (
    <span
      title="Disponível para membros VIP"
      aria-label="Recurso VIP"
      className={`inline-flex shrink-0 items-center gap-1 rounded-full border font-bold uppercase tracking-widest ${tom} ${
        compacto ? 'h-6 w-6 justify-center' : 'px-2 py-0.5 text-[9px]'
      } ${className}`}
    >
      <Star size={compacto ? 12 : 10} fill="currentColor" />
    </span>
  )
}
