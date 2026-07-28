import { useState } from 'react'
import { ArrowLeft, ChevronRight, Flame, Trophy, Users } from 'lucide-react'
import Avatar from '../components/Avatar'
import {
  buscarMorador,
  desafios,
  mesReferencia,
  ranking,
} from '../data/comunidade'

interface DesafiosProps {
  onExit: () => void
  onAbrirPerfil: (moradorId: string) => void
}

export default function Desafios({ onExit, onAbrirPerfil }: DesafiosProps) {
  // participação é local por enquanto — vira chamada de API depois
  const [participando, setParticipando] = useState<string[]>([])

  const maiorTotal = ranking[0]?.treinosMes ?? 1

  function alternarParticipacao(id: string) {
    setParticipando((atuais) =>
      atuais.includes(id) ? atuais.filter((d) => d !== id) : [...atuais, id]
    )
  }

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
          Desafios da Comunidade
        </h1>
      </header>

      {/* ---------------- RANKING ---------------- */}
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-lg font-extrabold uppercase tracking-wide text-[#BF9655]">
          Ranking de Moradores
        </h2>
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
          Mês de {mesReferencia}
        </span>
      </div>

      <div className="mb-10 flex flex-col gap-3">
        {ranking.map((morador, indice) => {
          const lider = indice === 0
          const largura = (morador.treinosMes / maiorTotal) * 100
          return (
            <button
              key={morador.id}
              onClick={() => onAbrirPerfil(morador.id)}
              className={`group flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                lider
                  ? 'border-[#BF9655] bg-[#1a1712]'
                  : 'border-white/10 bg-[#141414] hover:border-[#BF9655]/50'
              }`}
            >
              <span
                className={`w-6 shrink-0 text-center text-lg font-extrabold ${
                  lider ? 'text-[#BF9655]' : 'text-gray-500'
                }`}
              >
                {indice + 1}
              </span>

              <Avatar nome={morador.nome} destacado={lider} />

              <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-2">
                  <span className="truncate text-sm font-bold uppercase tracking-wide text-white">
                    {morador.nome} — {morador.apartamento}
                  </span>
                  {lider && (
                    <span className="flex shrink-0 items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#BF9655]">
                      <Trophy size={12} />
                      Treinador do mês
                    </span>
                  )}
                </span>

                {/* barra de progresso relativa ao líder */}
                <span className="mt-2 block h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <span
                    className={`block h-full rounded-full transition-all duration-500 ${
                      lider ? 'bg-[#BF9655]' : 'bg-[#BF9655]/50'
                    }`}
                    style={{ width: `${largura}%` }}
                  />
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

      {/* ---------------- DESAFIOS ATIVOS ---------------- */}
      <h2 className="mb-4 text-lg font-extrabold uppercase tracking-wide text-[#BF9655]">
        Desafios Ativos
      </h2>

      <div className="grid grid-cols-2 gap-5">
        {desafios.map((desafio) => {
          const criador = buscarMorador(desafio.criadorId)
          const inscrito = participando.includes(desafio.id)
          return (
            <div
              key={desafio.id}
              className={`flex flex-col rounded-xl border bg-[#141414] p-5 transition ${
                inscrito ? 'border-[#BF9655]' : 'border-white/10'
              }`}
            >
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
                    Criado {desafio.criadoEm}
                  </p>
                </div>
                {desafio.emAlta && (
                  <span className="flex shrink-0 items-center gap-1 rounded bg-[#BF9655] px-2 py-1 text-[10px] font-bold uppercase text-black">
                    <Flame size={12} />
                    Em alta
                  </span>
                )}
              </div>

              <h3 className="mb-2 text-base font-extrabold uppercase leading-tight text-[#BF9655]">
                {desafio.titulo}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-snug text-gray-400">
                {desafio.descricao}
              </p>

              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-xs text-gray-400">
                  <Users size={16} />
                  {String(desafio.participantes + (inscrito ? 1 : 0)).padStart(
                    2,
                    '0'
                  )}{' '}
                  participantes
                </span>
                <button
                  onClick={() => alternarParticipacao(desafio.id)}
                  aria-pressed={inscrito}
                  className={`rounded-lg px-6 py-2.5 text-sm font-bold uppercase tracking-wide transition ${
                    inscrito
                      ? 'border border-[#BF9655] text-[#BF9655] hover:brightness-125'
                      : 'bg-[#BF9655] text-black hover:brightness-110'
                  }`}
                >
                  {inscrito ? 'Participando' : 'Entrar'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
