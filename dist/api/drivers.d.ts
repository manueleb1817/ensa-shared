import type { DriverStatus, DriverEarnings, DriverAgenda, PayoutRequest, DriverAvailabilityPayload, DriverHistoryParams } from '../types/Driver';
import type { Ride } from '../types/Ride';
/**
 * ✅ Get driver status
 */
export declare const getDriverStatus: (token: string) => Promise<DriverStatus>;
/**
 * ✅ Update driver availability
 */
export declare const updateDriverAvailability: (payload: DriverAvailabilityPayload, token: string) => Promise<DriverStatus>;
/**
 * ✅ Get driver earnings
 */
export declare const getDriverEarnings: (startDate: string, endDate: string, token: string) => Promise<DriverEarnings>;
/**
 * ✅ Get driver ride history
 */
export declare const getDriverHistory: (params: DriverHistoryParams, token: string) => Promise<{
    rides: Ride[];
    total: number;
    page: number;
    totalPages: number;
}>;
/**
 * ✅ Request payout
 */
export declare const requestPayout: (amount: number, token: string) => Promise<PayoutRequest>;
/**
 * ✅ Get driver agenda (scheduled rides for specific date)
 */
export declare const getDriverAgenda: (date: string, // 'YYYY-MM-DD'
token: string) => Promise<DriverAgenda>;
/**
 * ✅ Update driver location
 */
export declare const updateDriverLocation: (lat: number, lon: number, token: string) => Promise<{
    message: string;
}>;
//# sourceMappingURL=drivers.d.ts.map