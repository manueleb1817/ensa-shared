import type { Ride } from '../types/Ride';
import type { PaymentMethod } from '../types/Payment';
/**
 * ✅ Get passenger ride history
 */
export declare const getPassengerHistory: (token: string, params?: {
    page?: number;
    limit?: number;
    status?: string[];
}) => Promise<{
    rides: Ride[];
    total: number;
    page: number;
    totalPages: number;
}>;
/**
 * ✅ Get passenger scheduled rides
 */
export declare const getPassengerScheduledRides: (token: string) => Promise<Ride[]>;
/**
 * ✅ Get payment methods
 */
export declare const getPaymentMethods: (token: string) => Promise<PaymentMethod[]>;
/**
 * ✅ Delete payment method
 */
export declare const deletePaymentMethod: (paymentMethodId: string, token: string) => Promise<void>;
/**
 * ✅ Get passenger debt information
 */
export interface PassengerDebtInfo {
    amount: number;
    description: string;
}
export declare const getPassengerDebtInfo: (token: string) => Promise<PassengerDebtInfo>;
/**
 * ✅ Get user balance
 */
export interface UserBalance {
    balance: number;
}
export declare const getUserBalance: (token: string) => Promise<UserBalance>;
//# sourceMappingURL=passengers.d.ts.map