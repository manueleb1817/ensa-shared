// shared/src/api/drivers.ts
// ═══════════════════════════════════════════════════════════
// ✅ DRIVERS API
// ═══════════════════════════════════════════════════════════
import { apiClient, extractErrorMessage } from './apiClient';
import { DRIVER_ENDPOINTS } from '../constants/endpoints';
/**
 * ✅ Get driver status
 */
export const getDriverStatus = async (token) => {
    console.log('[Drivers API] 📊 Getting driver status');
    try {
        const response = await apiClient.get(DRIVER_ENDPOINTS.STATUS, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Drivers API] ✅ Status retrieved:', response.data.disponible ? 'Available' : 'Unavailable');
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Drivers API] ❌ Get status failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Update driver availability
 */
export const updateDriverAvailability = async (payload, token) => {
    console.log('[Drivers API] 🔄 Updating availability:', payload.disponible ? 'Available' : 'Unavailable');
    try {
        const response = await apiClient.put(DRIVER_ENDPOINTS.AVAILABILITY, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Drivers API] ✅ Availability updated');
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Drivers API] ❌ Update availability failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Get driver earnings
 */
export const getDriverEarnings = async (startDate, endDate, token) => {
    console.log('[Drivers API] 💰 Getting earnings');
    console.log(`   Period: ${startDate} to ${endDate}`);
    try {
        const response = await apiClient.get(DRIVER_ENDPOINTS.EARNINGS, {
            params: {
                startDate,
                endDate
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Drivers API] ✅ Earnings retrieved: $', response.data.totalEarnings);
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Drivers API] ❌ Get earnings failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Get driver ride history
 */
export const getDriverHistory = async (params, token) => {
    console.log('[Drivers API] 📜 Getting ride history');
    console.log('   Params:', params);
    try {
        const response = await apiClient.get(DRIVER_ENDPOINTS.HISTORY, {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Drivers API] ✅ History retrieved:', response.data.rides.length, 'rides');
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Drivers API] ❌ Get history failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Request payout
 */
export const requestPayout = async (amount, token) => {
    console.log('[Drivers API] 💵 Requesting payout: $', amount);
    try {
        const response = await apiClient.post(DRIVER_ENDPOINTS.PAYOUT_REQUEST, { amount }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Drivers API] ✅ Payout requested:', response.data._id);
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Drivers API] ❌ Payout request failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Get driver agenda (scheduled rides for specific date)
 */
export const getDriverAgenda = async (date, // 'YYYY-MM-DD'
token) => {
    console.log('[Drivers API] 📅 Getting agenda for:', date);
    try {
        const response = await apiClient.get(DRIVER_ENDPOINTS.AGENDA, {
            params: { date },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Drivers API] ✅ Agenda retrieved:', response.data.totalRides, 'rides');
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Drivers API] ❌ Get agenda failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Update driver location
 */
export const updateDriverLocation = async (lat, lon, token) => {
    console.log('[Drivers API] 📍 Updating location:', { lat, lon });
    try {
        const response = await apiClient.put(DRIVER_ENDPOINTS.LOCATION, { lat, lon }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Drivers API] ✅ Location updated');
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Drivers API] ❌ Update location failed:', message);
        throw new Error(message);
    }
};
//# sourceMappingURL=drivers.js.map