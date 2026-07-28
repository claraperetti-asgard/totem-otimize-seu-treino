import { useState } from 'react'
import { ArrowLeft, Info, MapPin } from 'lucide-react'
import EquipamentoModal from '../components/EquipamentoModal'
import ImagemComFallback from '../components/ImagemComFallback'
import CategoryTabs from '../components/GymMap/CategoryTabs'
import {
  categoriaLabel,
  linhaLabel,
  modelos,
  modelosDaCategoria,
  unidadesDoModelo,
  type CategoriaId,
  type ModeloEquipamento,
} from '../data/equipamentos'

interface MachinesProps {
  onExit: () => void
}

export default function Machines({ onExit }: MachinesProps) {
  // `null` = mostrando todas as Equipamentos
  const [filtro, setFiltro] = useState<CategoriaId | null>(null)
  const [modeloDetalhe, setModeloDetalhe] = useState<ModeloEquipamento | null>(
    null
  )

  const equipamentos = filtro ? modelosDaCategoria(filtro) : modelos

  // Unidades instaladas do modelo aberto — dá a localização para o modal.
  const unidadesDoDetalhe = modeloDetalhe
    ? unidadesDoModelo(modeloDetalhe.codigo)
    : []

  return (
    <div className="w-full flex-1 bg-[#212120] px-16 pb-10 pt-10 text-white">
      {/* Header */}
      <header className="mb-8 flex items-center gap-4">
        <button
          onClick={onExit}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#141414] text-[#BF9655]"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-extrabold uppercase tracking-wide text-[#BF9655]">
          Equipamentos
        </h1>
      </header>

      <p className="mb-6 max-w-xl text-base text-gray-400">
        Conheça todo o equipamento da unidade ou filtre pelo grupo que deseja
        treinar.
      </p>

      <CategoryTabs
        categoriaAtiva={filtro}
        onSelecionar={setFiltro}
        incluirTodas
        contar={(categoria) =>
          categoria ? modelosDaCategoria(categoria).length : modelos.length
        }
      />

      <p className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-400">
        {filtro ? `Filtrado por: ${categoriaLabel(filtro)} · ` : ''}
        {equipamentos.length}{' '}
        {equipamentos.length === 1
          ? 'equipamento disponível'
          : 'equipamentos disponíveis'}
      </p>

      {equipamentos.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-10 text-center text-gray-400">
          Nenhum equipamento cadastrado para esta categoria.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {equipamentos.map((maquina) => {
            const unidades = unidadesDoModelo(maquina.codigo)
            return (
              <div
                key={maquina.codigo}
                className="flex flex-col rounded-xl border border-white/10 bg-[#141414] p-4"
              >
                <ImagemComFallback
                  src={maquina.imagemMaquina}
                  alt={maquina.nome}
                  ajuste="contain"
                />
                <div className="mb-1 mt-4 flex items-center gap-2">
                  <span className="rounded bg-[#0D0D0D] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#BF9655]">
                    {maquina.codigo}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500">
                    {linhaLabel(maquina.linha)}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-extrabold uppercase leading-tight text-[#BF9655]">
                  {maquina.nome}
                </h3>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {maquina.categorias.map((categoria) => (
                    <span
                      key={categoria}
                      className="rounded-full border border-[#BF9655]/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#BF9655]"
                    >
                      {categoriaLabel(categoria)}
                    </span>
                  ))}
                </div>
                <p className="mb-3 flex-1 text-sm leading-snug text-gray-400 line-clamp-3">
                  {maquina.descricao}
                </p>
                {unidades.length > 0 && (
                  <p className="mb-4 flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={14} />
                    {unidades.length}{' '}
                    {unidades.length === 1 ? 'unidade' : 'unidades'} ·{' '}
                    {unidades[0].localizacao.area}
                  </p>
                )}
                <button
                  onClick={() => setModeloDetalhe(maquina)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#BF9655] py-2.5 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-110"
                >
                  Detalhes
                  <Info size={16} />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* ---------------- MODAL DE DETALHES ---------------- */}
      {modeloDetalhe && (
        <EquipamentoModal
          equipamento={{
            nome: modeloDetalhe.nome,
            subtitulo: `${modeloDetalhe.codigo} · ${linhaLabel(
              modeloDetalhe.linha
            )}`,
            descricao: modeloDetalhe.descricao,
            imagemMaquina: modeloDetalhe.imagemMaquina,
            imagemExecucao: modeloDetalhe.imagemExecucao,
            tags: modeloDetalhe.categorias.map(categoriaLabel),
            especificacoes: modeloDetalhe.especificacoes,
            localizacao: unidadesDoDetalhe[0]?.localizacao,
          }}
          onFechar={() => setModeloDetalhe(null)}
        />
      )}
    </div>
  )
}
