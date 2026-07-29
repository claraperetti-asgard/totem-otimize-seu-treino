import { useEffect, useState } from 'react'
import { CheckCircle2, Send, Wrench, X } from 'lucide-react'
import { equipamentos } from '../data/equipamentos'
import {
  abrirChamado,
  problemas,
  useEquipamentosEmManutencao,
  type ProblemaId,
} from '../data/manutencao'

interface ChamadoManutencaoModalProps {
  onFechar: () => void
}

export default function ChamadoManutencaoModal({
  onFechar,
}: ChamadoManutencaoModalProps) {
  const emManutencao = useEquipamentosEmManutencao()

  const [equipamentoId, setEquipamentoId] = useState('')
  const [problema, setProblema] = useState<ProblemaId>('nao-liga')
  const [descricao, setDescricao] = useState('')
  const [autor, setAutor] = useState('')
  const [enviado, setEnviado] = useState(false)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onFechar()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onFechar])

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (!equipamentoId) return
    // sem back-end ainda: o chamado fica no store e já marca o mapa
    abrirChamado({
      equipamentoId,
      problema,
      descricao: descricao.trim(),
      autor: autor.trim() || undefined,
    })
    setEnviado(true)
  }

  const equipamentoEscolhido = equipamentos.find((e) => e.id === equipamentoId)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Abrir chamado de manutenção"
      onClick={onFechar}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B121C]/85 px-10 py-10 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-full w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#24334D] bg-[#16233A] p-8"
      >
        {/* Cabeçalho */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF7F1] text-black">
              <Wrench size={22} />
            </span>
            <div>
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-[#FAF7F1]">
                Chamado de Manutenção
              </h2>
              <p className="text-sm text-gray-400">
                Avise a equipe sobre um equipamento com problema.
              </p>
            </div>
          </div>
          <button
            onClick={onFechar}
            aria-label="Fechar"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#101A2B] text-[#FAF7F1] transition hover:brightness-125"
          >
            <X size={24} />
          </button>
        </div>

        {enviado ? (
          <div className="text-center">
            <CheckCircle2 size={56} className="mx-auto mb-4 text-[#FAF7F1]" />
            <h3 className="mb-2 text-xl font-extrabold uppercase text-[#FAF7F1]">
              Chamado registrado
            </h3>
            <p className="mb-8 text-sm text-gray-400">
              {equipamentoEscolhido?.nome} já aparece como{' '}
              <span className="font-bold text-[#FAF7F1]">EM MANUTENÇÃO</span> no
              mapa da academia.
            </p>
            <button
              onClick={onFechar}
              className="w-full rounded-xl bg-[#FAF7F1] py-4 text-base font-extrabold uppercase tracking-wide text-black transition hover:brightness-110"
            >
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={enviar}>
            {/* Equipamento */}
            <label
              htmlFor="equipamento"
              className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gray-400"
            >
              Equipamento *
            </label>
            <select
              id="equipamento"
              required
              value={equipamentoId}
              onChange={(e) => setEquipamentoId(e.target.value)}
              className="mb-5 w-full rounded-lg border border-[#24334D] bg-[#101A2B] px-4 py-3 text-base text-white focus:border-[#FAF7F1] focus:outline-none"
            >
              <option value="">Selecione o equipamento</option>
              {equipamentos.map((equipamento) => (
                <option key={equipamento.id} value={equipamento.id}>
                  {equipamento.nome} · {equipamento.codigo} ·{' '}
                  {equipamento.localizacao.area}
                  {emManutencao.has(equipamento.id) ? ' (já em manutenção)' : ''}
                </option>
              ))}
            </select>

            {/* Problema */}
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gray-400">
              Qual o problema? *
            </span>
            <div className="mb-5 grid grid-cols-2 gap-2">
              {problemas.map((opcao) => {
                const selecionado = opcao.id === problema
                return (
                  <button
                    key={opcao.id}
                    type="button"
                    onClick={() => setProblema(opcao.id)}
                    aria-pressed={selecionado}
                    className={`rounded-lg border px-4 py-3 text-left text-sm font-bold transition ${
                      selecionado
                        ? 'border-[#FAF7F1] bg-[#1E2B44] text-[#FAF7F1]'
                        : 'border-[#24334D] bg-[#101A2B] text-gray-300 hover:border-[#FAF7F1]/50'
                    }`}
                  >
                    {opcao.label}
                  </button>
                )
              })}
            </div>

            {/* Descrição */}
            <label
              htmlFor="descricao"
              className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gray-400"
            >
              Descreva o que aconteceu
            </label>
            <textarea
              id="descricao"
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex.: o cabo da polia esquerda está escapando do trilho durante o movimento."
              className="mb-5 w-full resize-none rounded-lg border border-[#24334D] bg-[#101A2B] px-4 py-3 text-base text-white placeholder:text-gray-600 focus:border-[#FAF7F1] focus:outline-none"
            />

            {/* Autor */}
            <label
              htmlFor="autor"
              className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gray-400"
            >
              Seu nome e apartamento (opcional)
            </label>
            <input
              id="autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              placeholder="Ex.: Maria — AP 201"
              className="mb-6 w-full rounded-lg border border-[#24334D] bg-[#101A2B] px-4 py-3 text-base text-white placeholder:text-gray-600 focus:border-[#FAF7F1] focus:outline-none"
            />

            <p className="mb-6 text-xs text-gray-500">
              O chamado ainda não é enviado para nenhum sistema — por enquanto
              ele só marca o equipamento como em manutenção no mapa.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onFechar}
                className="flex-1 rounded-xl border border-[#24334D] bg-[#1E2B44] py-4 text-base font-bold uppercase tracking-wide text-gray-300 transition hover:border-[#FAF7F1] hover:text-[#FAF7F1]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!equipamentoId}
                className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-[#FAF7F1] py-4 text-base font-extrabold uppercase tracking-wide text-black transition hover:brightness-110 disabled:opacity-40"
              >
                Abrir chamado
                <Send size={18} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
