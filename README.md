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

### Constants
- `BASE_FARE`, `PER_MILE`, `PER_MINUTE` - Pricing config
- `ENSA_GREEN`, `ENSA_RED` - Color palette
- `API_BASE_URL`, endpoints - API configuration

### Utils
- `calculateFare()` - Cálculo de tarifas
- `formatPrice()` - Formateo de precios
- `getDistanceBetween()` - Distancia entre coordenadas
- `Platform.select()` - Platform-specific values

## ⚠️ Notas Importantes

1. **Distancias SIEMPRE en millas** (no km)
2. **Nombres de campos en español** (validados contra backend)
3. **Comisión ENSA: 25%** (no 20%)
4. **Platform detection** automático para web/mobile
