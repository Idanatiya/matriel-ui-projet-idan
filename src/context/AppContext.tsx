import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material";

export type Mode = "dark" | "light";

export interface Context {
  mode: Mode;
  toggleColorTheme: () => void;
}

export const AppContext = React.createContext<Context>({
  mode: "light",
  toggleColorTheme: () => {},
});

const AppProvider: React.FC = ({ children }) => {
  const [mode, setMode] = React.useState<Mode>("light");

  const toggleColorTheme = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

  const colorMode = React.useMemo(
    () => ({
      toggleColorTheme,
      mode,
    }),
    [mode]
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiTablePagination: {
            styleOverrides: {
              root: {
                backgroundColor: mode === "light" ? "white" : "black",
              },
            },
          },
          MuiCheckbox: {
            styleOverrides: {
              root: {
                color: mode === "light" ? "black" : "white",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <AppContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};

const useAppContext = () => React.useContext(AppContext);

export { useAppContext, AppProvider };
