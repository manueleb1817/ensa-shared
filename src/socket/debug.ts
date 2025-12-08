// shared/src/socket/debug.ts

// ═══════════════════════════════════════════════════════════
// ✅ SOCKET DEBUG HELPERS
// ═══════════════════════════════════════════════════════════

import { getSocket } from './socketManager';

/**
 * ✅ Debug socket status
 */
export const debugSocketStatus = () => {
  const socket = getSocket();
  
  console.log('═══════════════════════════════════════════════════');
  console.log('🔍 SOCKET STATUS');
  console.log('═══════════════════════════════════════════════════');
  
  if (!socket) {
    console.log('❌ Socket not initialized');
    console.log('═══════════════════════════════════════════════════');
    return;
  }
  
  console.log(`Connected: ${socket.connected ? '✅' : '❌'}`);
  console.log(`Socket ID: ${socket.id || 'N/A'}`);
  console.log(`Transport: ${socket.io.engine?.transport?.name || 'N/A'}`);
  console.log('═══════════════════════════════════════════════════');
};

/**
 * ✅ Log all socket events
 */
export const logAllSocketEvents = () => {
  const socket = getSocket();
  
  if (!socket) {
    console.error('❌ Socket not initialized');
    return;
  }
  
  // Log all incoming events
  socket.onAny((eventName, ...args) => {
    console.log(`[Socket Event] 📥 ${eventName}:`, args);
  });
  
  // Log all outgoing events
  socket.onAnyOutgoing((eventName, ...args) => {
    console.log(`[Socket Event] 📤 ${eventName}:`, args);
  });
  
  console.log('✅ Socket event logging enabled');
};
