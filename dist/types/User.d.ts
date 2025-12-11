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
    weeklyPaymentAccess?: {
        requested?: boolean;
        approved?: boolean;
        requestData?: {
            pickupAddress: string;
            pickupCoordinates: {
                lat: number;
                lng: number;
            };
            dropoffAddress: string;
            dropoffCoordinates: {
                lat: number;
                lng: number;
            };
            reason?: string;
            estimatedWeeklyUsage?: number;
            requestedAt?: Date | string;
        };
        approvalData?: {
            approvedBy?: string;
            approvedAt?: Date | string;
            weeklyAmount?: number;
            pickupAddress?: string;
            dropoffAddress?: string;
        };
        rejectionData?: {
            rejectedBy?: string;
            rejectedAt?: Date | string;
            reason?: string;
        };
        adminActions?: Array<{
            adminId: string;
            action: string;
            reason?: string;
            timestamp: Date | string;
        }>;
        routeChangeRequests?: any[];
    };
    stripePaymentMethods?: Array<{
        id: string;
        type: string;
        brand?: string;
        last4?: string;
        expMonth?: number;
        expYear?: number;
        isDefault: boolean;
    }>;
    isBlocked?: boolean;
    blockReason?: 'unpaid_weekly_plan' | 'admin_action' | 'fraud' | 'terms_violation' | null;
    blockedAt?: Date | string;
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