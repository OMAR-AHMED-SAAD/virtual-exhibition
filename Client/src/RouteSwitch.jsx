import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";

const RouteSwitch = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default RouteSwitch;
