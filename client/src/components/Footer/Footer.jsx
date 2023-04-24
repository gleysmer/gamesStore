import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-container">
          <div className="footer-content-container">
            <h3 className="website-logo">Gamers Store</h3>
            <span className="footer-info">Avenida Corrientes 3247,</span>
            <span className="footer-info">Lavalle 3120, C1193 CABA</span>
            <br />
            <span className="footer.info">gamersstoreapp@gmail.com</span>
          </div>
          <div className="footer-menus">
            <div className="footer-content-container">
            <h3 className="menu_title"  >Quick Links</h3>
              <Link className="Links" to="/home">
                <a href="#" className="menu-item-footer">
                  Home
                </a>
              </Link>
              <Link className="Links" to="/shopping-cart">
                <a href="#" className="menu-item-footer">
                  Carrito
                </a>
              </Link>
              <Link className="Links" to="/shopping/daily-offers">
                <a href="#" className="menu-item-footer">
                  Todos Los Juegos
                </a>
              </Link>
            </div>
            <div className="footer-content-container">
              <h3 className="menu_title"  >Legal</h3>
              <Link className="Links" to="">
                <a href="#" className="menu-item-footer">
                Politicas De Seguridad
                </a>
              </Link>
              <Link className="Links" >
                <a href="#" className="menu-item-footer">
                  Uso De Cookies
                </a>
              </Link>
              <Link className="Links" >
                <a href="#" className="menu-item-footer">
                  Términos y Condiciones
                </a>
              </Link>
            </div>
          </div>

          {/* <div className="footer-content-container">
            <span className="menu-title">Nuestras redes</span>
            <div className="social-container">
              <a href="" className="social-link">
                <BsLinkedin className="footer-icon" />
              </a>
              <a href="" className="social-link">
                <BsYoutube className="footer-icon" />
              </a>
              <a href="" className="social-link">
                <BsInstagram className="footer-icon" />
              </a>
              <a href="" className="social-link">
                <BsGithub className="footer-icon" />
              </a>
            </div>
          </div> */}
        </div>
        <div className="copyright-container">&copy; 2023, Game Store</div>
      </footer>
    </>
  );
};

export default Footer;
