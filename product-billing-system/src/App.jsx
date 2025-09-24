import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
// import AdminProfile from "./pages/auth/Profile/index";
import AppRouter from "./routes/appRouter";

function App() {
  return (
    <>
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
    </>
  );
}

export default App;
