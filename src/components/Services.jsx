import { useEffect, useRef } from 'react'
import '../styles/Services.css'

/*
  WHY AN ARRAY FOR SERVICES?
  The Figma has 3 service rows, each with:
  - A left label (small, secondary)
  - A main service name (large, primary)
  - An arrow button
  
  Using an array means: if the company wants to add a 4th service,
  we add one object to the array. We don't touch the HTML/JSX at all.
  This is "data-driven" UI — a professional practice.
*/

const services = [
  {
    id: 'svc-1',
    label: 'Office of multiple interest content',
    name: 'Collaborative & partnership',
    href: '#contact',
  },
  {
    id: 'svc-2',
    label: 'The hanger US Air force digital experimental',
    name: 'We talk about our weight',
    href: '#contact',
  },
  {
    id: 'svc-3',
    label: 'Skills React can be some digital',
    name: 'Piloting digital confidence',
    href: '#contact',
  },
]

const Services = () => {
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
    <section id="services" className="services" ref={sectionRef} aria-label="Services section">
      <div className="services__container">

        {/* Section heading — "What we can offer you!" */}
        <div className="services__header reveal">
          <h2 className="services__heading">
            What we{' '}
            <span className="highlight-green">can</span>
            <br />
            <span className="underline-orange">offer</span> you!
          </h2>
        </div>

        {/* Service rows */}
        <div className="services__list" role="list">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className={`services__item reveal reveal-delay-${index + 1}`}
              role="listitem"
            >
              {/* Left: small label */}
              <span className="services__label">{service.label}</span>

              {/* Divider line */}
              <div className="services__divider" aria-hidden="true"></div>

              {/* Center: main service name */}
              <span className="services__name">{service.name}</span>

              {/* Right: arrow button */}
              <a 
                href={service.href} 
                className="services__arrow" 
                id={service.id}
                aria-label={`Learn more about ${service.name}`}
              >
                <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Services
