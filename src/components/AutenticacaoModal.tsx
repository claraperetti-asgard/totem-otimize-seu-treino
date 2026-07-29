import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  LogIn,
  UserPlus,
  X,
} from 'lucide-react'

type Etapa = 'escolha' | 'login' | 'cadastro' | 'sucesso'

const objetivos = [
  'Perda de peso',
  'Ganho de massa',
  'Força bruta',
  'Resistência',
  'Saúde e bem-estar',
]

/** Campo de texto padrão do formulário. */
function Campo({
  id,
  label,
  tipo = 'text',
  valor,
  onChange,
  placeholder,
  obrigatorio = false,
  autoComplete,
}: {
  id: string
  label: string
  tipo?: string
  valor: string
  onChange: (valor: string) => void
  placeholder?: string
  obrigatorio?: boolean
  autoComplete?: string
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gray-400"
      >
        {label} {obrigatorio && '*'}
      </label>
      <input
        id={id}
        type={tipo}
        required={obrigatorio}
        value={valor}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#24334D] bg-[#101A2B] px-4 py-3 text-base text-white placeholder:text-gray-600 focus:border-[#FAF7F1] focus:outline-none"
      />
    </div>
  )
}

interface AutenticacaoModalProps {
  onFechar: () => void
}

export default function AutenticacaoModal({
  onFechar,
}: AutenticacaoModalProps) {
  const [etapa, setEtapa] = useState<Etapa>('escolha')
  const [erro, setErro] = useState('')

  // login
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  // cadastro
  const [nome, setNome] = useState('')
  const [apartamento, setApartamento] = useState('')
  const [emailCadastro, setEmailCadastro] = useState('')
  const [telefone, setTelefone] = useState('')
  const [objetivo, setObjetivo] = useState(objetivos[1])
  const [senhaCadastro, setSenhaCadastro] = useState('')
  const [confirmacao, setConfirmacao] = useState('')
  const [aceite, setAceite] = useState(false)

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

  function entrar(e: React.FormEvent) {
    e.preventDefault()
    // sem back-end ainda: nenhuma sessão é criada
    setErro('')
    setEtapa('sucesso')
  }

  function cadastrar(e: React.FormEvent) {
    e.preventDefault()
    if (senhaCadastro.length < 6) {
      setErro('A senha precisa ter pelo menos 6 caracteres.')
      return
    }
    if (senhaCadastro !== confirmacao) {
      setErro('As senhas não conferem.')
      return
    }
    if (!aceite) {
      setErro('É preciso aceitar o regulamento da academia.')
      return
    }
    setErro('')
    setEtapa('sucesso')
  }

  function voltarParaEscolha() {
    setErro('')
    setEtapa('escolha')
  }

  const largura = etapa === 'cadastro' ? 'max-w-2xl' : 'max-w-md'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Entrar ou criar conta"
      onClick={onFechar}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B121C]/85 px-10 py-10 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-h-full w-full ${largura} overflow-y-auto rounded-2xl border border-[#24334D] bg-[#16233A] p-8`}
      >
        {/* Cabeçalho */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {etapa !== 'escolha' && etapa !== 'sucesso' && (
              <button
                onClick={voltarParaEscolha}
                aria-label="Voltar"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#101A2B] text-[#FAF7F1] transition hover:brightness-125"
              >
                <ArrowLeft size={22} />
              </button>
            )}
            <div>
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-[#FAF7F1]">
                {etapa === 'login'
                  ? 'Entrar'
                  : etapa === 'cadastro'
                    ? 'Criar conta'
                    : etapa === 'sucesso'
                      ? 'Tudo certo'
                      : 'Acesse sua conta'}
              </h2>
              <p className="text-sm text-gray-400">
                {etapa === 'login'
                  ? 'Use o e-mail cadastrado na academia.'
                  : etapa === 'cadastro'
                    ? 'Leva menos de um minuto.'
                    : etapa === 'sucesso'
                      ? 'Seu acesso está quase pronto.'
                      : 'Salve seus treinos, medalhas e posição no ranking.'}
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

        {/* ---------------- ESCOLHA ---------------- */}
        {etapa === 'escolha' && (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setEtapa('login')}
              className="flex items-center gap-4 rounded-xl bg-[#FAF7F1] px-5 py-4 text-left text-black transition hover:brightness-110"
            >
              <LogIn size={24} />
              <span>
                <span className="block text-base font-extrabold uppercase tracking-wide">
                  Já tenho conta
                </span>
                <span className="text-xs font-bold uppercase tracking-wide text-black/60">
                  Entrar com e-mail e senha
                </span>
              </span>
            </button>

            <button
              onClick={() => setEtapa('cadastro')}
              className="flex items-center gap-4 rounded-xl border border-[#24334D] bg-[#1E2B44] px-5 py-4 text-left text-gray-200 transition hover:border-[#FAF7F1] hover:text-[#FAF7F1]"
            >
              <UserPlus size={24} />
              <span>
                <span className="block text-base font-extrabold uppercase tracking-wide">
                  Criar conta
                </span>
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Sou morador e quero me cadastrar
                </span>
              </span>
            </button>
          </div>
        )}

        {/* ---------------- LOGIN ---------------- */}
        {etapa === 'login' && (
          <form onSubmit={entrar}>
            <Campo
              id="email"
              label="E-mail"
              tipo="email"
              valor={email}
              onChange={setEmail}
              placeholder="voce@email.com"
              obrigatorio
              autoComplete="email"
            />
            <Campo
              id="senha"
              label="Senha"
              tipo="password"
              valor={senha}
              onChange={setSenha}
              placeholder="••••••••"
              obrigatorio
              autoComplete="current-password"
            />

        
            <button
              type="submit"
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FAF7F1] py-4 text-base font-extrabold uppercase tracking-wide text-black transition hover:brightness-110"
            >
              Entrar
              <LogIn size={18} />
            </button>
            <button
              type="button"
              onClick={() => setEtapa('cadastro')}
              className="w-full text-center text-xs font-bold uppercase tracking-widest text-gray-500 transition hover:text-[#FAF7F1]"
            >
              Não tenho conta — quero me cadastrar
            </button>
          </form>
        )}

        {/* ---------------- CADASTRO ---------------- */}
        {etapa === 'cadastro' && (
          <form onSubmit={cadastrar}>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="col-span-2">
                <Campo
                  id="nome"
                  label="Nome completo"
                  valor={nome}
                  onChange={setNome}
                  placeholder="Maria Souza"
                  obrigatorio
                  autoComplete="name"
                />
              </div>
              <Campo
                id="apartamento"
                label="Apartamento / bloco"
                valor={apartamento}
                onChange={setApartamento}
                placeholder="AP 201 — Bloco A"
                obrigatorio
              />
              <Campo
                id="telefone"
                label="Telefone"
                tipo="tel"
                valor={telefone}
                onChange={setTelefone}
                placeholder="(11) 99999-9999"
                autoComplete="tel"
              />
              <div className="col-span-2">
                <Campo
                  id="email-cadastro"
                  label="E-mail"
                  tipo="email"
                  valor={emailCadastro}
                  onChange={setEmailCadastro}
                  placeholder="voce@email.com"
                  obrigatorio
                  autoComplete="email"
                />
              </div>

              <div className="col-span-2 mb-4">
                <label
                  htmlFor="objetivo"
                  className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gray-400"
                >
                  Objetivo principal
                </label>
                <select
                  id="objetivo"
                  value={objetivo}
                  onChange={(e) => setObjetivo(e.target.value)}
                  className="w-full rounded-lg border border-[#24334D] bg-[#101A2B] px-4 py-3 text-base text-white focus:border-[#FAF7F1] focus:outline-none"
                >
                  {objetivos.map((opcao) => (
                    <option key={opcao} value={opcao}>
                      {opcao}
                    </option>
                  ))}
                </select>
              </div>

              <Campo
                id="senha-cadastro"
                label="Senha"
                tipo="password"
                valor={senhaCadastro}
                onChange={setSenhaCadastro}
                placeholder="Mínimo 6 caracteres"
                obrigatorio
                autoComplete="new-password"
              />
              <Campo
                id="confirmacao"
                label="Confirmar senha"
                tipo="password"
                valor={confirmacao}
                onChange={setConfirmacao}
                placeholder="Repita a senha"
                obrigatorio
                autoComplete="new-password"
              />
            </div>

            <label className="mb-5 flex cursor-pointer items-start gap-3 text-sm text-gray-400">
              <input
                type="checkbox"
                checked={aceite}
                onChange={(e) => setAceite(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#FAF7F1]"
              />
              Li e aceito o regulamento de uso da academia do condomínio.
            </label>

            {erro && (
              <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {erro}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={voltarParaEscolha}
                className="flex-1 rounded-xl border border-[#24334D] bg-[#1E2B44] py-4 text-base font-bold uppercase tracking-wide text-gray-300 transition hover:border-[#FAF7F1] hover:text-[#FAF7F1]"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-[#FAF7F1] py-4 text-base font-extrabold uppercase tracking-wide text-black transition hover:brightness-110"
              >
                Criar conta
                <UserPlus size={18} />
              </button>
            </div>
          </form>
        )}

        {/* ---------------- SUCESSO ---------------- */}
        {etapa === 'sucesso' && (
          <div className="text-center">
            <CheckCircle2 size={56} className="mx-auto mb-4 text-[#FAF7F1]" />
            <h3 className="mb-2 text-xl font-extrabold uppercase text-[#FAF7F1]">
              Formulário preenchido
            </h3>
            <p className="mb-8 text-sm text-gray-400">
              Com o login criado seus
              treinos concluídos, medalhas, XP e posição no ranking passam a ser
              salvos no seu perfil.
            </p>
            <button
              onClick={onFechar}
              className="w-full rounded-xl bg-[#FAF7F1] py-4 text-base font-extrabold uppercase tracking-wide text-black transition hover:brightness-110"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
