import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/questions";
import { getHistory, getNickname, saveNickname } from "../utils/game";
import "../styles/profile.css";

export default function Profile() {
  const [nickname, setNickname] = useState(getNickname);
  const [saved, setSaved] = useState(false);
  const [history] = useState(getHistory);
  const best = history.length ? Math.max(...history.map((game) => game.correct)) : 0;

  function submit(e) { e.preventDefault(); saveNickname(nickname); setSaved(true); }

  return <div className="container profile-page"><div className="page-intro"><p className="eyebrow">IL TUO SPAZIO</p><h1>Profilo<span className="orange-dot">.</span></h1><p>Salva un nickname e controlla i tuoi risultati su questo dispositivo.</p></div><form className="profile-form" onSubmit={submit}><label htmlFor="nickname">Il tuo nickname</label><div><input id="nickname" value={nickname} onChange={(e) => { setNickname(e.target.value); setSaved(false); }} maxLength={24} placeholder="Come ti chiami?" /><button className="btn btn-primary">Salva</button></div>{saved && <p role="status" className="saved-message">Nickname salvato.</p>}</form><div className="profile-overview"><div><span>Partite giocate</span><strong>{history.length}</strong></div><div><span>Record</span><strong>{best}<small> / 21</small></strong></div></div><div className="history-heading"><h2>Ultime partite</h2><Link to="/">Gioca ancora <i className="bi bi-arrow-right" aria-hidden="true" /></Link></div>{history.length ? <div className="history-list">{history.map((item) => <article className="history-row" key={item.id}><div><strong>{categories.find((cat) => cat.id === item.categoryId)?.title || "Categoria"}</strong><span>{new Date(item.date).toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" })}</span></div><strong>{item.correct} / {item.total}</strong></article>)}</div> : <div className="no-history">Non hai ancora giocato nessuna partita. <Link to="/">Scegli la tua prima categoria.</Link></div>}<p className="storage-note"><i className="bi bi-shield-lock" aria-hidden="true" /> I dati vengono salvati solo nel browser: non è ancora previsto un account online.</p></div>;
}
