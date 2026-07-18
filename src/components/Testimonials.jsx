import { useEffect, useRef } from 'react'
import '../styles/Testimonials.css'

/*
  WHY TESTIMONIALS?
  Social proof — showing that real customers had good results.
  The Figma shows floating circular profile photos around a central quote.
  This "surrounded by people" layout creates a feeling of community.
*/

const testimonialProfiles = [
  { src: 'https://randomuser.me/api/portraits/men/1.jpg', alt: 'Client', style: { top: '5%', left: '5%' }, size: 'lg' },
  { src: 'https://randomuser.me/api/portraits/women/2.jpg', alt: 'Client', style: { top: '-5%', left: '40%' }, size: 'sm' },
  { src: 'https://randomuser.me/api/portraits/men/3.jpg', alt: 'Client', style: { top: '10%', right: '5%' }, size: 'lg' },
  { src: 'https://randomuser.me/api/portraits/women/7.jpg', alt: 'Client', style: { bottom: '10%', left: '3%' }, size: 'md' },
  { src: 'https://randomuser.me/api/portraits/men/8.jpg', alt: 'Client', style: { bottom: '-5%', left: '38%' }, size: 'sm' },
  { src: 'https://randomuser.me/api/portraits/men/9.jpg', alt: 'Client', style: { bottom: '5%', right: '4%' }, size: 'lg' },
  { src: 'https://randomuser.me/api/portraits/women/11.jpg', alt: 'Client', style: { top: '40%', right: '2%' }, size: 'md' },
]

const Testimonials = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    const reveals = sectionRef.current?.querySelectorAll('.reveal')
    reveals?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonials" className="testimonials" ref={sectionRef} aria-label="Customer testimonials">
      <div className="testimonials__container">

        {/* Section heading */}
        <div className="testimonials__header reveal">
          <h2 className="testimonials__heading">
            What our customer<br />
            says <span className="underline-orange">About Us</span>
          </h2>
        </div>

        {/* Floating profiles around the quote */}
        <div className="testimonials__stage reveal reveal-delay-1">
          {/* Surrounding profiles */}
          <div className="testimonials__profiles" aria-hidden="true">
            {testimonialProfiles.map((person, i) => (
              <div 
                key={i}
                className={`testimonials__profile testimonials__profile--${person.size}`}
                style={{ 
                  ...person.style,
                  animationDelay: `${i * 0.4}s`,
                  animationName: i % 2 === 0 ? 'float' : 'floatReverse'
                }}
              >
                <img src={person.src} alt={person.alt} loading="lazy" />
              </div>
            ))}
          </div>

          {/* Central quote card */}
          <div className="testimonials__quote" role="blockquote">
            {/* Quotation mark */}
            <span className="testimonials__quote-mark" aria-hidden="true">"</span>
            <p className="testimonials__quote-text">
              Elementum delivered the site within the timeline as they requested. 
              In the end, the client found a 50% increase in traffic within days 
              since its launch. They also had an impressive ability to use 
              technologies that the company hadn't used, which have also proved 
              to be easy to use and reliable.
            </p>
            <span className="testimonials__quote-mark testimonials__quote-mark--close" aria-hidden="true">"</span>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Testimonials
