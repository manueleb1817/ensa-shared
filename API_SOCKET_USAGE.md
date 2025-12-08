# 🔌 API & Socket.io Manager - Documentación de Uso

## ✅ Prompt #2 Completado

Este documento explica cómo usar el **API Client** y **Socket.io Manager** creados en el Prompt #2.

---

## 📦 Archivos Creados

### **API Files:**
```
/shared/src/api/
├── apiClient.ts     ✅ Axios instance configurada
├── auth.ts          ✅ Login, register, logout
├── rides.ts         ✅ Immediate rides CRUD
├── debug.ts         ✅ Debug helpers
└── index.ts         ✅ Exports
```

### **Socket Files:**
```
/shared/src/socket/
├── socketManager.ts ✅ Socket connection manager
├── events.ts        ✅ TypeScript event definitions
├── debug.ts         ✅ Debug helpers
└── index.ts         ✅ Exports
```

---

## 🚀 Uso Básico

### **1. API Client - Authentication**

```typescript
import { login, register, logout, getCurrentUser } from 'ensa-shared/api';

// Login
const { user, token } = await login('test@example.com', 'password123');
console.log('Logged in:', user.nombre);

// Register
const { user, token } = await register({
  nombre: 'Juan Pérez',
  email: 'juan@example.com',
  password: 'password123',
  telefono: '+1234567890',
  rol: 'pasajero'
});

// Get current user
const currentUser = await getCurrentUser(token);

// Logout
await logout(token);
```

### **2. API Client - Rides**

```typescript
import { 
  getRideQuote, 
  requestRide, 
  getRide,
  acceptRide,
  startRide,
  completeRide,
  cancelRide 
} from 'ensa-shared/api';

// Get quote
const quote = await getRideQuote(
  { coordinates: [-71.0589, 42.3601] },  // origen
  [{ coordinates: [-71.0603, 42.3584] }], // paradas
  token
);
console.log('Fare:', quote.tarifa);

// Request ride
const ride = await requestRide({
  pasajeroId: user._id,
  origen: {
    descripcion: '123 Main St, Boston, MA',
    ubicacion: { coordinates: [-71.0589, 42.3601] }
  },
  paradas: [{
    descripcion: '456 Elm St, Boston, MA',
    ubicacion: { coordinates: [-71.0603, 42.3584] }
  }],
  metodoDePago: {
    type: 'card',
    paymentMethodId: 'pm_123456'
  }
}, token);
console.log('Ride requested:', ride._id);

// Accept ride (driver)
await acceptRide(rideId, conductorId, token);

// Start ride
await startRide(rideId, token);

// Complete ride
await completeRide(rideId, { cashReceived: true }, token);

// Cancel ride
await cancelRide(rideId, 'Passenger cancelled', token);
```

### **3. Socket.io Manager**

```typescript
import { 
  createSocket, 
  getSocket, 
  disconnectSocket,
  isConnected 
} from 'ensa-shared/socket';

// Create and connect
const socket = createSocket(userId, token);

// Listen to events
socket.on('newRideRequest', (ride) => {
  console.log('New ride request!', ride);
  // Show notification
});

socket.on('viaje-aceptado', ({ rideId, conductor }) => {
  console.log('Ride accepted by:', conductor.nombre);
});

socket.on('conductor-ubicacion-actualizada', ({ rideId, location }) => {
  console.log('Driver location:', location.coordinates);
  // Update map
});

// Emit events
socket.emit('aceptar-viaje', { 
  rideId: 'abc123', 
  conductorId: 'driver123' 
});

socket.emit('actualizar-ubicacion-conductor', {
  rideId: 'abc123',
  conductorId: 'driver123',
  location: { coordinates: [-71.0589, 42.3601] }
});

// Check connection
if (isConnected()) {
  console.log('Socket connected!');
}

// Disconnect
disconnectSocket();
```

---

## 🔧 Configuración Avanzada

### **Token Management**

```typescript
import { setAuthToken } from 'ensa-shared/api';

// Set token globally (applies to all subsequent requests)
setAuthToken(token);

// Now all API calls automatically include the token
await getRide(rideId, token);  // Still pass token explicitly
```

### **Error Handling**

```typescript
import { extractErrorMessage } from 'ensa-shared/api';

try {
  await login('invalid@email.com', 'wrongpassword');
} catch (error: any) {
  const message = extractErrorMessage(error);
  console.error('Login failed:', message);
  // Display user-friendly error
}
```

### **Retry Logic**

El API client automáticamente reintenta llamadas fallidas (solo errores de red):

```typescript
// Automáticamente reintenta hasta 3 veces con delay exponencial
// 1º intento: inmediato
// 2º intento: después de 1s
// 3º intento: después de 2s
// 4º intento: después de 4s

const ride = await getRide(rideId, token);
// Si falla por timeout, reintentará automáticamente
```

---

## 🧪 Debug & Testing

### **API Debug**

```typescript
import { debugApiCall, testBackendConnection } from 'ensa-shared/api/debug';

// Test connection
const isReachable = await testBackendConnection();
console.log('Backend reachable:', isReachable);

// Debug specific call
await debugApiCall(
  'POST',
  '/api/auth/login',
  { email: 'test@test.com', password: 'password' },
  { 'Content-Type': 'application/json' }
);
// Muestra logs detallados de request/response
```

### **Socket Debug**

```typescript
import { 
  debugSocketStatus, 
  logAllSocketEvents 
} from 'ensa-shared/socket/debug';

// Check status
debugSocketStatus();
// Muestra: Connected, Socket ID, Transport

// Log all events
logAllSocketEvents();
// Muestra todos los eventos entrantes/salientes
```

---

## 🌐 Platform Differences (Web vs Mobile)

### **Automatic Optimization**

```typescript
// WEB:
// - Timeout: 30s
// - Transports: ['websocket', 'polling']
// - Max reconnect: 5 attempts
// - Reconnect delay: 1s

// MOBILE:
// - Timeout: 15s
// - Transports: ['websocket']  ← Solo WebSocket
// - Max reconnect: 10 attempts
// - Reconnect delay: 0.5s

// El código es IDÉNTICO en ambas plataformas:
const socket = createSocket(userId, token);
// Automáticamente usa la config correcta
```

---

## 📊 Event Types (TypeScript)

```typescript
import type { 
  ClientToServerEvents, 
  ServerToClientEvents 
} from 'ensa-shared/socket';

// Type-safe events
const socket = getSocket();

socket?.on('viaje-aceptado', (data) => {
  // TypeScript sabe que data tiene { rideId, conductor }
  console.log(data.rideId);
  console.log(data.conductor.nombre);
});

socket?.emit('aceptar-viaje', {
  rideId: 'abc',
  conductorId: 'def'
  // TypeScript valida la estructura
});
```

---

## ⚠️ Important Notes

### **Field Names (Español)**

```typescript
// ✅ CORRECTO - Nombres en español
{
  pasajeroId: string,        // NO passengerId
  origen: { ... },           // NO origin
  paradas: [],               // NO stops/destinations
  metodoDePago: { ... }      // NO paymentMethod
}
```

### **Distance Units (MILLAS)**

```typescript
// ✅ Todas las distancias son en MILLAS
const quote = await getRideQuote(...);
console.log(quote.distancia); // Millas, NO kilómetros
```

### **Commission Rate**

```typescript
// ✅ Comisión: 25% ENSA, 75% Driver
import { ENSA_COMMISSION_RATE } from 'ensa-shared/constants';
console.log(ENSA_COMMISSION_RATE); // 0.25
```

---

## 🔄 Migration Guide (Web App)

### **Before (old code):**

```typescript
// ❌ Old: Multiple axios instances
import axios from 'axios';

const response = await axios.post('http://localhost:3000/api/auth/login', {
  email,
  password
});
```

### **After (shared code):**

```typescript
// ✅ New: Shared API client
import { login } from 'ensa-shared/api';

const { user, token } = await login(email, password);
```

---

## 📝 Next Steps (Prompt #3)

Los siguientes archivos se crearán en el **Prompt #3**:

```typescript
// scheduled.ts - Scheduled rides
export async function createScheduledRide(...)
export async function getMarketplace(...)
export async function acceptScheduledRide(...)

// drivers.ts - Driver operations
export async function getDriverEarnings(...)
export async function requestPayout(...)
export async function getDriverAgenda(...)

// passengers.ts - Passenger operations
export async function getPassengerHistory(...)
export async function addPaymentMethod(...)

// payments.ts - Stripe payments
export async function createPaymentIntent(...)
export async function confirmPayment(...)
export async function addTip(...)

// chat.ts - Chat messages
export async function sendMessage(...)
export async function getMessages(...)
```

---

## ✅ Testing Checklist

- [x] `npm run type-check` sin errores
- [x] Axios instalado
- [x] Socket.io-client instalado
- [x] TypeScript types funcionando
- [x] Platform detection funcionando
- [x] Retry logic implementado
- [x] Error handling consistente
- [ ] Probar en web app (Next.js)
- [ ] Probar en mobile app (cuando se cree)

---

**Última actualización:** Prompt #2 completado
**Archivos creados:** 9
**Líneas de código:** ~1,200
**Estado:** ✅ Listo para uso
