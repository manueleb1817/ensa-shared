// shared/src/socket/events.ts

// ═══════════════════════════════════════════════════════════
// ✅ SOCKET EVENT TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════

import type { Ride, Location } from '../types/Ride';
import type { User } from '../types/User';

// ═══════════════════════════════════════════════════════════
// ✅ CLIENT → SERVER EVENTS
// ═══════════════════════════════════════════════════════════

export interface ClientToServerEvents {
  // Connection
  'join-personal-room': (data: { userId: string }) => void;
  
  // Immediate rides
  'solicitar-viaje': (data: {
    pasajeroId: string;
    origen: {
      descripcion: string;
      ubicacion: { coordinates: [number, number] };
    };
    paradas: Array<{
      descripcion: string;
      ubicacion: { coordinates: [number, number] };
    }>;
    metodoDePago: {
      type: 'card' | 'cash';
      paymentMethodId?: string;
    };
  }) => void;
  
  // Driver actions
  'aceptar-viaje': (data: { rideId: string; conductorId: string }) => void;
  'rechazar-viaje': (data: { rideId: string; conductorId: string }) => void;
  'conductor-en-origen': (data: { rideId: string }) => void;
  'iniciar-viaje': (data: { rideId: string }) => void;
  'completar-viaje': (data: { rideId: string; cashReceived?: boolean }) => void;
  'cancelar-viaje': (data: { rideId: string; motivo: string }) => void;
  
  // Location updates
  'actualizar-ubicacion-conductor': (data: {
    rideId: string;
    conductorId: string;
    location: { coordinates: [number, number] };
  }) => void;
  
  // Scheduled rides
  'scheduled-ride-confirm': (data: { rideId: string }) => void;
}

// ═══════════════════════════════════════════════════════════
// ✅ SERVER → CLIENT EVENTS
// ═══════════════════════════════════════════════════════════

export interface ServerToClientEvents {
  // Connection
  connect: () => void;
  disconnect: (reason: string) => void;
  
  // Ride notifications
  newRideRequest: (data: Ride) => void;
  'viaje-aceptado': (data: { rideId: string; conductor: User }) => void;
  'viaje-cancelado': (data: { rideId: string; motivo: string }) => void;
  'viaje-completado': (data: { rideId: string }) => void;
  
  // Driver location
  'conductor-ubicacion-actualizada': (data: {
    rideId: string;
    location: Location;
  }) => void;
  
  // Scheduled rides
  'scheduled-ride-activation': (data: Ride) => void;
  'scheduled-ride-reminder': (data: {
    rideId: string;
    minutesBefore: number;
  }) => void;
  
  // Errors
  'error-viaje': (data: { message: string }) => void;
  'error-ubicacion': (data: { message: string }) => void;
  'error-cancelacion': (data: { message: string }) => void;
}
