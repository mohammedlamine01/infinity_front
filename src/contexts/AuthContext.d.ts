export interface User {
  id: string | number;
  email: string;
  name?: string;
  [key: string]: any;
}

export interface AuthContextType {
  isAuth: boolean;
  user: User | null;
  loading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => Promise<void>;
  checkAuth: () => void;
}
