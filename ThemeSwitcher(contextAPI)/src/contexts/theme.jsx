import { createContext, useContext } from "react";
import React from "react";

const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => { }
})

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = React.useState("light");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

const useTheme = () => {
    return useContext(ThemeContext)
}

export { ThemeContext, ThemeProvider, useTheme }