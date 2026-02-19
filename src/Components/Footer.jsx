import { FaInstagram, FaFacebookF, FaPinterestP, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-inner">
        <div className="footer-container">

          <div className="footer-brand">
            <h2>CraftMate</h2>
            <p className="footer-tagline">Handmade with heart</p>
            <p>
              Connecting creativity with craftsmanship.
              Discover, learn, and share handmade art.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <p><Link to="/all">All Crafts</Link></p>
            <p><Link to="/crafts/category/paper">Paper Crafts</Link></p>
            <p><Link to="/crafts/category/home">Home Decor</Link></p>
            <p><Link to="/findcraft">Find Craft</Link></p>
          </div>

          <div className="footer-links">
            <h4>Main Links</h4>
            <p><Link to="/">Home</Link></p>
            <p><Link to="/about">About Us</Link></p>
            <p><Link to="/crafts">Crafts</Link></p>
            <p><Link to="/findcraft">Find Craft</Link></p>
          </div>

          <div className="footer-links">
            <h4>Support</h4>
            <p><Link to="/">Help Center</Link></p>
            <p><Link to="/">Privacy Policy</Link></p>
            <p><Link to="/">Terms &amp; Conditions</Link></p>
          </div>

          <div className="footer-social">
            <h4>Connect With Us</h4>
            <p className="footer-social-desc">
              Follow us for daily craft inspiration and behind-the-scenes creativity.
            </p>
            <div className="social-icons">
              <button className="social-icon-btn" aria-label="Instagram"><FaInstagram /></button>
              <button className="social-icon-btn" aria-label="Facebook"><FaFacebookF /></button>
              <button className="social-icon-btn" aria-label="Pinterest"><FaPinterestP /></button>
              <button className="social-icon-btn" aria-label="Email"><FaEnvelope /></button>
            </div>
          </div>

        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} CraftMate. All rights reserved.</span>
        <div className="footer-bottom-links">
          <Link to="/">Privacy</Link>
          <Link to="/">Terms</Link>
          <Link to="/">Cookies</Link>
        </div>
        <span>Made with <em className="footer-heart">♥</em> for crafters</span>
      </div>

    </footer>
  );
}