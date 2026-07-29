import { useState } from 'react'
import {
  ArrowLeft,
  ChevronRight,
  Crown,
  Flame,
  Medal,
  Sparkles,
  Star,
  Swords,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import {
  buscarMorador,
  desafios,
  dificuldadeLabel,
  iniciais,
  mesReferencia,
  progressaoDoMorador,
  ranking,
  resumoDaTemporada,
  type Dificuldade,
  type Morador,
} from '../data/comunidade'

import { cor } from '../theme/paletaAzul'

const estiloDificuldade: Record<Dificuldade, string> = {
  facil: 'bg-emerald-100 text-emerald-700',
  media: 'bg-amber-100 text-amber-700',
  dificil: 'bg-rose-100 text-rose-600',
}

/** Cores de cada colocação do pódio. */
const estiloPodio = [
  {
    anel: 'ring-[#E5C07B]',
    avatarFundo: 'bg-gradient-to-b from-[#E9C77F] to-[#C9A356]',
    avatarTexto: 'text-[#1B2436]',
    numero: 'text-[#C9A356]',
    ordem: 'order-2',
    peso: 'basis-[36%]',
    avatar: 'h-28 w-28 text-4xl',
    alturaExtra: 'pb-10 pt-8',
  },
  {
    anel: 'ring-[#B9C4D4]',
    avatarFundo: 'bg-[#1B2436]',
    avatarTexto: 'text-[#E6EAF1]',
    numero: 'text-[#8A97A8]',
    ordem: 'order-1',
    peso: 'basis-[30%]',
    avatar: 'h-20 w-20 text-2xl',
    alturaExtra: 'pb-8 pt-6',
  },
  {
    anel: 'ring-[#B4693A]',
    avatarFundo: 'bg-[#1B2436]',
    avatarTexto: 'text-[#E6EAF1]',
    numero: 'text-[#B4693A]',
    ordem: 'order-3',
    peso: 'basis-[30%]',
    avatar: 'h-20 w-20 text-2xl',
    alturaExtra: 'pb-8 pt-6',
  },
]

/** Barra de progresso em degradê verde-água → azul. */
function Barra({
  porcentagem,
  claro = false,
}: {
  porcentagem: number
  /** versão para cards creme */
  claro?: boolean
}) {
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full ${
        claro ? 'bg-[#E4E0D8]' : 'bg-white/10'
      }`}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#63D2C3] to-[#5C93E8] transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, porcentagem))}%` }}
      />
    </div>
  )
}

/** Avatar por iniciais, com anel colorido. */
function AvatarCirculo({
  nome,
  classes,
  fundo,
  texto,
  anel,
}: {
  nome: string
  classes: string
  fundo: string
  texto: string
  anel?: string
}) {
  return (
    <span
      aria-hidden
      className={`flex items-center justify-center rounded-full font-extrabold ${classes} ${fundo} ${texto} ${
        anel ? `ring-4 ring-offset-4 ring-offset-[#FAF7F1] ${anel}` : ''
      }`}
    >
      {iniciais(nome)}
    </span>
  )
}

function Estatistica({
  icone,
  valor,
  label,
  chip,
}: {
  icone: React.ReactNode
  valor: string
  label: string
  /** classes de fundo e texto do ícone */
  chip: string
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl border px-5 py-4"
      style={{ backgroundColor: cor.cartaoEscuro, borderColor: cor.bordaEscura }}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${chip}`}
      >
        {icone}
      </span>
      <span>
        <span className="block text-2xl font-extrabold leading-none text-white">
          {valor}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-[#8A97A8]">
          {label}
        </span>
      </span>
    </div>
  )
}

/** Card do pódio, em creme. */
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
  const maiorTotal = ranking[0]?.treinosMes ?? 1

  return (
    <button
      onClick={onAbrir}
      className={`flex w-full flex-col items-center rounded-[28px] px-6 transition hover:-translate-y-1 ${
        estilo.alturaExtra
      } ${
        lider
          ? 'shadow-[0_0_60px_-15px_rgba(229,192,123,0.55)] ring-2 ring-[#E5C07B]'
          : 'shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)]'
      }`}
      style={{ backgroundColor: cor.creme }}
    >
      {lider && <Crown size={30} className="mb-4 text-[#C9A356]" />}

      <AvatarCirculo
        nome={morador.nome}
        classes={estilo.avatar}
        fundo={estilo.avatarFundo}
        texto={estilo.avatarTexto}
        anel={estilo.anel}
      />

      <span className={`mt-6 text-4xl font-extrabold ${estilo.numero}`}>
        {posicao}º
      </span>
      <span
        className={`font-extrabold uppercase tracking-wide ${
          lider ? 'text-2xl' : 'text-xl'
        }`}
        style={{ color: cor.tinta }}
      >
        {morador.nome}
      </span>
      <span
        className="text-[11px] uppercase tracking-widest"
        style={{ color: cor.tintaSuave }}
      >
        {morador.apartamento}
      </span>

      <span className="mt-3 flex items-center gap-3">
        <span className="flex items-center gap-1 rounded-full bg-[#F5E7C8] px-3 py-1 text-[11px] font-bold text-[#8A6B2E]">
          <Star size={11} />
          {progressao.xp} XP
        </span>
        <span
          className="flex items-center gap-1 text-[11px] font-bold"
          style={{ color: cor.tintaSuave }}
        >
          <Flame size={11} className="text-[#E08A4B]" />
          {morador.streakDias}d
        </span>
      </span>

      <span className="mt-5 w-full">
        <Barra porcentagem={(morador.treinosMes / maiorTotal) * 100} claro />
      </span>

      <span
        className={`mt-4 font-extrabold leading-none ${
          lider ? 'text-4xl' : 'text-3xl'
        }`}
        style={{ color: cor.tinta }}
      >
        {morador.treinosMes}
      </span>
      <span
        className="mt-1 text-[10px] font-bold uppercase tracking-widest"
        style={{ color: cor.tintaSuave }}
      >
        treinos no mês
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

  function alternarParticipacao(id: string) {
    setParticipando((atuais) =>
      atuais.includes(id) ? atuais.filter((d) => d !== id) : [...atuais, id]
    )
  }

  return (
    <div
      className="w-full flex-1 px-14 pb-14 pt-10 text-white"
      style={{ backgroundColor: cor.fundo }}
    >
      {/* ---------------- CABEÇALHO ---------------- */}
      <header className="mb-8 flex items-center gap-4">
        <button
          onClick={onExit}
          className="flex h-12 w-12 items-center justify-center rounded-xl border transition hover:brightness-125"
          style={{
            backgroundColor: cor.cartaoEscuro,
            borderColor: cor.bordaEscura,
            color: cor.creme,
          }}
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1
            className="text-4xl font-extrabold uppercase tracking-wide"
            style={{ color: cor.creme }}
          >
            Desafios da Comunidade
          </h1>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A97A8]">
            Temporada de {mesReferencia} · Suba no ranking treinando
          </p>
        </div>
      </header>

      {/* ---------------- PLACAR DA TEMPORADA ---------------- */}
      <div className="mb-10 grid grid-cols-4 gap-4">
        <Estatistica
          icone={<Users size={20} />}
          valor={String(resumo.moradoresAtivos)}
          label="Moradores ativos"
          chip="bg-emerald-400/15 text-emerald-300"
        />
        <Estatistica
          icone={<TrendingUp size={20} />}
          valor={String(resumo.treinosNoMes)}
          label="Treinos no mês"
          chip="bg-sky-400/15 text-sky-300"
        />
        <Estatistica
          icone={<Swords size={20} />}
          valor={String(resumo.desafiosAtivos)}
          label="Desafios ativos"
          chip="bg-amber-400/15 text-amber-300"
        />
        <Estatistica
          icone={<Medal size={20} />}
          valor={String(resumo.medalhasEntregues)}
          label="Medalhas entregues"
          chip="bg-rose-400/15 text-rose-300"
        />
      </div>

      {/* ---------------- PÓDIO ---------------- */}
      <div className="mb-6 flex items-center gap-2">
        <Crown size={18} style={{ color: cor.creme }} />
        <h2
          className="text-lg font-extrabold uppercase tracking-wide"
          style={{ color: cor.creme }}
        >
          Pódio de {mesReferencia}
        </h2>
      </div>

      <div className="mb-12 flex items-end gap-6">
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

      {/* ---------------- CLASSIFICAÇÃO GERAL ---------------- */}
      {demais.length > 0 && (
        <>
          <h2
            className="mb-4 text-lg font-extrabold uppercase tracking-wide"
            style={{ color: cor.creme }}
          >
            Classificação Geral
          </h2>

          <div className="mb-12 flex flex-col gap-3">
            {demais.map((morador, indice) => {
              const posicao = indice + 4
              const progressao = progressaoDoMorador(morador)
              const faltaParaSubir =
                ranking[posicao - 2].treinosMes - morador.treinosMes + 1

              return (
                <button
                  key={morador.id}
                  onClick={() => onAbrirPerfil(morador.id)}
                  className="group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition hover:brightness-125"
                  style={{
                    backgroundColor: cor.cartaoEscuro,
                    borderColor: cor.bordaEscura,
                  }}
                >
                  <span className="w-6 shrink-0 text-center text-lg font-extrabold text-[#8A97A8]">
                    {posicao}
                  </span>

                  <AvatarCirculo
                    nome={morador.nome}
                    classes="h-10 w-10 text-xs"
                    fundo="bg-[#22304A]"
                    texto="text-[#C9D3E2]"
                  />

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="truncate text-sm font-bold uppercase tracking-wide text-white">
                        {morador.nome} — {morador.apartamento}
                      </span>
                      <span className="rounded-full border border-[#31425F] px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#9FB0C6]">
                        Nv {progressao.nivel} · {progressao.patente}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#E08A4B]">
                        <Flame size={11} />
                        {morador.streakDias} dias
                      </span>
                    </span>

                    <span className="mt-2 block">
                      <Barra
                        porcentagem={(morador.treinosMes / maiorTotal) * 100}
                      />
                    </span>

                    <span className="mt-1.5 block text-[10px] uppercase tracking-widest text-[#6C7A90]">
                      Faltam{' '}
                      <span className="font-bold text-[#63D2C3]">
                        {faltaParaSubir}{' '}
                        {faltaParaSubir === 1 ? 'treino' : 'treinos'}
                      </span>{' '}
                      para subir de posição
                    </span>
                  </span>

                  <span className="shrink-0 text-right">
                    <span
                      className="block text-xl font-extrabold"
                      style={{ color: cor.dourado }}
                    >
                      {morador.treinosMes}
                    </span>
                    <span className="block text-[10px] uppercase tracking-widest text-[#6C7A90]">
                      treinos
                    </span>
                  </span>

                  <ChevronRight
                    size={20}
                    className="shrink-0 text-[#4B5B76] transition group-hover:text-[#E5C07B]"
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
          <Swords size={18} style={{ color: cor.creme }} />
          <h2
            className="text-lg font-extrabold uppercase tracking-wide"
            style={{ color: cor.creme }}
          >
            Desafios Ativos
          </h2>
        </div>
        {participando.length > 0 && (
          <span className="flex items-center gap-2 rounded-full bg-emerald-400/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">
            <Sparkles size={14} />
            {participando.length}{' '}
            {participando.length === 1 ? 'desafio aceito' : 'desafios aceitos'}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
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
              className={`flex flex-col rounded-[24px] p-6 transition ${
                inscrito
                  ? 'ring-2 ring-emerald-400'
                  : 'shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)]'
              }`}
              style={{ backgroundColor: cor.cartaoEscuro }}
            >
              {/* Criador */}
              <div className="mb-4 flex items-center gap-3">
                <AvatarCirculo
                  nome={criador?.nome ?? '?'}
                  classes="h-11 w-11 text-sm"
                  fundo="bg-[#1B2436]"
                  texto="text-[#E6EAF1]"
                />
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate text-base font-bold"
                    style={{ color: cor.creme }}
                  >
                    {criador
                      ? `${criador.nome} do ${criador.apartamento.replace(
                          'AP ',
                          ''
                        )}`
                      : 'Morador'}
                  </p>
                  <p
                    className="text-[10px] uppercase tracking-widest"
                    style={{ color: cor.tintaSuave }}
                  >
                    Criado {desafio.criadoEm} · {desafio.prazo}
                  </p>
                </div>
                {desafio.emAlta && (
                  <span className="flex shrink-0 items-center gap-1 rounded-lg bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                    <Flame size={11} />
                    Em alta
                  </span>
                )}
              </div>

              {/* Selos */}
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${
                    estiloDificuldade[desafio.dificuldade]
                  }`}
                >
                  {dificuldadeLabel[desafio.dificuldade]}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                  <Zap size={11} />+{desafio.recompensaXp} XP
                </span>
                <span className="flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-sky-700">
                  <Medal size={11} />
                  {desafio.recompensaMedalha}
                </span>
              </div>

              <h3
                className="mb-2 text-lg font-extrabold uppercase leading-tight"
                style={{ color: cor.creme }}
              >
                {desafio.titulo}
              </h3>
              <p
                className="mb-5 flex-1 text-sm leading-snug"
                style={{ color: cor.tintaSuave }}
              >
                {desafio.descricao}
              </p>

              {/* Meta coletiva */}
              <div className="mb-5">
                <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span
                    className="flex items-center gap-1.5"
                    style={{ color: cor.tintaSuave }}
                  >
                    <span className="h-2 w-2 rounded-full bg-[#5C93E8]" />
                    Meta da turma
                  </span>
                  <span style={{ color: cor.tinta }}>
                    {totalParticipantes}/{desafio.metaParticipantes}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#E4E0D8]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#F0C462] to-[#E0A33F] transition-all duration-500"
                    style={{ width: `${progressoMeta}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span
                  className="flex items-center gap-2 text-xs font-medium"
                  style={{ color: cor.tintaSuave }}
                >
                  <Users size={15} />
                  {totalParticipantes} participantes
                </span>
                <button
                  onClick={() => alternarParticipacao(desafio.id)}
                  aria-pressed={inscrito}
                  className={`flex items-center gap-2 rounded-xl border px-6 py-3 text-xs font-bold uppercase tracking-wide transition ${
                    inscrito
                      ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                      : 'border-[#DCD6CB] bg-white text-[#2F6FEC] hover:border-[#2F6FEC]'
                  }`}
                >
                  {inscrito ? <Sparkles size={15} /> : <Swords size={15} />}
                  {inscrito ? 'Participando' : 'Aceitar desafio'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
