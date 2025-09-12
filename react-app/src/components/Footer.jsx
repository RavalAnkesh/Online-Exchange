

              
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faPinterest,
  faWhatsapp, // Import WhatsApp icon
  faGithub // Import GitHub icon
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import './Footer.css';
import Aboutus from './Aboutus';

function Footer() {
  return (
    <footer className="footer  fot-container text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: OlineExchange.com</p>
            <p>Phone: +919054473601</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/">Products</a></li>
              <li><a href="About-us">About Us</a></li>
            </ul>
          </div>


          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled social">
              
                <a href="https://www.facebook.com/shivam.gosai.3363" className="facebook" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
                <a href="#" className="twitter" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="https://www.instagram.com/shivm_1.6?igsh=NzBmMjdhZWRiYQ==" className="instagram" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#" className="pinterest" aria-label="Pinterest"><FontAwesomeIcon icon={faPinterest} /></a>
                <a href="https://wa.me/qr/SJCABKSHHREAN1" className="whatsapp" aria-label="WhatsApp"><FontAwesomeIcon icon={faWhatsapp} /></a>
                <a href="#" className="github" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} /></a> 
            </ul>
          </div>
        </div>
      </div>
      <div className="container text-center mt-3">
        <p>&copy; 2024 OnlineExchange. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
