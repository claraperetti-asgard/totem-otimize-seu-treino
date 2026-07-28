import type { Equipamento } from '../../data/equipamentos'
import EquipmentMarker from './EquipmentMarker'

export { COR_SELECAO } from './EquipmentMarker'

interface EquipmentOverlayProps {
  equipamentos: Equipamento[]
  selectedEquipment: string | null
  onSelecionar: (id: string) => void
}

/**
 * Um pino por equipamento sobre a planta.
 * Tudo vem do `equipamentos.ts` via map — nada hardcoded.
 */
export default function EquipmentOverlay({
  equipamentos,
  selectedEquipment,
  onSelecionar,
}: EquipmentOverlayProps) {
  return (
    <>
      {equipamentos.map((equipamento) => (
        <EquipmentMarker
          key={equipamento.id}
          x={equipamento.localizacao.x}
          y={equipamento.localizacao.y}
          nome={equipamento.nome}
          status={equipamento.status}
          selecionado={equipamento.id === selectedEquipment}
          onClick={() => onSelecionar(equipamento.id)}
        />
      ))}
    </>
  )
}
