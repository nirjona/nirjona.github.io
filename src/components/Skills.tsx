import Section from './Section'
import { profile } from '../data/profile'

export default function Skills() {
  return (
    <Section id="skills" title="Skills" widgetClass="wg-blank">
      {profile.skills.map((group) => (
        <p key={group.category}>
          <strong>{group.category}</strong> — {group.items.join(', ')}
        </p>
      ))}
    </Section>
  )
}
