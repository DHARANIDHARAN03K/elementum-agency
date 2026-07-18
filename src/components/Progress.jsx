import { useEffect, useRef } from 'react'
import '../styles/Progress.css'

const Progress = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.15 }
    )
    const reveals = sectionRef.current?.querySelectorAll('.reveal')
    reveals?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="studio" className="progress" ref={sectionRef} aria-label="Progress section">
      <div className="progress__container">

        {/* Left side: circular image with red triangle */}
        <div className="progress__visual reveal">
          {/* Red triangle shape — from the Figma design */}
          <div className="progress__triangle progress__triangle--red-top" aria-hidden="true"></div>
          
          <div className="progress__image-circle">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop&crop=face" 
              alt="Professional team member working"
              loading="lazy"
            />
          </div>

          <div className="progress__triangle progress__triangle--red-bottom" aria-hidden="true"></div>
        </div>

        {/* Right side: text content */}
        <div className="progress__content reveal reveal-delay-2">
          <h2 className="progress__heading">
            <span className="highlight-green">See</span> how we can<br />
            help you progress
          </h2>
          <p className="progress__body">
            We add a layer of fearless insights and action that allows change 
            and makes their progress in areas such as brand, design, 
            digital, social and research.
          </p>
          <a href="#contact" className="progress__link" id="read-more-link">
            Read more
            <span className="progress__link-line" aria-hidden="true"></span>
          </a>
        </div>

      </div>
    </section>
  )
}

export default Progress
