import '../styles/Footer.css'

/*
  WHY A SEPARATE FOOTER COMPONENT?
  The footer contains company info, links, and contact details.
  It's independent of the rest of the page logic.
  Isolating it = if you need to update the address, you know exactly where to go.
*/

const Footer = () => {
  return (
    <footer id="faq" className="footer" role="contentinfo">
      {/* Top divider line */}
      <div className="footer__divider" aria-hidden="true"></div>

      <div className="footer__container">
        
        {/* Column 1: Company */}
        <div className="footer__col">
          <h3 className="footer__col-title">Company</h3>
          <ul className="footer__links" role="list">
            <li><a href="#hero" className="footer__link">Home</a></li>
            <li><a href="#studio" className="footer__link">Studio</a></li>
            <li><a href="#services" className="footer__link">Services</a></li>
          </ul>
        </div>

        {/* Column 2: Terms & Policies */}
        <div className="footer__col">
          <h3 className="footer__col-title">Terms & Policies</h3>
          <ul className="footer__links" role="list">
            <li><a href="#" className="footer__link">Privacy Policy</a></li>
            <li><a href="#" className="footer__link">Terms of Service</a></li>
            <li><a href="#" className="footer__link">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Column 3: Follow Us */}
        <div className="footer__col">
          <h3 className="footer__col-title">Follow Us</h3>
          <ul className="footer__links" role="list">
            <li>
              <a href="#" className="footer__link" aria-label="Instagram">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="footer__link" aria-label="LinkedIn">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="footer__link" aria-label="YouTube">
                YouTube
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="footer__col">
          <h3 className="footer__col-title">Terms & Policies</h3>
          <address className="footer__address">
            <p>1498w Fluton ste, STE</p>
            <p>2D Chicago, IL 63867.</p>
            <p className="footer__contact">
              <a href="tel:+1234567890" className="footer__link">(123) 456789000</a>
            </p>
            <p className="footer__contact">
              <a href="mailto:info@elementum.com" className="footer__link">
                info@elementum.com
              </a>
            </p>
          </address>
        </div>

      </div>

      {/* Bottom copyright bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <span className="footer__copyright">
            © {new Date().getFullYear()} Elementum. All rights reserved.
          </span>
          {/* why {new Date().getFullYear()}? Updates year automatically every year */}
          <a href="#hero" className="footer__logo">Elementum</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
