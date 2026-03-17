import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
