import { AxiosInstance } from 'axios';
/**
 * ✅ Instancia singleton de axios
 */
export declare const apiClient: AxiosInstance;
/**
 * ✅ Helper para agregar token a headers
 */
export declare const setAuthToken: (token: string | null) => void;
/**
 * ✅ Helper para extraer mensaje de error
 */
export declare const extractErrorMessage: (error: any) => string;
//# sourceMappingURL=apiClient.d.ts.map