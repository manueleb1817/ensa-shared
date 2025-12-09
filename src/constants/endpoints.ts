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
  GET: (id: string) => `/api/rides/${id}`,
  ACCEPT: (id: string) => `/api/rides/${id}/accept`,
  START: (id: string) => `/api/rides/${id}/start`,
  COMPLETE: (id: string) => `/api/rides/${id}/complete`,
  CANCEL: (id: string) => `/api/rides/${id}/cancel`,
  RATE: (id: string) => `/api/rides/${id}/rate`,
  QUOTE: '/api/rides/quote',
  ACTIVE: '/api/rides/active',
  HISTORY: '/api/rides/history',
};

// Scheduled Rides
export const SCHEDULED_ENDPOINTS = {
  CREATE: '/api/scheduled-rides',
  MARKETPLACE: '/api/scheduled-rides/marketplace',
  ACCEPT: (id: string) => `/api/scheduled-rides/${id}/accept`,
  MY_RIDES: '/api/scheduled-rides/my-rides',
  CONFIRM: (id: string) => `/api/scheduled-rides/${id}/confirm`,
  CANCEL: (id: string) => `/api/scheduled-rides/${id}/cancel`,
  START: (id: string) => `/api/scheduled-rides/${id}/start-ride`,
};

// Drivers
export const DRIVER_ENDPOINTS = {
  STATUS: '/api/driver/status',
  AVAILABILITY: '/api/driver/availability',
  EARNINGS: '/api/driver/earnings',
  HISTORY: '/api/driver/history',
  PAYOUT_REQUEST: '/api/driver/payout-request',
  AGENDA: '/api/driver/agenda',
  LOCATION: '/api/driver/location',
};

// Passengers
export const PASSENGER_ENDPOINTS = {
  HISTORY: '/api/passengers/history',
  SCHEDULED_RIDES: '/api/passengers/scheduled-rides',
  PAYMENT_METHODS: '/api/passengers/payment-methods',
  PAYMENT_METHOD: (id: string) => `/api/passengers/payment-methods/${id}`,
  PROFILE: '/api/passenger/profile',
  DEBT_INFO: '/api/passenger/debt-info',
};

// Payments
export const PAYMENT_ENDPOINTS = {
  CREATE_INTENT: '/api/payments/create-intent',
  CONFIRM: '/api/payments/confirm',
  ADD_CARD: '/api/payments/add-card',
  SET_DEFAULT: '/api/payments/set-default',
  TIP: (rideId: string) => `/api/rides/${rideId}/add-tip`,
  CREATE_CONNECT_ACCOUNT: '/api/payments/create-connect-account',
  CONNECT_ACCOUNT_STATUS: '/api/payments/connect-account-status',
};

// Users
export const USER_ENDPOINTS = {
  BALANCE: '/api/users/balance',
};

// Chat
export const CHAT_ENDPOINTS = {
  MESSAGES: (rideId: string) => `/api/chat/${rideId}/messages`,
  SEND: (rideId: string) => `/api/chat/${rideId}/send`,
};
