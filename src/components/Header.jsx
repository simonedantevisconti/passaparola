import { NavLink, Link } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="Passaparola, torna alla home">
          <span className="brand-symbol" aria-hidden="true">P<span>·</span></span>
          <span>PASSAPAROLA</span>
        </Link>
        <nav className="header-nav" aria-label="Navigazione principale">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <NavLink to="/come-si-gioca" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Regole</NavLink>
          <NavLink to="/profilo" className={({ isActive }) => isActive ? "nav-link nav-profile active" : "nav-link nav-profile"}>
            <i className="bi bi-person-circle" aria-hidden="true" /> <span>Profilo</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
