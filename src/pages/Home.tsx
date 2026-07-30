import { useState } from 'react'
import { Dumbbell, Boxes, MapPin, Trophy, Wrench } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ChamadoManutencaoModal from '../components/ChamadoManutencaoModal'
import AutenticacaoModal from '../components/AutenticacaoModal'
import BannerSlider from '../components/BannerSlider'
import SeloVip from '../components/SeloVip'
import { cor } from '../theme/paletaAzul'
import { paleta } from '../theme/cores'
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
  corIcone,
  vip = false,
  onClick,
  className = '',
}: {
  icon: React.ReactNode
  title: string
  description: string
  buttonLabel: string
  /** classe de cor do ícone */
  corIcone: string
  /** foto de fundo do card — sem ela, fica só o fundo escuro */
  imagem?: string
  /** marca o módulo como recurso de conta paga */
  vip?: boolean
  onClick?: () => void
  className?: string
}) {
  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 py-12 px-8 ${className}`}
      style={{ backgroundColor: cor.cartaoEscuro }}
    >
      {/* Foto preenchendo o card + sombra por cima, para o texto continuar legível */}
      {imagem && (
        <img
          src={imagem}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B121C] via-[#0B121C]/60 to-[#0B121C]/40" />

      {vip && <SeloVip className="absolute right-5 top-5" />}

      <div className="relative">
        <div className={`mb-8 drop-shadow-lg ${corIcone}`}>{icon}</div>
        <h3
          className="mb-1 text-2xl font-bold uppercase tracking-wide drop-shadow-lg"
          style={{ color: cor.creme }}
        >
          {title}
        </h3>
        <p className="mb-12 text-lg leading-snug text-gray-300 drop-shadow-md">
          {description}
        </p>
      </div>
      <button
        onClick={onClick}
        className="relative w-full rounded-lg py-3 text-lg font-bold uppercase tracking-wide transition hover:brightness-110"
        style={{ backgroundColor: cor.creme, color: cor.cartaoEscuro }}
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
    <div
      className="w-full flex-1 px-14 pb-14 pt-10 text-white"
      style={{ backgroundColor: cor.fundo }}
    >
      

      {/* Grid de cards */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <Card
          icon={<Dumbbell size={56} />}
          title="Sugestão de Treino"
          description="Algoritmos inteligentes para o seu objetivo hoje."
          buttonLabel="Abrir Sugestão"
          corIcone={paleta.verde.texto}
          imagem={sugestaoImg}
          onClick={() => navigate('/suggest')}
        />
        <Card
          icon={<Boxes size={56} />}
          title="Equipamentos"
          description="Aprenda a utilizar nosso equipamento premium."
          buttonLabel="Ver Tutorial"
          corIcone={paleta.azul.texto}
          imagem={equipamentosImg}
          onClick={() => navigate('/machines')}
        />
        <Card
          icon={<MapPin size={56} />}
          title="Mapa da Academia"
          description="Localize as zonas de treino e amenities."
          buttonLabel="Ver Mapa"
          corIcone={paleta.vermelho.texto}
          imagem={mapaImg}
          onClick={() => navigate('/map')}
        />
        <Card
          icon={<Trophy size={56} />}
          title="Desafios"
          description="Ranking dos moradores e desafios da comunidade."
          buttonLabel="Ver Desafios"
          vip
          corIcone={paleta.amarelo.texto}
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
        className="flex w-full items-center justify-center gap-2 rounded-2xl py-5 text-sm font-extrabold uppercase tracking-[0.15em] transition hover:brightness-110"
        style={{ backgroundColor: cor.creme, color: cor.tinta }}
      >
        <SeloVip claro />
        Entrar / Registrar-se
      </button>

      {/* Chamado de manutenção: atalho fixo no canto inferior direito */}
      <button
        onClick={() => setChamadoAberto(true)}
        aria-label="Abrir chamado de manutenção"
        title="Abrir chamado de manutenção"
        className="fixed bottom-40 right-8 z-40 flex h-16 w-16 items-center justify-center rounded-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.9)] ring-2 ring-[#6B7688] transition hover:brightness-110"
        style={{ backgroundColor: cor.cartaoEscuro, color: cor.creme }}
      >
        <Wrench size={28} />
        <SeloVip
          compacto
          className="absolute -right-1 -top-1 border-2 border-[#26303b] bg-amber-300 text-[#1B2436]"
        />
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
