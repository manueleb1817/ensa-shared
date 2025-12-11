# ENSA Shared Code

Código compartido entre la aplicación web (Next.js) y mobile (React Native).

## 📦 Instalación

```bash
cd shared
npm install
```

## 🏗️ Estructura

```
shared/
├── src/
│   ├── types/          # TypeScript interfaces
│   ├── constants/      # Configuración y constantes
│   ├── utils/          # Utilidades y business logic
│   ├── api/            # API calls (próximamente)
│   └── socket/         # Socket.io logic (próximamente)
├── package.json
└── tsconfig.json
```

## 🚀 Uso

### En Next.js (Web)

```typescript
import { calculateFare, ENSA_GREEN } from 'ensa-shared';
import type { User, Ride } from 'ensa-shared';

const fare = calculateFare(5.2, 15, 0);
console.log(fare.finalPrice); // $21.50
```

### En React Native (Mobile)

```typescript
import { calculateFare, ENSA_GREEN } from 'ensa-shared';
import type { User, Ride } from 'ensa-shared';

const fare = calculateFare(5.2, 15, 0);
console.log(fare.finalPrice); // $21.50
```

## ✅ Type Checking

```bash
npm run type-check
```

## 📊 Exports Principales

### Types
- `User` - Interface de usuario validada
- `Ride` - Interface de viaje validada
- `PricingBreakdown` - Desglose de pricing
- `Coordinates` - Coordenadas `{ lat, lng }`
- `DistanceResult` - Resultado de cálculo de distancia
- `RouteWithStopsResult` - Resultado de ruta con paradas

### Constants
- `BASE_FARE`, `PER_MILE`, `PER_MINUTE` - Pricing config
- `ENSA_GREEN`, `ENSA_RED` - Color palette
- `API_BASE_URL`, endpoints - API configuration

### Utils
- `calculateFare()` - Cálculo de tarifas
- `formatPrice()` - Formateo de precios
- ⚠️ `getDistanceBetween()` - **DEPRECATED**: Distancia Haversine (línea recta)
- `Platform.select()` - Platform-specific values

### API (Distancias Reales - Google Maps)
- ✅ `calculateRealDistance()` - Distancia REAL entre 2 puntos (Google Maps)
- ✅ `calculateRouteWithStops()` - Ruta con múltiples paradas
- ✅ `calculateTripDistance()` - Viaje completo (conductor → pickup → paradas → dropoff)

**Uso recomendado:**
```typescript
import { calculateRealDistance } from 'ensa-shared';

// ✅ MEJOR: Distancia real por carretera
const distance = await calculateRealDistance(
  { lat: 42.3601, lng: -71.0589 }, // Boston
  { lat: 40.7128, lng: -74.0060 }  // NYC
);
console.log(distance.distanceMiles);        // 215.3 mi (ruta real)
console.log(distance.durationMinutes);      // 258 min
console.log(distance.durationInTrafficMinutes); // 312 min (con tráfico)

// ⚠️ DEPRECATED: Línea recta (menos preciso)
import { getDistanceBetween } from 'ensa-shared';
const straightLine = getDistanceBetween(lat1, lng1, lat2, lng2); // 190.5 mi
```

## ⚠️ Notas Importantes

1. **Distancias SIEMPRE en millas** (no km)
2. **Nombres de campos en español** (validados contra backend)
3. **Comisión ENSA: 25%** (no 20%)
4. **Platform detection** automático para web/mobile
5. ⚠️ **Migración de distancia**: Usar `calculateRealDistance()` (Google Maps API) en lugar de `getDistanceBetween()` (Haversine) para mayor precisión
