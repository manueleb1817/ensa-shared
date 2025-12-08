// shared/src/utils/platform.ts

// ═══════════════════════════════════════════════════════════
// ✅ PLATFORM DETECTION
// ═══════════════════════════════════════════════════════════

/**
 * ✅ Detectar si estamos en web
 */
export const isWeb = (): boolean => {
  return typeof window !== 'undefined' && !window.navigator.userAgent.includes('ReactNative');
};

/**
 * ✅ Detectar si estamos en mobile
 */
export const isMobile = (): boolean => {
  return !isWeb();
};

/**
 * ✅ Platform selector (como React Native Platform.select)
 */
export const Platform = {
  select: <T>(options: { 
    web?: T; 
    mobile?: T; 
    default?: T 
  }): T => {
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
export const getTimeout = (webMs: number, mobileMs: number): number => {
  return Platform.select({
    web: webMs,
    mobile: mobileMs,
    default: webMs
  });
};
