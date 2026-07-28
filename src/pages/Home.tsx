import { useState } from 'react'
import { Dumbbell, Boxes, MapPin, Trophy, Wrench } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ChamadoManutencaoModal from '../components/ChamadoManutencaoModal'
import AutenticacaoModal from '../components/AutenticacaoModal'
import BannerSlider from '../components/BannerSlider'
import sugestaoImg from '../assets/sugestao.png'
import equipamentosImg from '../assets/equipamentos.png'
import mapaImg from '../assets/mapa.jpg'
import desafiosImg from '../assets/desafio.jpg'

function Card({
  icon,
  title,
  description,
  buttonLabel,
  imagem,
  onClick,
  className = '',
}: {
  icon: React.ReactNode
  title: string
  description: string
  buttonLabel: string
  /** foto de fundo do card — sem ela, fica só o fundo escuro */
  imagem?: string
  onClick?: () => void
  className?: string
}) {
  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#141414] py-12 px-8 ${className}`}
    >
      {/* Foto de fundo + sombra por cima, para o texto continuar legível */}
      {imagem && (
        <img
          src={imagem}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/40" />

      <div className="relative">
        <div className="mb-8 text-[#BF9655] drop-shadow-lg">{icon}</div>
        <h3 className="mb-1 text-2xl font-bold uppercase tracking-wide text-[#BF9655] drop-shadow-lg">
          {title}
        </h3>
        <p className="mb-12 text-lg leading-snug text-gray-300 drop-shadow-md">
          {description}
        </p>
      </div>
      <button
        onClick={onClick}
        className="relative w-full rounded-lg bg-[#BF9655] py-3 text-lg font-bold uppercase tracking-wide text-black transition hover:brightness-110"
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [chamadoAberto, setChamadoAberto] = useState(false)
  const [acessoAberto, setAcessoAberto] = useState(false)

  return (
    <div className="w-full flex-1 bg-[#212120] px-16 pb-10 pt-10 text-white">
      {/* o título "Otimize Seu Treino" vive no Header global */}

      {/* Grid de cards */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <Card
          icon={<Dumbbell size={80} />}
          title="Sugestão de Treino"
          description="Algoritmos inteligentes para o seu objetivo hoje."
          buttonLabel="Abrir Sugestão"
          imagem={sugestaoImg}
          onClick={() => navigate('/suggest')}
        />
        <Card
          icon={<Boxes size={80} />}
          title="Equipamentos"
          description="Aprenda a utilizar nosso equipamento premium."
          buttonLabel="Ver Tutorial"
          imagem={equipamentosImg}
          onClick={() => navigate('/machines')}
        />
        <Card
          icon={<MapPin size={80} />}
          title="Mapa da Academia"
          description="Localize as zonas de treino e amenities."
          buttonLabel="Ver Mapa"
          className="col-span-1"
          imagem={mapaImg}
          onClick={() => navigate('/map')}
        />
        <Card
          icon={<Trophy size={80} />}
          title="Desafios"
          description="Ranking dos moradores e desafios da comunidade."
          buttonLabel="Ver Desafios"
          className="col-span-1"
          imagem={desafiosImg}
          onClick={() => navigate('/desafios')}
        />
      </div>

      {/* Avisos da academia */}
      <div className="mb-20 mt-20">
        <BannerSlider />
      </div>

      {/* CTA final */}
      <button
        onClick={() => setAcessoAberto(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#BF9655] py-4 text-sm font-extrabold uppercase tracking-wide text-black transition hover:brightness-110"
      >
        Entrar / Registrar-se
      </button>

{/* Chamado de manutenção: atalho fixo no canto inferior direito */}
      <button
        onClick={() => setChamadoAberto(true)}
        aria-label="Abrir chamado de manutenção"
        title="Abrir chamado de manutenção"
        className="fixed bottom-40 right-8 z-40 flex h-16 w-16 items-center justify-center rounded-full border border-[#BF9655] bg-[#BF9655] text-black shadow-lg transition"
      >
        <Wrench size={30} />
      </button>

      {chamadoAberto && (
        <ChamadoManutencaoModal onFechar={() => setChamadoAberto(false)} />
      )}

      {acessoAberto && (
        <AutenticacaoModal onFechar={() => setAcessoAberto(false)} />
      )}
    </div>
  )
}
