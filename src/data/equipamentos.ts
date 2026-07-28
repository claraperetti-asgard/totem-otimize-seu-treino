// ============================================================
// CATÁLOGO ÚNICO DE EQUIPAMENTOS
// Fonte de dados compartilhada entre Equipamentos, Sugestão de
// Treino e Mapa da Unidade.
//
// Dois níveis, para não duplicar informação:
//   modelos  -> a máquina em si (ficha, foto, categorias)
//   unidades -> cada exemplar instalado na planta (posição, status)
// `equipamentos` é o cruzamento dos dois, pronto para consumo.
// ============================================================

import img024 from '../assets/Machines/24.png'
import img039 from '../assets/Machines/39.png'
import img056 from '../assets/Machines/56.png'
import img060 from '../assets/Machines/60.png'
import img079 from '../assets/Machines/69.png'
import imgEsteira from '../assets/Machines/PK17LT21.png'
import imgEscada from '../assets/Machines/PP007T.png'
import imgBike from '../assets/Machines/PQ980L.png'

/** Categorias usadas nas abas — vêm das tags de cada equipamento. */
export type CategoriaId =
  | 'peito'
  | 'costas'
  | 'pernas'
  | 'ombros'
  | 'bracos'
  | 'cardio'
  | 'acessorios'

/** Linha do produto no catálogo Cimerian. */
export type LinhaId = 'bateria-de-pesos' | 'linha-cardio' | 'acessorios'

export type StatusEquipamento = 'livre' | 'em-uso' | 'manutencao'

export interface Especificacao {
  label: string
  valor: string
}

export interface Localizacao {
  /**
   * Centro do equipamento na planta, em % (0-100) sobre o viewBox do mapa.
   * O overlay converte para o canto superior esquerdo do retângulo.
   */
  x: number
  y: number
  /** Dimensões do equipamento na planta, em % (0-100). */
  largura: number
  altura: number
  /** Nome da zona exibido no card e no marcador. */
  area: string
  /** Pavimento da planta (para quando existir mais de um nível). */
  nivel?: number
}

/** A máquina — uma entrada por modelo, independente de quantos exemplares existem. */
export interface ModeloEquipamento {
  /** código impresso na planta e nome do arquivo da foto */
  codigo: string
  nome: string
  linha: LinhaId
  categorias: CategoriaId[]
  descricao: string
  especificacoes?: Especificacao[]
  imagemMaquina: string
  /** foto da execução do movimento, quando houver */
  imagemExecucao?: string
}

/** O exemplar instalado — uma entrada por posição na planta. */
export interface UnidadeEquipamento {
  id: string
  codigo: string
  localizacao: Localizacao
  status?: StatusEquipamento
  /** minutos restantes quando `status === 'em-uso'` */
  tempoRestanteMin?: number
  favorito?: boolean
}

/** Unidade já cruzada com os dados do modelo. */
export interface Equipamento extends ModeloEquipamento, UnidadeEquipamento {}

export const categorias: { id: CategoriaId; label: string }[] = [
  { id: 'peito', label: 'Peito' },
  { id: 'costas', label: 'Costas' },
  { id: 'pernas', label: 'Pernas' },
  { id: 'ombros', label: 'Ombros' },
  { id: 'bracos', label: 'Braços' },
  { id: 'cardio', label: 'Cardio' },
  { id: 'acessorios', label: 'Acessórios' },
]

export const linhas: { id: LinhaId; label: string }[] = [
  { id: 'bateria-de-pesos', label: 'Bateria de Pesos' },
  { id: 'linha-cardio', label: 'Linha Cardio' },
  { id: 'acessorios', label: 'Acessórios' },
]

// ============================================================
// MODELOS
// ============================================================

export const modelos: ModeloEquipamento[] = [
  {
    codigo: '024',
    nome: 'Banco Regulável',
    linha: 'acessorios',
    categorias: ['acessorios'],
    descricao:
      'O Banco Regulável Cimerian é indispensável para sua academia. Versátil para inúmeros exercícios, traz estofado reforçado para suportar alto fluxo de usuários, ajuste de altura do banco encosto/banco e regulagem de angulação no banco. Conta ainda com alça de apoio para facilitar a movimentação. Eficiência, qualidade e durabilidade.',
    imagemMaquina: img024,
  },
  {
    codigo: '060',
    nome: 'Crossover Smith',
    linha: 'bateria-de-pesos',
    categorias: ['costas', 'peito', 'pernas', 'bracos'],
    descricao:
      'O Cross Smith Cimerian é um equipamento multifuncional e indispensável para sua academia. Estrutura de alto padrão com polias laterais e baterias de peso de até 100 kg, permitindo movimentos como crucifixo, bíceps curl e tríceps. Conta com suporte para barra fixa com ajuste de altura e travas de segurança para agachamentos, além de pegadores para barra fixa. Robustez, versatilidade e segurança para treinos completos.',
    especificacoes: [
      { label: 'Bateria de peso', valor: 'até 100 kg' },
      { label: 'Barra fixa', valor: 'suporte com ajuste de altura' },
      { label: 'Segurança', valor: 'travas para agachamento' },
    ],
    imagemMaquina: img060,
  },
  {
    codigo: '056',
    nome: 'Puxada Alta e Baixa',
    linha: 'bateria-de-pesos',
    categorias: ['costas'],
    descricao:
      'A Puxada Alta e Baixa Cimerian é mais um equipamento multifuncional para a sua academia. 2 em 1, ele oferece a Puxada Alta e a Puxada Baixa. Conta com bateria de peso de até 100 kg e ajuste da trava de joelho estofada para maior conforto do usuário. Design robusto para academias de alto padrão.',
    especificacoes: [
      { label: 'Bateria de peso', valor: 'até 100 kg' },
      { label: 'Funções', valor: 'puxada alta e puxada baixa' },
      { label: 'Ajuste', valor: 'trava de joelho estofada' },
    ],
    imagemMaquina: img056,
  },
  {
    codigo: '039',
    nome: 'Espaldar',
    linha: 'acessorios',
    categorias: ['acessorios'],
    descricao:
      'O Espaldar Cimerian oferece uma estrutura robusta e design funcional para trazer mais desempenho para a área de mobilidade e alongamento.',
    imagemMaquina: img039,
  },
  {
    // na planta aparece como 079; a foto do catálogo é a 69
    codigo: '079',
    nome: 'Multiestação',
    linha: 'bateria-de-pesos',
    categorias: ['bracos', 'costas', 'pernas', 'ombros'],
    descricao:
      'A Multiestação Cimerian oferece Remada, Puxada e Polia em um único equipamento, funcionalidade para elevar o nível da sua academia. Projetada para suportar alto fluxo de uso, tem estrutura de padrão industrial, baterias de peso de até 100 kg, ajustes de banco e travas de perna. Multifuncional por excelência: substitui várias Equipamentos, permite treinos simultâneos e variados (costas, peitoral, ombro, bíceps, tríceps e core) e otimiza espaço e investimento.',
    especificacoes: [
      { label: 'Funções', valor: 'remada, puxada e polia' },
      { label: 'Bateria de peso', valor: 'até 100 kg' },
      { label: 'Ajustes', valor: 'banco e travas de perna' },
      { label: 'Estrutura', valor: 'padrão industrial' },
    ],
    imagemMaquina: img079,
  },
  {
    codigo: 'PK17LT21',
    nome: 'Esteira Touch Screen',
    linha: 'linha-cardio',
    categorias: ['cardio'],
    descricao:
      'Esteira de uso comercial pesado com painel touch screen e interface intuitiva, motor AC de alta potência e inclinação eletrônica.',
    especificacoes: [
      { label: 'Motor', valor: 'AC 3,9 HP contínuo / 5,8 HP de pico' },
      { label: 'Velocidade', valor: '1 a 20 km/h' },
      { label: 'Inclinação', valor: 'eletrônica de 0 a 16%' },
      { label: 'Área de corrida', valor: '580 x 1580 mm (L x C)' },
      { label: 'Painel', valor: 'Touch Screen' },
      { label: 'Peso máximo do usuário', valor: '180 kg' },
      { label: 'Estrutura', valor: 'aço reforçado' },
      { label: 'Indicação de uso', valor: 'comercial pesado (academias)' },
      { label: 'Alimentação elétrica', valor: '220 V / 60 Hz' },
    ],
    imagemMaquina: imgEsteira,
  },
  {
    codigo: 'PQ980L',
    nome: 'Bike Spinning (LED)',
    linha: 'linha-cardio',
    categorias: ['cardio'],
    descricao:
      'Bike de spinning com resistência magnética e volante de inércia em alumínio, para treinos de baixo impacto e alta intensidade.',
    especificacoes: [
      { label: 'Painel', valor: 'LED de 6"' },
      { label: 'Sistema de resistência', valor: 'magnética' },
      { label: 'Volante de inércia', valor: '17 kg (alumínio)' },
      { label: 'Ajuste de intensidade', valor: 'contínuo' },
      { label: 'Indicação de uso', valor: 'comercial (academias)' },
    ],
    imagemMaquina: imgBike,
  },
  {
    codigo: 'PP007T',
    nome: 'Simulador de Escada Touch Screen',
    linha: 'linha-cardio',
    categorias: ['cardio'],
    descricao:
      'Simulador de escada de uso comercial pesado, com resistência eletromagnética e painel touch screen HD.',
    especificacoes: [
      { label: 'Painel', valor: 'Touch Screen HD de 15,6"' },
      { label: 'Sistema de resistência', valor: 'eletromagnético' },
      { label: 'Níveis de resistência', valor: '1 a 20' },
      { label: 'Peso máximo do usuário', valor: '180 kg' },
      { label: 'Indicação de uso', valor: 'comercial pesado (academias)' },
      { label: 'Alimentação elétrica', valor: '220 V / 60 Hz' },
    ],
    imagemMaquina: imgEscada,
  },
]

// ============================================================
// UNIDADES INSTALADAS (posições sobre planta.png)
// x / y = centro do equipamento, em % da planta.
// ============================================================

export const unidades: UnidadeEquipamento[] = [
  {
    id: '024-1',
    codigo: '024',
    localizacao: {
      x: 34,
      y: 20.5,
      largura: 7.5,
      altura: 12,
      area: 'Zona A - Musculação',
    },
    status: 'livre',
  },
  {
    id: '024-2',
    codigo: '024',
    localizacao: {
      x: 50,
      y: 20.5,
      largura: 7.5,
      altura: 12,
      area: 'Zona A - Musculação',
    },
    status: 'em-uso',
    tempoRestanteMin: 5,
  },
  {
    id: '060-1',
    codigo: '060',
    localizacao: {
      x: 74,
      y: 20.5,
      largura: 21,
      altura: 12,
      area: 'Zona A - Musculação',
    },
    status: 'livre',
    favorito: true,
  },
  {
    id: '056-1',
    codigo: '056',
    localizacao: {
      x: 34.5,
      y: 37.5,
      largura: 18,
      altura: 9,
      area: 'Zona B - Musculação',
    },
    status: 'livre',
  },
  {
    id: '039-1',
    codigo: '039',
    localizacao: {
      x: 85.5,
      y: 37.5,
      largura: 6.5,
      altura: 7,
      area: 'Zona C - Mobilidade',
    },
    status: 'livre',
  },
  {
    id: '079-1',
    codigo: '079',
    localizacao: {
      x: 48,
      y: 63.5,
      largura: 30,
      altura: 18,
      area: 'Zona B - Musculação',
    },
    status: 'em-uso',
    tempoRestanteMin: 8,
  },
  {
    id: 'PK17LT21-1',
    codigo: 'PK17LT21',
    localizacao: {
      x: 26.5,
      y: 87,
      largura: 8.5,
      altura: 16,
      area: 'Zona D - Cardio',
    },
    status: 'em-uso',
    tempoRestanteMin: 15,
  },
  {
    id: 'PK17LT21-2',
    codigo: 'PK17LT21',
    localizacao: {
      x: 35.5,
      y: 87,
      largura: 8.5,
      altura: 16,
      area: 'Zona D - Cardio',
    },
    status: 'livre',
  },
  {
    id: 'PQ980L-1',
    codigo: 'PQ980L',
    localizacao: {
      x: 45.5,
      y: 90,
      largura: 7,
      altura: 7,
      area: 'Zona D - Cardio',
    },
    status: 'livre',
  },
  {
    id: 'PQ980L-2',
    codigo: 'PQ980L',
    localizacao: {
      x: 57.5,
      y: 90,
      largura: 7,
      altura: 7,
      area: 'Zona D - Cardio',
    },
    status: 'livre',
  },
  {
    id: 'PP007T-1',
    codigo: 'PP007T',
    localizacao: {
      x: 72,
      y: 84.5,
      largura: 14,
      altura: 6,
      area: 'Zona D - Cardio',
    },
    status: 'livre',
  },
  {
    id: 'PP007T-2',
    codigo: 'PP007T',
    localizacao: {
      x: 72,
      y: 91.5,
      largura: 14,
      altura: 6,
      area: 'Zona D - Cardio',
    },
    status: 'manutencao',
  },
]

// ============================================================
// CRUZAMENTO E CONSULTAS
// ============================================================

const modeloPorCodigo = new Map(modelos.map((m) => [m.codigo, m]))

/** Todas as unidades instaladas, já com os dados do modelo. */
export const equipamentos: Equipamento[] = unidades.flatMap((unidade) => {
  const modelo = modeloPorCodigo.get(unidade.codigo)
  return modelo ? [{ ...modelo, ...unidade }] : []
})

const equipamentoPorId = new Map(equipamentos.map((e) => [e.id, e]))

export function buscarModelo(codigo: string): ModeloEquipamento | undefined {
  return modeloPorCodigo.get(codigo)
}

export function buscarEquipamento(id: string): Equipamento | undefined {
  return equipamentoPorId.get(id)
}

export function modelosDaCategoria(
  categoria: CategoriaId
): ModeloEquipamento[] {
  return modelos.filter((m) => m.categorias.includes(categoria))
}

export function equipamentosDaCategoria(
  categoria: CategoriaId
): Equipamento[] {
  return equipamentos.filter((e) => e.categorias.includes(categoria))
}

/** Exemplares instalados de um modelo — usado para mostrar onde encontrá-lo. */
export function unidadesDoModelo(codigo: string): Equipamento[] {
  return equipamentos.filter((e) => e.codigo === codigo)
}

export function categoriaLabel(categoria: CategoriaId): string {
  return categorias.find((c) => c.id === categoria)?.label ?? categoria
}

export function linhaLabel(linha: LinhaId): string {
  return linhas.find((l) => l.id === linha)?.label ?? linha
}

export const statusLabel: Record<StatusEquipamento, string> = {
  livre: 'Livre agora',
  'em-uso': 'Em uso',
  manutencao: 'Em manutenção',
}

/** Texto de status já com o tempo restante, quando houver. */
export function descricaoStatus(unidade: UnidadeEquipamento): string {
  const status = unidade.status ?? 'livre'
  if (status === 'em-uso' && unidade.tempoRestanteMin) {
    return `Em uso (${unidade.tempoRestanteMin} min)`
  }
  return statusLabel[status]
}
