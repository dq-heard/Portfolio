export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isEmailInvalid = (email: string): boolean =>
  email.trim() !== "" && !isValidEmail(email);
