import { useGymMap, ZOOM_MAX, ZOOM_MIN } from '../../hooks/useGymMap'
import type { CategoriaId, Equipamento } from '../../data/equipamentos'
import planta from '../../assets/planta.png'
import CategoryTabs from './CategoryTabs'
import EquipmentCard from './EquipmentCard'
import EquipmentOverlay from './EquipmentOverlay'
import GymSvg from './GymSvg'
import ZoomControls from './ZoomControls'

interface GymMapProps {
  /** PNG da planta da unidade */
  plantaSrc?: string
  categoriaInicial?: CategoriaId
  /** rótulo do cabeçalho da planta */
  tituloPlanta?: string
  /** ex.: abrir o modal de detalhes ao clicar num equipamento */
  onEquipamentoSelecionado?: (equipamento: Equipamento | null) => void
}

export default function GymMap({
  plantaSrc = planta,
  categoriaInicial,
  tituloPlanta = 'Planta Técnica - Nível 1',
  onEquipamentoSelecionado,
}: GymMapProps) {
  const {
    categoria,
    trocarCategoria,
    equipamentosFiltrados,
    selectedEquipment,
    equipamentoSelecionado,
    selecionarEquipamento,
    limparSelecao,
    zoom,
    aumentarZoom,
    diminuirZoom,
    resetarZoom,
    ehFavorito,
    alternarFavorito,
  } = useGymMap({ categoriaInicial })

  // Mapa e lista chamam o mesmo handler — por isso nunca dessincronizam.
  function handleSelecionar(id: string) {
    selecionarEquipamento(id)
    onEquipamentoSelecionado?.(
      id === selectedEquipment
        ? null
        : equipamentosFiltrados.find((e) => e.id === id) ?? null
    )
  }

  return (
    <div>
      <CategoryTabs
        categoriaAtiva={categoria}
        onSelecionar={(nova) => nova && trocarCategoria(nova)}
      />

      {/* ---------------- MAPA ---------------- */}
      <div className="mb-8 rounded-2xl border border-white/10 bg-[#141414] p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#BF9655]">
              {tituloPlanta}
            </h2>
            <div className="mt-2 flex items-center gap-4 text-[10px] uppercase tracking-widest text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-[2px] bg-[#BF9655]" />
                Selecionado
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-[2px] border border-[#BF9655]/45" />
                Disponível
              </span>
            </div>
          </div>

          {equipamentoSelecionado?.localizacao && (
            <div className="rounded-lg border border-[#BF9655]/40 bg-[#0D0D0D] px-4 py-2 text-right">
              <p className="text-xs font-bold uppercase tracking-wide text-[#BF9655]">
                {equipamentoSelecionado.localizacao.area}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">
                {equipamentoSelecionado.nome}
              </p>
            </div>
          )}
        </div>

        <div className="relative">
          <GymSvg plantaSrc={plantaSrc} zoom={zoom} onFundoClick={limparSelecao}>
            <EquipmentOverlay
              equipamentos={equipamentosFiltrados}
              selectedEquipment={selectedEquipment}
              onSelecionar={handleSelecionar}
            />
          </GymSvg>

          <ZoomControls
            onAumentar={aumentarZoom}
            onDiminuir={diminuirZoom}
            onResetar={resetarZoom}
            podeAumentar={zoom < ZOOM_MAX}
            podeDiminuir={zoom > ZOOM_MIN}
          />
        </div>
      </div>

      {/* ---------------- LISTA ---------------- */}
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#BF9655]">
        Equipamentos Disponíveis
      </h2>

      {equipamentosFiltrados.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#141414] p-10 text-center text-gray-400">
          Nenhum equipamento cadastrado nesta categoria.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {equipamentosFiltrados.map((equipamento) => (
            <EquipmentCard
              key={equipamento.id}
              equipamento={equipamento}
              selecionado={equipamento.id === selectedEquipment}
              favorito={ehFavorito(equipamento.id)}
              onSelecionar={handleSelecionar}
              onAlternarFavorito={alternarFavorito}
            />
          ))}
        </div>
      )}
    </div>
  )
}
