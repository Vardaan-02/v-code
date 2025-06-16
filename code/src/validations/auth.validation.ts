export const validateRegisterInput = (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const { username, email, password } = data;

  if (!/^[a-zA-Z0-9_]{3,50}$/.test(username)) {
    return "Username must be 3-50 characters long and contain only letters, numbers, and underscores.";
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Invalid email format.";
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
    return "Password must be at least 8 characters long and contain at least one letter and one number.";
  }

  return null;
};

export const validateLoginInput = (data: {
  email: string;
  password: string;
}) => {
  const { email, password } = data;

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Invalid email format.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  return null;
};
