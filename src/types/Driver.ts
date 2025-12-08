// ═══════════════════════════════════════════════════════════
// ✅ DRIVER TYPES
// ═══════════════════════════════════════════════════════════

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
  date: string;           // 'YYYY-MM-DD'
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
  disponible: boolean;  // Backend usa 'disponible' en español
  isActive?: boolean;
  currentRide?: string;  // Ride ID
  lastHeartbeatAt?: Date | string;
}

export interface DriverAvailabilityPayload {
  disponible: boolean;  // Backend usa 'disponible' en español
  location?: {
    coordinates: [number, number];
  };
}

export interface DriverHistoryParams {
  page?: number;
  limit?: number;
  startDate?: string;    // ISO date
  endDate?: string;      // ISO date
  status?: string[];     // ['completado', 'cancelado']
}
