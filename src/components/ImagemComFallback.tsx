import { useState } from 'react'
import { Dumbbell } from 'lucide-react'

interface ImagemComFallbackProps {
  src?: string
  alt: string
  /** classes de tamanho/arredondamento do quadro */
  className?: string
  /** `contain` para renders de máquina, `cover` para fotos */
  ajuste?: 'cover' | 'contain'
  iconeTamanho?: number
}

/**
 * Imagem padrão do sistema: enquanto o arquivo não existir, mostra o
 * placeholder da marca no lugar do ícone de imagem quebrada.
 */
export default function ImagemComFallback({
  src,
  alt,
  className = 'h-55 w-full rounded-xl ',
  ajuste = 'cover',
  iconeTamanho = 40,
}: ImagemComFallbackProps) {
  const [erro, setErro] = useState(false)
  const base = `border border-[#24334D] bg-[#fcfbfa] ${className}`

  if (!src || erro) {
    return (
      <div
        className={`flex items-center justify-center text-[#FAF7F1]/40 ${base}`}
      >
        <Dumbbell size={iconeTamanho} />
      </div>
    )
  }

  return (
    <div className={`${base} overflow-hidden`}>
      <img
        src={src}
        alt={alt}
        onError={() => setErro(true)}
        className={`h-full w-full ${
          ajuste === 'contain' ? 'object-contain ' : 'object-cover'
        } scale-140`}
      />
    </div>
  )
}
