import React, { useState } from "react";
import { TT_VARIABLES } from "../styles/globalVariables";

export const ThemeContext = React.createContext({
  theme: "light",
  setTheme: (theme: string) => {},
});

export const ThemeProvider: React.FC = (props: any) => {
  const [theme, setTheme] = useState<string>(TT_VARIABLES.backgrounds.index);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
