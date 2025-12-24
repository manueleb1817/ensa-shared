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

// ═══════════════════════════════════════════════════════════
// ✅ UTILITY FUNCTIONS - Funciones auxiliares para estados
// ═══════════════════════════════════════════════════════════

/**
 * Normaliza estados legacy a los estados actuales
 */
export const normalizeState = (estado: string): string => {
  switch(estado) {
    case 'driver_arriving':
    case 'conductor_en_camino':
    case 'conductor_llego':
    case 'driver_arrived':
    case 'arrived':
      return RIDE_STATES.DRIVER_AT_ORIGIN;
    case 'in_progress':
      return RIDE_STATES.IN_PROGRESS;
    case 'completado':
      return RIDE_STATES.COMPLETED;
    case 'cancelado':
      return RIDE_STATES.CANCELLED;
    default:
      return estado;
  }
};

/**
 * Obtiene el label legible de un estado según el rol del usuario
 */
export const getStateLabel = (estado: string, role: 'driver' | 'passenger'): string => {
  if (role === 'driver') {
    switch(estado) {
      case RIDE_STATES.PENDING:
        return 'Esperando asignación';
      case RIDE_STATES.ACCEPTED:
        return 'Dirígete al punto de recogida';
      case RIDE_STATES.CONDUCTOR_EN_CAMINO:
      case RIDE_STATES.DRIVER_AT_ORIGIN:
      case RIDE_STATES.DRIVER_ARRIVING:
        return 'En camino al pasajero';
      case RIDE_STATES.CONDUCTOR_LLEGO:
      case RIDE_STATES.DRIVER_ARRIVED:
        return 'Esperando al pasajero';
      case RIDE_STATES.IN_PROGRESS:
        return 'Viaje en curso';
      case RIDE_STATES.COMPLETED:
        return 'Viaje completado';
      case RIDE_STATES.CANCELLED:
        return 'Viaje cancelado';
      default:
        return `Estado: ${estado}`;
    }
  } else {
    // Passenger labels
    switch(estado) {
      case RIDE_STATES.PENDING:
        return 'Buscando conductor...';
      case RIDE_STATES.ACCEPTED:
        return 'Conductor aceptado';
      case RIDE_STATES.CONDUCTOR_EN_CAMINO:
      case RIDE_STATES.DRIVER_AT_ORIGIN:
      case RIDE_STATES.DRIVER_ARRIVING:
        return 'Conductor en camino';
      case RIDE_STATES.CONDUCTOR_LLEGO:
      case RIDE_STATES.DRIVER_ARRIVED:
        return 'Conductor ha llegado';
      case RIDE_STATES.IN_PROGRESS:
        return 'Viaje en curso';
      case RIDE_STATES.COMPLETED:
        return 'Viaje completado';
      case RIDE_STATES.CANCELLED:
        return 'Viaje cancelado';
      default:
        return `Estado: ${estado}`;
    }
  }
};

/**
 * Verifica si un estado es activo (no terminal)
 */
export const isActiveState = (estado: string): boolean => {
  return ACTIVE_RIDE_STATES.includes(estado as RideStatus);
};

/**
 * Verifica si un estado es terminal (finalizado)
 */
export const isTerminalState = (estado: string): boolean => {
  return TERMINAL_STATES.includes(estado as RideStatus);
};