// shared/src/api/rides.ts
// ═══════════════════════════════════════════════════════════
// ✅ RIDES API - IMMEDIATE RIDES CRUD
// ═══════════════════════════════════════════════════════════
import { apiClient, extractErrorMessage } from './apiClient';
import { RIDE_ENDPOINTS } from '../constants/endpoints';
/**
 * ✅ Request un quote (pricing estimate)
 */
export const getRideQuote = async (origen, paradas, token, stops) => {
    console.log('[Rides API] 💰 Getting ride quote');
    try {
        const response = await apiClient.post(RIDE_ENDPOINTS.QUOTE, {
            origen,
            paradas,
            stops
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Rides API] ✅ Quote received:', response.data.tarifa);
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Rides API] ❌ Quote failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Request immediate ride
 */
export const requestRide = async (payload, token) => {
    console.log('[Rides API] 🚗 Requesting immediate ride');
    console.log('   Origin:', payload.origen.descripcion);
    console.log('   Destination:', payload.paradas[payload.paradas.length - 1].descripcion);
    console.log('   Payment:', payload.metodoDePago.type);
    try {
        const response = await apiClient.post(RIDE_ENDPOINTS.REQUEST, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Rides API] ✅ Ride requested:', response.data._id);
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Rides API] ❌ Request failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Get ride by ID
 */
export const getRide = async (rideId, token) => {
    console.log('[Rides API] 🔍 Getting ride:', rideId);
    try {
        const response = await apiClient.get(RIDE_ENDPOINTS.GET(rideId), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Rides API] ✅ Ride retrieved:', response.data.estado);
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Rides API] ❌ Get ride failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Get active ride for current user
 */
export const getActiveRide = async (token) => {
    console.log('[Rides API] 🔍 Checking for active ride');
    try {
        const response = await apiClient.get('/api/rides/active', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.data.hasActiveRide) {
            console.log('[Rides API] ✅ Active ride found:', response.data.ride?._id);
        }
        else {
            console.log('[Rides API] ℹ️ No active ride');
        }
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Rides API] ❌ Check active ride failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Accept ride (driver)
 */
export const acceptRide = async (rideId, conductorId, token) => {
    console.log('[Rides API] ✅ Accepting ride:', rideId);
    try {
        const response = await apiClient.put(RIDE_ENDPOINTS.ACCEPT(rideId), { conductorId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Rides API] ✅ Ride accepted');
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Rides API] ❌ Accept failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Start ride (driver arrived at pickup)
 */
export const startRide = async (rideId, token) => {
    console.log('[Rides API] 🚀 Starting ride:', rideId);
    try {
        const response = await apiClient.post(RIDE_ENDPOINTS.START(rideId), {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Rides API] ✅ Ride started');
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Rides API] ❌ Start failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Complete ride
 */
export const completeRide = async (rideId, data, token) => {
    console.log('[Rides API] 🏁 Completing ride:', rideId);
    try {
        const response = await apiClient.post(RIDE_ENDPOINTS.COMPLETE(rideId), data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Rides API] ✅ Ride completed');
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Rides API] ❌ Complete failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Cancel ride
 */
export const cancelRide = async (rideId, motivo, token) => {
    console.log('[Rides API] ❌ Canceling ride:', rideId);
    console.log('   Reason:', motivo);
    try {
        const response = await apiClient.post(RIDE_ENDPOINTS.CANCEL(rideId), { motivo }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Rides API] ✅ Ride canceled');
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Rides API] ❌ Cancel failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Rate ride
 */
export const rateRide = async (rideId, rating, token) => {
    console.log('[Rides API] ⭐ Rating ride:', rideId);
    console.log('   Rating:', rating.puntuacion);
    try {
        await apiClient.post(RIDE_ENDPOINTS.RATE(rideId), rating, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Rides API] ✅ Ride rated');
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Rides API] ❌ Rating failed:', message);
        throw new Error(message);
    }
};
//# sourceMappingURL=rides.js.map