// PALETA DE APOIO
// Tons dessaturados, para colorir sem deixar a tela "arco-íris".
// A cor entra em áreas pequenas (ícone, pontinho, barra); textos e
// pílulas ficam neutros. A tela de Desafios usa cores mais vivas
// de propósito, por ser a parte gamificada.
// A cor de base das telas vive em theme/paletaAzul.ts.
//
// Cada cor tem um significado fixo no sistema:
//   verde    -> progresso, disponível, concluído
//   azul     -> informação, comunidade, identidade
//   amarelo  -> recompensa, energia, XP
//   vermelho -> urgência, dificuldade, manutenção
//   laranja  -> streak, cardio, calor
//   roxo     -> força, peso livre

import type { CategoriaId } from "../data/equipamentos"

export interface Cor {
  /** fundo + texto, para chips e ícones */
  chip: string
  texto: string
  borda: string
  /** cor sólida, para barras de progresso e pontinhos */
  barra: string
}

/** Pílula neutra padrão — a cor entra só no ícone ou no pontinho. */
export const pilulaNeutra =
  "bg-white/5 text-[#C4CEDC] border border-[#24334D]"

export const paleta: Record<
  "verde" | "azul" | "amarelo" | "vermelho" | "laranja" | "roxo",
  Cor
> = {
  verde: {
    chip: "bg-emerald-400/10 text-emerald-300/80",
    texto: "text-emerald-300/80",
    borda: "border-emerald-400/25",
    barra: "bg-emerald-400/80",
  },
  azul: {
    chip: "bg-sky-400/10 text-sky-300/80",
    texto: "text-sky-300/80",
    borda: "border-sky-400/25",
    barra: "bg-sky-400/80",
  },
  amarelo: {
    chip: "bg-amber-400/10 text-amber-300/80",
    texto: "text-amber-300/80",
    borda: "border-amber-400/25",
    barra: "bg-amber-400/80",
  },
  vermelho: {
    chip: "bg-rose-400/10 text-rose-300/80",
    texto: "text-rose-300/80",
    borda: "border-rose-400/25",
    barra: "bg-rose-400/80",
  },
  laranja: {
    chip: "bg-orange-400/10 text-orange-300/80",
    texto: "text-orange-300/80",
    borda: "border-orange-400/25",
    barra: "bg-orange-400/80",
  },
  roxo: {
    chip: "bg-violet-400/10 text-violet-300/80",
    texto: "text-violet-300/80",
    borda: "border-violet-400/25",
    barra: "bg-violet-400/80",
  },
}

/** Cor fixa de cada grupo muscular — a mesma em todas as telas. */
export const corDaCategoria: Record<CategoriaId, Cor> = {
  peito: paleta.vermelho,
  costas: paleta.azul,
  pernas: paleta.verde,
  ombros: paleta.amarelo,
  bracos: paleta.roxo,
  cardio: paleta.laranja,
  acessorios: paleta.azul,
}
