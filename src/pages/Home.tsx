import { Dumbbell, Bot, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import gymBanner from '../assets/gym-banner.png'
import sugestaoImg from '../assets/sugestao.png'
import equipamentosImg from '../assets/equipamentos.png'
import mapaImg from '../assets/mapa.jpg'

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
  /** foto de fundo do card */
  imagem: string
  onClick?: () => void
  className?: string
}) {
  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#141414] py-12 px-8 ${className}`}
    >
      {/* Foto de fundo + sombra por cima, para o texto continuar legível */}
      <img
        src={imagem}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
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
          icon={<Bot size={80} />}
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
      </div>

      {/* Banner Exclusive Environment */}
      <div className="relative mb-20 mt-20 overflow-hidden rounded-2xl">
        <img
          src={gymBanner}
          alt="Exclusive Environment"
          className="h-90 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-extrabold uppercase tracking-wide text-white">
            ACADEMIA 100% CIMERIAN
          </h2>
          <p className="text-lg text-gray-300">
            Treine no topo da sua performance com equipamentos de classe
            mundial e suporte personalizado.
          </p>
        </div>
      </div>

      {/* CTA final */}
      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#BF9655] py-4 text-sm font-extrabold uppercase tracking-wide text-black transition hover:brightness-110">
        Entrar / Registrar-se 
      </button>
    </div>
  )
}
