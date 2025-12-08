// shared/src/api/index.ts

// ═══════════════════════════════════════════════════════════
// ✅ API EXPORTS - COMPLETE
// ═══════════════════════════════════════════════════════════

// API Client
export { apiClient, setAuthToken, extractErrorMessage } from './apiClient';

// Auth
export { login, register, logout, getCurrentUser } from './auth';

// Rides (immediate)
export { 
  getRideQuote,
  requestRide,
  getRide,
  getActiveRide,
  acceptRide,
  startRide,
  completeRide,
  cancelRide,
  rateRide
} from './rides';

// Scheduled Rides
export {
  createScheduledRide,
  getMarketplace,
  acceptScheduledRide,
  getMyScheduledRides,
  confirmScheduledRide,
  cancelScheduledRide
} from './scheduled';

// Drivers
export {
  getDriverStatus,
  updateDriverAvailability,
  updateDriverLocation,
  getDriverEarnings,
  getDriverHistory,
  requestPayout,
  getDriverAgenda
} from './drivers';

// Passengers
export {
  getPassengerHistory,
  getPassengerScheduledRides,
  getPaymentMethods,
  deletePaymentMethod,
  getPassengerDebtInfo,
  getUserBalance,
  type PassengerDebtInfo,
  type UserBalance,
} from './passengers';

// Payments
export {
  createPaymentIntent,
  confirmPayment,
  addPaymentMethod,
  setDefaultPaymentMethod,
  addTip,
  createConnectAccount,
  getConnectAccountStatus
} from './payments';

// Chat
export {
  getChatMessages,
  sendChatMessage,
  markMessagesAsRead
} from './chat';

// Debug
export { debugApiCall, testBackendConnection } from './debug';
