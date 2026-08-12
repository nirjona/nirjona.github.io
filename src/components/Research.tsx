import Section from './Section'
import { profile } from '../data/profile'
import type { Publication } from '../data/profile'

function PublicationItem({ pub }: { pub: Publication }) {
  return (
    <div className="pub-list-item view-citation" style={{ marginBottom: '1rem' }}>
      <i className="far fa-file-alt pub-icon" aria-hidden="true" />
      <span className="article-metadata li-cite-author">
        {pub.authors.map((author, i) => (
          <span key={author}>
            <span className={author === pub.highlighted ? 'author-highlighted' : undefined}>
              {author}
            </span>
            {i < pub.authors.length - 1 ? ', ' : ''}
          </span>
        ))}
      </span>{' '}
      ({pub.year}).{' '}
      <a href={pub.url} target="_blank" rel="noopener">
        {pub.title}
      </a>
      . In{' '}
      <em>
        <strong>{pub.venue}</strong>
      </em>
      .
      <p>
        {pub.links.map((link) => (
          <a
            key={link.label}
            className="btn btn-outline-primary btn-page-header btn-sm"
            href={link.url}
            target="_blank"
            rel="noopener"
          >
            {link.label}
          </a>
        ))}
      </p>
    </div>
  )
}

export default function Research() {
  return (
    <Section id="publications" title="Research" widgetClass="wg-pages">
      {profile.publications.map((pub) => (
        <PublicationItem key={pub.title} pub={pub} />
      ))}
    </Section>
  )
}
