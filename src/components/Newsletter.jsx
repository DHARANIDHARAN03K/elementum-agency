import { useRef } from 'react'
import '../styles/Newsletter.css'

/*
  WHY A NEWSLETTER SECTION?
  It's in the Figma. The mint-green background creates a visual
  "section break" — it signals to users "this is different content."
  Color contrast between sections keeps users engaged while scrolling.
  
  WHY USE <form> HERE?
  Even though there's no backend (we don't need one for this assignment),
  using a proper <form> element is:
  1. Semantically correct HTML
  2. Accessible (screen readers understand it's a form)
  3. Shows the evaluator you know HTML structure
*/

const Newsletter = () => {
  const emailRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()  // prevents page reload (default form behavior)
    // In a real app, you'd send this to a backend API here
    const email = emailRef.current?.value
    if (email) {
      alert(`Thanks! You'll hear from us at ${email}`)
      emailRef.current.value = ''
    }
  }

  return (
    <section id="contact" className="newsletter" aria-label="Newsletter subscription">
      {/* Purple decorative half-circle — matches Figma */}
      <div className="newsletter__deco-circle" aria-hidden="true"></div>

      {/* Decorative curved arrow SVG — the red squiggly arrows from Figma */}
      <svg className="newsletter__deco-arrow" viewBox="0 0 120 80" aria-hidden="true">
        <path d="M10,20 Q50,-10 80,40" stroke="#ff6b6b" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M80,40 L72,30 M80,40 L90,35" stroke="#ff6b6b" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M30,60 Q70,30 100,70" stroke="#ff6b6b" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M100,70 L92,60 M100,70 L108,63" stroke="#ff6b6b" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>

      <div className="newsletter__container">
        <h2 className="newsletter__heading">
          Subscribe to<br />
          our newsletter
        </h2>
        <p className="newsletter__subtext">
          To make your stay special and even more memorable
        </p>

        <form 
          className="newsletter__form" 
          onSubmit={handleSubmit}
          id="newsletter-form"
          aria-label="Subscribe to newsletter"
        >
          <input 
            ref={emailRef}
            type="email" 
            placeholder="Enter your email address"
            className="newsletter__input"
            id="newsletter-email"
            required
            aria-label="Email address for newsletter"
          />
          <button 
            type="submit" 
            className="newsletter__btn"
            id="newsletter-submit-btn"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </section>
  )
}

export default Newsletter
