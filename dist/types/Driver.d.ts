import type { Ride } from './Ride';
export interface DriverEarnings {
    totalEarnings: number;
    totalRides: number;
    averageEarningPerRide: number;
    pendingPayout: number;
    completedPayouts: number;
    lastPayout?: {
        amount: number;
        date: Date | string;
    };
    breakdown?: {
        baseEarnings: number;
        tips: number;
        total: number;
    };
}
export interface DriverAgenda {
    date: string;
    scheduledRides: Ride[];
    totalRides: number;
    estimatedEarnings: number;
}
export interface PayoutRequest {
    _id: string;
    conductorId: string;
    amount: number;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    requestedAt: Date | string;
    processedAt?: Date | string;
    failureReason?: string;
}
export interface DriverStatus {
    disponible: boolean;
    isActive?: boolean;
    currentRide?: string;
    lastHeartbeatAt?: Date | string;
}
export interface DriverAvailabilityPayload {
    disponible: boolean;
    location?: {
        coordinates: [number, number];
    };
}
export interface DriverHistoryParams {
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
    status?: string[];
}
//# sourceMappingURL=Driver.d.ts.map