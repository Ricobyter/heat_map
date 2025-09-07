// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Homepage from "./pages/Homepage";
import TermsAndConditions from "./pages/TermsAndConditions";
import AnalyticsDemo from "./pages/Analytics1";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/analytics" element={<Home />} />          {/* landing page */}
        <Route path="/" element={<Homepage />} />     
        <Route path="/termsandconditions" element={<TermsAndConditions/>} />     
        <Route path="/analyticsdemo" element={<AnalyticsDemo/>} />     
             {/* landing page */}

      </Routes>
    </BrowserRouter>
  );
}


export default App;
