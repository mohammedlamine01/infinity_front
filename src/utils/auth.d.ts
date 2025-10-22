export function isAuthenticated(): boolean;
export function login(token: string): void;
export function logout(): void;
export function getToken(): string | null;
