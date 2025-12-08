import { Socket } from 'socket.io-client';
/**
 * ✅ Crear y configurar socket
 * @param userId - ID del usuario
 * @param token - Token de autenticación
 * @param apiUrl - URL opcional del servidor (sobrescribe API_BASE_URL)
 */
export declare const createSocket: (userId: string, token: string, apiUrl?: string) => Socket;
/**
 * ✅ Obtener socket actual
 */
export declare const getSocket: () => Socket | null;
/**
 * ✅ Desconectar socket
 */
export declare const disconnectSocket: () => void;
/**
 * ✅ Verificar si está conectado
 */
export declare const isConnected: () => boolean;
/**
 * ✅ Emit con timeout y callback
 */
export declare const emitWithTimeout: (eventName: string, data: any, timeoutMs?: number) => Promise<any>;
//# sourceMappingURL=socketManager.d.ts.map