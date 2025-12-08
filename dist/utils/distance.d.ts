/**
 * ✅ Calcular distancia entre dos coordenadas usando fórmula Haversine
 * @param lat1 - Latitud punto 1
 * @param lon1 - Longitud punto 1
 * @param lat2 - Latitud punto 2
 * @param lon2 - Longitud punto 2
 * @returns Distancia en MILLAS
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