import React from 'react'
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";
import '../Styles/Footer.css'


export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-footer">
        <div className="row-footer">

          <div className="column-footer">
            <h4>Developer</h4>
            <div>
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el
            </div>
          </div>

          <div className="column-footer">
            <h4>Follow us</h4>
            <div className="networks-social">
              
              <a href="https://www.facebook.com/profile.php?id=100046664111068" target='blank' >
                <FaFacebookF />
                </a>
              <a href="#e">
                < FaTwitter />
                </a>
              <a href="#ee">
                <FaWhatsapp />
                </a>
              <a href="#ee">
                <FaLinkedin />
              </a>
              <a href="#ee">
                <FaYoutube />
              </a>
              <a href="#ee">
                <FaGithub />
              </a>
              
            </div>
          </div>
        </div>
      </div>

      <div className="copyright">Copyright&copy; 2022 - Todos los derechos reservados</div>
    </footer>
  )
}
