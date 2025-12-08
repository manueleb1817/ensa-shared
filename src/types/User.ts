// shared/src/types/User.ts

// ═══════════════════════════════════════════════════════════
// ✅ USER TYPES - VALIDADOS CONTRA BACKEND
// ═══════════════════════════════════════════════════════════

export interface User {
  _id: string;
  
  // Datos básicos
  nombre: string;              // ✅ NO "name"
  email: string;
  telefono?: string;           // ✅ OPCIONAL - NO "phoneNumber"
  fotoPerfilUrl?: string;      // ✅ OPCIONAL - NO "profilePictureUrl"
  
  // Roles y estado
  rol: 'pasajero' | 'conductor' | 'admin';
  estadoCuenta?: 'activo' | 'suspendido' | 'pendiente';
  estadoVerificacion?: 'pendiente' | 'aprobado' | 'rechazado';
  
  // Stripe
  stripeCustomerId?: string;
  stripeAccountId?: string;
  
  // Finanzas (valores default en backend si no existen)
  walletBalance?: number;
  deudaPendiente?: number;
  saldoBilletera?: number;
  
  // Calificaciones (valores default en backend si no existen)
  calificacionPromedio?: number;
  numeroCalificaciones?: number;
  viajesCompletados?: number;
  viajesRealizados?: number;
  
  // Ubicación (GeoJSON)
  ubicacion?: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  
  // Driver status
  driverStatus?: {
    available: boolean;
    isActive: boolean;
    socketId: string;
    lastOnlineAt?: Date;
    lastHeartbeatAt?: Date;
    currentLocation: {
      type: 'Point';
      coordinates: [number, number];
      lastUpdated?: Date;
    };
  };
  
  // Vehículo
  vehiculo?: {
    marca: string;
    modelo: string;
    placa: string;
    color: string;
    anio: number;
    numeroSeguro?: string;
    numeroRegistracion?: string;
  };
  
  // Método de pago guardado
  metodoDePagoGuardado?: {
    last4: string;
    brand: string;
    paymentMethodId: string;
  };
  
  // Disponibilidad (conductor)
  disponible?: boolean;
  
  // Timestamps
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// ✅ Login/Register responses
export interface AuthResponse {
  user: User;
  token: string;
}

// ✅ Update user payload
export interface UpdateUserPayload {
  nombre?: string;
  telefono?: string;
  fotoPerfilUrl?: string;
  vehiculo?: Partial<User['vehiculo']>;
}
