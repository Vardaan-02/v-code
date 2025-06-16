export const calculatePasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  if (/[^A-Za-z0-9]/.test(password)) strength += 25;
  return strength;
};

export const getPasswordStrengthText = (passwordStrength: number) => {
  if (passwordStrength < 25) return "Weak";
  if (passwordStrength < 50) return "Fair";
  if (passwordStrength < 75) return "Good";
  return "Strong";
};
