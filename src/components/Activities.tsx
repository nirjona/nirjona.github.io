import Section from './Section'
import { profile } from '../data/profile'

export default function Activities() {
  return (
    <Section id="activities" title="Activities" widgetClass="wg-blank light">
      {profile.activities.map((activity) => (
        <p key={activity.title}>
          <strong>{activity.title}</strong> {activity.detail}{' '}
          {activity.url && (
            <a href={activity.url} target="_blank" rel="noopener noreferrer">
              [link]
            </a>
          )}
        </p>
      ))}
    </Section>
  )
}
