import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import LetterWheel from "../components/LetterWheel";
import { categories } from "../data/questions";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="container home-page">
      <section className="home-hero">
        <div className="hero-content">
          <p className="eyebrow">IL GIOCO DELLE PAROLE</p>
          <h1>Una lettera.<br />Una domanda.<br /><span>La tua risposta.</span></h1>
          <p className="hero-description">Scegli un argomento, sfida il tempo e completa la ruota. Quante parole riuscirai a indovinare?</p>
          <a className="btn btn-primary" href="#categorie">Inizia a giocare <i className="bi bi-arrow-down-right" aria-hidden="true" /></a>
          <Link className="hero-secondary" to="/come-si-gioca">Come si gioca <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
        </div>
        <div className="hero-wheel"><LetterWheel /></div>
      </section>
      <section className="categories-section" id="categorie">
        <div className="section-heading"><div><p className="eyebrow">SCEGLI IL TUO TEMA</p><h2>Le categorie<span>.</span></h2></div><p>21 domande per categoria. 3 minuti per completare il giro.</p></div>
        <div className="categories-grid">{categories.map((category, index) => <CategoryCard key={category.id} category={category} index={index} />)}</div>
      </section>
    </div>
  );
}
