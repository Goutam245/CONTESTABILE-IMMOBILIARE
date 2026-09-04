/**
 * Lenis smooth scrolling, wired into GSAP's ticker so ScrollTrigger reads the
 * same frame Lenis just wrote. Without this the two run on separate loops and
 * scrub animations jitter.
 *
 * Disabled entirely under prefers-reduced-motion and on coarse pointers, where
 * native momentum scrolling is better than anything we can emulate.
 */
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './anim'
import { prefersReducedMotion } from './utils'

let lenis: Lenis | null = null

export function useSmoothScroll(): void {
  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (prefersReducedMotion() || coarse) return

    lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis?.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis?.destroy()
      lenis = null
    }
  }, [])
}

/** Jump to the top without the smooth easing — used on route change. */
export function scrollToTop(immediate = true): void {
  if (lenis) lenis.scrollTo(0, { immediate })
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
}

/** Freeze the page behind a modal (lightbox, mobile menu). */
export function setScrollLocked(locked: boolean): void {
  if (locked) lenis?.stop()
  else lenis?.start()
  document.body.style.overflow = locked ? 'hidden' : ''
}
