import { profile } from '../data/profile'

/** Renders a bio paragraph, replacing {org} / {mist} placeholders with links. */
function BioParagraph({ text }: { text: string }) {
  const { linkTargets } = profile.bio
  const parts = text.split(/(\{org\}|\{mist\})/)
  return (
    <p>
      {parts.map((part, i) => {
        if (part === '{org}') {
          const t = linkTargets.org
          return (
            <a key={i} href={t.url} target="_blank" rel="noopener">
              {t.label}
            </a>
          )
        }
        if (part === '{mist}') {
          const t = linkTargets.mist
          return (
            <a key={i} href={t.url} target="_blank" rel="noopener">
              {t.label}
            </a>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </p>
  )
}

export default function About() {
  return (
    <section id="about" className="home-section wg-about" style={{ padding: '30px 0 30px 0' }}>
      <div className="home-section-bg" />
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4">
            <div id="profile">
              <img
                className="avatar avatar-circle"
                width={270}
                height={270}
                src={profile.avatar}
                alt={profile.name}
              />
              <div className="portrait-title">
                <h2>{profile.name}</h2>
                <h3>{profile.role}</h3>
                <h3>
                  <a href={profile.organization.url} target="_blank" rel="noopener">
                    <span>{profile.organization.name}</span>
                  </a>
                </h3>
              </div>
              <ul className="network-icon" aria-hidden="true">
                {profile.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      aria-label={s.label}
                      {...(s.url.startsWith('mailto:')
                        ? {}
                        : { target: '_blank', rel: 'noopener' })}
                    >
                      <i className={`${s.icon} big-icon`} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className="article-style">
              <p>{profile.bio.greeting}</p>
              {profile.bio.paragraphs.map((p, i) => (
                <BioParagraph key={i} text={p.text} />
              ))}
            </div>
            <div className="row">
              <div className="col-md-7">
                <div className="section-subheading">Education</div>
                <ul className="ul-edu fa-ul mb-0">
                  {profile.education.map((e) => (
                    <li key={e.degree}>
                      <i className="fa-li fas fa-graduation-cap" />
                      <div className="description">
                        <p className="course">{e.degree}</p>
                        <p className="institution">{e.institution}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md-5">
                <div className="section-subheading">Interests</div>
                <ul className="ul-interests">
                  {profile.interests.map((interest) => (
                    <li key={interest}>{interest}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
