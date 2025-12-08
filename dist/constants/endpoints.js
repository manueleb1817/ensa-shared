// shared/src/constants/endpoints.ts
// ═══════════════════════════════════════════════════════════
// ✅ API ENDPOINTS
// ═══════════════════════════════════════════════════════════
// Auth
export const AUTH_ENDPOINTS = {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
    REFRESH: '/api/auth/refresh',
};
// Rides
export const RIDE_ENDPOINTS = {
    REQUEST: '/api/rides/request',
    GET: (id) => `/api/rides/${id}`,
    ACCEPT: (id) => `/api/rides/${id}/accept`,
    START: (id) => `/api/rides/${id}/start`,
    COMPLETE: (id) => `/api/rides/${id}/complete`,
    CANCEL: (id) => `/api/rides/${id}/cancel`,
    RATE: (id) => `/api/rides/${id}/rate`,
    QUOTE: '/api/rides/quote',
    ACTIVE: '/api/rides/active',
    HISTORY: '/api/rides/history',
};
// Scheduled Rides
export const SCHEDULED_ENDPOINTS = {
    CREATE: '/api/scheduled-rides',
    MARKETPLACE: '/api/scheduled-rides/marketplace',
    ACCEPT: (id) => `/api/scheduled-rides/${id}/accept`,
    MY_RIDES: '/api/scheduled-rides/my-rides',
    CONFIRM: (id) => `/api/scheduled-rides/${id}/confirm`,
    CANCEL: (id) => `/api/scheduled-rides/${id}/cancel`,
    START: (id) => `/api/scheduled-rides/${id}/start-ride`,
};
// Drivers
export const DRIVER_ENDPOINTS = {
    STATUS: '/api/drivers/status',
    AVAILABILITY: '/api/drivers/availability',
    EARNINGS: '/api/drivers/earnings',
    HISTORY: '/api/drivers/history',
    PAYOUT_REQUEST: '/api/drivers/payout-request',
    AGENDA: '/api/drivers/agenda',
    LOCATION: '/api/drivers/location',
};
// Passengers
export const PASSENGER_ENDPOINTS = {
    HISTORY: '/api/passengers/history',
    SCHEDULED_RIDES: '/api/passengers/scheduled-rides',
    PAYMENT_METHODS: '/api/passengers/payment-methods',
    PAYMENT_METHOD: (id) => `/api/passengers/payment-methods/${id}`,
    PROFILE: '/api/passenger/profile',
    DEBT_INFO: '/api/passenger/debt-info',
};
// Payments
export const PAYMENT_ENDPOINTS = {
    CREATE_INTENT: '/api/payments/create-intent',
    CONFIRM: '/api/payments/confirm',
    ADD_CARD: '/api/payments/add-card',
    SET_DEFAULT: '/api/payments/set-default',
    TIP: (rideId) => `/api/rides/${rideId}/add-tip`,
    CREATE_CONNECT_ACCOUNT: '/api/payments/create-connect-account',
    CONNECT_ACCOUNT_STATUS: '/api/payments/connect-account-status',
};
// Users
export const USER_ENDPOINTS = {
    BALANCE: '/api/users/balance',
};
// Chat
export const CHAT_ENDPOINTS = {
    MESSAGES: (rideId) => `/api/chat/${rideId}/messages`,
    SEND: (rideId) => `/api/chat/${rideId}/send`,
};
//# sourceMappingURL=endpoints.js.map