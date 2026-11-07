import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link to="/" className="footer-brand">PASSAPAROLA<span>.</span></Link>
        <p>Creato da <a href="https://simonevisconti.space/" target="_blank" rel="noopener noreferrer">Simone Visconti <i className="bi bi-arrow-up-right" aria-hidden="true" /></a></p>
        <small>© {new Date().getFullYear()} Passaparola</small>
      </div>
    </footer>
  );
}
