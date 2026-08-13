import { useMemo } from 'react'
import Navbar from './components/Navbar'
import About from './components/About'
import Research from './components/Research'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Awards from './components/Awards'
import Skills from './components/Skills'
import Activities from './components/Activities'
import Footer from './components/Footer'
import { profile } from './data/profile'
import { useScrollSpy } from './hooks/useScrollSpy'

export default function App() {
  const sectionIds = useMemo(() => profile.nav.map((item) => item.target), [])
  const activeId = useScrollSpy(sectionIds)

  return (
    <>
      <Navbar activeId={activeId} />
      <main className="page-body" id="main">
        <About />
        <Research />
        <Experience />
        <Projects />
        <Awards />
        <Skills />
        <Activities />
      </main>
      <Footer />
    </>
  )
}
