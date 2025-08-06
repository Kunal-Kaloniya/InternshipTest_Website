import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({children}) {
    const [quizStarted, setQuizStarted] = useState(false);

    return (
        <AppContext.Provider value={{ quizStarted, setQuizStarted }}>
            {children}
        </AppContext.Provider>
    );
}