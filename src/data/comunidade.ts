// ============================================================
// COMUNIDADE DO CONDOMÍNIO
// Moradores, ranking de treinos, medalhas e desafios.
// Fonte única das telas Desafios e Perfil do Morador.
// ============================================================

export type NivelMedalha = 'ouro' | 'prata' | 'bronze'

/** Ícone da medalha — o componente traduz para o desenho. */
export type IconeMedalha = 'trofeu' | 'halter' | 'alvo' | 'raio' | 'chama'

export interface Medalha {
  id: string
  nome: string
  descricao: string
  nivel: NivelMedalha
  icone: IconeMedalha
}

export interface Morador {
  id: string
  nome: string
  apartamento: string
  /** treinos concluídos no mês — base do ranking */
  treinosMes: number
  /** treinos concluídos na semana corrente */
  treinosSemana: number
  metaSemanal: number
  /** dias consecutivos treinando */
  streakDias: number
  /** carga total levantada na semana, em kg */
  cargaTotalKg: number
  /** evolução da carga em relação à semana anterior, em % */
  evolucaoSemanalPct: number
  medalhas: Medalha[]
}

export interface Desafio {
  id: string
  criadorId: string
  titulo: string
  descricao: string
  participantes: number
  /** destaque "em alta" na lista */
  emAlta?: boolean
  /** texto livre: "há 2 horas", "ontem" */
  criadoEm: string
}

/** Mês de referência do ranking. */
export const mesReferencia = 'Agosto'

export const moradores: Morador[] = [
  {
    id: 'maria-201',
    nome: 'Maria',
    apartamento: 'AP 201',
    treinosMes: 28,
    treinosSemana: 5,
    metaSemanal: 7,
    streakDias: 12,
    cargaTotalKg: 2400,
    evolucaoSemanalPct: 12,
    medalhas: [
      {
        id: 'guerreira-semanal',
        nome: 'Guerreira Semanal',
        descricao: '7 dias consecutivos',
        nivel: 'ouro',
        icone: 'trofeu',
      },
      {
        id: 'mestre-do-braco',
        nome: 'Mestre do Braço',
        descricao: '50 treinos de membro superior',
        nivel: 'prata',
        icone: 'halter',
      },
      {
        id: 'foco-absoluto',
        nome: 'Foco Absoluto',
        descricao: 'Sessões de 60min+',
        nivel: 'bronze',
        icone: 'alvo',
      },
      {
        id: 'elite-grand',
        nome: 'Elite Grand',
        descricao: 'Top 1% do ranking',
        nivel: 'ouro',
        icone: 'raio',
      },
    ],
  },
  {
    id: 'ricardo-1402',
    nome: 'Ricardo',
    apartamento: 'AP 1402',
    treinosMes: 26,
    treinosSemana: 4,
    metaSemanal: 5,
    streakDias: 8,
    cargaTotalKg: 3100,
    evolucaoSemanalPct: 7,
    medalhas: [
      {
        id: 'clube-100kg',
        nome: 'Clube dos 100kg',
        descricao: 'Supino com 100kg',
        nivel: 'ouro',
        icone: 'halter',
      },
      {
        id: 'constancia',
        nome: 'Constância',
        descricao: '30 dias sem faltar',
        nivel: 'prata',
        icone: 'chama',
      },
    ],
  },
  {
    id: 'helena-54',
    nome: 'Helena',
    apartamento: 'AP 54',
    treinosMes: 22,
    treinosSemana: 3,
    metaSemanal: 4,
    streakDias: 5,
    cargaTotalKg: 1500,
    evolucaoSemanalPct: 18,
    medalhas: [
      {
        id: 'cardio-queen',
        nome: 'Rainha do Cardio',
        descricao: '100 km na esteira',
        nivel: 'ouro',
        icone: 'chama',
      },
      {
        id: 'madrugadora',
        nome: 'Madrugadora',
        descricao: '20 treinos antes das 7h',
        nivel: 'bronze',
        icone: 'alvo',
      },
    ],
  },
  {
    id: 'joao-paulo-112',
    nome: 'João Paulo',
    apartamento: 'AP 112',
    treinosMes: 19,
    treinosSemana: 3,
    metaSemanal: 5,
    streakDias: 4,
    cargaTotalKg: 2050,
    evolucaoSemanalPct: -3,
    medalhas: [
      {
        id: 'pernas-de-aco',
        nome: 'Pernas de Aço',
        descricao: '40 treinos de perna',
        nivel: 'prata',
        icone: 'raio',
      },
    ],
  },
  {
    id: 'carolina-305',
    nome: 'Carolina',
    apartamento: 'AP 305',
    treinosMes: 18,
    treinosSemana: 2,
    metaSemanal: 4,
    streakDias: 3,
    cargaTotalKg: 1200,
    evolucaoSemanalPct: 5,
    medalhas: [
      {
        id: 'primeiro-mes',
        nome: 'Primeiro Mês',
        descricao: 'Completou o mês inicial',
        nivel: 'bronze',
        icone: 'trofeu',
      },
    ],
  },
  {
    id: 'bruno-808',
    nome: 'Bruno',
    apartamento: 'AP 808',
    treinosMes: 15,
    treinosSemana: 2,
    metaSemanal: 3,
    streakDias: 2,
    cargaTotalKg: 1750,
    evolucaoSemanalPct: 9,
    medalhas: [],
  },
]

export const desafios: Desafio[] = [
  {
    id: 'treinar-5x',
    criadorId: 'maria-201',
    titulo: 'Treinar 5x na semana',
    descricao:
      'Foco total na constância. Vamos fechar o mês com 20 treinos mínimos.',
    participantes: 12,
    emAlta: true,
    criadoEm: 'há 2 horas',
  },
  {
    id: 'clube-100kg',
    criadorId: 'ricardo-1402',
    titulo: 'Clube dos 100kg (supino)',
    descricao:
      'Para quem quer bater o recorde pessoal de força no peito esta semana.',
    participantes: 8,
    criadoEm: 'ontem',
  },
  {
    id: '10-treinos-braco',
    criadorId: 'joao-paulo-112',
    titulo: 'Concluir 10 treinos de braço',
    descricao:
      'Bíceps, tríceps e antebraço. Vale qualquer treino que passe pela multiestação.',
    participantes: 6,
    criadoEm: 'há 3 dias',
  },
  {
    id: 'cardio-100km',
    criadorId: 'helena-54',
    titulo: '100 km na esteira',
    descricao:
      'Some a quilometragem de todas as sessões até o fim do mês. Caminhada conta.',
    participantes: 15,
    emAlta: true,
    criadoEm: 'há 5 dias',
  },
  {
    id: 'madrugada',
    criadorId: 'carolina-305',
    titulo: 'Treinar antes das 7h',
    descricao: 'Dez treinos matinais para começar o dia com energia.',
    participantes: 4,
    criadoEm: 'há 1 semana',
  },
]

/** Moradores ordenados por treinos no mês — base do ranking. */
export const ranking: Morador[] = [...moradores].sort(
  (a, b) => b.treinosMes - a.treinosMes
)

const moradorPorId = new Map(moradores.map((m) => [m.id, m]))

export function buscarMorador(id: string): Morador | undefined {
  return moradorPorId.get(id)
}

/** Iniciais para o avatar, já que ainda não há foto dos moradores. */
export function iniciais(nome: string): string {
  return nome
    .split(' ')
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase() ?? '')
    .join('')
}

/** Posição do morador no ranking (1 = primeiro). */
export function posicaoNoRanking(id: string): number {
  return ranking.findIndex((m) => m.id === id) + 1
}
