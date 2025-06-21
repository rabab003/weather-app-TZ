import "./App.css";
import Example from "./Components/Example";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["NKA"],
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Example />
      </ThemeProvider>
    </>
  );
}

export default App;
