import FloatingShape from "./components/FloatingShape";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import VerificationEmail from "./pages/VerificationEmail.jsx";
import { ROUTES } from "./constants/route.constants.js";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard.jsx";
import { useAuthStore } from "./store/authStore.js";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to={ROUTES.login} replace />;
  }

  if (!user.verified) {
    return <Navigate to={ROUTES.verificationEmail} replace />;
  }

  return children;
};

function App() {

  const { checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex justify-center relative items-center overflow-hidden">
      <FloatingShape
        color="bg-green-500"
        size="h-64 w-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="h-48 w-48"
        top="20%"
        left="70%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="h-32 w-32"
        top="-5%"
        left="-10%"
        delay={2}
      />

      <Routes>
        <Route
          path={ROUTES.home}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.signup} element={<SignUp />} />
        <Route
          path={ROUTES.verificationEmail}
          element={<VerificationEmail />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
