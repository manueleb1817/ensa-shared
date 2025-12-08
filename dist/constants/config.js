// shared/src/constants/config.ts
// ═══════════════════════════════════════════════════════════
// ✅ APP CONFIGURATION - ENSA TRANSPORTATION
// ═══════════════════════════════════════════════════════════
// ✅ PRICING (SIEMPRE EN MILLAS)
export const BASE_FARE = 2.50; // Tarifa base
export const PER_MILE = 2.50; // Por milla
export const PER_MINUTE = 0.50; // Por minuto
export const MINIMUM_FARE = 8.00; // Tarifa mínima
// ✅ MULTI-STOP
export const CHARGE_PER_STOP = 2.50; // Cargo por parada adicional
export const MAX_STOPS = 3; // Máximo 3 paradas intermedias
export const MAX_WAIT_TIME_MINUTES = 5; // Tiempo máximo de espera por parada
// ✅ COMMISSION
export const ENSA_COMMISSION_RATE = 0.25; // 25% comisión
export const DRIVER_EARNINGS_RATE = 0.75; // 75% para conductor
// ✅ SCHEDULED RIDES
export const MIN_SCHEDULE_ADVANCE_MINUTES = 30; // Mínimo 30 min antes
export const MAX_SCHEDULE_ADVANCE_DAYS = 7; // Máximo 7 días antes
export const SCHEDULED_RIDE_RADIUS_MILES = 25; // Radio de marketplace: 25 millas
export const ACTIVATION_TIME_MINUTES = 5; // Activar 5 min antes
// ✅ TIMEOUTS
export const DRIVER_RESPONSE_TIMEOUT_SECONDS = 30; // 30s para aceptar
export const MAX_DRIVER_BROADCAST_ATTEMPTS = 5; // Máximo 5 conductores
// ✅ API
// Para web (Next.js): process.env.NEXT_PUBLIC_API_BASE_URL
// Para mobile (React Native): process.env.EXPO_PUBLIC_API_BASE_URL
// Fallback: Render production
export const API_BASE_URL = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_BASE_URL) ||
    (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_API_BASE_URL) ||
    'https://ensa-backend.onrender.com';
export const API_TIMEOUT_WEB_MS = 30000; // 30s timeout web
export const API_TIMEOUT_MOBILE_MS = 15000; // 15s timeout mobile
export const API_RETRY_ATTEMPTS = 3; // 3 reintentos
// ✅ SOCKET.IO
export const SOCKET_RECONNECT_DELAY_WEB_MS = 1000; // 1s delay web
export const SOCKET_RECONNECT_DELAY_MOBILE_MS = 500; // 0.5s delay mobile
export const SOCKET_MAX_RECONNECT_ATTEMPTS_WEB = 5; // 5 intentos web
export const SOCKET_MAX_RECONNECT_ATTEMPTS_MOBILE = 10; // 10 intentos mobile
// ✅ LOCATION
export const LOCATION_UPDATE_INTERVAL_MS = 5000; // Actualizar cada 5s
export const LOCATION_ACCURACY_THRESHOLD_METERS = 50; // 50m de precisión mínima
// ✅ STRIPE
export const STRIPE_CURRENCY = 'usd';
export const STRIPE_COUNTRY = 'US';
//# sourceMappingURL=config.js.map