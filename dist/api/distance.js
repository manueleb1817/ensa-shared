// shared/src/api/distance.ts
/**
 * ═══════════════════════════════════════════════════════════
 * ✅ DISTANCE API - GOOGLE MAPS INTEGRATION
 * ═══════════════════════════════════════════════════════════
 *
 * Calcular distancias REALES usando Google Maps API
 * a través del backend (evita exponer API key en cliente)
 */
import { apiClient } from './apiClient';
// ═══════════════════════════════════════════════════════════
// API FUNCTIONS
// ═══════════════════════════════════════════════════════════
/**
 * ✅ Calcular distancia REAL entre dos puntos
 * usando Google Maps Distance Matrix API
 *
 * @param origin - Coordenadas de origen { lat, lng }
 * @param destination - Coordenadas de destino { lat, lng }
 * @param options - Opciones de cálculo
 * @returns Distancia y duración reales
 *
 * @example
 * const distance = await calculateRealDistance(
 *   { lat: 42.3601, lng: -71.0589 }, // Boston
 *   { lat: 40.7128, lng: -74.0060 }  // NYC
 * );
 * console.log(distance.distanceMiles); // 215.3 miles
 * console.log(distance.durationMinutes); // 258 minutes
 */
export const calculateRealDistance = async (origin, destination, options) => {
    const response = await apiClient.post('/distance/calculate', {
        origin,
        destination,
        ...options
    });
    return response.data;
};
/**
 * ✅ Calcular distancia TOTAL de una ruta con múltiples paradas
 * usando Google Maps Directions API
 *
 * @param origin - Coordenadas de origen
 * @param destination - Coordenadas de destino final
 * @param waypoints - Array de paradas intermedias
 * @param options - Opciones de cálculo
 * @returns Distancia total, duraciones y detalles de cada tramo
 *
 * @example
 * const route = await calculateRouteWithStops(
 *   { lat: 42.3601, lng: -71.0589 }, // Pickup
 *   { lat: 42.3736, lng: -71.1097 }, // Final dropoff
 *   [
 *     { lat: 42.3656, lng: -71.0776 }, // Stop 1
 *     { lat: 42.3702, lng: -71.0912 }  // Stop 2
 *   ]
 * );
 * console.log(route.totalDistanceMiles); // 8.5 miles
 * console.log(route.legs.length); // 3 legs
 */
export const calculateRouteWithStops = async (origin, destination, waypoints = [], options) => {
    const response = await apiClient.post('/distance/route', {
        origin,
        destination,
        waypoints,
        ...options
    });
    return response.data;
};
/**
 * ✅ Calcular distancia de viaje completo (pickup → stops → dropoff)
 *
 * @param driverLocation - Ubicación actual del conductor
 * @param pickupLocation - Ubicación de recogida del pasajero
 * @param dropoffLocation - Ubicación de destino final
 * @param stops - Paradas intermedias
 * @returns Distancia total y tiempo estimado
 */
export const calculateTripDistance = async (driverLocation, pickupLocation, dropoffLocation, stops = []) => {
    const response = await apiClient.post('/distance/trip', {
        driverLocation,
        pickupLocation,
        dropoffLocation,
        stops
    });
    return response.data;
};
//# sourceMappingURL=distance.js.map