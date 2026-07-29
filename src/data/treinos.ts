// ============================================================
// CATÁLOGO DE TREINOS
// Fonte única usada pela Sugestão de Treino (totem) e pela
// tela Treino (celular, aberta pelo QR code).
// ============================================================

import { buscarModelo, unidadesDoModelo } from './equipamentos'

export type Objetivo =
  | 'perda-peso'
  | 'ganho-massa'
  | 'forca-bruta'
  | 'resistencia'
export type Nivel = 'GOLD LEVEL' | 'SILVER LEVEL' | 'BRONZE LEVEL'

/** Item do treino: aponta para um modelo do catálogo + volume da série. */
export interface ExercicioTreino {
  /** código do equipamento no catálogo */
  codigo: string
  /** nome do exercício executado nele (o equipamento serve a vários) */
  exercicio: string
  series: string
  descanso: string
}

export interface Treino {
  id: string
  nome: string
  nivel: Nivel
  imagem?: string
  duracaoMin: number
  objetivo: Objetivo
  nivelDificuldade: string
  descricao: string
  exercicios: ExercicioTreino[]
}

export const treinos: Treino[] = [
  // ---------------- PERDA DE PESO ----------------
  {
    id: 'metabolic-burn',
    nome: 'Metabolic Burn',
    nivel: 'BRONZE LEVEL',
    duracaoMin: 40,
    objetivo: 'perda-peso',
    nivelDificuldade: 'BEGINNER',
    descricao:
      'Circuito metabólico de baixo impacto para elevar o gasto calórico sem sobrecarregar as articulações.',
    exercicios: [
      {
        codigo: 'PK17LT21',
        exercicio: 'Caminhada Inclinada',
        series: '1 série de 12min',
        descanso: '60s',
      },
      {
        codigo: 'PQ980L',
        exercicio: 'Pedalada Moderada',
        series: '1 série de 10min',
        descanso: '60s',
      },
      {
        codigo: '079',
        exercicio: 'Remada Sentada',
        series: '3 x 15 reps',
        descanso: '45s',
      },
      {
        codigo: '060',
        exercicio: 'Agachamento no Smith',
        series: '3 x 15 reps',
        descanso: '45s',
      },
    ],
  },
  {
    id: 'hiit-express',
    nome: 'HIIT Express',
    nivel: 'SILVER LEVEL',
    duracaoMin: 30,
    objetivo: 'perda-peso',
    nivelDificuldade: 'INTERMEDIATE',
    descricao:
      'Sessão curta e intensa alternando estímulos aeróbicos e de core para máxima queima em pouco tempo.',
    exercicios: [
      {
        codigo: 'PK17LT21',
        exercicio: 'Tiros na Esteira',
        series: '6 x 1min forte / 1min leve',
        descanso: '60s',
      },
      {
        codigo: 'PP007T',
        exercicio: 'Escada Contínua',
        series: '1 série de 8min',
        descanso: '60s',
      },
      {
        codigo: '060',
        exercicio: 'Barra Fixa',
        series: '3 x máximo',
        descanso: '60s',
      },
      {
        codigo: '024',
        exercicio: 'Abdominal no Banco',
        series: '3 x 20 reps',
        descanso: '45s',
      },
    ],
  },
  {
    id: 'full-body-lean',
    nome: 'Full Body Lean',
    nivel: 'GOLD LEVEL',
    duracaoMin: 55,
    objetivo: 'perda-peso',
    nivelDificuldade: 'INTERMEDIATE',
    descricao:
      'Full body com foco em manter massa magra durante o déficit calórico, combinando força e aeróbico.',
    exercicios: [
      {
        codigo: 'PK17LT21',
        exercicio: 'Aquecimento na Esteira',
        series: '1 série de 8min',
        descanso: '60s',
      },
      {
        codigo: '060',
        exercicio: 'Agachamento no Smith',
        series: '4 x 12 reps',
        descanso: '60s',
      },
      {
        codigo: '056',
        exercicio: 'Puxada Alta',
        series: '4 x 12 reps',
        descanso: '60s',
      },
      {
        codigo: '060',
        exercicio: 'Supino no Smith',
        series: '4 x 12 reps',
        descanso: '60s',
      },
      {
        codigo: '039',
        exercicio: 'Alongamento de Cadeia Posterior',
        series: '1 série de 5min',
        descanso: '—',
      },
    ],
  },

  // ---------------- GANHO DE MASSA ----------------
  {
    id: 'power-hypertrophy',
    nome: 'Power Hypertrophy',
    nivel: 'GOLD LEVEL',
    duracaoMin: 75,
    objetivo: 'ganho-massa',
    nivelDificuldade: 'BEGINNER',
    descricao:
      'Treino beginner full body para ganho de resistência. Desenvolvido para maximizar a ativação muscular em todo o corpo com foco em estabilidade e força base.',
    exercicios: [
      {
        codigo: 'PK17LT21',
        exercicio: 'Aquecimento na Esteira',
        series: '1 série de 5min',
        descanso: '60s',
      },
      {
        codigo: '060',
        exercicio: 'Agachamento no Smith',
        series: '4 x 12 reps',
        descanso: '90s',
      },
      {
        codigo: '060',
        exercicio: 'Supino no Smith',
        series: '4 x 12 reps',
        descanso: '90s',
      },
      {
        codigo: '056',
        exercicio: 'Puxada Alta',
        series: '4 x 12 reps',
        descanso: '90s',
      },
      {
        codigo: '079',
        exercicio: 'Remada Sentada',
        series: '3 x 12 reps',
        descanso: '60s',
      },
    ],
  },
  {
    id: 'chest-sculptor',
    nome: 'Chest Sculptor',
    nivel: 'SILVER LEVEL',
    duracaoMin: 50,
    objetivo: 'ganho-massa',
    nivelDificuldade: 'INTERMEDIATE',
    descricao:
      'Treino focado em hipertrofia de peitoral, cobrindo as porções média, superior e o alongamento em arco.',
    exercicios: [
      {
        codigo: '060',
        exercicio: 'Supino Reto no Smith',
        series: '4 x 10 reps',
        descanso: '90s',
      },
      {
        codigo: '024',
        exercicio: 'Supino Inclinado no Banco Regulável',
        series: '4 x 10 reps',
        descanso: '90s',
      },
      {
        codigo: '060',
        exercicio: 'Crucifixo na Polia',
        series: '3 x 15 reps',
        descanso: '60s',
      },
      {
        codigo: '079',
        exercicio: 'Tríceps na Polia',
        series: '3 x 15 reps',
        descanso: '45s',
      },
    ],
  },
  {
    id: 'back-power',
    nome: 'Back Power',
    nivel: 'SILVER LEVEL',
    duracaoMin: 55,
    objetivo: 'ganho-massa',
    nivelDificuldade: 'INTERMEDIATE',
    descricao:
      'Volume alto de dorsais combinando puxada, remada e trabalho complementar de bíceps.',
    exercicios: [
      {
        codigo: '056',
        exercicio: 'Puxada Alta',
        series: '4 x 10 reps',
        descanso: '90s',
      },
      {
        codigo: '056',
        exercicio: 'Puxada Baixa',
        series: '4 x 10 reps',
        descanso: '90s',
      },
      {
        codigo: '079',
        exercicio: 'Remada Sentada',
        series: '4 x 12 reps',
        descanso: '60s',
      },
      {
        codigo: '060',
        exercicio: 'Bíceps Curl na Polia',
        series: '3 x 12 reps',
        descanso: '45s',
      },
    ],
  },

  // ---------------- FORÇA BRUTA ----------------
  {
    id: 'iron-base',
    nome: 'Iron Base',
    nivel: 'GOLD LEVEL',
    duracaoMin: 70,
    objetivo: 'forca-bruta',
    nivelDificuldade: 'ADVANCED',
    descricao:
      'Os grandes movimentos com cargas altas e séries curtas para desenvolver força máxima com segurança no Smith.',
    exercicios: [
      {
        codigo: '060',
        exercicio: 'Agachamento no Smith',
        series: '5 x 5 reps',
        descanso: '150s',
      },
      {
        codigo: '060',
        exercicio: 'Supino no Smith',
        series: '5 x 5 reps',
        descanso: '120s',
      },
      {
        codigo: '060',
        exercicio: 'Barra Fixa Lastrada',
        series: '5 x 5 reps',
        descanso: '120s',
      },
      {
        codigo: '079',
        exercicio: 'Remada Pesada',
        series: '4 x 8 reps',
        descanso: '90s',
      },
    ],
  },
  {
    id: 'heavy-push',
    nome: 'Heavy Push',
    nivel: 'SILVER LEVEL',
    duracaoMin: 55,
    objetivo: 'forca-bruta',
    nivelDificuldade: 'INTERMEDIATE',
    descricao:
      'Sessão de empurrar: peito, ombro e tríceps com cargas altas e descansos longos.',
    exercicios: [
      {
        codigo: '060',
        exercicio: 'Supino no Smith',
        series: '5 x 6 reps',
        descanso: '120s',
      },
      {
        codigo: '024',
        exercicio: 'Desenvolvimento Sentado',
        series: '4 x 8 reps',
        descanso: '90s',
      },
      {
        codigo: '079',
        exercicio: 'Tríceps na Polia',
        series: '3 x 12 reps',
        descanso: '60s',
      },
      {
        codigo: '039',
        exercicio: 'Mobilidade de Ombros',
        series: '1 série de 5min',
        descanso: '—',
      },
    ],
  },

  // ---------------- RESISTÊNCIA ----------------
  {
    id: 'endurance-circuit',
    nome: 'Endurance Circuit',
    nivel: 'BRONZE LEVEL',
    duracaoMin: 45,
    objetivo: 'resistencia',
    nivelDificuldade: 'BEGINNER',
    descricao:
      'Circuito de cargas leves e séries longas para elevar a resistência muscular e cardiovascular.',
    exercicios: [
      {
        codigo: 'PK17LT21',
        exercicio: 'Corrida Leve',
        series: '1 série de 12min',
        descanso: '60s',
      },
      {
        codigo: 'PQ980L',
        exercicio: 'Pedalada Contínua',
        series: '1 série de 12min',
        descanso: '60s',
      },
      {
        codigo: '079',
        exercicio: 'Remada Sentada',
        series: '3 x 20 reps',
        descanso: '40s',
      },
      {
        codigo: '024',
        exercicio: 'Abdominal no Banco',
        series: '3 x 25 reps',
        descanso: '40s',
      },
    ],
  },
  {
    id: 'stair-endurance',
    nome: 'Stair Endurance',
    nivel: 'SILVER LEVEL',
    duracaoMin: 40,
    objetivo: 'resistencia',
    nivelDificuldade: 'INTERMEDIATE',
    descricao:
      'Volume aeróbico contínuo no simulador de escada, com recuperação ativa na bike e mobilidade no final.',
    exercicios: [
      {
        codigo: 'PP007T',
        exercicio: 'Escada Contínua',
        series: '1 série de 15min',
        descanso: '90s',
      },
      {
        codigo: 'PQ980L',
        exercicio: 'Recuperação Ativa',
        series: '1 série de 10min',
        descanso: '60s',
      },
      {
        codigo: '039',
        exercicio: 'Alongamento Geral',
        series: '1 série de 5min',
        descanso: '—',
      },
    ],
  },
  {
    id: 'core-mobility',
    nome: 'Core & Mobility',
    nivel: 'BRONZE LEVEL',
    duracaoMin: 35,
    objetivo: 'resistencia',
    nivelDificuldade: 'BEGINNER',
    descricao:
      'Resistência de core e trabalho de mobilidade — a base para sustentar volume alto nos demais treinos.',
    exercicios: [
      {
        codigo: '039',
        exercicio: 'Abdominal Suspenso',
        series: '4 x 12 reps',
        descanso: '45s',
      },
      {
        codigo: '024',
        exercicio: 'Abdominal no Banco',
        series: '4 x 20 reps',
        descanso: '45s',
      },
      {
        codigo: 'PQ980L',
        exercicio: 'Pedalada Leve',
        series: '1 série de 10min',
        descanso: '—',
      },
    ],
  },
]

export const objetivoLabel: Record<Objetivo, string> = {
  'perda-peso': 'Perda de Peso',
  'ganho-massa': 'Massa',
  'forca-bruta': 'Força',
  resistencia: 'Resistência',
}

/** Classes do selo de nível — mesmas em todas as telas. */
export const nivelStyles: Record<Nivel, string> = {
  'GOLD LEVEL': 'bg-amber-200 text-[#1B2436]',
  'SILVER LEVEL': 'bg-slate-200 text-[#1B2436]',
  'BRONZE LEVEL': 'bg-orange-300 text-[#1B2436]',
}

export function buscarTreino(id: string): Treino | undefined {
  return treinos.find((t) => t.id === id)
}

/**
 * URL absoluta do treino, usada no QR code do totem.
 * O celular precisa de um endereço alcançável na rede — em
 * desenvolvimento, `window.location.origin` vira "localhost" e não
 * funciona no telefone. Defina VITE_APP_URL (ex.: http://192.168.0.10:5173
 * ou o domínio de produção) para o QR apontar para o lugar certo.
 */
export function urlDoTreino(id: string): string {
  const base =
    import.meta.env.VITE_APP_URL ??
    (typeof window !== 'undefined' ? window.location.origin : '')
  return `${String(base).replace(/\/$/, '')}/treino/${id}`
}

/** Junta o item do treino com o modelo do catálogo e a unidade instalada. */
export function resolverExercicios(treino: Treino | null | undefined) {
  if (!treino) return []
  return treino.exercicios.flatMap((item, indice) => {
    const modelo = buscarModelo(item.codigo)
    if (!modelo) return []
    return [
      {
        ...item,
        // um mesmo equipamento pode aparecer em mais de um exercício
        chave: `${item.codigo}-${indice}`,
        modelo,
        localizacao: unidadesDoModelo(item.codigo)[0]?.localizacao,
      },
    ]
  })
}

export type ExercicioResolvido = ReturnType<typeof resolverExercicios>[number]
