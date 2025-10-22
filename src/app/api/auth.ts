import { loginUser, registerUser, logoutUser } from '@/utils/auth';

export const authAPI = {
  login: loginUser,
  register: registerUser,
  logout: logoutUser,
};
