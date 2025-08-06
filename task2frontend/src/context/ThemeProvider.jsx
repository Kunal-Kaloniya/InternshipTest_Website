import {useEffect, useState} from "react";
import { ThemeContext } from "./ThemeContext.jsx";

export default function ThemeProvider({ children }) {

    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    }

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}