// shared/src/api/payments.ts

// ═══════════════════════════════════════════════════════════
// ✅ PAYMENTS API (STRIPE)
// ═══════════════════════════════════════════════════════════

import { apiClient, extractErrorMessage } from './apiClient';
import { PAYMENT_ENDPOINTS } from '../constants/endpoints';
import type { 
  PaymentIntent, 
  PaymentMethod,
  AddCardPayload,
  CreatePaymentIntentPayload,
  TipPayload,
  StripeConnectAccount
} from '../types/Payment';

/**
 * ✅ Create payment intent
 */
export const createPaymentIntent = async (
  payload: CreatePaymentIntentPayload,
  token: string
): Promise<PaymentIntent> => {
  console.log('[Payments API] 💳 Creating payment intent');
  console.log('   Amount: $', payload.amount);
  console.log('   Ride:', payload.rideId);
  
  try {
    const response = await apiClient.post<PaymentIntent>(
      PAYMENT_ENDPOINTS.CREATE_INTENT,
      {
        ...payload,
        amount: Math.round(payload.amount * 100) // Convertir a centavos
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Payments API] ✅ Payment intent created:', response.data.id);
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Payments API] ❌ Create intent failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Confirm payment
 */
export const confirmPayment = async (
  paymentIntentId: string,
  token: string
): Promise<PaymentIntent> => {
  console.log('[Payments API] ✅ Confirming payment:', paymentIntentId);
  
  try {
    const response = await apiClient.post<PaymentIntent>(
      PAYMENT_ENDPOINTS.CONFIRM,
      { paymentIntentId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Payments API] ✅ Payment confirmed');
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Payments API] ❌ Confirm payment failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Add card (payment method)
 */
export const addPaymentMethod = async (
  paymentMethodId: string,
  setAsDefault: boolean = false,
  token: string
): Promise<PaymentMethod> => {
  console.log('[Payments API] 💳 Adding payment method');
  console.log('   Payment Method ID:', paymentMethodId);
  console.log('   Set as default:', setAsDefault);
  
  try {
    const response = await apiClient.post<PaymentMethod>(
      PAYMENT_ENDPOINTS.ADD_CARD,
      {
        paymentMethodId,
        setAsDefault
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Payments API] ✅ Payment method added');
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Payments API] ❌ Add payment method failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Set default payment method
 */
export const setDefaultPaymentMethod = async (
  paymentMethodId: string,
  token: string
): Promise<void> => {
  console.log('[Payments API] ⭐ Setting default payment method:', paymentMethodId);
  
  try {
    await apiClient.post(
      PAYMENT_ENDPOINTS.SET_DEFAULT,
      { paymentMethodId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Payments API] ✅ Default payment method set');
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Payments API] ❌ Set default failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Add tip
 */
export const addTip = async (
  payload: TipPayload,
  token: string
): Promise<PaymentIntent> => {
  console.log('[Payments API] 💵 Adding tip');
  console.log('   Amount: $', payload.amount);
  console.log('   Ride:', payload.rideId);
  
  try {
    const response = await apiClient.post<PaymentIntent>(
      PAYMENT_ENDPOINTS.TIP(payload.rideId),
      {
        amount: Math.round(payload.amount * 100), // Convertir a centavos
        paymentMethodId: payload.paymentMethodId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Payments API] ✅ Tip added');
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Payments API] ❌ Add tip failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Create Stripe Connect account (driver)
 */
export const createConnectAccount = async (
  token: string
): Promise<{ accountId: string; onboardingUrl: string }> => {
  console.log('[Payments API] 🔗 Creating Stripe Connect account');
  
  try {
    const response = await apiClient.post(
      PAYMENT_ENDPOINTS.CREATE_CONNECT_ACCOUNT,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Payments API] ✅ Connect account created:', response.data.accountId);
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Payments API] ❌ Create connect account failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Get Stripe Connect account status
 */
export const getConnectAccountStatus = async (
  token: string
): Promise<StripeConnectAccount> => {
  console.log('[Payments API] 📊 Getting Connect account status');
  
  try {
    const response = await apiClient.get<StripeConnectAccount>(
      PAYMENT_ENDPOINTS.CONNECT_ACCOUNT_STATUS,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Payments API] ✅ Connect account status retrieved');
    console.log('   Charges enabled:', response.data.charges_enabled);
    console.log('   Payouts enabled:', response.data.payouts_enabled);
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Payments API] ❌ Get connect status failed:', message);
    throw new Error(message);
  }
};
