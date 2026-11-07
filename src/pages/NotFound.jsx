import { Link } from "react-router-dom";
import "../styles/not-found.css";

export default function NotFound() { return <div className="container not-found-page"><p className="eyebrow">ERRORE 404</p><h1>Pagina non trovata<span>.</span></h1><p>Questa lettera non fa parte della ruota.</p><Link to="/" className="btn btn-primary">Torna alla home</Link></div>; }
