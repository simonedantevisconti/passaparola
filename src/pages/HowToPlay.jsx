import { Link } from "react-router-dom";
import "../styles/how-to-play.css";

const steps = [
  ["01", "Scegli la categoria", "Ogni categoria contiene 21 domande, una per ogni lettera della ruota."],
  ["02", "Rispondi alle domande", "Scrivi la parola corretta. Gli accenti, gli spazi e la punteggiatura non influiscono sulla verifica."],
  ["03", "Usa Passaparola", "Se non sai una risposta, passa alla successiva: potrai tornare alla lettera in seguito."],
  ["04", "Completa il giro", "Hai 3 minuti. Le risposte corrette valgono un punto; quelle errate non si possono ripetere."],
];

export default function HowToPlay() {
  return <div className="container rules-page"><div className="page-intro"><p className="eyebrow">LE REGOLE</p><h1>Come si gioca<span className="orange-dot">.</span></h1><p>Facile da imparare, difficile da completare: prova a chiudere la ruota prima che scada il tempo.</p></div><div className="steps-grid">{steps.map(([num, heading, body]) => <article key={num} className="rule-step"><span>{num}</span><h2>{heading}</h2><p>{body}</p></article>)}</div><Link className="btn btn-primary" to="/">Scegli una categoria <i className="bi bi-arrow-right" aria-hidden="true" /></Link></div>;
}
