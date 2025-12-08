// ═══════════════════════════════════════════════════════════
// ✅ PAYMENT TYPES
// ═══════════════════════════════════════════════════════════

export interface PaymentMethod {
  id: string;
  brand: string;         // 'visa', 'mastercard', 'amex', 'discover'
  last4: string;
  isDefault: boolean;
  expiryMonth: number;
  expiryYear: number;
  createdAt?: Date | string;
}

export interface PaymentIntent {
  id: string;
  amount: number;        // En centavos (USD)
  currency: string;      // 'usd'
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled';
  clientSecret?: string;
  paymentMethodId?: string;
}

export interface StripeConnectAccount {
  id: string;
  charges_enabled: boolean;
  payouts_enabled: boolean;
  details_submitted: boolean;
  requirements?: {
    currently_due: string[];
    eventually_due: string[];
    pending_verification: string[];
  };
}

export interface AddCardPayload {
  paymentMethodId: string;
  setAsDefault?: boolean;
}

export interface CreatePaymentIntentPayload {
  amount: number;        // En dólares (se convertirá a centavos)
  rideId: string;
  pasajeroId: string;
  paymentMethodId?: string;
}

export interface TipPayload {
  rideId: string;
  amount: number;        // En dólares
  paymentMethodId: string;
}
