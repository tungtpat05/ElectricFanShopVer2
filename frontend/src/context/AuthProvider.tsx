import {useEffect, useState, ReactNode} from "react";
import {AuthContext, AuthContextType} from "./AuthContext";
import {User} from "../types/user";
import {getUser, logout as logoutAPI} from "../services/authService";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch user info on app initialization
    useEffect(() => {
        const initAuth = async () => {
            try {
                // Check if token exists in localStorage
                const token = localStorage.getItem("authToken");
                if (!token) {
                    setLoading(false);
                    return;
                }

                const userData = await getUser();
                setUser(userData);
                setIsLogin(true);
            } catch (_err) {
                // User not authenticated or token expired
                localStorage.removeItem("authToken");
                setUser(null);
                setIsLogin(false);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

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
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

