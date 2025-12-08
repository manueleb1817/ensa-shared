// shared/src/api/apiClient.ts

// ═══════════════════════════════════════════════════════════
// ✅ AXIOS CLIENT - CONFIGURADO PARA WEB Y MOBILE
// ═══════════════════════════════════════════════════════════

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { Platform } from '../utils/platform';
import { 
  API_BASE_URL, 
  API_TIMEOUT_WEB_MS, 
  API_TIMEOUT_MOBILE_MS,
  API_RETRY_ATTEMPTS 
} from '../constants/config';

/**
 * ✅ Configuración de timeout por plataforma
 */
const API_TIMEOUT = Platform.select({
  web: API_TIMEOUT_WEB_MS,
  mobile: API_TIMEOUT_MOBILE_MS,
  default: 20000
});

/**
 * ✅ Crear instancia de axios configurada
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // ✅ Request interceptor - Agregar token automáticamente
  instance.interceptors.request.use(
    (config) => {
      const platform = Platform.OS;
      
      console.log(`[API Client] [${platform.toUpperCase()}] ${config.method?.toUpperCase()} ${config.url}`);
      
      // El token se agregará desde cada función específica
      // (porque puede venir de localStorage en web o AsyncStorage en mobile)
      
      return config;
    },
    (error) => {
      console.error('[API Client] ❌ Request error:', error);
      return Promise.reject(error);
    }
  );

  // ✅ Response interceptor - Manejo de errores consistente
  instance.interceptors.response.use(
    (response) => {
      console.log(`[API Client] ✅ Response ${response.status} from ${response.config.url}`);
      return response;
    },
    async (error: AxiosError) => {
      const config = error.config as AxiosRequestConfig & { _retry?: number };
      
      // Logging detallado del error
      if (error.response) {
        console.error(`[API Client] ❌ Response error ${error.response.status}:`, error.response.data);
      } else if (error.request) {
        console.error('[API Client] ❌ No response received:', error.message);
      } else {
        console.error('[API Client] ❌ Request setup error:', error.message);
      }
      
      // ✅ Retry logic (solo para errores de red, no 4xx)
      if (
        config &&
        (error.code === 'ECONNABORTED' || 
        error.code === 'ERR_NETWORK' ||
        error.message.includes('timeout'))
      ) {
        config._retry = config._retry || 0;
        
        if (config._retry < API_RETRY_ATTEMPTS) {
          config._retry += 1;
          
          console.log(`[API Client] 🔄 Retry attempt ${config._retry}/${API_RETRY_ATTEMPTS}`);
          
          // Delay exponencial: 1s, 2s, 4s
          const delay = Math.pow(2, config._retry - 1) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          
          return instance(config);
        }
      }
      
      // ✅ Token expirado (401) - No hacer retry, solo rechazar
      if (error.response?.status === 401) {
        console.error('[API Client] ❌ Unauthorized - Token may be expired');
        // El componente que llame debe manejar logout
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

/**
 * ✅ Instancia singleton de axios
 */
export const apiClient = createAxiosInstance();

/**
 * ✅ Helper para agregar token a headers
 */
export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

/**
 * ✅ Helper para extraer mensaje de error
 */
export const extractErrorMessage = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.message) {
    return error.message;
  }
  return 'Error desconocido';
};
