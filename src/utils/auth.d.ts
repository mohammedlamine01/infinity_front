export function loginUser(email: string, password: string): Promise<any>;
export function registerUser(formData: any): Promise<any>;
export function logoutUser(): Promise<void>;
export function getCurrentUser(): any;
export function isAuthenticated(): boolean;
export function getToken(): string | null;
export const apiClient: any;
