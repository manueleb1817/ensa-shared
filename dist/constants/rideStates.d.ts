import type { RideStatus } from '../types/Ride';
/**
 * Constantes centralizadas para estados de viajes
 * CRÍTICO: Deben coincidir EXACTAMENTE con backend/constants/rideStates.js
 */
export declare const RIDE_STATES: {
    readonly SCHEDULED: RideStatus;
    readonly PENDING: RideStatus;
    readonly ACCEPTED: RideStatus;
    readonly DRIVER_AT_ORIGIN: RideStatus;
    readonly IN_PROGRESS: RideStatus;
    readonly COMPLETED: RideStatus;
    readonly COMPLETED_DEBT: RideStatus;
    readonly CANCELLED: RideStatus;
    readonly UNASSIGNED: RideStatus;
    readonly EXPIRED: RideStatus;
    /** @deprecated Use DRIVER_AT_ORIGIN instead */
    readonly DRIVER_ARRIVING: RideStatus;
    /** @deprecated Use DRIVER_AT_ORIGIN instead */
    readonly CONDUCTOR_EN_CAMINO: RideStatus;
    /** @deprecated Use DRIVER_AT_ORIGIN instead */
    readonly CONDUCTOR_LLEGO: RideStatus;
    /** @deprecated Use DRIVER_AT_ORIGIN instead */
    readonly DRIVER_ARRIVED: RideStatus;
    /** @deprecated Use DRIVER_AT_ORIGIN instead */
    readonly ARRIVED: RideStatus;
};
export declare const ACTIVE_RIDE_STATES: RideStatus[];
export declare const TERMINAL_STATES: RideStatus[];
export declare const DRIVER_ACTION_REQUIRED_STATES: RideStatus[];
export declare const CANCELLABLE_STATES: RideStatus[];
export type RidePhase = 'confirmation' | 'en_route' | 'waiting' | 'in_progress';
export declare const getPhaseFromStatus: (status: string, isScheduled?: boolean) => RidePhase;
/**
 * Normaliza estados legacy a los estados actuales
 */
export declare const normalizeState: (estado: string) => string;
/**
 * Obtiene el label legible de un estado según el rol del usuario
 */
export declare const getStateLabel: (estado: string, role: "driver" | "passenger") => string;
/**
 * Verifica si un estado es activo (no terminal)
 */
export declare const isActiveState: (estado: string) => boolean;
/**
 * Verifica si un estado es terminal (finalizado)
 */
export declare const isTerminalState: (estado: string) => boolean;
//# sourceMappingURL=rideStates.d.ts.map