import { useState } from 'react'

interface GymSvgProps {
  /** PNG da planta — usado como imagem de fundo, sem conversão para SVG */
  plantaSrc: string
  /** fator de zoom aplicado ao conjunto planta + overlays */
  zoom?: number
  /** marcadores HTML posicionados em % sobre a planta */
  children?: React.ReactNode
  /** formas vetoriais opcionais (zonas, rotas) desenhadas no <svg> */
  svgLayer?: React.ReactNode
  /** clique fora de qualquer marcador */
  onFundoClick?: () => void
}

/**
 * Base do mapa: o PNG da planta com as camadas sobrepostas ocupando
 * exatamente a mesma caixa.
 *
 * - camada <svg>: viewBox 0-100 com `preserveAspectRatio="none"`, para
 *   formas que precisam acompanhar a planta mesmo que ela estique;
 * - camada HTML: marcadores posicionados em % — ficam proporcionais e
 *   sem deformação em qualquer tamanho de tela.
 */
export default function GymSvg({
  plantaSrc,
  zoom = 1,
  children,
  svgLayer,
  onFundoClick,
}: GymSvgProps) {
  const [semPlanta, setSemPlanta] = useState(false)

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0D0D0D]">
      <div
        className="relative origin-center transition-transform duration-200"
        style={{ transform: `scale(${zoom})` }}
        onClick={onFundoClick}
      >
        {semPlanta ? (
          // Sem o PNG ainda: mantém a proporção para os overlays não colapsarem.
          <div className="aspect-[16/10] w-full bg-[#0D0D0D]" />
        ) : (
          <img
            src={plantaSrc}
            alt="Planta da academia"
            onError={() => setSemPlanta(true)}
            className="block w-full select-none"
            draggable={false}
          />
        )}

        {svgLayer && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {svgLayer}
          </svg>
        )}

        {/* Marcadores: a camada não captura cliques, só os pinos capturam. */}
        <div className="pointer-events-none absolute inset-0">{children}</div>
      </div>
    </div>
  )
}
