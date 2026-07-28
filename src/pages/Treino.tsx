import { useEffect, useMemo, useState } from 'react'
import {
  Check,
  Clock,
  Dumbbell,
  Pause,
  Play,
  PlayCircle,
  RotateCcw,
} from 'lucide-react'
import EquipamentoModal from '../components/EquipamentoModal'
import ImagemComFallback from '../components/ImagemComFallback'
import { categoriaLabel } from '../data/equipamentos'
import {
  buscarTreino,
  resolverExercicios,
  type ExercicioResolvido,
} from '../data/treinos'

function interpretarAlvo(texto: string): number | null {
  const limpo = texto.trim().toLowerCase()
  if (!limpo) return null

  // formatos com dois-pontos: mm:ss ou hh:mm:ss
  if (limpo.includes(':')) {
    const partes = limpo.split(':').map((p) => Number(p))
    if (partes.some((n) => Number.isNaN(n))) return null
    const [a, b, c] = partes
    if (partes.length === 2) return a * 60 + b
    if (partes.length === 3) return a * 3600 + b * 60 + c
    return null
  }

  // formatos com unidade: 1h 20m, 50min, 45m, 30s
  const trechos = [...limpo.matchAll(/(\d+(?:[.,]\d+)?)\s*(h|min|m|s)?/g)]
  let total = 0
  let encontrou = false
  for (const [, valor, unidade] of trechos) {
    const numero = Number(valor.replace(',', '.'))
    if (Number.isNaN(numero)) continue
    encontrou = true
    if (unidade === 'h') total += numero * 3600
    else if (unidade === 's') total += numero
    // sem unidade, "m" ou "min" => minutos
    else total += numero * 60
  }
  return encontrou ? Math.round(total) : null
}

/**
 * Separa "4 x 12 reps" em séries e repetições para as linhas do card.
 * Também entende "1 série de 8min" e "3 x máximo".
 */
function dividirSeries(texto: string): { series: string; repeticoes: string } {
  const porX = texto.match(/^\s*(\d+)\s*x\s*(.+)$/i)
  if (porX) return { series: porX[1], repeticoes: porX[2].trim() }

  const porExtenso = texto.match(/^\s*(\d+)\s*séries?\s*de\s*(.+)$/i)
  if (porExtenso)
    return { series: porExtenso[1], repeticoes: porExtenso[2].trim() }

  return { series: '1', repeticoes: texto }
}

/** Linha rotulada dos cards de exercício (SÉRIES, REPETIÇÕES, DESCANSO). */
function LinhaInfo({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="rounded-lg bg-[#1f1f1f] px-4 py-2.5">
      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
        {label}
      </p>
      <p className="text-base font-bold text-white">{valor}</p>
    </div>
  )
}

/** Segundos em mm:ss (ou hh:mm:ss a partir de uma hora). */
function formatarTempo(segundos: number): string {
  const seguro = Math.max(0, Math.floor(segundos))
  const h = Math.floor(seguro / 3600)
  const m = Math.floor((seguro % 3600) / 60)
  const s = seguro % 60
  const dd = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${dd(h)}:${dd(m)}:${dd(s)}` : `${dd(m)}:${dd(s)}`
}

function BarraProgresso({ porcentagem }: { porcentagem: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-[#BF9655] transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, porcentagem))}%` }}
      />
    </div>
  )
}

interface TreinoPageProps {
  /** id do treino no catálogo */
  treinoId?: string
}

// Tela do celular: sem cabeçalho, rodapé ou botão de voltar — ela é um
// destino final, aberto pelo QR code do totem.
export default function TreinoPage({ treinoId }: TreinoPageProps) {
  const treino = treinoId ? buscarTreino(treinoId) : undefined
  const exercicios = useMemo(() => resolverExercicios(treino), [treino])

  const [segundos, setSegundos] = useState(0)
  const [rodando, setRodando] = useState(false)
  const [alvo, setAlvo] = useState('')
  const [concluidos, setConcluidos] = useState<string[]>([])
  const [exercicioTutorial, setExercicioTutorial] =
    useState<ExercicioResolvido | null>(null)

  // cronômetro
  useEffect(() => {
    if (!rodando) return
    const id = setInterval(() => setSegundos((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [rodando])

  if (!treino) {
    return (
      <div className="min-h-screen w-full bg-[#212120] px-5 pb-10 pt-8 text-white">
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-10 text-center text-gray-400">
          Treino não encontrado. Escaneie o QR code do totem para abrir o seu
          treino.
        </div>
      </div>
    )
  }

  // sem alvo digitado, usa a duração prevista do treino
  const alvoSegundos = interpretarAlvo(alvo) ?? treino.duracaoMin * 60
  const restante = Math.max(0, alvoSegundos - segundos)
  const progressoTempo = alvoSegundos ? (segundos / alvoSegundos) * 100 : 0
  const progressoExercicios = exercicios.length
    ? (concluidos.length / exercicios.length) * 100
    : 0

  function alternarConcluido(chave: string) {
    setConcluidos((atuais) =>
      atuais.includes(chave)
        ? atuais.filter((c) => c !== chave)
        : [...atuais, chave]
    )
  }

  function resetarProgresso() {
    setConcluidos([])
    setSegundos(0)
    setRodando(false)
  }

  return (
    <div className="min-h-screen w-full bg-[#212120] px-5 pb-10 pt-8 text-white">
      {/* ---------------- CABEÇALHO ---------------- */}
      <header className="mb-6 flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <span className="mb-2 inline-block rounded bg-[#BF9655] px-3 py-1 text-[10px] font-bold uppercase text-black">
            Level: {treino.nivelDificuldade}
          </span>
          <h1 className="text-3xl font-extrabold uppercase leading-tight text-[#BF9655]">
            {treino.nome}
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {treino.duracaoMin} min
            </span>
            <span className="flex items-center gap-1">
              <Dumbbell size={14} />
              {exercicios.length} exercícios
            </span>
          </div>
        </div>

        <button
          onClick={resetarProgresso}
          className="shrink-0 rounded-lg border border-white/10 bg-[#141414] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-300 transition hover:border-[#BF9655] hover:text-[#BF9655]"
        >
          Resetar progresso
        </button>
      </header>

      <p className="mb-6 text-sm leading-relaxed text-gray-400">
        {treino.descricao}
      </p>

      {/* ---------------- TEMPO DE TREINO ---------------- */}
      <section className="mb-6 rounded-2xl border border-white/10 bg-[#141414] p-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">
          Tempo de treino
        </p>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="text-5xl font-extrabold tabular-nums tracking-tight text-white">
            {formatarTempo(segundos)}
          </span>
          <span className="text-sm text-gray-400">
            (restante: {formatarTempo(restante)})
          </span>

          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setRodando((r) => !r)}
              className="flex items-center gap-2 rounded-lg bg-[#BF9655] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-110"
            >
              {rodando ? <Pause size={16} /> : <Play size={16} />}
              {rodando ? 'Pausar' : 'Iniciar'}
            </button>
            <button
              onClick={() => {
                setSegundos(0)
                setRodando(false)
              }}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#1f1f1f] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-gray-300 transition hover:border-[#BF9655] hover:text-[#BF9655]"
            >
              <RotateCcw size={16} />
              Resetar
            </button>
          </div>
        </div>

        <label
          htmlFor="alvo"
          className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gray-400"
        >
          Alvo (ex.: 50min, 1h 20m, 01:15:00, 45m, 90)
        </label>
        <input
          id="alvo"
          value={alvo}
          onChange={(e) => setAlvo(e.target.value)}
          placeholder={`${treino.duracaoMin}min`}
          className="w-full rounded-lg border border-white/10 bg-[#0D0D0D] px-4 py-3 text-base text-white placeholder:text-gray-600 focus:border-[#BF9655] focus:outline-none"
        />
        <p className="mb-4 mt-2 text-xs text-gray-500">
          Se preencher, o temporizador mostra a contagem regressiva e o
          progresso.
        </p>

        <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-widest">
          <span className="text-gray-400">Progresso do tempo</span>
          <span className="text-[#BF9655]">{Math.round(progressoTempo)}%</span>
        </div>
        <BarraProgresso porcentagem={progressoTempo} />
      </section>

      {/* ---------------- PROGRESSO DOS EXERCÍCIOS ---------------- */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-extrabold uppercase tracking-wide text-white">
          Progresso
        </h2>
        <span className="text-lg font-extrabold text-[#BF9655]">
          {Math.round(progressoExercicios)}%
        </span>
      </div>
      <div className="mb-6">
        <BarraProgresso porcentagem={progressoExercicios} />
      </div>

      {/* ---------------- EXERCÍCIOS ---------------- */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {exercicios.map((ex) => {
          const concluido = concluidos.includes(ex.chave)
          const { series, repeticoes } = dividirSeries(ex.series)
          return (
            <div
              key={ex.chave}
              className={`flex flex-col overflow-hidden rounded-2xl border bg-[#141414] transition ${
                concluido ? 'border-[#BF9655]' : 'border-white/10'
              }`}
            >
              {/* Foto do equipamento com a etiqueta do modelo */}
              <div className="relative">
                <ImagemComFallback
                  src={ex.modelo.imagemMaquina}
                  alt={ex.modelo.nome}
                  className="h-56 w-full rounded-none border-0"
                  ajuste="contain"
                />
                <span className="absolute left-3 top-3 rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-bold text-black shadow-sm">
                  {ex.modelo.nome}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                {/* Nome + Concluir, lado a lado */}
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-extrabold uppercase leading-tight text-white">
                    {ex.exercicio}
                  </h3>
                  <button
                    onClick={() => alternarConcluido(ex.chave)}
                    aria-pressed={concluido}
                    className={`flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold transition ${
                      concluido
                        ? 'border-[#BF9655] bg-[#BF9655] text-black'
                        : 'border-white/10 bg-[#1f1f1f] text-gray-200 hover:border-[#BF9655] hover:text-[#BF9655]'
                    }`}
                  >
                    {concluido && <Check size={16} />}
                    {concluido ? 'Concluído' : 'Concluir'}
                  </button>
                </div>

                <div className="mb-4 flex flex-col gap-2">
                  <LinhaInfo label="Séries" valor={series} />
                  <LinhaInfo label="Repetições" valor={repeticoes} />
                  <LinhaInfo label="Descanso" valor={ex.descanso} />
                </div>

                <button
                  onClick={() => setExercicioTutorial(ex)}
                  className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-[#BF9655] py-2.5 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-110"
                >
                  Tutorial
                  <PlayCircle size={16} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ---------------- MODAL DE TUTORIAL ---------------- */}
      {exercicioTutorial && (
        <EquipamentoModal
          equipamento={{
            nome: exercicioTutorial.exercicio,
            subtitulo: `${exercicioTutorial.modelo.nome} · ${exercicioTutorial.series} · Descanso: ${exercicioTutorial.descanso}`,
            descricao: exercicioTutorial.modelo.descricao,
            imagemMaquina: exercicioTutorial.modelo.imagemMaquina,
            imagemExecucao: exercicioTutorial.modelo.imagemExecucao,
            tags: exercicioTutorial.modelo.categorias.map(categoriaLabel),
            localizacao: exercicioTutorial.localizacao,
          }}
          onFechar={() => setExercicioTutorial(null)}
        />
      )}
    </div>
  )
}
