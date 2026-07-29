import { useEffect } from 'react'
import { X } from 'lucide-react'
import ImagemComFallback from './ImagemComFallback'
import GymSvg from './GymMap/GymSvg'
import EquipmentMarker from './GymMap/EquipmentMarker'
import planta from '../assets/planta.png'
import {
  categoriaLabel,
  type CategoriaId,
  type Localizacao,
} from '../data/equipamentos'
import { corDaCategoria, paleta } from '../theme/cores'

export interface EquipamentoInfo {
  nome: string
  /** linha de apoio abaixo do título (ex.: séries e descanso) */
  subtitulo?: string
  descricao?: string
  /** imagem do equipamento (render/foto da máquina) */
  imagemMaquina?: string
  /** imagem da execução do movimento */
  imagemExecucao?: string
  /** grupos trabalhados — cada um sai na cor fixa da categoria */
  categorias?: CategoriaId[]
  localizacao?: Localizacao
}

/** Planta real da unidade com o equipamento destacado. */
export function MapaAcademia({
  localizacao,
  nome,
}: {
  localizacao?: Localizacao
  nome: string
}) {
  return (
    <GymSvg plantaSrc={planta}>
      {localizacao && (
        <EquipmentMarker
          x={localizacao.x}
          y={localizacao.y}
          nome={nome}
          selecionado
        />
      )}
    </GymSvg>
  )
}

export default function EquipamentoModal({
  equipamento,
  onFechar,
}: {
  equipamento: EquipamentoInfo
  onFechar: () => void
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onFechar()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onFechar])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={equipamento.nome}
      onClick={onFechar}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#020a17]/80 px-10 py-10 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-full w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#141414] p-8"
      >
        {/* Cabeçalho */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold uppercase tracking-wide text-[#BF9655]">
              {equipamento.nome}
            </h2>
            {equipamento.subtitulo && (
              <p className={`mt-1 text-sm ${paleta.azul.texto}`}>
                {equipamento.subtitulo}
              </p>
            )}
          </div>
          <button
            onClick={onFechar}
            aria-label="Fechar"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#020a17] text-[#BF9655] transition hover:brightness-125"
          >
            <X size={24} />
          </button>
        </div>

        {/* Imagens: equipamento + execução */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <ImagemComFallback
            src={equipamento.imagemMaquina}
            alt={`Equipamento — ${equipamento.nome}`}
            className="h-52 w-full rounded-xl"
            ajuste="contain"
            iconeTamanho={48}
          />
          <ImagemComFallback
            src={equipamento.imagemExecucao}
            alt={`Execução — ${equipamento.nome}`}
            className="h-52 w-full rounded-xl"
            iconeTamanho={48}
          />
        </div>

        {/* Descrição */}
        {equipamento.descricao && (
          <p className="mb-6 text-sm leading-relaxed text-gray-400">
            {equipamento.descricao}
          </p>
        )}

        {/* Categorias — mesma cor usada nas outras telas */}
        {equipamento.categorias && equipamento.categorias.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {equipamento.categorias.map((categoria) => (
              <span
                key={categoria}
                className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wide ${corDaCategoria[categoria].borda} ${corDaCategoria[categoria].chip}`}
              >
                {categoriaLabel(categoria)}
              </span>
            ))}
          </div>
        )}

        {/* Localização na academia */}
        <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-widest text-gray-400">
          Localização na Academia
        </h3>
        <MapaAcademia
          localizacao={equipamento.localizacao}
          nome={equipamento.nome}
        />
        {equipamento.localizacao && (
          <p
            className={`mt-3 text-center text-xs font-bold uppercase tracking-widest ${paleta.azul.texto}`}
          >
            {equipamento.localizacao.area}
          </p>
        )}

        <button
          onClick={onFechar}
          className="mt-8 w-full rounded-xl bg-[#BF9655] py-4 text-base font-extrabold uppercase tracking-wide text-black transition hover:brightness-110"
        >
          Fechar
        </button>
      </div>
    </div>
  )
}
