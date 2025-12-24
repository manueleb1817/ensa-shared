// shared/src/constants/rideStates.ts

// ═══════════════════════════════════════════════════════════
// ✅ RIDE STATES CONSTANTS - Estados de viaje centralizados
// ═══════════════════════════════════════════════════════════
// 🔄 SINCRONIZADO 100% con backend/constants/rideStates.js

import type { RideStatus } from '../types/Ride';

/**
 * Constantes centralizadas para estados de viajes
 * CRÍTICO: Deben coincidir EXACTAMENTE con backend/constants/rideStates.js
 */
export const RIDE_STATES = {
  // Estados principales de rides (sincronizados con backend)
  SCHEDULED: 'scheduled' as RideStatus,
  PENDING: 'pendiente' as RideStatus,
  ACCEPTED: 'aceptado' as RideStatus,
  DRIVER_AT_ORIGIN: 'conductor_en_origen' as RideStatus,  // ← Nombre correcto del backend
  IN_PROGRESS: 'en_curso' as RideStatus,
  COMPLETED: 'completado' as RideStatus,
  COMPLETED_DEBT: 'completado_deuda' as RideStatus,
  CANCELLED: 'cancelado' as RideStatus,
  UNASSIGNED: 'no_asignado' as RideStatus,
  EXPIRED: 'expirado' as RideStatus,
  
  // Aliases legacy para compatibilidad (DEPRECADOS - usar DRIVER_AT_ORIGIN)
  /** @deprecated Use DRIVER_AT_ORIGIN instead */
  DRIVER_ARRIVING: 'conductor_en_origen' as RideStatus,
  /** @deprecated Use DRIVER_AT_ORIGIN instead */
  CONDUCTOR_EN_CAMINO: 'conductor_en_camino' as RideStatus,
  /** @deprecated Use DRIVER_AT_ORIGIN instead */
  CONDUCTOR_LLEGO: 'conductor_llego' as RideStatus,
  /** @deprecated Use DRIVER_AT_ORIGIN instead */
  DRIVER_ARRIVED: 'driver_arrived' as RideStatus,
  /** @deprecated Use DRIVER_AT_ORIGIN instead */
  ARRIVED: 'arrived' as RideStatus,
} as const;

// ✅ Arrays útiles para validaciones (sincronizados con backend)
export const ACTIVE_RIDE_STATES: RideStatus[] = [
  RIDE_STATES.SCHEDULED,
  RIDE_STATES.PENDING,
  RIDE_STATES.ACCEPTED,
  RIDE_STATES.DRIVER_AT_ORIGIN,
  RIDE_STATES.IN_PROGRESS,
];

export const TERMINAL_STATES: RideStatus[] = [
  RIDE_STATES.COMPLETED,
  RIDE_STATES.COMPLETED_DEBT,
  RIDE_STATES.CANCELLED,
  RIDE_STATES.UNASSIGNED,
  RIDE_STATES.EXPIRED,
];

export const DRIVER_ACTION_REQUIRED_STATES: RideStatus[] = [
  RIDE_STATES.ACCEPTED,
  RIDE_STATES.DRIVER_AT_ORIGIN,
  RIDE_STATES.IN_PROGRESS,
];

export const CANCELLABLE_STATES: RideStatus[] = [
  RIDE_STATES.SCHEDULED,
  RIDE_STATES.PENDING,
  RIDE_STATES.ACCEPTED,
  RIDE_STATES.DRIVER_AT_ORIGIN,
  RIDE_STATES.IN_PROGRESS,
];

// ✅ Fases de UI para navegación
export type RidePhase = 'confirmation' | 'en_route' | 'waiting' | 'in_progress';

// ✅ Mapeo centralizado de estados a fases de UI
export const getPhaseFromStatus = (status: string, isScheduled: boolean = false): RidePhase => {
  // Estados que requieren confirmación (usar strings ya que SCHEDULED_STATUS se importa separado)
  if (status === 'activation_sent' || status === 'driver_confirmed') {
    return 'confirmation';
  }
  
  // Estados de navegación/en camino
  if (
    status === RIDE_STATES.ACCEPTED ||
    status === 'conductor_en_camino' || // legacy
    status === 'driver_en_route' // scheduled
  ) {
    return 'en_route';
  }
  
  // Estados de llegada/espera
  if (
    status === RIDE_STATES.DRIVER_AT_ORIGIN ||
    status === 'conductor_llego' || // legacy
    status === 'driver_arrived' || // legacy
    status === 'arrived' // legacy
  ) {
    return 'waiting';
  }
  
  // Estados en progreso
  if (status === RIDE_STATES.IN_PROGRESS || status === 'en_curso') {
    return 'in_progress';
  }
  
  // Fallback
  return 'confirmation';
};