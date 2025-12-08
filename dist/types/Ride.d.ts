import type { User } from './User';
export type RideStatus = 'scheduled' | 'pendiente' | 'aceptado' | 'conductor_en_origen' | 'en_curso' | 'completado' | 'completado_deuda' | 'cancelado' | 'no_asignado';
export type PaymentStatus = 'pendiente' | 'procesando' | 'completado' | 'fallido' | 'efectivo_pendiente' | 'efectivo_confirmado' | 'efectivo_parcial' | 'reembolsado';
export type PaymentMethodType = 'card' | 'cash' | 'weekly_payment';
export interface Location {
    type: 'Point';
    coordinates: [number, number];
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
    distance: number;
    duration: number;
    isEstimated: boolean;
}
export interface Ride {
    _id: string;
    pasajero: string | User;
    conductor?: string | User;
    origen: {
        descripcion: string;
        ubicacion: Location;
    };
    destino?: {
        descripcion: string;
        ubicacion: Location;
    };
    paradas: Stop[];
    stops?: IntermediateStop[];
    estado: RideStatus;
    distancia: number;
    duracion: number;
    tarifaEstimada: number;
    tarifaFinal?: number;
    tarifaEspera?: number;
    pricing: PricingBreakdown;
    metodoDePago: PaymentMethodType | {
        type: PaymentMethodType;
        brand?: string;
        last4?: string;
    };
    stripePaymentIntentId?: string;
    stripeHoldAmount?: number;
    stripeHoldCreatedAt?: Date | string;
    stripeCapturedAt?: Date | string;
    tipAmount?: number;
    stripeTipPaymentIntentId?: string;
    tipPaidAt?: Date | string;
    estadoPago: PaymentStatus;
    pagoEfectivo?: {
        montoEsperado: number;
        montoRecibido: number;
        confirmadoPorConductor: boolean;
        fechaConfirmacion?: Date | string;
        diferencia?: number;
        notas?: string;
    };
    chatMessages?: Array<{
        senderId: string;
        senderName: string;
        message: string;
        timestamp: Date | string;
    }>;
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
    isScheduled: boolean;
    scheduledTime?: Date | string;
    scheduledStatus?: 'pending' | 'searching' | 'assigned' | 'driver_accepted' | 'reminder_30min_sent' | 'reminder_15min_sent' | 'activation_sent' | 'reassigning' | 'driver_confirmed' | 'driver_en_route' | 'driver_arrived' | 'in_progress' | 'completed' | 'cancelled' | 'error';
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
    driverLocation?: {
        type: 'Point';
        coordinates: [number, number];
        lastUpdated?: Date | string;
    };
    cancelledBy?: 'passenger' | 'driver' | 'system';
    cancelledAt?: Date | string;
    motivoCancelacion?: string;
    tarifaCancelacion?: number;
    createdAt: Date | string;
    updatedAt: Date | string;
}
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
export interface RideQuote {
    distancia: number;
    duracion: number;
    tarifa: number;
    pricing: PricingBreakdown;
}
//# sourceMappingURL=Ride.d.ts.map