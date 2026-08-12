import Section from './Section'
import { profile } from '../data/profile'

export default function Awards() {
  return (
    <Section id="accomplishments" title="Honors and Awards" widgetClass="wg-accomplishments">
      {profile.awards.map((award) => (
        <div className="card experience course" key={award.title}>
          <div className="card-body">
            {award.url ? (
              <a href={award.url} target="_blank" rel="noopener">
                <div className="section-subheading card-title exp-title text-muted my-0">
                  {award.title}
                </div>
              </a>
            ) : (
              <div className="section-subheading card-title exp-title text-muted my-0">
                {award.title}
              </div>
            )}
            <div className="card-subtitle my-0 article-metadata">
              {award.url ? (
                <a href={award.url} target="_blank" rel="noopener">
                  {award.org}
                </a>
              ) : (
                award.org
              )}
              <span className="middot-divider" />
              {award.year}
            </div>
          </div>
        </div>
      ))}
    </Section>
  )
}
