// shared/src/utils/validation.ts

// ═══════════════════════════════════════════════════════════
// ✅ VALIDATION UTILITIES
// ═══════════════════════════════════════════════════════════

/**
 * ✅ Validar email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * ✅ Validar teléfono (US format)
 */
export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || (cleaned.length === 11 && cleaned[0] === '1');
};

/**
 * ✅ Validar password strength
 */
export const isStrongPassword = (password: string): { 
  valid: boolean; 
  errors: string[] 
} => {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Debe tener al menos 6 caracteres');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Debe contener al menos una mayúscula');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Debe contener al menos una minúscula');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Debe contener al menos un número');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * ✅ Validar nombre
 */
export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
};

/**
 * ✅ Validar placa de vehículo
 */
export const isValidLicensePlate = (plate: string): boolean => {
  return plate.trim().length >= 3;
};
