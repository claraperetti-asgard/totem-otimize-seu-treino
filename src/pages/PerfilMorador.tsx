import {
  ArrowLeft,
  Dumbbell,
  Flame,
  Medal,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  Zap,
} from 'lucide-react'
import Avatar from '../components/Avatar'
import {
  buscarMorador,
  posicaoNoRanking,
  type IconeMedalha,
  type Medalha,
  type NivelMedalha,
} from '../data/comunidade'

const iconesMedalha: Record<IconeMedalha, React.ReactNode> = {
  trofeu: <Trophy size={28} />,
  halter: <Dumbbell size={28} />,
  alvo: <Target size={28} />,
  raio: <Zap size={28} />,
  chama: <Flame size={28} />,
}

const estiloNivel: Record<NivelMedalha, { selo: string; borda: string }> = {
  ouro: { selo: 'bg-[#BF9655] text-black', borda: 'border-[#BF9655]' },
  prata: { selo: 'bg-gray-300 text-black', borda: 'border-gray-400/60' },
  bronze: { selo: 'bg-orange-800 text-white', borda: 'border-orange-800/70' },
}

function CardEstatistica({
  label,
  valor,
  destaque,
  icone,
}: {
  label: string
  valor: string
  destaque?: string
  icone?: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#141414] p-5 text-center">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
        {label}
      </p>
      <p className="flex items-center justify-center gap-2 text-3xl font-extrabold text-[#BF9655]">
        {valor}
        {icone}
      </p>
      {destaque && (
        <p className="mt-1 text-[10px] uppercase tracking-widest text-gray-500">
          {destaque}
        </p>
      )}
    </div>
  )
}

function CardMedalha({ medalha }: { medalha: Medalha }) {
  const estilo = estiloNivel[medalha.nivel]
  return (
    <div
      className={`flex flex-col items-center rounded-xl border bg-[#141414] p-5 text-center ${estilo.borda}`}
    >
      <span
        className={`mb-3 rounded-lg px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${estilo.selo}`}
      >
        {medalha.nivel}
      </span>
      <span className="mb-3 text-[#BF9655]">{iconesMedalha[medalha.icone]}</span>
      <h3 className="text-sm font-extrabold uppercase leading-tight text-[#BF9655]">
        {medalha.nome}
      </h3>
      <p className="mt-1 text-[11px] leading-snug text-gray-500">
        {medalha.descricao}
      </p>
    </div>
  )
}

interface PerfilMoradorProps {
  moradorId?: string
  onVoltar: () => void
}

export default function PerfilMorador({
  moradorId,
  onVoltar,
}: PerfilMoradorProps) {
  const morador = moradorId ? buscarMorador(moradorId) : undefined

  if (!morador) {
    return (
      <div className="w-full flex-1 bg-[#212120] px-16 pb-10 pt-10 text-white">
        <button
          onClick={onVoltar}
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#141414] text-[#BF9655]"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-10 text-center text-gray-400">
          Morador não encontrado.
        </div>
      </div>
    )
  }

  const posicao = posicaoNoRanking(morador.id)
  const progressoSemana = Math.min(
    100,
    (morador.treinosSemana / morador.metaSemanal) * 100
  )
  const subiu = morador.evolucaoSemanalPct >= 0

  return (
    <div className="w-full flex-1 bg-[#212120] px-16 pb-10 pt-10 text-white">
      {/* Header */}
      <header className="mb-8 flex items-center gap-4">
        <button
          onClick={onVoltar}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#141414] text-[#BF9655]"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-extrabold uppercase tracking-wide text-[#BF9655]">
          Perfil do Morador
        </h1>
      </header>

      {/* Identificação */}
      <div className="mb-8 flex flex-col items-center">
        <div className="rounded-2xl border-2 border-[#BF9655] p-2">
          <Avatar nome={morador.nome} tamanho={96} destacado />
        </div>
        <span className="-mt-3 rounded bg-[#BF9655] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
          {posicao}º no ranking
        </span>
        <h2 className="mt-3 text-4xl font-extrabold uppercase tracking-wide text-[#BF9655]">
          {morador.nome}
        </h2>
        <p className="text-sm uppercase tracking-widest text-gray-400">
          {morador.apartamento}
        </p>
      </div>

      {/* Estatísticas */}
      <div className="mb-10 grid grid-cols-3 gap-4">
        <CardEstatistica
          label="Streak"
          valor={`${morador.streakDias}`}
          destaque="dias seguidos"
          icone={<Flame size={22} />}
        />
        <CardEstatistica
          label="Treinos na semana"
          valor={`${morador.treinosSemana} / ${morador.metaSemanal}`}
        />
        <CardEstatistica
          label="Total de medalhas"
          valor={`${morador.medalhas.length}`}
          icone={<Medal size={22} />}
        />
      </div>

      {/* Progresso da semana */}
      <div className="mb-10 rounded-xl border border-white/10 bg-[#141414] p-5">
        <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-widest">
          <span className="text-gray-400">Meta da semana</span>
          <span className="text-[#BF9655]">{Math.round(progressoSemana)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[#BF9655] transition-all duration-500"
            style={{ width: `${progressoSemana}%` }}
          />
        </div>
      </div>

      {/* Medalhas */}
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h2 className="text-lg font-extrabold uppercase tracking-wide text-[#BF9655]">
            Medalhas
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Conquistas por desafio concluído
          </p>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
          {morador.medalhas.length} conquistadas
        </span>
      </div>

      {morador.medalhas.length === 0 ? (
        <div className="mb-10 rounded-xl border border-white/10 bg-[#141414] p-10 text-center text-gray-400">
          Ainda sem medalhas. Entre em um desafio para começar.
        </div>
      ) : (
        <div className="mb-10 grid grid-cols-4 gap-4">
          {morador.medalhas.map((medalha) => (
            <CardMedalha key={medalha.id} medalha={medalha} />
          ))}
        </div>
      )}

      {/* Desempenho recente */}
      <h2 className="mb-4 text-lg font-extrabold uppercase tracking-wide text-[#BF9655]">
        Desempenho Recente
      </h2>
      <div className="flex items-center gap-5 rounded-xl border border-white/10 bg-[#141414] p-5">
        <div className="rounded-lg bg-[#BF9655] px-5 py-4 text-black">
          <p className="text-[10px] font-bold uppercase tracking-widest">
            Carga total
          </p>
          <p className="text-3xl font-extrabold">
            {(morador.cargaTotalKg / 1000).toFixed(1)}K
            <span className="ml-1 text-base">kg</span>
          </p>
        </div>

        <div className="flex-1">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Evolução semanal
          </p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#BF9655]"
              style={{
                width: `${Math.min(
                  100,
                  Math.abs(morador.evolucaoSemanalPct) * 4
                )}%`,
              }}
            />
          </div>
        </div>

        <span
          className={`flex items-center gap-1 text-lg font-extrabold ${
            subiu ? 'text-[#BF9655]' : 'text-red-400'
          }`}
        >
          {subiu ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          {subiu ? '+' : ''}
          {morador.evolucaoSemanalPct}%
        </span>
      </div>
    </div>
  )
}
