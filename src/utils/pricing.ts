// shared/src/utils/pricing.ts

// ═══════════════════════════════════════════════════════════
// ✅ PRICING CALCULATIONS - SIEMPRE EN MILLAS
// ═══════════════════════════════════════════════════════════

import { 
  BASE_FARE, 
  PER_MILE, 
  PER_MINUTE, 
  MINIMUM_FARE, 
  CHARGE_PER_STOP,
  ENSA_COMMISSION_RATE,
  DRIVER_EARNINGS_RATE
} from '../constants/config';
import type { PricingBreakdown } from '../types/Ride';

/**
 * ✅ Calcular tarifa completa de un viaje
 * @param distanceMiles - Distancia en MILLAS
 * @param durationMinutes - Duración en minutos
 * @param numberOfStops - Número de paradas intermedias (0-3)
 * @returns PricingBreakdown completo
 */
export const calculateFare = (
  distanceMiles: number,
  durationMinutes: number,
  numberOfStops: number = 0
): PricingBreakdown => {
  
  console.log('💰 [Pricing] Calculating fare:');
  console.log(`   Distance: ${distanceMiles.toFixed(2)} miles`);
  console.log(`   Duration: ${durationMinutes} minutes`);
  console.log(`   Stops: ${numberOfStops}`);
  
  // Validaciones
  if (distanceMiles < 0 || durationMinutes < 0 || numberOfStops < 0) {
    throw new Error('Invalid pricing parameters');
  }
  
  // Precio base
  const basePrice = BASE_FARE;
  
  // Precio por distancia
  const distancePrice = distanceMiles * PER_MILE;
  
  // Precio por tiempo
  const timePrice = durationMinutes * PER_MINUTE;
  
  // Cargo por paradas (cada parada adicional)
  const stopsCharges = numberOfStops * CHARGE_PER_STOP;
  
  // Subtotal antes de aplicar minimum fare
  const subtotal = basePrice + distancePrice + timePrice + stopsCharges;
  
  // Aplicar minimum fare
  const finalPrice = Math.max(subtotal, MINIMUM_FARE);
  
  const breakdown: PricingBreakdown = {
    basePrice,
    distancePrice,
    timePrice,
    stopsCharges,
    finalPrice,
    distance: distanceMiles,
    duration: durationMinutes,
    isEstimated: true
  };
  
  console.log('💰 [Pricing] Breakdown:');
  console.log(`   Base: $${basePrice.toFixed(2)}`);
  console.log(`   Distance: $${distancePrice.toFixed(2)}`);
  console.log(`   Time: $${timePrice.toFixed(2)}`);
  console.log(`   Stops: $${stopsCharges.toFixed(2)}`);
  console.log(`   Subtotal: $${subtotal.toFixed(2)}`);
  console.log(`   Final: $${finalPrice.toFixed(2)}`);
  
  return breakdown;
};

/**
 * ✅ Calcular comisión de ENSA (25%)
 */
export const calculateCommission = (fareAmount: number): number => {
  const commission = fareAmount * ENSA_COMMISSION_RATE;
  console.log(`💵 [Pricing] Commission (25%): $${commission.toFixed(2)}`);
  return commission;
};

/**
 * ✅ Calcular ganancia del conductor (75%)
 */
export const calculateDriverEarnings = (fareAmount: number): number => {
  const earnings = fareAmount * DRIVER_EARNINGS_RATE;
  console.log(`💰 [Pricing] Driver earnings (75%): $${earnings.toFixed(2)}`);
  return earnings;
};

/**
 * ✅ Formatear precio para display
 */
export const formatPrice = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

/**
 * ✅ Calcular pricing con wait time de paradas
 */
export const calculateFareWithWaitTime = (
  distanceMiles: number,
  durationMinutes: number,
  stops: Array<{ waitTimeMinutes: number }>
): PricingBreakdown => {
  
  // Calcular base fare
  const baseFare = calculateFare(distanceMiles, durationMinutes, stops.length);
  
  // Calcular wait time charges
  const waitTimeCharges = stops.reduce((total, stop) => {
    // $0.50 por minuto de espera después de los primeros 2 minutos
    const chargeableMinutes = Math.max(0, stop.waitTimeMinutes - 2);
    return total + (chargeableMinutes * PER_MINUTE);
  }, 0);
  
  console.log(`💰 [Pricing] Wait time charges: $${waitTimeCharges.toFixed(2)}`);
  
  return {
    ...baseFare,
    stopsCharges: baseFare.stopsCharges + waitTimeCharges,
    finalPrice: baseFare.finalPrice + waitTimeCharges
  };
};
