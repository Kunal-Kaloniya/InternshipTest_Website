import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsLogged(true);
        localStorage.setItem("isLogged", true);
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedIsLogged = JSON.parse(localStorage.getItem("isLogged"));
        if (storedUser) {
            setUser(storedUser);
        }
        if (storedIsLogged) setIsLogged(storedIsLogged);
    }, [])

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        setIsLogged(false);
        localStorage.removeItem("isLogged");
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ user, isLogged, setIsLogged, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}