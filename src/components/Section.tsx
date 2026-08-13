import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  /** extra classes on <section>, e.g. "wg-pages", "wg-experience", "light" */
  widgetClass?: string
  children: ReactNode
}

/**
 * Shared section shell replicating the Wowchemy home-section layout:
 * big heading in the left column, content in the right column.
 */
export default function Section({ id, title, widgetClass = 'wg-blank', children }: SectionProps) {
  return (
    <section id={id} className={`home-section ${widgetClass}`} style={{ padding: '30px 0 30px 0' }}>
      <div className="home-section-bg" />
      <div className="container">
        <div className="row">
          <div className="section-heading col-12 col-lg-4 mb-3 mb-lg-0 d-flex flex-column align-items-center align-items-lg-start">
            {/* <h2>, not <h1>: the page has one <h1> (the name in About).
                Six competing <h1>s gave screen-reader users a heading list
                with no page title. */}
            <h2 className="mb-0">{title}</h2>
          </div>
          <div className="col-12 col-lg-8">{children}</div>
        </div>
      </div>
    </section>
  )
}
