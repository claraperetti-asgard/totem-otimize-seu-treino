import { useState } from 'react'
import { ArrowLeft, Info } from 'lucide-react'
import GymMap from '../components/GymMap/GymMap'
import EquipamentoModal from '../components/EquipamentoModal'
import { categoriaLabel, type Equipamento } from '../data/equipamentos'

interface GymMapPageProps {
  onExit: () => void
}

export default function GymMapPage({ onExit }: GymMapPageProps) {
  const [selecionado, setSelecionado] = useState<Equipamento | null>(null)
  const [detalheAberto, setDetalheAberto] = useState(false)

  return (
    <div className="w-full flex-1 bg-[#212120] px-16 pb-10 pt-10 text-white">
      <header className="mb-8 flex items-center gap-4">
        <button
          onClick={onExit}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#141414] text-[#BF9655]"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-extrabold uppercase tracking-wide text-[#BF9655]">
          Mapa da Unidade
        </h1>
      </header>

      <GymMap
        onEquipamentoSelecionado={(equipamento) => {
          setSelecionado(equipamento)
          if (!equipamento) setDetalheAberto(false)
        }}
      />

      {/* Ponte para o modal já usado nas outras telas */}
      {selecionado && (
        <button
          onClick={() => setDetalheAberto(true)}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#BF9655] py-4 text-base font-extrabold uppercase tracking-wide text-black transition hover:brightness-110"
        >
          Ver detalhes de {selecionado.nome}
          <Info size={18} />
        </button>
      )}

      {detalheAberto && selecionado && (
        <EquipamentoModal
          equipamento={{
            nome: selecionado.nome,
            subtitulo: `${selecionado.codigo} · ${selecionado.localizacao.area}`,
            descricao: selecionado.descricao,
            imagemMaquina: selecionado.imagemMaquina,
            imagemExecucao: selecionado.imagemExecucao,
            tags: selecionado.categorias.map(categoriaLabel),
            localizacao: selecionado.localizacao,
          }}
          onFechar={() => setDetalheAberto(false)}
        />
      )}
    </div>
  )
}
