/**
 * ⚠️ DEPRECATED: Usar calculateRealDistance() del backend
 *
 * Calcular distancia APROXIMADA entre dos coordenadas usando Haversine (línea recta)
 *
 * ⚠️ IMPORTANTE: Esta función calcula distancia en LÍNEA RECTA, NO rutas reales.
 *    Para distancias de conducción, usar Google Maps Distance Matrix API.
 *
 * @param lat1 - Latitud punto 1
 * @param lon1 - Longitud punto 1
 * @param lat2 - Latitud punto 2
 * @param lon2 - Longitud punto 2
 * @returns Distancia aproximada en MILLAS (línea recta)
 *
 * @deprecated Usar API backend /api/distance/calculate para distancias reales
 */
export declare const getDistanceBetween: (lat1: number, lon1: number, lat2: number, lon2: number) => number;
/**
 * ✅ Formatear distancia para display
 */
export declare const formatDistance: (miles: number) => string;
/**
 * ✅ Validar coordenadas
 */
export declare const isValidCoordinates: (lat: number, lon: number) => boolean;
/**
 * ✅ Convertir metros a millas
 */
export declare const metersToMiles: (meters: number) => number;
/**
 * ✅ Convertir millas a metros
 */
export declare const milesToMeters: (miles: number) => number;
//# sourceMappingURL=distance.d.ts.map