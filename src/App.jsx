// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Homepage from "./pages/Homepage";
import TermsAndConditions from "./pages/TermsAndConditions";
import AnalyticsDemo from "./pages/Analytics1";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import Simulator from "./pages/Simulator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/analytics" element={<Home />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/termsandconditions" element={<TermsAndConditions/>} />
        <Route path="/analyticsdemo" element={<AnalyticsDemo/>} />
        {/* Authentication / app pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/simulator" element={<Simulator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
