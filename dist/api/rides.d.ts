import type { Ride, RequestRidePayload, RideQuote } from '../types/Ride';
/**
 * ✅ Request un quote (pricing estimate)
 */
export declare const getRideQuote: (origen: {
    coordinates: [number, number];
}, paradas: Array<{
    coordinates: [number, number];
}>, token: string, stops?: Array<{
    coordinates: [number, number];
}>) => Promise<RideQuote>;
/**
 * ✅ Request immediate ride
 */
export declare const requestRide: (payload: RequestRidePayload, token: string) => Promise<Ride>;
/**
 * ✅ Get ride by ID
 */
export declare const getRide: (rideId: string, token: string) => Promise<Ride>;
/**
 * ✅ Get active ride for current user
 */
export declare const getActiveRide: (token: string) => Promise<{
    success: boolean;
    hasActiveRide: boolean;
    ride?: Ride;
    role?: "passenger" | "driver";
}>;
/**
 * ✅ Accept ride (driver)
 */
export declare const acceptRide: (rideId: string, conductorId: string, token: string) => Promise<Ride>;
/**
 * ✅ Start ride (driver arrived at pickup)
 */
export declare const startRide: (rideId: string, token: string) => Promise<Ride>;
/**
 * ✅ Complete ride
 */
export declare const completeRide: (rideId: string, data: {
    cashReceived?: boolean;
    montoRecibido?: number;
    notas?: string;
}, token: string) => Promise<Ride>;
/**
 * ✅ Cancel ride
 */
export declare const cancelRide: (rideId: string, motivo: string, token: string) => Promise<Ride>;
/**
 * ✅ Rate ride
 */
export declare const rateRide: (rideId: string, rating: {
    puntuacion: number;
    comentario?: string;
}, token: string) => Promise<void>;
//# sourceMappingURL=rides.d.ts.map