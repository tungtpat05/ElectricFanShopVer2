import {axiosClient} from "../lib/axiosClient";
import {User} from "../types/user.ts";

export const getUser = async (): Promise<User> => {
    const response = await axiosClient.get<User>("/auth/me");
    return response.data;
};

export const loginWithEmail = async (
    email: string,
    password: string
): Promise<{ token: string; user: User }> => {
    const response = await axiosClient.post<{ token: string; user: User }>(
        "/auth/login",
        {email, password}
    );
    if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
    }
    return response.data;
};

export const loginWithOAuth = async (provider: string): Promise<string> => {
    // This will typically redirect to backend OAuth endpoint
    const response = await axiosClient.get<{ redirectUrl: string }>(
        `/auth/oauth/${provider}`
    );
    return response.data.redirectUrl;
};

export const register = async (
    email: string,
    password: string,
    fullName: string
): Promise<{ token: string; user: User }> => {
    const response = await axiosClient.post<{ token: string; user: User }>(
        "/auth/register",
        {email, password, fullName}
    );
    if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
    }
    return response.data;
};

export const logout = async (): Promise<void> => {
    try {
        await axiosClient.post("/auth/logout");
    } catch (_err) {
        // Even if logout fails, we should clear local storage
        console.error("Logout API error:", _err);
    }
};
