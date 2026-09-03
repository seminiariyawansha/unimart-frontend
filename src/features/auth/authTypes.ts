export interface AuthState {
    accessToken: string | null;
    email: string | null;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    universityEmail: string;
    password: string;
    fullName: string;
}

export interface AuthResponse {
    accessToken: string;
    tokenType: string;
    expiresInSeconds: number;
}