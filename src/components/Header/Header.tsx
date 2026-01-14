import { Link } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
  title?: string
}

export default function Header({ title = "May's log" }: HeaderProps) {
  return (
    <header className="blog-header">
      <div className="header-container">
        <Link to="/" className="header-left" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
          <div className="logo">🦙</div>
          <h1 className="site-title">{title}</h1>
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <a href="#" className="nav-link">
            About me
          </a>
        </nav>
      </div>
    </header>
  )
}
