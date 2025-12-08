import type { User, AuthResponse } from '../types/User';
/**
 * ✅ Login con email y password
 */
export declare const login: (email: string, password: string) => Promise<AuthResponse>;
/**
 * ✅ Register nuevo usuario
 */
export declare const register: (userData: {
    nombre: string;
    email: string;
    password: string;
    telefono: string;
    rol: "pasajero" | "conductor";
}) => Promise<AuthResponse>;
/**
 * ✅ Logout
 */
export declare const logout: (token: string) => Promise<void>;
/**
 * ✅ Get current user
 */
export declare const getCurrentUser: (token: string) => Promise<User>;
//# sourceMappingURL=auth.d.ts.map