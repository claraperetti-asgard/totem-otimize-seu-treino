// ============================================================
// BANNERS DE AVISO DA ACADEMIA
// Para publicar um aviso novo, coloque a imagem em
// src/assets/banners e acrescente uma entrada aqui.
// ============================================================

import banner1 from '../assets/banners/banner1.jpeg'
import banner2 from '../assets/banners/banner2.jpeg'
import banner3 from '../assets/banners/banner3.jpeg'

export interface Banner {
  id: string
  imagem: string
  /** descrição para leitores de tela */
  alt: string
}

export const banners: Banner[] = [
  { id: 'banner1', imagem: banner1, alt: 'Aviso da academia 1' },
  { id: 'banner2', imagem: banner2, alt: 'Aviso da academia 2' },
  { id: 'banner3', imagem: banner3, alt: 'Aviso da academia 3' },
]
