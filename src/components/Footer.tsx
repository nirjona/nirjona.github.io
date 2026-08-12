import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="powered-by">
        © {profile.copyrightYear} {profile.name}
      </p>
    </footer>
  )
}
