// shared/src/api/scheduled.ts

// ═══════════════════════════════════════════════════════════
// ✅ SCHEDULED RIDES API
// ═══════════════════════════════════════════════════════════

import { apiClient, extractErrorMessage } from './apiClient';
import { SCHEDULED_ENDPOINTS } from '../constants/endpoints';
import type { Ride, RequestRidePayload } from '../types/Ride';

/**
 * ✅ Create scheduled ride
 */
export const createScheduledRide = async (
  payload: RequestRidePayload & { scheduledTime: Date | string },
  token: string
): Promise<Ride> => {
  console.log('[Scheduled API] 📅 Creating scheduled ride');
  console.log('   Scheduled for:', payload.scheduledTime);
  console.log('   Origin:', payload.origen.descripcion);
  console.log('   Destination:', payload.paradas[payload.paradas.length - 1].descripcion);
  
  try {
    const response = await apiClient.post<Ride>(
      SCHEDULED_ENDPOINTS.CREATE,
      {
        ...payload,
        isScheduled: true
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Scheduled API] ✅ Scheduled ride created:', response.data._id);
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Scheduled API] ❌ Create failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Get marketplace (available scheduled rides for drivers)
 */
export const getMarketplace = async (
  lat: number,
  lng: number,
  token: string,
  radiusMiles: number = 25
): Promise<Ride[]> => {
  console.log('[Scheduled API] 🛒 Getting marketplace');
  console.log(`   Location: ${lat}, ${lng}`);
  console.log(`   Radius: ${radiusMiles} miles`);
  
  try {
    const response = await apiClient.get<Ride[]>(
      SCHEDULED_ENDPOINTS.MARKETPLACE,
      {
        params: {
          lat,
          lng,
          radius: radiusMiles
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Scheduled API] ✅ Marketplace retrieved:', response.data.length, 'rides');
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Scheduled API] ❌ Marketplace failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Accept scheduled ride (driver)
 */
export const acceptScheduledRide = async (
  rideId: string,
  conductorId: string,
  token: string
): Promise<Ride> => {
  console.log('[Scheduled API] ✅ Accepting scheduled ride:', rideId);
  
  try {
    const response = await apiClient.post<Ride>(
      SCHEDULED_ENDPOINTS.ACCEPT(rideId),
      { conductorId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Scheduled API] ✅ Scheduled ride accepted');
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Scheduled API] ❌ Accept failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Get my scheduled rides (passenger or driver)
 */
export const getMyScheduledRides = async (
  token: string,
  filters?: {
    status?: string[];
    startDate?: string;
    endDate?: string;
  }
): Promise<Ride[]> => {
  console.log('[Scheduled API] 📋 Getting my scheduled rides');
  
  try {
    const response = await apiClient.get<Ride[]>(
      SCHEDULED_ENDPOINTS.MY_RIDES,
      {
        params: filters,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Scheduled API] ✅ Scheduled rides retrieved:', response.data.length);
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Scheduled API] ❌ Get rides failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Confirm scheduled ride (driver confirms ready)
 */
export const confirmScheduledRide = async (
  rideId: string,
  token: string
): Promise<Ride> => {
  console.log('[Scheduled API] ✅ Confirming scheduled ride:', rideId);
  
  try {
    const response = await apiClient.post<Ride>(
      SCHEDULED_ENDPOINTS.CONFIRM(rideId),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Scheduled API] ✅ Scheduled ride confirmed');
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Scheduled API] ❌ Confirm failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Cancel scheduled ride
 */
export const cancelScheduledRide = async (
  rideId: string,
  motivo: string,
  token: string
): Promise<Ride> => {
  console.log('[Scheduled API] ❌ Canceling scheduled ride:', rideId);
  console.log('   Reason:', motivo);
  
  try {
    const response = await apiClient.post<Ride>(
      SCHEDULED_ENDPOINTS.CANCEL(rideId),
      { motivo },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Scheduled API] ✅ Scheduled ride canceled');
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Scheduled API] ❌ Cancel failed:', message);
    throw new Error(message);
  }
};
