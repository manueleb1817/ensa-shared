// shared/src/constants/rideStates.ts
// ✅ Constantes centralizadas para estados de viajes
export const RIDE_STATES = {
    // Estados de rides NOW normales
    SCHEDULED: 'scheduled',
    PENDING: 'pendiente',
    ACCEPTED: 'aceptado',
    DRIVER_ARRIVING: 'conductor_en_origen',
    IN_PROGRESS: 'en_curso',
    COMPLETED: 'completado',
    COMPLETED_DEBT: 'completado_deuda',
    CANCELLED: 'cancelado',
    NOT_ASSIGNED: 'no_asignado',
    // Estados específicos de scheduled rides
    CONFIRMED: 'confirmed',
    ACTIVE: 'active',
    ACTIVATION_SENT: 'activation_sent',
    DRIVER_CONFIRMED: 'driver_confirmed',
    DRIVER_EN_ROUTE: 'driver_en_route',
    CONDUCTOR_EN_CAMINO: 'conductor_en_camino',
    ARRIVED: 'arrived',
    CONDUCTOR_LLEGO: 'conductor_llego',
    DRIVER_ARRIVED: 'driver_arrived',
};
// ✅ Arrays útiles para validaciones
export const ACTIVE_RIDE_STATES = [
    RIDE_STATES.SCHEDULED,
    RIDE_STATES.PENDING,
    RIDE_STATES.ACCEPTED,
    RIDE_STATES.DRIVER_ARRIVING,
    RIDE_STATES.IN_PROGRESS,
];
export const COMPLETED_RIDE_STATES = [
    RIDE_STATES.COMPLETED,
    RIDE_STATES.COMPLETED_DEBT,
    RIDE_STATES.CANCELLED,
];
export const IN_PROGRESS_STATES = [
    RIDE_STATES.ACCEPTED,
    RIDE_STATES.DRIVER_ARRIVING,
    RIDE_STATES.IN_PROGRESS,
];
export const SCHEDULED_RIDE_ACTIVE_STATES = [
    RIDE_STATES.CONFIRMED,
    RIDE_STATES.ACTIVE,
    RIDE_STATES.DRIVER_EN_ROUTE,
    RIDE_STATES.CONDUCTOR_EN_CAMINO,
    RIDE_STATES.ARRIVED,
    RIDE_STATES.DRIVER_ARRIVED,
    RIDE_STATES.IN_PROGRESS,
];
// ✅ Mapeo centralizado de estados a fases de UI
export const getPhaseFromStatus = (status, isScheduled = false) => {
    // Estados que requieren confirmación
    if (status === RIDE_STATES.ACTIVATION_SENT || status === RIDE_STATES.DRIVER_CONFIRMED) {
        return 'confirmation';
    }
    // Estados de navegación/en camino
    if (status === RIDE_STATES.ACTIVE ||
        status === RIDE_STATES.CONDUCTOR_EN_CAMINO ||
        status === RIDE_STATES.DRIVER_EN_ROUTE ||
        status === RIDE_STATES.ACCEPTED) {
        return 'en_route';
    }
    // Estados de llegada/espera
    if (status === RIDE_STATES.ARRIVED ||
        status === RIDE_STATES.CONDUCTOR_LLEGO ||
        status === RIDE_STATES.DRIVER_ARRIVED) {
        return 'waiting';
    }
    // Estados en progreso
    if (status === RIDE_STATES.IN_PROGRESS || status === 'en_curso') {
        return 'in_progress';
    }
    // Default para scheduled rides activos
    if (isScheduled && SCHEDULED_RIDE_ACTIVE_STATES.includes(status)) {
        return 'en_route';
    }
    // Fallback
    return 'confirmation';
};
//# sourceMappingURL=rideStates.js.map