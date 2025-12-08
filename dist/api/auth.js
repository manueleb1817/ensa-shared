// shared/src/api/auth.ts
// ═══════════════════════════════════════════════════════════
// ✅ AUTH API - LOGIN, REGISTER, LOGOUT
// ═══════════════════════════════════════════════════════════
import { apiClient, setAuthToken, extractErrorMessage } from './apiClient';
import { AUTH_ENDPOINTS } from '../constants/endpoints';
/**
 * ✅ Login con email y password
 */
export const login = async (email, password) => {
    console.log('[Auth API] 🔐 Login attempt:', email);
    try {
        const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, { email, password });
        const { user, token } = response.data;
        // Configurar token en axios para siguientes requests
        setAuthToken(token);
        console.log('[Auth API] ✅ Login successful:', user.nombre);
        return { user, token };
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Auth API] ❌ Login failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Register nuevo usuario
 */
export const register = async (userData) => {
    console.log('[Auth API] 📝 Register attempt:', userData.email);
    try {
        const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, userData);
        const { user, token } = response.data;
        // Configurar token
        setAuthToken(token);
        console.log('[Auth API] ✅ Registration successful:', user.nombre);
        return { user, token };
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Auth API] ❌ Registration failed:', message);
        throw new Error(message);
    }
};
/**
 * ✅ Logout
 */
export const logout = async (token) => {
    console.log('[Auth API] 🚪 Logging out');
    try {
        await apiClient.post(AUTH_ENDPOINTS.LOGOUT, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // Limpiar token
        setAuthToken(null);
        console.log('[Auth API] ✅ Logout successful');
    }
    catch (error) {
        // Logout siempre debe funcionar localmente, no throw error
        console.error('[Auth API] ⚠️ Logout failed (non-critical):', error.message);
        // Limpiar token de todas formas
        setAuthToken(null);
    }
};
/**
 * ✅ Get current user
 */
export const getCurrentUser = async (token) => {
    console.log('[Auth API] 👤 Getting current user');
    try {
        const response = await apiClient.get(AUTH_ENDPOINTS.ME, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('[Auth API] ✅ User retrieved:', response.data.nombre);
        return response.data;
    }
    catch (error) {
        const message = extractErrorMessage(error);
        console.error('[Auth API] ❌ Failed to get user:', message);
        throw new Error(message);
    }
};
//# sourceMappingURL=auth.js.map