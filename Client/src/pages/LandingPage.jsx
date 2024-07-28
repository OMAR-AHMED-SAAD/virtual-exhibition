import { FilePdfOutlined } from "@ant-design/icons";
import ModelSwiper from "../components/ModelsSwiper";
import Footer from "../components/Footer";
import instructions from "../assets/instructions.pdf";

const LandingPage = () => {
  return (
    <>
      <section className="landing-page">
        <div className="landing-page-primary-section">
          <h1>Virtual Exhibition</h1>
          <p>
            Discover innovative applications of machine learning models and
            neural networks through interactive demos and presentations featured
            in the 52-MET virtual exhibition.
          </p>
          <a
            href={instructions}
            download="How to join the exhibition.pdf"
            target="_blank"
          >
            <button className="join-button" role="button">
              Join The Exhibition
              <FilePdfOutlined
                style={{ paddingLeft: "4px", alignSelf: "center" }}
              />
            </button>
          </a>
        </div>
      </section>
      <ModelSwiper />
      <div className="exhibition-container">
        <h2 className="exhibition-title">About The Exhibition :</h2>
        <p className="exhibition-details">
          With the rise of machine learning and neural networks, the world has
          seen a surge in innovative applications that have revolutionized the
          way we interact with technology. The 52-MET virtual exhibition is a
          platform that showcases some of the most cutting-edge models developed
          by students at the German University in Cairo during their Bachelor of
          Science in Computer Science and Engineering. Students have worked on a
          variety of projects ranging from image recognition to natural language
          processing, and have developed models that have the potential to
          transform industries and improve the quality of life for people around
          the world. Explore the models we are currently hosting and discover
          the future of machine learning and our contribution to it.
        </p>
          <hr/>
          <span className="signature">52-MET</span>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
