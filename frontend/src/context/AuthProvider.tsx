import { useEffect, useState, useCallback, ReactNode } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";
import { User } from "../types/user";
import { getUser, logout as logoutAPI } from "../services/authService";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const loginSuccess = useCallback((userData: User, token: string) => {
        localStorage.setItem("authToken", token);
        setUser(userData);
        setIsLogin(true);
    }, []);

    const refetchUser = useCallback(async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                setIsLogin(false);
                setUser(null);
                return;
            }
            const userData = await getUser();
            setUser(userData);
            setIsLogin(true);
        } catch (_err) {
            localStorage.removeItem("authToken");
            setUser(null);
            setIsLogin(false);
        }
    }, []);

    // Fetch user info on app initialization
    useEffect(() => {
        refetchUser().finally(() => setLoading(false));
    }, [refetchUser]);

    const logout = async () => {
        try {
            await logoutAPI();
        } catch (_err) {
            console.error("Logout error:", _err);
        } finally {
            localStorage.removeItem("authToken");
            setUser(null);
            setIsLogin(false);
        }
    };

    const value: AuthContextType = {
        isLogin,
        user,
        loading,
        loginSuccess,
        refetchUser,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

