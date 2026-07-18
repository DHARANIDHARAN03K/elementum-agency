import { useEffect, useRef } from 'react'
import '../styles/CustomCursor.css'

/*
  ════════════════════════════════════════════════
  CONCEPT: Custom Cursor — WHY IS THIS A WOW FACTOR?
  ════════════════════════════════════════════════
  
  99% of websites use the default OS cursor (arrow pointer).
  A custom cursor immediately signals: "This team pays attention
  to EVERY detail, even details the client never asks for."
  
  The evaluator's subconscious reaction: "Whoa — they thought of this?"
  That's exactly what you want.

  Companies that use custom cursors: Framer, Lusion, Awwwards winners.

  HOW IT WORKS — Two layers:
  ────────────────────────────
  1. DOT (small, 8px) — follows cursor INSTANTLY (no lag)
     This is the "anchor" the eye always knows where the cursor is.

  2. RING (large, 36px) — follows cursor with a DELAY (lag/smoothing)
     This delay creates the "trailing" effect — feels premium.

  The delay is created by interpolating (lerping) between the ring's
  current position and where the cursor actually is.
  
  LERP = Linear Interpolation
  Formula: current + (target - current) × speed
  At speed 0.12: ring moves 12% of the remaining distance every frame
  = gradually catches up but never teleports.

  WHY useEffect + requestAnimationFrame?
  ────────────────────────────────────────
  requestAnimationFrame (rAF) = runs a function every time the browser
  is about to paint a new frame (~60 times per second).
  This is the smoothest way to animate — synced with the display refresh rate.
  
  Using setInterval(fn, 16) would also run 60fps but it's not synced
  with the browser's paint cycle, so it can cause visual tearing.
  rAF is the professional standard for JavaScript animations.
*/

const CustomCursor = () => {
  const dotRef = useRef(null)     // small instant dot
  const ringRef = useRef(null)    // large lagging ring

  useEffect(() => {
    // Current mouse position (updated instantly on mousemove)
    let mouseX = 0
    let mouseY = 0

    // Ring's CURRENT position (lags behind mouseX/mouseY)
    let ringX = 0
    let ringY = 0

    // Hide the default browser cursor on the whole page
    // We're replacing it with our custom one
    document.body.style.cursor = 'none'

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Move the small dot INSTANTLY to cursor position
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`
        dotRef.current.style.top = `${mouseY}px`
      }
    }

    // Animation loop — runs ~60 times per second via requestAnimationFrame
    const animate = () => {
      // LERP: move ring 12% of the distance toward the mouse each frame
      // Result: ring smoothly "catches up" creating the trailing effect
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top = `${ringY}px`
      }

      // Schedule the next frame (creates an infinite loop at 60fps)
      animationId = requestAnimationFrame(animate)
    }

    let animationId = requestAnimationFrame(animate)

    // Cursor grows when hovering over interactive elements
    const onMouseEnterLink = () => {
      ringRef.current?.classList.add('cursor-ring--hover')
      dotRef.current?.classList.add('cursor-dot--hover')
    }
    const onMouseLeaveLink = () => {
      ringRef.current?.classList.remove('cursor-ring--hover')
      dotRef.current?.classList.remove('cursor-dot--hover')
    }

    // Attach hover effect to all links and buttons
    const interactiveEls = document.querySelectorAll('a, button, [role="button"]')
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    document.addEventListener('mousemove', onMouseMove)

    // CLEANUP — Why is this important?
    // When the component unmounts, we must:
    // 1. Stop the animation loop (otherwise it keeps running = memory leak)
    // 2. Remove event listeners (otherwise they pile up = bugs)
    // 3. Restore the default cursor
    return () => {
      cancelAnimationFrame(animationId)
      document.removeEventListener('mousemove', onMouseMove)
      document.body.style.cursor = 'auto'
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterLink)
        el.removeEventListener('mouseleave', onMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      {/* Small instant dot */}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      {/* Large lagging ring */}
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}

export default CustomCursor
