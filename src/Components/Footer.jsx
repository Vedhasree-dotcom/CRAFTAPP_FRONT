import { FaInstagram, FaFacebookF, FaPinterestP, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>CraftMate</h2>
          <p>
            Connecting creativity with craftsmanship.  
            Discover, learn, and share handmade art.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
           <p><Link to="/all" className="text-light text-decoration-none"> All crafts</Link></p>
            <p><Link to="/crafts/category/paper" className="text-light text-decoration-none"> Paper crafts</Link></p>
            <p><Link to="/crafts/category/home" className="text-light text-decoration-none">Home Decor</Link></p>
            <p><Link to="/findcraft" className="text-light text-decoration-none">Find craft</Link></p>

        </div>

        <div className="footer-links">
          <h4>Main Links</h4>
           <p><Link to="/" className="text-light text-decoration-none"> Home</Link></p>
            <p><Link to="/about" className="text-light text-decoration-none">About Us</Link></p>
            <p><Link to="/crafts" className="text-light text-decoration-none">Crafts</Link></p>
            <p><Link to="/findcraft" className="text-light text-decoration-none">Find craft</Link></p>

        </div>

        <div className="footer-links">
          <h4>Support</h4>
          <p><Link to="/" className="text-light text-decoration-none">Help center</Link></p>
          <p><Link to="/" className="text-light text-decoration-none">Privacy policy</Link></p>
           <p><Link to="/" className="text-light text-decoration-none"> Terms & Conditions</Link></p>

        </div>

        <div className="footer-social">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <FaInstagram />
            <FaFacebookF />
            <FaPinterestP />
            <FaEnvelope />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} CraftMate. All rights reserved.
      </div>
    </footer>
  );
}
