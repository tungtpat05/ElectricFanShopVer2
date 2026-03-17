import {createContext, useContext} from "react";
import {User} from "../types/user";

export interface AuthContextType {
    isLogin: boolean;
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

