import type { PricingBreakdown } from '../types/Ride';
/**
 * ✅ Calcular tarifa completa de un viaje
 * @param distanceMiles - Distancia en MILLAS
 * @param durationMinutes - Duración en minutos
 * @param numberOfStops - Número de paradas intermedias (0-3)
 * @returns PricingBreakdown completo
 */
export declare const calculateFare: (distanceMiles: number, durationMinutes: number, numberOfStops?: number) => PricingBreakdown;
/**
 * ✅ Calcular comisión de ENSA (25%)
 */
export declare const calculateCommission: (fareAmount: number) => number;
/**
 * ✅ Calcular ganancia del conductor (75%)
 */
export declare const calculateDriverEarnings: (fareAmount: number) => number;
/**
 * ✅ Formatear precio para display
 */
export declare const formatPrice: (amount: number) => string;
/**
 * ✅ Calcular pricing con wait time de paradas
 */
export declare const calculateFareWithWaitTime: (distanceMiles: number, durationMinutes: number, stops: Array<{
    waitTimeMinutes: number;
}>) => PricingBreakdown;
//# sourceMappingURL=pricing.d.ts.map