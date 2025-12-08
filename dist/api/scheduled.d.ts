import type { Ride, RequestRidePayload } from '../types/Ride';
/**
 * ✅ Create scheduled ride
 */
export declare const createScheduledRide: (payload: RequestRidePayload & {
    scheduledTime: Date | string;
}, token: string) => Promise<Ride>;
/**
 * ✅ Get marketplace (available scheduled rides for drivers)
 */
export declare const getMarketplace: (lat: number, lng: number, token: string, radiusMiles?: number) => Promise<Ride[]>;
/**
 * ✅ Accept scheduled ride (driver)
 */
export declare const acceptScheduledRide: (rideId: string, conductorId: string, token: string) => Promise<Ride>;
/**
 * ✅ Get my scheduled rides (passenger or driver)
 */
export declare const getMyScheduledRides: (token: string, filters?: {
    status?: string[];
    startDate?: string;
    endDate?: string;
}) => Promise<Ride[]>;
/**
 * ✅ Confirm scheduled ride (driver confirms ready)
 */
export declare const confirmScheduledRide: (rideId: string, token: string) => Promise<Ride>;
/**
 * ✅ Cancel scheduled ride
 */
export declare const cancelScheduledRide: (rideId: string, motivo: string, token: string) => Promise<Ride>;
//# sourceMappingURL=scheduled.d.ts.map