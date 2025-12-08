/**
 * ✅ Detectar si estamos en web
 */
export declare const isWeb: () => boolean;
/**
 * ✅ Detectar si estamos en mobile
 */
export declare const isMobile: () => boolean;
/**
 * ✅ Platform selector (como React Native Platform.select)
 */
export declare const Platform: {
    select: <T>(options: {
        web?: T;
        mobile?: T;
        default?: T;
    }) => T;
    OS: string;
};
/**
 * ✅ Obtener timeout según plataforma
 */
export declare const getTimeout: (webMs: number, mobileMs: number) => number;
//# sourceMappingURL=platform.d.ts.map