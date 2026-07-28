import { useEffect, useRef, useState } from 'react'
import { banners as bannersPadrao, type Banner } from '../data/banners'

interface BannerSliderProps {
  banners?: Banner[]
  /** tempo entre as trocas automáticas, em ms */
  intervaloMs?: number
  /** classes de altura do slider */
  altura?: string
}

/** Distância mínima do arraste para trocar de banner. */
const LIMITE_ARRASTE = 60

/**
 * Slider de banners com troca automática, arraste com o dedo e loop
 * infinito. O loop usa clones nas pontas: a faixa mostra
 * [último, ...banners, primeiro] e, ao chegar num clone, salta para o
 * slide equivalente com a transição desligada — o olho não percebe.
 */
export default function BannerSlider({
  banners = bannersPadrao,
  intervaloMs = 5000,
  altura = 'h-90',
}: BannerSliderProps) {
  const total = banners.length
  const slides =
    total > 1 ? [banners[total - 1], ...banners, banners[0]] : banners

  // começa em 1 porque a posição 0 é o clone do último
  const [indice, setIndice] = useState(total > 1 ? 1 : 0)
  const [semTransicao, setSemTransicao] = useState(false)
  const [arrastando, setArrastando] = useState(false)
  const [deslocamento, setDeslocamento] = useState(0)

  const inicioX = useRef(0)
  const larguraRef = useRef<HTMLDivElement>(null)

  // troca automática — o timer reinicia a cada mudança de slide
  useEffect(() => {
    if (total <= 1 || arrastando) return
    const id = setTimeout(() => setIndice((i) => i + 1), intervaloMs)
    return () => clearTimeout(id)
  }, [indice, arrastando, intervaloMs, total])

  // reativa a transição logo após o salto entre clones
  useEffect(() => {
    if (!semTransicao) return
    const id = requestAnimationFrame(() => setSemTransicao(false))
    return () => cancelAnimationFrame(id)
  }, [semTransicao])

  function aoTerminarTransicao() {
    if (total <= 1) return
    if (indice === slides.length - 1) {
      setSemTransicao(true)
      setIndice(1)
    } else if (indice === 0) {
      setSemTransicao(true)
      setIndice(total)
    }
  }

  function aoPressionar(e: React.PointerEvent<HTMLDivElement>) {
    if (total <= 1) return
    inicioX.current = e.clientX
    setArrastando(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function aoMover(e: React.PointerEvent<HTMLDivElement>) {
    if (!arrastando) return
    setDeslocamento(e.clientX - inicioX.current)
  }

  function aoSoltar() {
    if (!arrastando) return
    if (deslocamento <= -LIMITE_ARRASTE) setIndice((i) => i + 1)
    else if (deslocamento >= LIMITE_ARRASTE) setIndice((i) => i - 1)
    setDeslocamento(0)
    setArrastando(false)
  }

  const largura = larguraRef.current?.offsetWidth ?? 1
  const percentualArraste = (deslocamento / largura) * 100

  // qual banner real está visível (para os pontinhos)
  const atual = total > 1 ? (indice - 1 + total) % total : 0

  return (
    <div className="relative">
      <div
        ref={larguraRef}
        onPointerDown={aoPressionar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        // pan-y mantém a rolagem vertical da página funcionando
        style={{ touchAction: 'pan-y' }}
        className={`w-full cursor-grab overflow-hidden rounded-2xl border border-white/10 active:cursor-grabbing ${altura}`}
      >
        <div
          onTransitionEnd={aoTerminarTransicao}
          className="flex h-full"
          style={{
            transform: `translateX(calc(${-indice * 100}% + ${percentualArraste}%))`,
            transition:
              semTransicao || arrastando
                ? 'none'
                : 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {slides.map((banner, posicao) => (
            <img
              key={`${banner.id}-${posicao}`}
              src={banner.imagem}
              alt={banner.alt}
              draggable={false}
              className="h-full w-full shrink-0 select-none object-cover"
            />
          ))}
        </div>
      </div>

      {/* Indicadores */}
      {total > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {banners.map((banner, posicao) => (
            <button
              key={banner.id}
              onClick={() => setIndice(posicao + 1)}
              aria-label={`Ir para o banner ${posicao + 1}`}
              aria-current={posicao === atual}
              className={`h-2 rounded-full transition-all duration-300 ${
                posicao === atual
                  ? 'w-8 bg-[#BF9655]'
                  : 'w-2 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
