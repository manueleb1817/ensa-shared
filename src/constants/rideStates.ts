// shared/src/constants/rideStates.ts

// ═══════════════════════════════════════════════════════════
// ✅ RIDE STATES CONSTANTS - Estados de viaje centralizados
// ═══════════════════════════════════════════════════════════

import type { RideStatus } from '../types/Ride';

// ✅ Constantes centralizadas para estados de viajes
export const RIDE_STATES = {
  // Estados de rides NOW normales
  SCHEDULED: 'scheduled' as RideStatus,
  PENDING: 'pendiente' as RideStatus,
  ACCEPTED: 'aceptado' as RideStatus,
  DRIVER_ARRIVING: 'conductor_en_origen' as RideStatus,
  IN_PROGRESS: 'en_curso' as RideStatus,
  COMPLETED: 'completado' as RideStatus,
  COMPLETED_DEBT: 'completado_deuda' as RideStatus,
  CANCELLED: 'cancelado' as RideStatus,
  NOT_ASSIGNED: 'no_asignado' as RideStatus,
  
  // Estados específicos de scheduled rides
  CONFIRMED: 'confirmed' as RideStatus,
  ACTIVE: 'active' as RideStatus,
  ACTIVATION_SENT: 'activation_sent' as RideStatus,
  DRIVER_CONFIRMED: 'driver_confirmed' as RideStatus,
  DRIVER_EN_ROUTE: 'driver_en_route' as RideStatus,
  CONDUCTOR_EN_CAMINO: 'conductor_en_camino' as RideStatus,
  ARRIVED: 'arrived' as RideStatus,
  CONDUCTOR_LLEGO: 'conductor_llego' as RideStatus,
  DRIVER_ARRIVED: 'driver_arrived' as RideStatus,
} as const;

// ✅ Arrays útiles para validaciones
export const ACTIVE_RIDE_STATES: RideStatus[] = [
  RIDE_STATES.SCHEDULED,
  RIDE_STATES.PENDING,
  RIDE_STATES.ACCEPTED,
  RIDE_STATES.DRIVER_ARRIVING,
  RIDE_STATES.IN_PROGRESS,
];

export const COMPLETED_RIDE_STATES: RideStatus[] = [
  RIDE_STATES.COMPLETED,
  RIDE_STATES.COMPLETED_DEBT,
  RIDE_STATES.CANCELLED,
];

export const IN_PROGRESS_STATES: RideStatus[] = [
  RIDE_STATES.ACCEPTED,
  RIDE_STATES.DRIVER_ARRIVING,
  RIDE_STATES.IN_PROGRESS,
];

export const SCHEDULED_RIDE_ACTIVE_STATES: RideStatus[] = [
  RIDE_STATES.CONFIRMED,
  RIDE_STATES.ACTIVE,
  RIDE_STATES.DRIVER_EN_ROUTE,
  RIDE_STATES.CONDUCTOR_EN_CAMINO,
  RIDE_STATES.ARRIVED,
  RIDE_STATES.DRIVER_ARRIVED,
  RIDE_STATES.IN_PROGRESS,
];

// ✅ Fases de UI para navegación
export type RidePhase = 'confirmation' | 'en_route' | 'waiting' | 'in_progress';

// ✅ Mapeo centralizado de estados a fases de UI
export const getPhaseFromStatus = (status: string, isScheduled: boolean = false): RidePhase => {
  // Estados que requieren confirmación
  if (status === RIDE_STATES.ACTIVATION_SENT || status === RIDE_STATES.DRIVER_CONFIRMED) {
    return 'confirmation';
  }
  
  // Estados de navegación/en camino
  if (
    status === RIDE_STATES.ACTIVE ||
    status === RIDE_STATES.CONDUCTOR_EN_CAMINO ||
    status === RIDE_STATES.DRIVER_EN_ROUTE ||
    status === RIDE_STATES.ACCEPTED
  ) {
    return 'en_route';
  }
  
  // Estados de llegada/espera
  if (
    status === RIDE_STATES.ARRIVED ||
    status === RIDE_STATES.CONDUCTOR_LLEGO ||
    status === RIDE_STATES.DRIVER_ARRIVED
  ) {
    return 'waiting';
  }
  
  // Estados en progreso
  if (status === RIDE_STATES.IN_PROGRESS || status === 'en_curso') {
    return 'in_progress';
  }
  
  // Default para scheduled rides activos
  if (isScheduled && SCHEDULED_RIDE_ACTIVE_STATES.includes(status as RideStatus)) {
    return 'en_route';
  }
  
  // Fallback
  return 'confirmation';
};