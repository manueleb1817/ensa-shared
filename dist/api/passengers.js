// shared/src/api/passengers.ts
// ═══════════════════════════════════════════════════════════
// ✅ PASSENGERS API
// ═══════════════════════════════════════════════════════════
import { apiClient, extractErrorMessage } from './apiClient';
import { PASSENGER_ENDPOINTS, USER_ENDPOINTS } from '../constants/endpoints';
/**
 * ✅ Get passenger ride history
 */
export const getPassengerHistory = async (token, params) => {
    console.log('[Passengers API] 📜 Getting ride history');
    try {
        const response = await apiClient.get(PASSENGER_ENDPOINTS.HISTORY, {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Passengers API] ✅ History retrieved:', response.data.rides.length, 'rides');
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Passengers API] ❌ Get history failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Get passenger scheduled rides
 */
export const getPassengerScheduledRides = async (token) => {
    console.log('[Passengers API] 📅 Getting scheduled rides');
    try {
        const response = await apiClient.get(PASSENGER_ENDPOINTS.SCHEDULED_RIDES, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Passengers API] ✅ Scheduled rides retrieved:', response.data.length);
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Passengers API] ❌ Get scheduled rides failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Get payment methods
 */
export const getPaymentMethods = async (token) => {
    console.log('[Passengers API] 💳 Getting payment methods');
    try {
        const response = await apiClient.get(PASSENGER_ENDPOINTS.PAYMENT_METHODS, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Passengers API] ✅ Payment methods retrieved:', response.data.length);
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Passengers API] ❌ Get payment methods failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Delete payment method
 */
export const deletePaymentMethod = async (paymentMethodId, token) => {
    console.log('[Passengers API] 🗑️ Deleting payment method:', paymentMethodId);
    try {
        await apiClient.delete(PASSENGER_ENDPOINTS.PAYMENT_METHOD(paymentMethodId), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Passengers API] ✅ Payment method deleted');
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Passengers API] ❌ Delete payment method failed:', message);
        throw new Error(message);
    }
};
export const getPassengerDebtInfo = async (token) => {
    console.log('[Passengers API] 💰 Getting debt info');
    try {
        const response = await apiClient.get(PASSENGER_ENDPOINTS.DEBT_INFO, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Passengers API] ✅ Debt info retrieved:', response.data.amount);
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Passengers API] ❌ Get debt info failed:', message);
        throw new Error(message);
    }
};
export const getUserBalance = async (token) => {
    console.log('[Passengers API] 💰 Getting user balance');
    try {
        const response = await apiClient.get(USER_ENDPOINTS.BALANCE, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Passengers API] ✅ User balance retrieved:', response.data.balance);
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Passengers API] ❌ Get user balance failed:', message);
        throw new Error(message);
    }
};
//# sourceMappingURL=passengers.js.map