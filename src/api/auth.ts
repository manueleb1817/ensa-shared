// shared/src/api/auth.ts

// ═══════════════════════════════════════════════════════════
// ✅ AUTH API - LOGIN, REGISTER, LOGOUT
// ═══════════════════════════════════════════════════════════

import { apiClient, setAuthToken, extractErrorMessage } from './apiClient';
import { AUTH_ENDPOINTS } from '../constants/endpoints';
import type { User, AuthResponse } from '../types/User';

/**
 * ✅ Login con email y password
 */
export const login = async (
  email: string, 
  password: string
): Promise<AuthResponse> => {
  console.log('[Auth API] 🔐 Login attempt:', email);
  
  try {
    const response = await apiClient.post<AuthResponse>(
      AUTH_ENDPOINTS.LOGIN,
      { email, password }
    );
    
    const { user, token } = response.data;
    
    // Configurar token en axios para siguientes requests
    setAuthToken(token);
    
    console.log('[Auth API] ✅ Login successful:', user.nombre);
    
    return { user, token };
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Auth API] ❌ Login failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Register nuevo usuario
 */
export const register = async (userData: {
  nombre: string;
  email: string;
  password: string;
  telefono: string;
  rol: 'pasajero' | 'conductor';
}): Promise<AuthResponse> => {
  console.log('[Auth API] 📝 Register attempt:', userData.email);
  
  try {
    const response = await apiClient.post<AuthResponse>(
      AUTH_ENDPOINTS.REGISTER,
      userData
    );
    
    const { user, token } = response.data;
    
    // Configurar token
    setAuthToken(token);
    
    console.log('[Auth API] ✅ Registration successful:', user.nombre);
    
    return { user, token };
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Auth API] ❌ Registration failed:', message);
    throw new Error(message);
  }
};

/**
 * ✅ Logout
 */
export const logout = async (token: string): Promise<void> => {
  console.log('[Auth API] 🚪 Logging out');
  
  try {
    await apiClient.post(
      AUTH_ENDPOINTS.LOGOUT,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    // Limpiar token
    setAuthToken(null);
    
    console.log('[Auth API] ✅ Logout successful');
    
  } catch (error: any) {
    // Logout siempre debe funcionar localmente, no throw error
    console.error('[Auth API] ⚠️ Logout failed (non-critical):', error.message);
    
    // Limpiar token de todas formas
    setAuthToken(null);
  }
};

/**
 * ✅ Get current user
 */
export const getCurrentUser = async (token: string): Promise<User> => {
  console.log('[Auth API] 👤 Getting current user');
  
  try {
    const response = await apiClient.get<User>(
      AUTH_ENDPOINTS.ME,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('[Auth API] ✅ User retrieved:', response.data.nombre);
    
    return response.data;
    
  } catch (error: any) {
    const message = extractErrorMessage(error);
    console.error('[Auth API] ❌ Failed to get user:', message);
    throw new Error(message);
  }
};
