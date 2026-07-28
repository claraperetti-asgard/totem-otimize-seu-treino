import { iniciais } from '../data/comunidade'

interface AvatarProps {
  nome: string
  /** tamanho em px do círculo */
  tamanho?: number
  destacado?: boolean
}

/** Avatar por iniciais — troca fácil por foto quando houver upload. */
export default function Avatar({
  nome,
  tamanho = 40,
  destacado = false,
}: AvatarProps) {
  return (
    <span
      aria-hidden
      style={{ width: tamanho, height: tamanho, fontSize: tamanho * 0.38 }}
      className={`flex shrink-0 items-center justify-center rounded-full border font-extrabold uppercase tracking-wide ${
        destacado
          ? 'border-[#BF9655] bg-[#BF9655] text-black'
          : 'border-white/10 bg-[#1f1f1f] text-[#BF9655]'
      }`}
    >
      {iniciais(nome)}
    </span>
  )
}
