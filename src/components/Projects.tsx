import Section from './Section'
import { profile } from '../data/profile'

export default function Projects() {
  return (
    <Section id="projects" title="Projects" widgetClass="wg-blank">
      {profile.projects.map((project) => (
        <div className="card experience course" key={project.name}>
          <div className="card-body">
            <a href={project.url} target="_blank" rel="noopener">
              <div className="section-subheading card-title exp-title text-muted my-0">
                {project.name}
              </div>
            </a>
            <div className="card-subtitle my-0 article-metadata">
              {project.stack}
              {project.meta && (
                <>
                  <span className="middot-divider" />
                  {project.meta}
                </>
              )}
            </div>
            <div className="card-text article-style mt-2">
              <p>{project.description}</p>
              {project.links.map((link) => (
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
            </div>
          </div>
        </div>
      ))}
    </Section>
  )
}
