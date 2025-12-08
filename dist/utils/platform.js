// shared/src/utils/platform.ts
// ═══════════════════════════════════════════════════════════
// ✅ PLATFORM DETECTION
// ═══════════════════════════════════════════════════════════
/**
 * ✅ Detectar si estamos en web
 */
export const isWeb = () => {
    return typeof window !== 'undefined' && !window.navigator.userAgent.includes('ReactNative');
};
/**
 * ✅ Detectar si estamos en mobile
 */
export const isMobile = () => {
    return !isWeb();
};
/**
 * ✅ Platform selector (como React Native Platform.select)
 */
export const Platform = {
    select: (options) => {
        if (isMobile() && options.mobile !== undefined) {
            return options.mobile;
        }
        if (isWeb() && options.web !== undefined) {
            return options.web;
        }
        if (options.default !== undefined) {
            return options.default;
        }
        throw new Error('No platform-specific value provided');
    },
    OS: isWeb() ? 'web' : 'mobile',
};
/**
 * ✅ Obtener timeout según plataforma
 */
export const getTimeout = (webMs, mobileMs) => {
    return Platform.select({
        web: webMs,
        mobile: mobileMs,
        default: webMs
    });
};
//# sourceMappingURL=platform.js.map