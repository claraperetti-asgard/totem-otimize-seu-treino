import { useState } from 'react'
import {
  ArrowLeft,
  ChevronRight,
  Crown,
  Flame,
  Medal,
  Sparkles,
  Swords,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import Avatar from '../components/Avatar'
import {
  buscarMorador,
  desafios,
  dificuldadeLabel,
  mesReferencia,
  progressaoDoMorador,
  ranking,
  resumoDaTemporada,
  type Dificuldade,
  type Morador,
} from '../data/comunidade'
import { paleta } from '../theme/cores'

const estiloDificuldade: Record<Dificuldade, string> = {
  facil: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  media: 'border-[#BF9655]/40 bg-[#BF9655]/10 text-[#BF9655]',
  dificil: 'border-red-500/40 bg-red-500/10 text-red-400',
}

/**
 * Estilo de cada colocação do pódio.
 * `ordem` recoloca os cards como num pódio de verdade: 2º | 1º | 3º.
 * `peso` deixa o campeão mais largo que os outros dois.
 */
const estiloPodio = [
  {
    anel: 'border-[#BF9655]',
    texto: 'text-[#BF9655]',
    degrau: 'h-44',
    ordem: 'order-2',
    peso: 'basis-[38%]',
    avatar: 112,
  },
  {
    anel: 'border-sky-200',
    texto: 'text-sky-200',
    degrau: 'h-32',
    ordem: 'order-1',
    peso: 'basis-[31%]',
    avatar: 88,
  },
  {
    anel: 'border-orange-600',
    texto: 'text-orange-400',
    degrau: 'h-24',
    ordem: 'order-3',
    peso: 'basis-[31%]',
    avatar: 88,
  },
]

function Estatistica({
  icone,
  valor,
  label,
  cor,
}: {
  icone: React.ReactNode
  valor: string
  label: string
  /** par de classes vindo da paleta de apoio */
  cor: { chip: string; texto: string }
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#141414] px-5 py-4">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${cor.chip}`}
      >
        {icone}
      </span>
      <span>
        <span
          className={`block text-2xl font-extrabold leading-none ${cor.texto}`}
        >
          {valor}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-gray-500">
          {label}
        </span>
      </span>
    </div>
  )
}

/** Card do pódio — o 1º lugar vem maior e com coroa. */
function Podio({
  morador,
  posicao,
  onAbrir,
}: {
  morador: Morador
  posicao: number
  onAbrir: () => void
}) {
  const estilo = estiloPodio[posicao - 1]
  const progressao = progressaoDoMorador(morador)
  const lider = posicao === 1

  return (
    <button
      onClick={onAbrir}
      className={`flex w-full flex-col items-center justify-end overflow-hidden rounded-3xl border-2 bg-[#141414] px-8 pt-8 transition hover:brightness-110 ${
        lider
          ? 'border-[#BF9655] shadow-[0_0_40px_-18px_#BF9655]'
          : 'border-white/10'
      }`}
    >
      {lider && (
        <Crown size={40} className="mb-3 text-[#BF9655] drop-shadow-lg" />
      )}

      <span className={`rounded-full border-4 p-1.5 ${estilo.anel}`}>
        <Avatar nome={morador.nome} tamanho={estilo.avatar} destacado={lider} />
      </span>

      <span className={`mt-4 text-5xl font-extrabold ${estilo.texto}`}>
        {posicao}º
      </span>
      <span
        className={`mt-1 font-extrabold uppercase tracking-wide text-white ${
          lider ? 'text-2xl' : 'text-xl'
        }`}
      >
        {morador.nome}
      </span>
      <span className="text-xs uppercase tracking-widest text-gray-500">
        {morador.apartamento}
      </span>

      <span className="mt-3 flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
        <span className="flex items-center gap-1 rounded-full border border-[#BF9655]/40 bg-[#BF9655]/10 px-3 py-1 text-[#BF9655]">
          <Zap size={12} />
          {progressao.xp} XP
        </span>
        <span className="flex items-center gap-1 text-gray-500">
          <Flame size={12} className="text-[#BF9655]" />
          {morador.streakDias}d
        </span>
      </span>

      {/* Degrau do pódio: sangra até as bordas do card */}
      <span
        className={`-mx-8 mt-6 flex w-[calc(100%+4rem)] flex-col items-center justify-start pt-4 ${
          estilo.degrau
        } ${lider ? 'bg-[#BF9655] text-black' : 'bg-[#1f1f1f] text-gray-300'}`}
      >
        <span
          className={`font-extrabold leading-none ${
            lider ? 'text-4xl' : 'text-3xl'
          }`}
        >
          {morador.treinosMes}
        </span>
        <span
          className={`mt-1 text-[10px] font-bold uppercase tracking-widest ${
            lider ? 'text-black/60' : 'text-gray-500'
          }`}
        >
          treinos no mês
        </span>
      </span>
    </button>
  )
}

interface DesafiosProps {
  onExit: () => void
  onAbrirPerfil: (moradorId: string) => void
}

export default function Desafios({ onExit, onAbrirPerfil }: DesafiosProps) {
  // participação é local por enquanto — vira chamada de API depois
  const [participando, setParticipando] = useState<string[]>([])

  const resumo = resumoDaTemporada()
  const podio = ranking.slice(0, 3)
  const demais = ranking.slice(3)
  const maiorTotal = ranking[0]?.treinosMes ?? 1
  const xpConquistado = participando.reduce((total, id) => {
    const desafio = desafios.find((d) => d.id === id)
    return total + (desafio?.recompensaXp ?? 0)
  }, 0)

  function alternarParticipacao(id: string) {
    setParticipando((atuais) =>
      atuais.includes(id) ? atuais.filter((d) => d !== id) : [...atuais, id]
    )
  }

  return (
    <div className="w-full flex-1 bg-[#212120] px-16 pb-10 pt-10 text-white">
      {/* Header */}
      <header className="mb-6 flex items-center gap-4">
        <button
          onClick={onExit}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#141414] text-[#BF9655]"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-wide text-[#BF9655]">
            Desafios da Comunidade
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Temporada de {mesReferencia} · Suba no ranking treinando
          </p>
        </div>
      </header>

      {/* Placar da temporada */}
      <div className="mb-10 grid grid-cols-4 gap-4">
        <Estatistica
          icone={<Users size={20} />}
          valor={String(resumo.moradoresAtivos)}
          label="Moradores ativos"
          cor={paleta.azul}
        />
        <Estatistica
          icone={<TrendingUp size={20} />}
          valor={String(resumo.treinosNoMes)}
          label="Treinos no mês"
          cor={paleta.verde}
        />
        <Estatistica
          icone={<Swords size={20} />}
          valor={String(resumo.desafiosAtivos)}
          label="Desafios ativos"
          cor={paleta.vermelho}
        />
        <Estatistica
          icone={<Medal size={20} />}
          valor={String(resumo.medalhasEntregues)}
          label="Medalhas entregues"
          cor={paleta.amarelo}
        />
      </div>

      {/* ---------------- PÓDIO ---------------- */}
      <div className="mb-6 flex items-center gap-2">
        <Crown size={20} className="text-[#BF9655]" />
        <h2 className="text-lg font-extrabold uppercase tracking-wide text-[#BF9655]">
          Pódio de {mesReferencia}
        </h2>
      </div>

      <div className="mb-10 flex items-end gap-5">
        {podio.map((morador, indice) => {
          const estilo = estiloPodio[indice]
          return (
            <div
              key={morador.id}
              className={`flex ${estilo.ordem} ${estilo.peso}`}
            >
              <Podio
                morador={morador}
                posicao={indice + 1}
                onAbrir={() => onAbrirPerfil(morador.id)}
              />
            </div>
          )
        })}
      </div>

      {/* ---------------- DEMAIS COLOCADOS ---------------- */}
      {demais.length > 0 && (
        <>
          <h2 className="mb-4 text-lg font-extrabold uppercase tracking-wide text-[#BF9655]">
            Classificação Geral
          </h2>

          <div className="mb-10 flex flex-col gap-3">
            {demais.map((morador, indice) => {
              const posicao = indice + 4
              const progressao = progressaoDoMorador(morador)
              const largura = (morador.treinosMes / maiorTotal) * 100
              const faltaParaSubir =
                ranking[posicao - 2].treinosMes - morador.treinosMes + 1

              return (
                <button
                  key={morador.id}
                  onClick={() => onAbrirPerfil(morador.id)}
                  className="group flex w-full items-center gap-4 rounded-xl border border-white/10 bg-[#141414] p-4 text-left transition hover:border-[#BF9655]/50"
                >
                  <span className="w-6 shrink-0 text-center text-lg font-extrabold text-gray-500">
                    {posicao}
                  </span>

                  <Avatar nome={morador.nome} />

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-2">
                      <span className="truncate text-sm font-bold uppercase tracking-wide text-white">
                        {morador.nome} — {morador.apartamento}
                      </span>
                      <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-sky-400">
                        Nv {progressao.nivel} · {progressao.patente}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-orange-400/80">
                        <Flame size={11} className="text-orange-400" />
                        {morador.streakDias} dias
                      </span>
                    </span>

                    {/* barra de treinos em relação ao líder */}
                    <span className="mt-2 block h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <span
                        className="block h-full rounded-full bg-[#BF9655]/60 transition-all duration-500"
                        style={{ width: `${largura}%` }}
                      />
                    </span>

                    <span className="mt-1 block text-[10px] uppercase tracking-widest text-gray-600">
                      Faltam{' '}
                      <span className="font-bold text-emerald-400">
                        {faltaParaSubir}{' '}
                        {faltaParaSubir === 1 ? 'treino' : 'treinos'}
                      </span>{' '}
                      para subir de posição
                    </span>
                  </span>

                  <span className="shrink-0 text-right">
                    <span className="block text-xl font-extrabold text-[#BF9655]">
                      {morador.treinosMes}
                    </span>
                    <span className="block text-[10px] uppercase tracking-widest text-gray-500">
                      treinos
                    </span>
                  </span>

                  <ChevronRight
                    size={20}
                    className="shrink-0 text-gray-600 transition group-hover:text-[#BF9655]"
                  />
                </button>
              )
            })}
          </div>
        </>
      )}

      {/* ---------------- DESAFIOS ATIVOS ---------------- */}
      <div className="mb-4 flex items-baseline justify-between">
        <div className="flex items-center gap-2">
          <Swords size={20} className="text-[#BF9655]" />
          <h2 className="text-lg font-extrabold uppercase tracking-wide text-[#BF9655]">
            Desafios Ativos
          </h2>
        </div>
        {participando.length > 0 && (
          <span className="flex items-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <Sparkles size={14} />
            {participando.length}{' '}
            {participando.length === 1 ? 'desafio aceito' : 'desafios aceitos'}{' '}
            · +{xpConquistado} XP em jogo
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-5">
        {desafios.map((desafio) => {
          const criador = buscarMorador(desafio.criadorId)
          const inscrito = participando.includes(desafio.id)
          const totalParticipantes = desafio.participantes + (inscrito ? 1 : 0)
          const progressoMeta = Math.min(
            100,
            (totalParticipantes / desafio.metaParticipantes) * 100
          )

          return (
            <div
              key={desafio.id}
              className={`flex flex-col rounded-xl border bg-[#141414] p-5 transition ${
                inscrito
                  ? 'border-emerald-500 shadow-[0_0_24px_-12px_#10b981]'
                  : 'border-white/10'
              }`}
            >
              {/* Criador + selos */}
              <div className="mb-4 flex items-center gap-3">
                <Avatar nome={criador?.nome ?? '?'} tamanho={44} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">
                    {criador
                      ? `${criador.nome} do ${criador.apartamento.replace(
                          'AP ',
                          ''
                        )}`
                      : 'Morador'}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500">
                    Criado {desafio.criadoEm} · {desafio.prazo}
                  </p>
                </div>
                {desafio.emAlta && (
                  <span className="flex shrink-0 items-center gap-1 rounded-full border border-rose-500/40 bg-rose-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-rose-400">
                    <Flame size={12} />
                    Em alta
                  </span>
                )}
              </div>

              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                    estiloDificuldade[desafio.dificuldade]
                  }`}
                >
                  {dificuldadeLabel[desafio.dificuldade]}
                </span>
                <span className="flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-400">
                  <Zap size={11} />+{desafio.recompensaXp} XP
                </span>
                <span className="flex items-center gap-1 rounded-full border border-sky-500/40 bg-sky-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-sky-400">
                  <Medal size={11} />
                  {desafio.recompensaMedalha}
                </span>
              </div>

              <h3 className="mb-2 text-base font-extrabold uppercase leading-tight text-[#BF9655]">
                {desafio.titulo}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-snug text-gray-400">
                {desafio.descricao}
              </p>

              {/* Meta de participantes */}
              <div className="mb-4">
                <div className="mb-1.5 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1 text-gray-500">
                    <Target size={12} />
                    Meta da turma
                  </span>
                  <span className="text-emerald-400">
                    {totalParticipantes}/{desafio.metaParticipantes}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${progressoMeta}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-xs text-gray-400">
                  <Users size={16} />
                  {String(totalParticipantes).padStart(2, '0')} participantes
                </span>
                <button
                  onClick={() => alternarParticipacao(desafio.id)}
                  aria-pressed={inscrito}
                  className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-bold uppercase tracking-wide transition ${
                    inscrito
                      ? 'border border-emerald-500 bg-emerald-500/10 text-emerald-400 hover:brightness-125'
                      : 'bg-[#BF9655] text-black hover:brightness-110'
                  }`}
                >
                  {inscrito ? (
                    <>
                      <Sparkles size={16} />
                      Participando
                    </>
                  ) : (
                    <>
                      <Swords size={16} />
                      Aceitar desafio
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
