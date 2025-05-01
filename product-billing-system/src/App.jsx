import "./App.css";
import CategoryComponents from "./components/Admin Components/CategoryComponents";
import ProductManagement from "./components/Admin Components/ProductManagement";
import Toast from "./components/helperComponent/Toast";
import useToast from "./hooks/useToast";
import AppRouter from "./routes/appRouter";

function App() {
  const { toasts, removeToast } = useToast();
  return (
    <>
      {/* <Toast toasts={toasts} removeToast={removeToast} /> */}
      <AppRouter />
    </>
  );
}

export default App;

