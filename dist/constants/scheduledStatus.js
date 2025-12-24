// shared/src/constants/scheduledStatus.ts
// ═══════════════════════════════════════════════════════════
// ✅ SCHEDULED STATUS CONSTANTS - Estados de viajes programados
// ═══════════════════════════════════════════════════════════
// 🔄 SINCRONIZADO 100% con backend/constants/scheduledStatus.js
/**
 * Constantes centralizadas de scheduledStatus para Rides programados
 * CRÍTICO: Estas constantes deben coincidir EXACTAMENTE con el backend
 */
export const SCHEDULED_STATUS = {
    PENDING: 'pending', // Viaje creado, esperando driver
    SEARCHING: 'searching', // Buscando driver (recovery mode)
    ASSIGNED: 'assigned', // LEGACY: Driver asignado (viajes viejos)
    DRIVER_ACCEPTED: 'driver_accepted', // Driver aceptó del marketplace
    REMINDER_30MIN_SENT: 'reminder_30min_sent', // Recordatorio 30 min antes enviado
    REMINDER_15MIN_SENT: 'reminder_15min_sent', // Recordatorio 15 min antes enviado
    ACTIVATION_SENT: 'activation_sent', // Sistema activó viaje 5 min antes (LEGACY - ya no se usa)
    REASSIGNING: 'reassigning', // Driver no respondió, buscando backup
    DRIVER_CONFIRMED: 'driver_confirmed', // Driver presionó "Confirmar y Comenzar"
    DRIVER_EN_ROUTE: 'driver_en_route', // Driver en camino al pickup
    DRIVER_ARRIVED: 'driver_arrived', // Driver llegó al pickup
    IN_PROGRESS: 'in_progress', // Viaje en curso (pasajero en auto)
    COMPLETED: 'completed', // Completado exitosamente
    CANCELLED: 'cancelled', // Cancelado
    ERROR: 'error', // Error del sistema
    // ⚠️ LEGACY: Estados antiguos que pueden aparecer en datos históricos
    /** @deprecated Use DRIVER_EN_ROUTE instead */
    ACTIVE: 'active', // LEGACY: Equivalente a DRIVER_EN_ROUTE
    /** @deprecated Use DRIVER_ARRIVED instead */
    ARRIVED: 'arrived' // LEGACY: Equivalente a DRIVER_ARRIVED
};
/**
 * Estados que indican que el viaje programado está activo (no finalizado)
 */
export const ACTIVE_SCHEDULED_STATES = [
    SCHEDULED_STATUS.PENDING,
    SCHEDULED_STATUS.SEARCHING,
    SCHEDULED_STATUS.ASSIGNED,
    SCHEDULED_STATUS.DRIVER_ACCEPTED,
    SCHEDULED_STATUS.REMINDER_30MIN_SENT,
    SCHEDULED_STATUS.REMINDER_15MIN_SENT,
    SCHEDULED_STATUS.ACTIVATION_SENT,
    SCHEDULED_STATUS.REASSIGNING,
    SCHEDULED_STATUS.DRIVER_CONFIRMED,
    SCHEDULED_STATUS.DRIVER_EN_ROUTE,
    SCHEDULED_STATUS.DRIVER_ARRIVED,
    SCHEDULED_STATUS.IN_PROGRESS
];
/**
 * Estados terminales (viaje programado finalizado)
 */
export const TERMINAL_SCHEDULED_STATES = [
    SCHEDULED_STATUS.COMPLETED,
    SCHEDULED_STATUS.CANCELLED,
    SCHEDULED_STATUS.ERROR
];
/**
 * Estados que requieren acción del driver
 */
export const DRIVER_ACTION_REQUIRED_SCHEDULED_STATES = [
    SCHEDULED_STATUS.DRIVER_ACCEPTED, // Debe presionar "Iniciar Viaje" entre T-15 y T+10
    SCHEDULED_STATUS.DRIVER_EN_ROUTE,
    SCHEDULED_STATUS.DRIVER_ARRIVED
];
/**
 * Estados que permiten cancelación
 */
export const CANCELLABLE_SCHEDULED_STATES = [
    SCHEDULED_STATUS.PENDING,
    SCHEDULED_STATUS.SEARCHING,
    SCHEDULED_STATUS.DRIVER_ACCEPTED,
    SCHEDULED_STATUS.REMINDER_30MIN_SENT,
    SCHEDULED_STATUS.REMINDER_15MIN_SENT,
    SCHEDULED_STATUS.REASSIGNING
];
/**
 * Helper: Verificar si un scheduledStatus está activo
 */
export function isScheduledRideActive(status) {
    return ACTIVE_SCHEDULED_STATES.includes(status);
}
/**
 * Helper: Verificar si un scheduledStatus es terminal
 */
export function isScheduledRideTerminal(status) {
    return TERMINAL_SCHEDULED_STATES.includes(status);
}
/**
 * Helper: Verificar si requiere acción del driver
 */
export function requiresDriverAction(status) {
    return DRIVER_ACTION_REQUIRED_SCHEDULED_STATES.includes(status);
}
/**
 * Helper: Obtener label legible para usuario
 */
export function getScheduledStatusLabel(status, role) {
    if (role === 'driver') {
        switch (status) {
            case SCHEDULED_STATUS.PENDING:
            case SCHEDULED_STATUS.SEARCHING:
                return 'Buscando confirmación';
            case SCHEDULED_STATUS.DRIVER_ACCEPTED:
                return 'Aceptado - Espera para iniciar';
            case SCHEDULED_STATUS.DRIVER_EN_ROUTE:
                return 'Dirígete al punto de recogida';
            case SCHEDULED_STATUS.DRIVER_ARRIVED:
                return 'Has llegado - Espera al pasajero';
            case SCHEDULED_STATUS.IN_PROGRESS:
                return 'Viaje en curso';
            case SCHEDULED_STATUS.COMPLETED:
                return 'Viaje completado';
            case SCHEDULED_STATUS.CANCELLED:
                return 'Viaje cancelado';
            default:
                return status;
        }
    }
    else {
        // Passenger labels
        switch (status) {
            case SCHEDULED_STATUS.PENDING:
            case SCHEDULED_STATUS.SEARCHING:
                return 'Buscando conductor';
            case SCHEDULED_STATUS.DRIVER_ACCEPTED:
                return 'Conductor confirmado';
            case SCHEDULED_STATUS.DRIVER_EN_ROUTE:
                return 'Conductor en camino';
            case SCHEDULED_STATUS.DRIVER_ARRIVED:
                return 'Conductor ha llegado';
            case SCHEDULED_STATUS.IN_PROGRESS:
                return 'Viaje en curso';
            case SCHEDULED_STATUS.COMPLETED:
                return 'Viaje completado';
            case SCHEDULED_STATUS.CANCELLED:
                return 'Viaje cancelado';
            default:
                return status;
        }
    }
}
//# sourceMappingURL=scheduledStatus.js.map