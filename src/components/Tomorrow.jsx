import { useEffect, useRef } from 'react'
import '../styles/Tomorrow.css'

/*
  WHY useRef AND useEffect?
  useRef: Gets a reference to the actual HTML element (like document.getElementById)
  useEffect: Runs code AFTER the component appears on screen
  
  Together, they let us use IntersectionObserver — a browser API that 
  tells us when an element scrolls into the visible area.
  Why not just CSS? CSS can't trigger animations based on scroll position
  without JavaScript.
*/

const Tomorrow = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    // IntersectionObserver watches elements and fires a callback
    // when they enter the viewport (visible area)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // When the element is visible, add 'visible' class
            // which triggers the CSS transition
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }  // trigger when 15% of the element is visible
    )

    // Observe all elements with class 'reveal' inside this section
    const reveals = sectionRef.current?.querySelectorAll('.reveal')
    reveals?.forEach(el => observer.observe(el))

    // Cleanup: stop observing when component unmounts
    // Why? Prevents memory leaks
    return () => observer.disconnect()
  }, [])

  return (
    <section id="tomorrow" className="tomorrow" ref={sectionRef} aria-label="Tomorrow section">
      <div className="tomorrow__container">
        {/* Pink bordered card — the distinctive pink box from the Figma */}
        <div className="tomorrow__card reveal">
          {/* Decorative pink squiggly elements */}
          <svg className="tomorrow__squiggle tomorrow__squiggle--top" viewBox="0 0 200 60" aria-hidden="true">
            <path d="M10,30 Q50,5 100,30 Q150,55 190,30" 
                  stroke="#ff6b6b" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </svg>

          <div className="tomorrow__content">
            <div className="tomorrow__text-block">
              <h2 className="tomorrow__heading">
                Tomorrow should<br />
                be better than today
              </h2>
              <p className="tomorrow__body">
                We are a team of strategists, designers, communicators, researchers.
                Together, we believe that progress only happens when you refuse to play
                things safe. We make it happen with craft, intelligence, and grit.
              </p>
            </div>

            {/* Right side image + content */}
            <div className="tomorrow__visual reveal reveal-delay-2">
              <div className="tomorrow__image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop" 
                  alt="Team collaborating around a table"
                  loading="lazy"
                />
                {/* Decorative orange triangle overlay */}
                <div className="tomorrow__triangle tomorrow__triangle--orange" aria-hidden="true"></div>
              </div>
            </div>
          </div>

          {/* Bottom squiggly line */}
          <svg className="tomorrow__squiggle tomorrow__squiggle--bottom" viewBox="0 0 200 60" aria-hidden="true">
            <path d="M10,30 Q50,55 100,30 Q150,5 190,30" 
                  stroke="#ff6b6b" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Tomorrow
