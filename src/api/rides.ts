// shared/src/api/rides.ts

// ═══════════════════════════════════════════════════════════
// ✅ RIDES API - IMMEDIATE RIDES CRUD
// ═══════════════════════════════════════════════════════════

import { apiClient, extractErrorMessage } from './apiClient';
import { RIDE_ENDPOINTS } from '../constants/endpoints';
import type { 
  Ride, 
  RequestRidePayload, 
  RideQuote 
} from '../types/Ride';

/**
 * ✅ Request un quote (pricing estimate)
 */
export const getRideQuote = async (
  origen: { coordinates: [number, number] },
  paradas: Array<{ coordinates: [number, number] }>,
  token: string,
  stops?: Array<{ coordinates: [number, number] }>
): Promise<RideQuote> => {
  console.log('[Rides API] 💰 Getting ride quote');
  
  try {
    const response = await apiClient.post<RideQuote>(
      RIDE_ENDPOINTS.QUOTE,
      {
        origen,
        paradas,
        stops
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Rides API] ✅ Quote received:', response.data.tarifa);
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Rides API] ❌ Quote failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Request immediate ride
 */
export const requestRide = async (
  payload: RequestRidePayload,
  token: string
): Promise<Ride> => {
  console.log('[Rides API] 🚗 Requesting immediate ride');
  console.log('   Origin:', payload.origen.descripcion);
  console.log('   Destination:', payload.paradas[payload.paradas.length - 1].descripcion);
  console.log('   Payment:', payload.metodoDePago.type);
  
  try {
    const response = await apiClient.post<Ride>(
      RIDE_ENDPOINTS.REQUEST,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Rides API] ✅ Ride requested:', response.data._id);
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Rides API] ❌ Request failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Get ride by ID
 */
export const getRide = async (
  rideId: string,
  token: string
): Promise<Ride> => {
  console.log('[Rides API] 🔍 Getting ride:', rideId);
  
  try {
    const response = await apiClient.get<Ride>(
      RIDE_ENDPOINTS.GET(rideId),
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Rides API] ✅ Ride retrieved:', response.data.estado);
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Rides API] ❌ Get ride failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Get active ride for current user
 */
export const getActiveRide = async (
  token: string
): Promise<{ success: boolean; hasActiveRide: boolean; ride?: Ride; role?: 'passenger' | 'driver' }> => {
  console.log('[Rides API] 🔍 Checking for active ride');
  
  try {
    const response = await apiClient.get<{ success: boolean; hasActiveRide: boolean; ride?: Ride; role?: 'passenger' | 'driver' }>(
      '/api/rides/active',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    if (response.data.hasActiveRide) {
      console.log('[Rides API] ✅ Active ride found:', response.data.ride?._id);
    } else {
      console.log('[Rides API] ℹ️ No active ride');
    }
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Rides API] ❌ Check active ride failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Accept ride (driver)
 */
export const acceptRide = async (
  rideId: string,
  conductorId: string,
  token: string
): Promise<Ride> => {
  console.log('[Rides API] ✅ Accepting ride:', rideId);
  
  try {
    const response = await apiClient.put<Ride>(
      RIDE_ENDPOINTS.ACCEPT(rideId),
      { conductorId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Rides API] ✅ Ride accepted');
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Rides API] ❌ Accept failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Start ride (driver arrived at pickup)
 */
export const startRide = async (
  rideId: string,
  token: string
): Promise<Ride> => {
  console.log('[Rides API] 🚀 Starting ride:', rideId);
  
  try {
    const response = await apiClient.post<Ride>(
      RIDE_ENDPOINTS.START(rideId),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Rides API] ✅ Ride started');
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Rides API] ❌ Start failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Complete ride
 */
export const completeRide = async (
  rideId: string,
  data: {
    cashReceived?: boolean;
    montoRecibido?: number;
    notas?: string;
  },
  token: string
): Promise<Ride> => {
  console.log('[Rides API] 🏁 Completing ride:', rideId);
  
  try {
    const response = await apiClient.post<Ride>(
      RIDE_ENDPOINTS.COMPLETE(rideId),
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Rides API] ✅ Ride completed');
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Rides API] ❌ Complete failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Cancel ride
 */
export const cancelRide = async (
  rideId: string,
  motivo: string,
  token: string
): Promise<Ride> => {
  console.log('[Rides API] ❌ Canceling ride:', rideId);
  console.log('   Reason:', motivo);
  
  try {
    const response = await apiClient.post<Ride>(
      RIDE_ENDPOINTS.CANCEL(rideId),
      { motivo },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Rides API] ✅ Ride canceled');
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Rides API] ❌ Cancel failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Rate ride
 */
export const rateRide = async (
  rideId: string,
  rating: {
    puntuacion: number;
    comentario?: string;
  },
  token: string
): Promise<void> => {
  console.log('[Rides API] ⭐ Rating ride:', rideId);
  console.log('   Rating:', rating.puntuacion);
  
  try {
    await apiClient.post(
      RIDE_ENDPOINTS.RATE(rideId),
      rating,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Rides API] ✅ Ride rated');
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Rides API] ❌ Rating failed:', message);
    throw new Error(message);
  }
};
