// shared/src/types/Ride.ts

// ═══════════════════════════════════════════════════════════
// ✅ RIDE TYPES - VALIDADOS CONTRA BACKEND
// ═══════════════════════════════════════════════════════════

import type { User } from './User';

export type RideStatus = 
  | 'scheduled'
  | 'pendiente'
  | 'aceptado'
  | 'conductor_en_origen'
  | 'en_curso'
  | 'completado'
  | 'completado_deuda'
  | 'cancelado'
  | 'no_asignado';

export type PaymentStatus = 
  | 'pendiente'
  | 'procesando'
  | 'completado'
  | 'fallido'
  | 'efectivo_pendiente'
  | 'efectivo_confirmado'
  | 'efectivo_parcial'
  | 'reembolsado';

export type PaymentMethodType = 'card' | 'cash' | 'weekly_payment';

export interface Location {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}

export interface Stop {
  descripcion: string;
  ubicacion: Location;
  estado: 'pendiente' | 'completada';
}

export interface IntermediateStop {
  address: string;
  coordinates: Location;
  order: number;
  completed: boolean;
  completedAt?: Date | string;
  arrivedAt?: Date | string;
  departedAt?: Date | string;
  waitTimeMinutes?: number;
  charge?: number;
}

export interface PricingBreakdown {
  basePrice: number;
  distancePrice: number;
  timePrice: number;
  stopsCharges: number;
  finalPrice: number;
  distance: number;        // millas ✅
  duration: number;        // minutos
  isEstimated: boolean;
}

export interface Ride {
  _id: string;
  
  // Participantes - pueden ser IDs (string) o objetos User poblados
  pasajero: string | User;     // ✅ Puede ser ID o User poblado
  conductor?: string | User;   // ✅ Puede ser ID o User poblado
  
  // Ubicaciones (GeoJSON)
  origen: {
    descripcion: string;       // ✅ NO "description"
    ubicacion: Location;       // ✅ NO "location"
  };
  
  // Destino (para compatibilidad con history pages)
  destino?: {
    descripcion: string;
    ubicacion: Location;
  };
  
  // Paradas
  paradas: Stop[];
  stops?: IntermediateStop[];
  
  // Estado
  estado: RideStatus;
  
  // Pricing (SIEMPRE MILLAS)
  distancia: number;           // millas ✅
  duracion: number;            // minutos ✅
  tarifaEstimada: number;      // ✅ NO "estimatedFare"
  tarifaFinal?: number;        // ✅ NO "finalFare"
  tarifaEspera?: number;
  
  pricing: PricingBreakdown;
  
  // Método de pago - puede ser string (legacy) u objeto
  metodoDePago: PaymentMethodType | {
    type: PaymentMethodType;
    brand?: string;
    last4?: string;
  };
  
  // Stripe
  stripePaymentIntentId?: string;
  stripeHoldAmount?: number;
  stripeHoldCreatedAt?: Date | string;
  stripeCapturedAt?: Date | string;
  
  // Propina
  tipAmount?: number;
  stripeTipPaymentIntentId?: string;
  tipPaidAt?: Date | string;
  
  // Estado de pago
  estadoPago: PaymentStatus;
  
  // Pago en efectivo
  pagoEfectivo?: {
    montoEsperado: number;
    montoRecibido: number;
    confirmadoPorConductor: boolean;
    fechaConfirmacion?: Date | string;
    diferencia?: number;
    notas?: string;
  };
  
  // Chat
  chatMessages?: Array<{
    senderId: string;
    senderName: string;
    message: string;
    timestamp: Date | string;
  }>;
  
  // Calificaciones
  calificacionPasajero?: {
    puntuacion: number;
    comentario?: string;
    fecha?: Date | string;
  };
  calificacionConductor?: {
    puntuacion: number;
    comentario?: string;
    fecha?: Date | string;
  };
  
  // Scheduled rides
  isScheduled: boolean;
  scheduledTime?: Date | string;
  scheduledStatus?: 
    | 'pending'
    | 'searching'
    | 'assigned'
    | 'driver_accepted'
    | 'reminder_30min_sent'
    | 'reminder_15min_sent'
    | 'activation_sent'
    | 'reassigning'
    | 'driver_confirmed'
    | 'driver_en_route'
    | 'driver_arrived'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'error';
  
  driverAcceptedAt?: Date | string;
  
  timestamps?: {
    reminder30MinAt?: Date | string;
    reminder15MinAt?: Date | string;
    activationSentAt?: Date | string;
    driverConfirmedAt?: Date | string;
    driverEnRouteAt?: Date | string;
    driverArrivedAt?: Date | string;
    tripStartedAt?: Date | string;
    tripCompletedAt?: Date | string;
  };
  
  // ETA dinámico
  eta?: {
    toPickup?: {
      minutes: number;
      lastUpdated?: Date | string;
    };
    toDestination?: {
      minutes: number;
      lastUpdated?: Date | string;
    };
  };
  
  // Driver location tracking
  driverLocation?: {
    type: 'Point';
    coordinates: [number, number];
    lastUpdated?: Date | string;
  };
  
  // Cancelación
  cancelledBy?: 'passenger' | 'driver' | 'system';
  cancelledAt?: Date | string;
  motivoCancelacion?: string;  // ✅ NO "cancellationReason"
  tarifaCancelacion?: number;  // ✅ NO "cancellationFee"
  
  // Metadata
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ✅ Request ride payload
export interface RequestRidePayload {
  pasajeroId: string;
  origen: {
    descripcion: string;
    ubicacion: {
      coordinates: [number, number];
    };
  };
  paradas: Array<{
    descripcion: string;
    ubicacion: {
      coordinates: [number, number];
    };
  }>;
  stops?: Array<{
    address: string;
    coordinates: [number, number];
    order: number;
  }>;
  metodoDePago: {
    type: PaymentMethodType;
    paymentMethodId?: string;
  };
  isScheduled?: boolean;
  scheduledTime?: Date | string;
}

// ✅ Quote response
export interface RideQuote {
  distancia: number;        // millas
  duracion: number;         // minutos
  tarifa: number;
  pricing: PricingBreakdown;
}
