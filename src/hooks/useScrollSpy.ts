import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view.
 * Returns the id of the active section (the last one whose top edge has
 * scrolled past the fixed-navbar offset).
 */
export function useScrollSpy(sectionIds: string[], offset = 90): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      let current = sectionIds[0] ?? ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= offset) {
          current = id
        }
      }
      // If scrolled to the very bottom, highlight the last section
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        current = sectionIds[sectionIds.length - 1] ?? current
      }
      setActiveId(current)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionIds, offset])

  return activeId
}
