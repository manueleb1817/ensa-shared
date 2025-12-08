import type { PaymentIntent, PaymentMethod, CreatePaymentIntentPayload, TipPayload, StripeConnectAccount } from '../types/Payment';
/**
 * ✅ Create payment intent
 */
export declare const createPaymentIntent: (payload: CreatePaymentIntentPayload, token: string) => Promise<PaymentIntent>;
/**
 * ✅ Confirm payment
 */
export declare const confirmPayment: (paymentIntentId: string, token: string) => Promise<PaymentIntent>;
/**
 * ✅ Add card (payment method)
 */
export declare const addPaymentMethod: (paymentMethodId: string, setAsDefault: boolean | undefined, token: string) => Promise<PaymentMethod>;
/**
 * ✅ Set default payment method
 */
export declare const setDefaultPaymentMethod: (paymentMethodId: string, token: string) => Promise<void>;
/**
 * ✅ Add tip
 */
export declare const addTip: (payload: TipPayload, token: string) => Promise<PaymentIntent>;
/**
 * ✅ Create Stripe Connect account (driver)
 */
export declare const createConnectAccount: (token: string) => Promise<{
    accountId: string;
    onboardingUrl: string;
}>;
/**
 * ✅ Get Stripe Connect account status
 */
export declare const getConnectAccountStatus: (token: string) => Promise<StripeConnectAccount>;
//# sourceMappingURL=payments.d.ts.map