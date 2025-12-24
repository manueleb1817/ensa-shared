/**
 * Constantes centralizadas de scheduledStatus para Rides programados
 * CRÍTICO: Estas constantes deben coincidir EXACTAMENTE con el backend
 */
export declare const SCHEDULED_STATUS: {
    readonly PENDING: "pending";
    readonly SEARCHING: "searching";
    readonly ASSIGNED: "assigned";
    readonly DRIVER_ACCEPTED: "driver_accepted";
    readonly REMINDER_30MIN_SENT: "reminder_30min_sent";
    readonly REMINDER_15MIN_SENT: "reminder_15min_sent";
    readonly ACTIVATION_SENT: "activation_sent";
    readonly REASSIGNING: "reassigning";
    readonly DRIVER_CONFIRMED: "driver_confirmed";
    readonly DRIVER_EN_ROUTE: "driver_en_route";
    readonly DRIVER_ARRIVED: "driver_arrived";
    readonly IN_PROGRESS: "in_progress";
    readonly COMPLETED: "completed";
    readonly CANCELLED: "cancelled";
    readonly ERROR: "error";
    /** @deprecated Use DRIVER_EN_ROUTE instead */
    readonly ACTIVE: "active";
    /** @deprecated Use DRIVER_ARRIVED instead */
    readonly ARRIVED: "arrived";
};
export type ScheduledStatus = typeof SCHEDULED_STATUS[keyof typeof SCHEDULED_STATUS];
/**
 * Estados que indican que el viaje programado está activo (no finalizado)
 */
export declare const ACTIVE_SCHEDULED_STATES: ScheduledStatus[];
/**
 * Estados terminales (viaje programado finalizado)
 */
export declare const TERMINAL_SCHEDULED_STATES: ScheduledStatus[];
/**
 * Estados que requieren acción del driver
 */
export declare const DRIVER_ACTION_REQUIRED_SCHEDULED_STATES: ScheduledStatus[];
/**
 * Estados que permiten cancelación
 */
export declare const CANCELLABLE_SCHEDULED_STATES: ScheduledStatus[];
/**
 * Helper: Verificar si un scheduledStatus está activo
 */
export declare function isScheduledRideActive(status: ScheduledStatus): boolean;
/**
 * Helper: Verificar si un scheduledStatus es terminal
 */
export declare function isScheduledRideTerminal(status: ScheduledStatus): boolean;
/**
 * Helper: Verificar si requiere acción del driver
 */
export declare function requiresDriverAction(status: ScheduledStatus): boolean;
/**
 * Helper: Obtener label legible para usuario
 */
export declare function getScheduledStatusLabel(status: ScheduledStatus, role: 'driver' | 'passenger'): string;
//# sourceMappingURL=scheduledStatus.d.ts.map