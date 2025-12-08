import type { Ride, Location } from '../types/Ride';
import type { User } from '../types/User';
export interface ClientToServerEvents {
    'join-personal-room': (data: {
        userId: string;
    }) => void;
    'solicitar-viaje': (data: {
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
        metodoDePago: {
            type: 'card' | 'cash';
            paymentMethodId?: string;
        };
    }) => void;
    'aceptar-viaje': (data: {
        rideId: string;
        conductorId: string;
    }) => void;
    'rechazar-viaje': (data: {
        rideId: string;
        conductorId: string;
    }) => void;
    'conductor-en-origen': (data: {
        rideId: string;
    }) => void;
    'iniciar-viaje': (data: {
        rideId: string;
    }) => void;
    'completar-viaje': (data: {
        rideId: string;
        cashReceived?: boolean;
    }) => void;
    'cancelar-viaje': (data: {
        rideId: string;
        motivo: string;
    }) => void;
    'actualizar-ubicacion-conductor': (data: {
        rideId: string;
        conductorId: string;
        location: {
            coordinates: [number, number];
        };
    }) => void;
    'scheduled-ride-confirm': (data: {
        rideId: string;
    }) => void;
}
export interface ServerToClientEvents {
    connect: () => void;
    disconnect: (reason: string) => void;
    newRideRequest: (data: Ride) => void;
    'viaje-aceptado': (data: {
        rideId: string;
        conductor: User;
    }) => void;
    'viaje-cancelado': (data: {
        rideId: string;
        motivo: string;
    }) => void;
    'viaje-completado': (data: {
        rideId: string;
    }) => void;
    'conductor-ubicacion-actualizada': (data: {
        rideId: string;
        location: Location;
    }) => void;
    'scheduled-ride-activation': (data: Ride) => void;
    'scheduled-ride-reminder': (data: {
        rideId: string;
        minutesBefore: number;
    }) => void;
    'error-viaje': (data: {
        message: string;
    }) => void;
    'error-ubicacion': (data: {
        message: string;
    }) => void;
    'error-cancelacion': (data: {
        message: string;
    }) => void;
}
//# sourceMappingURL=events.d.ts.map