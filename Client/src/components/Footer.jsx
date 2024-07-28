import GUCLogo from "../assets/images/GUCLogo.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="logo-section">
          <img src={GUCLogo} alt="GUC Logo" className="logo" />
        </div>
        <div className="rights-section">
          <p>&copy; 2024 GUC Students. All rights reserved.</p>
        </div>
        <div className="contact-section">
          <p>
            Contact us:{" "}
            <a href="mailto:v-exhibition@gmail.com">v-exhibition@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
