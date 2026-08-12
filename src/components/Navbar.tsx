import { useState } from 'react'
import { profile } from '../data/profile'

interface NavbarProps {
  activeId: string
}

export default function Navbar({ activeId }: NavbarProps) {
  const [open, setOpen] = useState(false)

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page-header">
      <header className="header--fixed">
        <nav className="navbar navbar-expand-lg navbar-light compensate-for-scrollbar" id="navbar-main">
          <div className="container-xl">
            <div className="d-none d-lg-inline-flex">
              <a className="navbar-brand" href="#top" onClick={(e) => scrollTo(e, 'about')}>
                {profile.name}
              </a>
            </div>

            <button
              type="button"
              className="navbar-toggler"
              aria-controls="navbar-content"
              aria-expanded={open}
              aria-label="Toggle navigation"
              onClick={() => setOpen((v) => !v)}
            >
              <span>
                <i className="fas fa-bars" />
              </span>
            </button>

            <div className="navbar-brand-mobile-wrapper d-inline-flex d-lg-none">
              <a className="navbar-brand" href="#top" onClick={(e) => scrollTo(e, 'about')}>
                {profile.name}
              </a>
            </div>

            <div
              className={`navbar-collapse main-menu-item collapse justify-content-end${open ? ' show' : ''}`}
              id="navbar-content"
            >
              <ul className="navbar-nav d-md-inline-flex">
                {profile.nav.map((item) => (
                  <li className="nav-item" key={item.target}>
                    <a
                      className={`nav-link${activeId === item.target ? ' active' : ''}`}
                      href={`#${item.target}`}
                      onClick={(e) => scrollTo(e, item.target)}
                    >
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="nav-icons navbar-nav flex-row ml-auto d-flex pl-md-2" />
          </div>
        </nav>
      </header>
    </div>
  )
}
