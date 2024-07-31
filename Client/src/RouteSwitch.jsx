import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import AnimeImageGenerator from "./pages/Models/anime_image_generator.jsx";
import ArabicTextToImage from "./pages/Models/arabic_text_to_image.jsx";
import EntrepreneurDetection from "./pages/Models/entrepreneur_detection.jsx";

const RouteSwitch = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/models/anime_image_generator" element={<AnimeImageGenerator />} />
      <Route path="/models/arabic_text_to_image" element={<ArabicTextToImage />} />
      <Route path="/models/entrepreneur_detection" element={<EntrepreneurDetection />} />
    </Routes>
  );
};

export default RouteSwitch;
