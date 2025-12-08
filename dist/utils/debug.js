// shared/src/utils/debug.ts
// ═══════════════════════════════════════════════════════════
// ✅ DEBUG HELPERS
// ═══════════════════════════════════════════════════════════
import { Platform } from './platform';
import { calculateFare } from './pricing';
/**
 * ✅ Debug logger que muestra plataforma
 */
export const debugLog = (category, message, data) => {
    const platform = Platform.OS;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${platform.toUpperCase()}] [${category}] ${message}`);
    if (data) {
        console.log(data);
    }
};
/**
 * ✅ Validar pricing calculation
 */
export const debugPricing = (distanceMiles, durationMinutes, numberOfStops) => {
    debugLog('PRICING', 'Input parameters', {
        distanceMiles,
        durationMinutes,
        numberOfStops
    });
    const pricing = calculateFare(distanceMiles, durationMinutes, numberOfStops);
    debugLog('PRICING', 'Calculated breakdown', pricing);
    return pricing;
};
/**
 * ✅ Validar user object
 */
export const debugUser = (user) => {
    const requiredFields = ['_id', 'nombre', 'email', 'telefono', 'rol'];
    const missingFields = requiredFields.filter(field => !user[field]);
    if (missingFields.length > 0) {
        console.error(`❌ Missing user fields: ${missingFields.join(', ')}`);
        return false;
    }
    debugLog('USER', 'Valid user object', {
        id: user._id,
        nombre: user.nombre,
        rol: user.rol
    });
    return true;
};
/**
 * ✅ Validar ride object
 */
export const debugRide = (ride) => {
    const requiredFields = ['_id', 'pasajero', 'origen', 'paradas', 'estado'];
    const missingFields = requiredFields.filter(field => !ride[field]);
    if (missingFields.length > 0) {
        console.error(`❌ Missing ride fields: ${missingFields.join(', ')}`);
        return false;
    }
    debugLog('RIDE', 'Valid ride object', {
        id: ride._id,
        pasajero: ride.pasajero,
        estado: ride.estado,
        isScheduled: ride.isScheduled || false
    });
    return true;
};
//# sourceMappingURL=debug.js.map