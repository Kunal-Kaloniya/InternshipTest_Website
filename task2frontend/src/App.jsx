import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard.jsx";
import { AuthContext } from "./context/AuthContext";
import IntroPage from "./pages/IntroPage.jsx";
import Quiz from "./pages/Quiz.jsx";
import Result from "./pages/Result.jsx";
import Admin from "./pages/Admin.jsx";
import { useContext } from "react";
import Layout from "./components/Layout.jsx";

function App() {

  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/admin" element={user?.role === 'admin' ? <Admin /> : <Navigate to='/' />} />
          </Route>
        </Route>
      </Routes>
    </Router>

  );
}

export default App;