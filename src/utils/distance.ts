// shared/src/utils/distance.ts

// ═══════════════════════════════════════════════════════════
// ✅ DISTANCE & GEOLOCATION UTILITIES
// ═══════════════════════════════════════════════════════════

/**
 * ✅ Calcular distancia entre dos coordenadas usando fórmula Haversine
 * @param lat1 - Latitud punto 1
 * @param lon1 - Longitud punto 1
 * @param lat2 - Latitud punto 2
 * @param lon2 - Longitud punto 2
 * @returns Distancia en MILLAS
 */
export const getDistanceBetween = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 3958.8; // Radio de la Tierra en millas
  
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  const distance = R * c; // Distancia en millas
  
  return distance;
};

/**
 * ✅ Convertir grados a radianes
 */
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * ✅ Formatear distancia para display
 */
export const formatDistance = (miles: number): string => {
  if (miles < 0.1) {
    return `${Math.round(miles * 5280)} ft`; // Convertir a pies
  }
  return `${miles.toFixed(1)} mi`;
};

/**
 * ✅ Validar coordenadas
 */
export const isValidCoordinates = (lat: number, lon: number): boolean => {
  return (
    lat >= -90 && lat <= 90 &&
    lon >= -180 && lon <= 180
  );
};

/**
 * ✅ Convertir metros a millas
 */
export const metersToMiles = (meters: number): number => {
  return meters / 1609.34;
};

/**
 * ✅ Convertir millas a metros
 */
export const milesToMeters = (miles: number): number => {
  return miles * 1609.34;
};
