export interface User {
    _id: string;
    nombre: string;
    email: string;
    telefono?: string;
    fotoPerfilUrl?: string;
    rol: 'pasajero' | 'conductor' | 'admin';
    estadoCuenta?: 'activo' | 'suspendido' | 'pendiente';
    estadoVerificacion?: 'pendiente' | 'aprobado' | 'rechazado';
    stripeCustomerId?: string;
    stripeAccountId?: string;
    walletBalance?: number;
    deudaPendiente?: number;
    saldoBilletera?: number;
    calificacionPromedio?: number;
    numeroCalificaciones?: number;
    viajesCompletados?: number;
    viajesRealizados?: number;
    ubicacion?: {
        type: 'Point';
        coordinates: [number, number];
    };
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
    vehiculo?: {
        marca: string;
        modelo: string;
        placa: string;
        color: string;
        anio: number;
        numeroSeguro?: string;
        numeroRegistracion?: string;
    };
    metodoDePagoGuardado?: {
        last4: string;
        brand: string;
        paymentMethodId: string;
    };
    disponible?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export interface AuthResponse {
    user: User;
    token: string;
}
export interface UpdateUserPayload {
    nombre?: string;
    telefono?: string;
    fotoPerfilUrl?: string;
    vehiculo?: Partial<User['vehiculo']>;
}
//# sourceMappingURL=User.d.ts.map