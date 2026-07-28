import { useState } from 'react'
import {
  ArrowLeft,
  Flame,
  Dumbbell,
  Zap,
  Timer,
  Clock,
  PlayCircle,
} from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import EquipamentoModal from '../components/EquipamentoModal'
import ImagemComFallback from '../components/ImagemComFallback'
import { urlDoTreino } from '../data/treinos'
import homemImg from '../assets/homem.png'
import mulherImg from '../assets/mulher.png'
import treinoImg from '../assets/treino.png'
import { categoriaLabel } from '../data/equipamentos'
 import {
  nivelStyles,
  objetivoLabel,
  resolverExercicios,
  treinos,
  type ExercicioResolvido,
  type Objetivo,
  type Treino,
} from '../data/treinos'

type Genero = 'homem' | 'mulher'
type Step = 1 | 2 | 3


const generos: {
  id: Genero
  label: string
  imagem: string
  /** ponto da foto que fica visível no recorte (object-position) */
  foco: string
}[] = [
  { id: 'homem', label: 'Homem', imagem: homemImg, foco: 'center 60%' },
  { id: 'mulher', label: 'Mulher', imagem: mulherImg, foco: 'center 20%' },
]

const objetivos: { id: Objetivo; label: string; icon: React.ReactNode }[] = [
  { id: 'perda-peso', label: 'Perda de Peso', icon: <Flame size={20} /> },
  { id: 'ganho-massa', label: 'Ganho de Massa', icon: <Dumbbell size={20} /> },
  { id: 'forca-bruta', label: 'Força Bruta', icon: <Zap size={20} /> },
  { id: 'resistencia', label: 'Resistência', icon: <Timer size={20} /> },
]

/** Junta o item do treino com o modelo do catálogo e a unidade instalada. */

// ============================================================
// COMPONENTE ÚNICO
// ============================================================

interface SuggestWorkOutProps {
  onExit: () => void
}

export default function SuggestWorkOut({ onExit }: SuggestWorkOutProps) {
  const [step, setStep] = useState<Step>(1)
  const [genero, setGenero] = useState<Genero | null>(null)
  const [objetivoSelecionado, setObjetivoSelecionado] =
    useState<Objetivo>('ganho-massa')
  const [treinoSelecionado, setTreinoSelecionado] = useState<Treino | null>(
    null
  )
  const [exercicioTutorial, setExercicioTutorial] =
    useState<ExercicioResolvido | null>(null)

  const treinosFiltrados = treinos.filter(
    (t) => t.objetivo === objetivoSelecionado
  )
  const exercicios = resolverExercicios(treinoSelecionado)

  function handleVoltar() {
    if (step === 1) {
      onExit()
      return
    }
    setStep((prev) => (prev - 1) as Step)
  }


  return (
    <div className="w-full flex-1 bg-[#212120] px-16 pb-10 pt-10 text-white">
      {/* Header comum a todos os passos */}
      <header className="mb-8 flex items-center gap-4">
        <button
          onClick={handleVoltar}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#141414] text-[#BF9655]"
        >
          <ArrowLeft size={24} />
        </button>
        {step === 1 ? (
          <h1 className="text-3xl font-extrabold uppercase tracking-wide text-[#BF9655]">
            Sugestão de Treino
          </h1>
        ) : (
          <p className="text-sm font-bold uppercase tracking-widest text-[#BF9655]">
            Passo {step} de 3
          </p>
        )}
      </header>

      {/* ---------------- PASSO 1: GÊNERO ---------------- */}
      {step === 1 && (
        <>
          <p className="mb-2 text-center text-sm font-bold uppercase tracking-widest text-[#BF9655]">
            Passo 1 de 3
          </p>
          <h2 className="mb-2 text-center text-4xl font-extrabold uppercase text-white">
            Selecione seu Gênero
          </h2>
          <p className="mx-auto mb-10 max-w-md text-center text-base text-gray-400">
            Personalizamos sua experiência de treino com base na sua
            biologia para garantir performance máxima.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {generos.map((opcao) => {
              const selecionado = genero === opcao.id
              return (
                <button
                  key={opcao.id}
                  onClick={() => {
                    setGenero(opcao.id)
                    setStep(2)
                  }}
                  className={`group relative overflow-hidden rounded-2xl border bg-[#141414] transition ${
                    selecionado
                      ? 'border-[#BF9655]'
                      : 'border-white/10 hover:border-[#BF9655]'
                  }`}
                >
                  <img
                    src={opcao.imagem}
                    alt={opcao.label}
                    // o recorte parte do topo da foto — ajuste `foco` por imagem
                    style={{ objectPosition: opcao.foco }}
                    className="h-96 w-full origin-top object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <span
                    className={`absolute inset-x-0 bottom-6 text-center text-xl font-bold uppercase tracking-wide transition ${
                      selecionado
                        ? 'text-[#BF9655]'
                        : 'text-white group-hover:text-[#BF9655]'
                    }`}
                  >
                    {opcao.label}
                  </span>
                </button>
              )
            })}
          </div>
        </>
      )}

      {/* ---------------- PASSO 2: OBJETIVO ---------------- */}
      {step === 2 && (
        <>
          <h2 className="mb-6 text-3xl font-extrabold uppercase text-[#BF9655]">
            Qual seu Objetivo?
          </h2>

          <div className="mb-8 grid grid-cols-2 gap-4">
            {objetivos.map((obj) => {
              const selecionado = obj.id === objetivoSelecionado
              return (
                <button
                  key={obj.id}
                  onClick={() => setObjetivoSelecionado(obj.id)}
                  className={`flex items-center gap-3 rounded-xl border bg-[#141414] px-5 py-4 text-sm font-bold uppercase tracking-wide transition ${
                    selecionado
                      ? 'border-[#BF9655] text-[#BF9655]'
                      : 'border-white/10 text-white'
                  }`}
                >
                  {obj.icon}
                  {obj.label}
                </button>
              )
            })}
          </div>

          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
            Filtrado por: {objetivoLabel[objetivoSelecionado]}
          </p>

          <div className="grid grid-cols-2 gap-5">
            {treinosFiltrados.map((treino) => (
              <div
                key={treino.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#141414]"
              >
                <div className="relative">
                  <img
                    // `imagem` fica opcional: sem foto própria, usa a padrão
                    src={treino.imagem ?? treinoImg}
                    alt={treino.nome}
                    className="h-32 w-full object-cover object-top"
                  />
                  <span
                    className={`absolute left-2 top-2 rounded px-2 py-1 text-[10px] font-bold uppercase ${
                      nivelStyles[treino.nivel]
                    }`}
                  >
                    {treino.nivel}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-lg font-extrabold uppercase text-[#BF9655]">
                    {treino.nome}
                  </h3>
                  <div className="mb-4 flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {treino.duracaoMin} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Dumbbell size={14} />
                      {treino.exercicios.length} exercícios
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setTreinoSelecionado(treino)
                      setStep(3)
                    }}
                    className="w-full rounded-lg bg-[#BF9655] py-2.5 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-110"
                  >
                    Ver Mais
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ---------------- PASSO 3: TREINO ---------------- */}
      {step === 3 && treinoSelecionado && (
        <>
          <div className="mb-8 rounded-2xl border border-white/10 bg-[#141414] p-6">
            <span className="mb-3 inline-block rounded bg-[#BF9655] px-3 py-1 text-xs font-bold uppercase text-black">
              Level: {treinoSelecionado.nivelDificuldade}
            </span>

            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <h1 className="mb-2 text-3xl font-extrabold uppercase text-[#BF9655]">
                  {treinoSelecionado.nome}
                </h1>
                <p className="mb-3 text-sm leading-relaxed text-gray-400">
                  {treinoSelecionado.descricao}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {treinoSelecionado.duracaoMin} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Dumbbell size={14} />
                    {exercicios.length} exercícios
                  </span>
                </div>
              </div>

              {/* QR do treino: abre a tela de execução no celular */}
              <div className="flex w-40 flex-col items-center gap-2 rounded-lg bg-white p-3 text-black">
                <QRCodeSVG
                  value={urlDoTreino(treinoSelecionado.id)}
                  size={128}
                  // nível M sobra correção de erro para leitura em tela
                  level="M"
                  marginSize={1}
                  title={`Treino ${treinoSelecionado.nome}`}
                />
                <span className="text-center text-[10px] font-bold uppercase">
                  Acesse pelo Celular
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-5">
            {exercicios.map((ex) => (
              <div
                key={ex.chave}
                className="flex flex-col rounded-xl border border-white/10 bg-[#141414] p-4"
              >
                <ImagemComFallback
                  src={ex.modelo.imagemMaquina}
                  alt={ex.modelo.nome}
                  className="h-32 w-full rounded-xl"
                  ajuste="contain"
                />
                <h3 className="mb-1 mt-4 text-lg font-extrabold uppercase leading-tight text-[#BF9655]">
                  {ex.exercicio}
                </h3>
                <p className="mb-2 text-xs uppercase tracking-widest text-gray-500">
                  {ex.modelo.nome}
                </p>
                <p className="mb-1 text-sm text-gray-300">{ex.series}</p>
                <p className="mb-4 flex-1 text-sm text-gray-400">
                  Descanso: {ex.descanso}
                </p>
                <button
                  onClick={() => setExercicioTutorial(ex)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#BF9655] py-2.5 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-110"
                >
                  Tutorial
                  <PlayCircle size={16} />
                </button>
              </div>
            ))}
          </div>

        </>
      )}

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
