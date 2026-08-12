import Section from './Section'
import { profile } from '../data/profile'
import type { ExperienceEntry } from '../data/profile'

interface TimelineItemProps {
  entry: ExperienceEntry
  isFirst: boolean
  isLast: boolean
}

function TimelineItem({ entry, isFirst, isLast }: TimelineItemProps) {
  return (
    <div className="row experience">
      <div className="col-auto text-center flex-column d-none d-sm-flex">
        <div className="row h-50">
          <div className={`col${isFirst ? '' : ' border-right'}`}>&nbsp;</div>
          <div className="col">&nbsp;</div>
        </div>
        <div className="m-2">
          <span className={`badge badge-pill border${entry.current ? ' exp-fill' : ''}`}>
            &nbsp;
          </span>
        </div>
        <div className="row h-50">
          <div className={`col${isLast ? '' : ' border-right'}`}>&nbsp;</div>
          <div className="col">&nbsp;</div>
        </div>
      </div>
      <div className="col py-2">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-content-start">
              <div>
                <div className="section-subheading card-title exp-title text-muted my-0">
                  {entry.role}
                </div>
                <div className="section-subheading card-title exp-company text-muted my-0">
                  <a href={entry.companyUrl} target="_blank" rel="noopener">
                    {entry.company}
                  </a>
                </div>
                <div className="text-muted exp-meta">
                  {entry.period}
                  <span className="middot-divider" />
                  <span>{entry.location}</span>
                </div>
              </div>
            </div>
            <div className="card-text article-style">
              <ul>
                {entry.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const entries = profile.experience
  return (
    <Section id="experience" title="Experience" widgetClass="wg-experience">
      {entries.map((entry, i) => (
        <TimelineItem
          key={entry.company}
          entry={entry}
          isFirst={i === 0}
          isLast={i === entries.length - 1}
        />
      ))}
    </Section>
  )
}
