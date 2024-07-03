declare interface AuthContextType {
  login: ({
    email,
    password,
  }) => Promise<{ success?: boolean; error?: string }>;
  register: ({
    email,
    password,
    confirmPassword,
  }) => Promise<{ success?: boolean; error?: string }>;
  logout: () => void;
  token: string | null;
  loggedIn: boolean;
}
