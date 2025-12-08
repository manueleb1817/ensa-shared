// shared/src/socket/socketManager.ts

// ═══════════════════════════════════════════════════════════
// ✅ SOCKET.IO MANAGER - WEB Y MOBILE
// ═══════════════════════════════════════════════════════════

import { io, Socket } from 'socket.io-client';
import { Platform } from '../utils/platform';
import { 
  API_BASE_URL,
  SOCKET_RECONNECT_DELAY_WEB_MS,
  SOCKET_RECONNECT_DELAY_MOBILE_MS,
  SOCKET_MAX_RECONNECT_ATTEMPTS_WEB,
  SOCKET_MAX_RECONNECT_ATTEMPTS_MOBILE
} from '../constants/config';

let socket: Socket | null = null;
let reconnectAttempts = 0;

const MAX_RECONNECT_ATTEMPTS = Platform.select({
  web: SOCKET_MAX_RECONNECT_ATTEMPTS_WEB,
  mobile: SOCKET_MAX_RECONNECT_ATTEMPTS_MOBILE,
  default: 5
});

const RECONNECT_DELAY = Platform.select({
  web: SOCKET_RECONNECT_DELAY_WEB_MS,
  mobile: SOCKET_RECONNECT_DELAY_MOBILE_MS,
  default: 1000
});

/**
 * ✅ Crear y configurar socket
 * @param userId - ID del usuario
 * @param token - Token de autenticación
 * @param apiUrl - URL opcional del servidor (sobrescribe API_BASE_URL)
 */
export const createSocket = (userId: string, token: string, apiUrl?: string): Socket => {
  
  const platformName = Platform.OS.toUpperCase();
  const SOCKET_URL = apiUrl || API_BASE_URL;
  
  console.log(`[Socket Manager] [${platformName}] 🔌 Creating socket`);
  console.log(`[Socket Manager] URL: ${SOCKET_URL}`);
  console.log(`[Socket Manager] User: ${userId}`);
  
  // Si ya existe socket conectado, retornarlo
  if (socket?.connected) {
    console.log(`[Socket Manager] ⚠️ Socket already connected, reusing`);
    return socket;
  }
  
  // Desconectar socket anterior si existe
  if (socket) {
    socket.disconnect();
  }
  
  // Configuración optimizada por plataforma
  const socketConfig = {
    auth: { token, userId },
    
    // ✅ Solo WebSocket en mobile (más eficiente)
    transports: Platform.select({
      web: ['websocket', 'polling'],
      mobile: ['websocket'],
      default: ['websocket', 'polling']
    }) as any,
    
    reconnection: true,
    reconnectionDelay: RECONNECT_DELAY,
    reconnectionDelayMax: RECONNECT_DELAY * 5,
    reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
    
    // ✅ Timeout más corto en mobile
    timeout: Platform.select({
      web: 10000,
      mobile: 5000,
      default: 10000
    }),
    
    autoConnect: false,
    
    // ✅ FIX: Preservar auth en reconexiones
    // Socket.IO no re-envía auth automáticamente, debemos forzarlo
    extraHeaders: {
      'x-user-id': userId
    }
  };
  
  // Crear socket
  socket = io(SOCKET_URL, socketConfig);
  
  // ═══════════════════════════════════════════════════════════
  // ✅ EVENT HANDLERS
  // ═══════════════════════════════════════════════════════════
  
  socket.on('connect', () => {
    reconnectAttempts = 0;
    console.log(`[Socket Manager] [${platformName}] ✅ Connected:`, socket?.id);
    
    // Auto-join personal room
    const userRoom = `user_${userId}`;
    socket?.emit('join-personal-room', { userId });
    console.log(`[Socket Manager] [${platformName}] 🚪 Joined room:`, userRoom);
  });
  
  socket.on('disconnect', (reason: string) => {
    console.log(`[Socket Manager] [${platformName}] ❌ Disconnected:`, reason);
    
    // Si el servidor desconectó, reconectar manualmente
    if (reason === 'io server disconnect') {
      console.log(`[Socket Manager] [${platformName}] 🔄 Server disconnected, reconnecting...`);
      socket?.connect();
    }
  });
  
  socket.on('connect_error', (error: Error) => {
    reconnectAttempts++;
    console.error(
      `[Socket Manager] [${platformName}] ❌ Connection error ` +
      `(${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS}):`,
      error.message
    );
    
    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      console.error(`[Socket Manager] [${platformName}] ❌ Max reconnect attempts reached`);
      socket?.disconnect();
    }
  });
  
  socket.on('reconnect', (attemptNumber: number) => {
    console.log(`[Socket Manager] [${platformName}] 🔄 Reconnected after ${attemptNumber} attempts`);
    reconnectAttempts = 0;
  });
  
  socket.on('reconnect_attempt', (attemptNumber: number) => {
    console.log(`[Socket Manager] [${platformName}] 🔄 Reconnect attempt #${attemptNumber}`);
  });
  
  socket.on('reconnect_failed', () => {
    console.error(`[Socket Manager] [${platformName}] ❌ Reconnection failed after all attempts`);
  });
  
  // ✅ FIX: Asegurar que auth se envíe en cada reconexión
  socket.io.on('reconnect_attempt', () => {
    console.log(`[Socket Manager] [${platformName}] 🔄 Updating auth for reconnection`);
    // Actualizar auth object antes de cada intento de reconexión
    (socket as any).auth = { token, userId };
  });
  
  // ═══════════════════════════════════════════════════════════
  // ✅ ERROR HANDLERS
  // ═══════════════════════════════════════════════════════════
  
  socket.on('error-viaje', (data: any) => {
    const message = data?.message || data?.error || data || 'Error desconocido';
    console.error(`[Socket Manager] [${platformName}] ❌ Ride error:`, message);
  });
  
  socket.on('error-ubicacion', (data: any) => {
    const message = data?.message || data?.error || data || 'Error desconocido';
    console.error(`[Socket Manager] [${platformName}] ❌ Location error:`, message);
  });
  
  socket.on('error-cancelacion', (data: any) => {
    const message = data?.message || data?.error || data || 'Error desconocido';
    console.error(`[Socket Manager] [${platformName}] ❌ Cancellation error:`, message);
  });
  
  // Conectar manualmente
  socket.connect();
  
  return socket;
};

/**
 * ✅ Obtener socket actual
 */
export const getSocket = (): Socket | null => {
  if (!socket) {
    console.warn('[Socket Manager] ⚠️ Socket not initialized. Call createSocket() first.');
  }
  return socket;
};

/**
 * ✅ Desconectar socket
 */
export const disconnectSocket = (): void => {
  if (socket?.connected) {
    console.log('[Socket Manager] 🔌 Disconnecting...');
    socket.disconnect();
    socket = null;
    reconnectAttempts = 0;
  }
};

/**
 * ✅ Verificar si está conectado
 */
export const isConnected = (): boolean => {
  return socket?.connected ?? false;
};

/**
 * ✅ Emit con timeout y callback
 */
export const emitWithTimeout = (
  eventName: string,
  data: any,
  timeoutMs: number = 5000
): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!socket?.connected) {
      reject(new Error('Socket no conectado'));
      return;
    }

    const timeout = setTimeout(() => {
      reject(new Error(`Timeout esperando respuesta de '${eventName}'`));
    }, timeoutMs);

    socket.emit(eventName, data, (response: any) => {
      clearTimeout(timeout);
      resolve(response);
    });
  });
};
