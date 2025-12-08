// shared/src/api/passengers.ts

// ═══════════════════════════════════════════════════════════
// ✅ PASSENGERS API
// ═══════════════════════════════════════════════════════════

import { apiClient, extractErrorMessage } from './apiClient';
import { PASSENGER_ENDPOINTS, USER_ENDPOINTS } from '../constants/endpoints';
import type { Ride } from '../types/Ride';
import type { PaymentMethod } from '../types/Payment';

/**
 * ✅ Get passenger ride history
 */
export const getPassengerHistory = async (
  token: string,
  params?: {
    page?: number;
    limit?: number;
    status?: string[];
  }
): Promise<{ rides: Ride[]; total: number; page: number; totalPages: number }> => {
  console.log('[Passengers API] 📜 Getting ride history');
  
  try {
    const response = await apiClient.get(
      PASSENGER_ENDPOINTS.HISTORY,
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Passengers API] ✅ History retrieved:', response.data.rides.length, 'rides');
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Passengers API] ❌ Get history failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Get passenger scheduled rides
 */
export const getPassengerScheduledRides = async (
  token: string
): Promise<Ride[]> => {
  console.log('[Passengers API] 📅 Getting scheduled rides');
  
  try {
    const response = await apiClient.get<Ride[]>(
      PASSENGER_ENDPOINTS.SCHEDULED_RIDES,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Passengers API] ✅ Scheduled rides retrieved:', response.data.length);
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Passengers API] ❌ Get scheduled rides failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Get payment methods
 */
export const getPaymentMethods = async (token: string): Promise<PaymentMethod[]> => {
  console.log('[Passengers API] 💳 Getting payment methods');
  
  try {
    const response = await apiClient.get<PaymentMethod[]>(
      PASSENGER_ENDPOINTS.PAYMENT_METHODS,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Passengers API] ✅ Payment methods retrieved:', response.data.length);
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Passengers API] ❌ Get payment methods failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Delete payment method
 */
export const deletePaymentMethod = async (
  paymentMethodId: string,
  token: string
): Promise<void> => {
  console.log('[Passengers API] 🗑️ Deleting payment method:', paymentMethodId);
  
  try {
    await apiClient.delete(
      PASSENGER_ENDPOINTS.PAYMENT_METHOD(paymentMethodId),
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Passengers API] ✅ Payment method deleted');
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Passengers API] ❌ Delete payment method failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Get passenger debt information
 */
export interface PassengerDebtInfo {
  amount: number;
  description: string;
}

export const getPassengerDebtInfo = async (token: string): Promise<PassengerDebtInfo> => {
  console.log('[Passengers API] 💰 Getting debt info');
  
  try {
    const response = await apiClient.get<PassengerDebtInfo>(
      PASSENGER_ENDPOINTS.DEBT_INFO,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Passengers API] ✅ Debt info retrieved:', response.data.amount);
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Passengers API] ❌ Get debt info failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Get user balance
 */
export interface UserBalance {
  balance: number;
}

export const getUserBalance = async (token: string): Promise<UserBalance> => {
  console.log('[Passengers API] 💰 Getting user balance');
  
  try {
    const response = await apiClient.get<UserBalance>(
      USER_ENDPOINTS.BALANCE,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Passengers API] ✅ User balance retrieved:', response.data.balance);
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Passengers API] ❌ Get user balance failed:', message);
    throw new Error(message);
  }
};
