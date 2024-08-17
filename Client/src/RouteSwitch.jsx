import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import ImageGenerator from "./pages/Models/image_generator.jsx";
import ArabicTextToImage from "./pages/Models/arabic_text_to_image.jsx";
import EntrepreneurDetection from "./pages/Models/entrepreneur_detection.jsx";

const RouteSwitch = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/models/anime_image_generator" element={<ImageGenerator modelPath = "anime_image_generator"/>} />
      <Route path="/models/portrait_image_generator" element={<ImageGenerator modelPath = "portrait_image_generator"/>} />
      <Route path="/models/arabic_text_to_image" element={<ArabicTextToImage />} />
      <Route path="/models/entrepreneur_detection" element={<EntrepreneurDetection />} />
    </Routes>
  );
};

export default RouteSwitch;
