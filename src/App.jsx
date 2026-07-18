import { useState, useCallback } from 'react'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Tomorrow     from './components/Tomorrow'
import Progress     from './components/Progress'
import Services     from './components/Services'
import Testimonials from './components/Testimonials'
import Newsletter   from './components/Newsletter'
import Footer       from './components/Footer'
import CustomCursor from './components/CustomCursor'
import IntroSplash  from './components/IntroSplash'

/*
  ════════════════════════════════════════════════════════════
  CONCEPT: useState with lazy initializer
  ════════════════════════════════════════════════════════════
  
  Normal useState: useState(false) → runs every render (wasteful if computing something)
  Lazy initializer: useState(() => ...) → runs ONCE on first render only
  
  We use the lazy form because localStorage.getItem() is a function call
  that we only need on the very first render (to check if user has visited).
  Running it on every re-render would be wasteful.
  
  The function returns true (show intro) or false (skip intro):
  - localStorage has 'elementum_visited'? → false (user was here before → skip)
  - No flag yet? → true (first visit → show intro)

  ════════════════════════════════════════════════════════════
  CONCEPT: useCallback
  ════════════════════════════════════════════════════════════
  
  useCallback memoizes (caches) a function so it doesn't get 
  recreated on every render.
  
  Why does it matter here?
  handleIntroComplete is passed as a prop to IntroSplash.
  Without useCallback, a NEW function is created every render.
  React sees a new prop value → re-renders IntroSplash unnecessarily.
  useCallback([]) means: "create this function ONCE and keep it forever."
  
  [] = empty dependency array = this function never needs to change.
*/

function App() {
  // Lazy initializer: check localStorage once on mount
  const [showIntro, setShowIntro] = useState(() => {
    // In development: comment out this line to always see the intro
    // (so you can keep testing it without clearing storage)
    const hasVisited = localStorage.getItem('elementum_visited')
    return !hasVisited  // true = show intro, false = skip
  })

  // Called by IntroSplash when its exit animation completes
  const handleIntroComplete = useCallback(() => {
    // Mark that this browser has now visited the site
    localStorage.setItem('elementum_visited', 'true')
    // Remove the splash from the DOM
    setShowIntro(false)
  }, [])  // [] = stable function, never recreated

  return (
    <>
      {/* 
        First-visit onboarding splash.
        showIntro = true  → renders, plays animation, calls handleIntroComplete
        showIntro = false → component is completely gone from DOM (not just hidden)
        
        WHY completely removed (not just hidden with display:none)?
        Hidden elements still take memory and run JavaScript.
        Once the splash is done, we don't need it anymore.
        Removing from DOM = freed memory = better performance.
      */}
      {showIntro && <IntroSplash onComplete={handleIntroComplete} />}

      {/* Custom cursor — only visible on desktop, hidden on touch */}
      <CustomCursor />

      <Navbar />

      <main id="main-content">
        <Hero />
        <Tomorrow />
        <Progress />
        <Services />
        <Testimonials />
        <Newsletter />
      </main>

      <Footer />
    </>
  )
}

export default App
