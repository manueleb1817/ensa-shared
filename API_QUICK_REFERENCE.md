# 🚀 API Quick Reference - ensa-shared

## 📦 Installation

```bash
# Ya instalado en tu proyecto
import { ... } from 'ensa-shared/api';
```

## 🔐 Authentication

```typescript
import { login, register, logout, getCurrentUser } from 'ensa-shared/api';

// Login
const { user, token } = await login('email@example.com', 'password');

// Register
const { user, token } = await register({
  nombre: 'John Doe',
  email: 'john@example.com',
  telefono: '1234567890',
  rol: 'pasajero'
});

// Get current user
const user = await getCurrentUser(token);

// Logout
await logout(token);
```

## 🚗 Immediate Rides

```typescript
import { 
  getRideQuote, 
  requestRide, 
  getRide,
  acceptRide,
  startRide,
  completeRide,
  cancelRide,
  rateRide
} from 'ensa-shared/api';

// Get quote
const quote = await getRideQuote(
  { descripcion: 'Origin', ubicacion: { coordinates: [-71.0589, 42.3601] } },
  [{ descripcion: 'Dest', ubicacion: { coordinates: [-71.0603, 42.3584] } }],
  token
);

// Request ride
const ride = await requestRide({
  pasajeroId: 'passenger-id',
  origen: { descripcion: 'Origin', ubicacion: { coordinates: [-71.0589, 42.3601] } },
  paradas: [{ descripcion: 'Dest', ubicacion: { coordinates: [-71.0603, 42.3584] } }],
  metodoDePago: { type: 'card', paymentMethodId: 'pm_xxx' }
}, token);

// Accept ride (driver)
const ride = await acceptRide('ride-id', 'driver-id', token);

// Start ride (driver)
const ride = await startRide('ride-id', token);

// Complete ride (driver)
const ride = await completeRide('ride-id', {
  tarifaFinal: 25.50,
  distanciaFinal: 5.2,
  duracionFinal: 15
}, token);

// Cancel ride
const ride = await cancelRide('ride-id', 'Cancelado por pasajero', token);

// Rate ride
await rateRide('ride-id', 5, token, 'Excelente servicio!');
```

## 📅 Scheduled Rides

```typescript
import { 
  createScheduledRide,
  getMarketplace,
  acceptScheduledRide,
  getMyScheduledRides,
  confirmScheduledRide,
  cancelScheduledRide
} from 'ensa-shared/api';

// Create scheduled ride
const scheduledTime = new Date();
scheduledTime.setHours(scheduledTime.getHours() + 2);

const ride = await createScheduledRide({
  pasajeroId: 'passenger-id',
  origen: { descripcion: 'Origin', ubicacion: { coordinates: [-71.0589, 42.3601] } },
  paradas: [{ descripcion: 'Dest', ubicacion: { coordinates: [-71.0603, 42.3584] } }],
  metodoDePago: { type: 'card', paymentMethodId: 'pm_xxx' },
  scheduledTime
}, token);

// Get marketplace (driver)
const rides = await getMarketplace(42.3601, -71.0589, token, 25); // 25 miles radius

// Accept scheduled ride (driver)
const ride = await acceptScheduledRide('ride-id', 'driver-id', token);

// Get my scheduled rides
const rides = await getMyScheduledRides(token, {
  status: ['pending', 'confirmed'],
  startDate: '2024-12-01',
  endDate: '2024-12-31'
});

// Confirm scheduled ride (driver)
const ride = await confirmScheduledRide('ride-id', token);

// Cancel scheduled ride
const ride = await cancelScheduledRide('ride-id', 'No disponible', token);
```

## 👨‍✈️ Drivers

```typescript
import { 
  getDriverStatus,
  updateDriverAvailability,
  getDriverEarnings,
  getDriverHistory,
  requestPayout,
  getDriverAgenda
} from 'ensa-shared/api';

// Get driver status
const status = await getDriverStatus(token);

// Update availability
const status = await updateDriverAvailability({
  available: true,
  location: { coordinates: [-71.0589, 42.3601] }
}, token);

// Get earnings
const earnings = await getDriverEarnings('2024-01-01', '2024-12-31', token);
// Returns:
// {
//   totalEarnings: 5000,
//   totalRides: 200,
//   averageEarningPerRide: 25,
//   pendingPayout: 500,
//   breakdown: { baseEarnings: 4500, tips: 500, total: 5000 }
// }

// Get ride history (with pagination)
const history = await getDriverHistory({
  page: 1,
  limit: 20,
  startDate: '2024-12-01',
  endDate: '2024-12-31',
  status: ['completado']
}, token);
// Returns: { rides: Ride[], total: 150, page: 1, totalPages: 8 }

// Request payout
const payout = await requestPayout(500, token);

// Get agenda for specific date
const agenda = await getDriverAgenda('2024-12-15', token);
// Returns:
// {
//   date: '2024-12-15',
//   scheduledRides: Ride[],
//   totalRides: 5,
//   estimatedEarnings: 150
// }
```

## 👥 Passengers

```typescript
import { 
  getPassengerHistory,
  getPassengerScheduledRides,
  getPaymentMethods,
  deletePaymentMethod
} from 'ensa-shared/api';

// Get ride history (with pagination)
const history = await getPassengerHistory(token, {
  page: 1,
  limit: 20,
  status: ['completado', 'cancelado']
});
// Returns: { rides: Ride[], total: 50, page: 1, totalPages: 3 }

// Get scheduled rides
const rides = await getPassengerScheduledRides(token);

// Get payment methods
const methods = await getPaymentMethods(token);
// Returns:
// [
//   { id: 'pm_xxx', brand: 'visa', last4: '4242', isDefault: true, ... }
// ]

// Delete payment method
await deletePaymentMethod('pm_xxx', token);
```

## 💳 Payments (Stripe)

```typescript
import { 
  createPaymentIntent,
  confirmPayment,
  addPaymentMethod,
  setDefaultPaymentMethod,
  addTip,
  createConnectAccount,
  getConnectAccountStatus
} from 'ensa-shared/api';

// Create payment intent
const intent = await createPaymentIntent({
  amount: 25.50,           // En dólares (se convierte automáticamente a centavos)
  rideId: 'ride-id',
  pasajeroId: 'passenger-id',
  paymentMethodId: 'pm_xxx'
}, token);

// Confirm payment
const intent = await confirmPayment('pi_xxx', token);

// Add payment method
const method = await addPaymentMethod('pm_xxx', true, token); // true = set as default

// Set default payment method
await setDefaultPaymentMethod('pm_xxx', token);

// Add tip
const intent = await addTip({
  rideId: 'ride-id',
  amount: 5.00,            // En dólares (se convierte automáticamente)
  paymentMethodId: 'pm_xxx'
}, token);

// Create Stripe Connect account (driver)
const { accountId, onboardingUrl } = await createConnectAccount(token);
// Open onboardingUrl in browser for driver to complete setup

// Get Connect account status (driver)
const account = await getConnectAccountStatus(token);
// Returns:
// {
//   id: 'acct_xxx',
//   charges_enabled: true,
//   payouts_enabled: true,
//   requirements: { currently_due: [], eventually_due: [] }
// }
```

## 💬 Chat

```typescript
import { 
  getChatMessages,
  sendChatMessage,
  markMessagesAsRead
} from 'ensa-shared/api';

// Get messages for ride
const messages = await getChatMessages('ride-id', token);
// Returns:
// [
//   {
//     _id: 'msg-1',
//     rideId: 'ride-id',
//     senderId: 'user-id',
//     senderName: 'John Doe',
//     senderRole: 'pasajero',
//     message: 'Hola!',
//     timestamp: '2024-12-06T10:00:00Z',
//     read: false,
//     delivered: true
//   }
// ]

// Send message
const message = await sendChatMessage('ride-id', 'Hola, voy en camino!', token);

// Mark messages as read
await markMessagesAsRead('ride-id', token); // All messages
await markMessagesAsRead('ride-id', token, ['msg-1', 'msg-2']); // Specific messages
```

## 🐛 Debug

```typescript
import { debugApiCall, testBackendConnection } from 'ensa-shared/api';

// Debug specific API call
await debugApiCall('GET', '/api/rides/ride-id', null, {
  Authorization: 'Bearer token'
});

// Test backend connection
await testBackendConnection();
```

## 🔌 Socket.io

```typescript
import { createSocket, getSocket, disconnectSocket } from 'ensa-shared/socket';

// Create socket connection
const socket = createSocket('user-id', 'token');

// Get existing socket
const socket = getSocket();

// Emit event
socket?.emit('solicitar-viaje', rideData);

// Listen for events
socket?.on('newRideRequest', (ride) => {
  console.log('Nueva solicitud de viaje:', ride);
});

// Disconnect
disconnectSocket();
```

## 📝 Type Imports

```typescript
// User types
import type { User, AuthResponse, LoginPayload } from 'ensa-shared/types';

// Ride types
import type { Ride, RideStatus, PaymentMethodType, Stop } from 'ensa-shared/types';

// Payment types
import type { PaymentMethod, PaymentIntent, StripeConnectAccount } from 'ensa-shared/types';

// Driver types
import type { DriverEarnings, DriverAgenda, DriverStatus } from 'ensa-shared/types';

// Chat types
import type { ChatMessage, SendMessagePayload } from 'ensa-shared/types';
```

## 🎯 Best Practices

### **Error Handling:**
```typescript
import { extractErrorMessage } from 'ensa-shared/api';

try {
  const ride = await requestRide(payload, token);
} catch (error: any) {
  const message = extractErrorMessage(error);
  console.error('Error:', message);
  // Show to user
}
```

### **Token Management:**
```typescript
import { setAuthToken } from 'ensa-shared/api';

// Set token globally (optional, can pass per request)
setAuthToken('your-token');

// Now you can omit token from calls
const user = await getCurrentUser(); // No token needed
```

### **Platform Detection:**
```typescript
import { isWeb, isMobile } from 'ensa-shared/utils';

if (isWeb()) {
  // Web-specific code
}

if (isMobile()) {
  // Mobile-specific code
}
```

### **Formatting:**
```typescript
import { formatCurrency, formatDistance } from 'ensa-shared/utils';

const price = formatCurrency(25.50); // "$25.50"
const distance = formatDistance(5.2); // "5.2 mi"
```

## 🚨 Important Notes

1. **Stripe Amounts:** Always pass amounts in dollars. The API converts to cents automatically.
2. **Dates:** Scheduled rides must be 30 minutes to 7 days in the future.
3. **Pagination:** Driver/Passenger history endpoints support pagination.
4. **Marketplace Radius:** Default is 25 miles, configurable.
5. **Coordinates:** Always [longitude, latitude] (GeoJSON format).

## 📚 Full Documentation

- [API_SOCKET_USAGE.md](./API_SOCKET_USAGE.md) - Comprehensive usage guide
- [MIGRATION_EXAMPLES.md](./MIGRATION_EXAMPLES.md) - Migration examples from old code
- [PROMPT_3_COMPLETE.md](./PROMPT_3_COMPLETE.md) - Implementation details
