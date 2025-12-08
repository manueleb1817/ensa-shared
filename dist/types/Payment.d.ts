export interface PaymentMethod {
    id: string;
    brand: string;
    last4: string;
    isDefault: boolean;
    expiryMonth: number;
    expiryYear: number;
    createdAt?: Date | string;
}
export interface PaymentIntent {
    id: string;
    amount: number;
    currency: string;
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
    amount: number;
    rideId: string;
    pasajeroId: string;
    paymentMethodId?: string;
}
export interface TipPayload {
    rideId: string;
    amount: number;
    paymentMethodId: string;
}
//# sourceMappingURL=Payment.d.ts.map