// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Homepage from "./pages/Homepage";
import TermsAndConditions from "./pages/TermsAndConditions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/analytics" element={<Home />} />          {/* landing page */}
        <Route path="/" element={<Homepage />} />     
        <Route path="/termsandconditions" element={<TermsAndConditions/>} />     
             {/* landing page */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
