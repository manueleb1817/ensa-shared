import type { RideStatus } from '../types/Ride';
export declare const RIDE_STATES: {
    readonly SCHEDULED: RideStatus;
    readonly PENDING: RideStatus;
    readonly ACCEPTED: RideStatus;
    readonly DRIVER_ARRIVING: RideStatus;
    readonly IN_PROGRESS: RideStatus;
    readonly COMPLETED: RideStatus;
    readonly COMPLETED_DEBT: RideStatus;
    readonly CANCELLED: RideStatus;
    readonly NOT_ASSIGNED: RideStatus;
    readonly CONFIRMED: RideStatus;
    readonly ACTIVE: RideStatus;
    readonly ACTIVATION_SENT: RideStatus;
    readonly DRIVER_CONFIRMED: RideStatus;
    readonly DRIVER_EN_ROUTE: RideStatus;
    readonly CONDUCTOR_EN_CAMINO: RideStatus;
    readonly ARRIVED: RideStatus;
    readonly CONDUCTOR_LLEGO: RideStatus;
    readonly DRIVER_ARRIVED: RideStatus;
};
export declare const ACTIVE_RIDE_STATES: RideStatus[];
export declare const COMPLETED_RIDE_STATES: RideStatus[];
export declare const IN_PROGRESS_STATES: RideStatus[];
export declare const SCHEDULED_RIDE_ACTIVE_STATES: RideStatus[];
export type RidePhase = 'confirmation' | 'en_route' | 'waiting' | 'in_progress';
export declare const getPhaseFromStatus: (status: string, isScheduled?: boolean) => RidePhase;
//# sourceMappingURL=rideStates.d.ts.map