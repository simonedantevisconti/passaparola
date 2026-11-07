import "../styles/game-stats.css";

function timeFormat(seconds) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

export default function GameStats({ seconds, correct, wrong, remaining }) {
  return (
    <div className="game-stats">
      <div className={`stat-card time-card ${seconds <= 30 ? "time-low" : ""}`}><span>Tempo</span><strong>{timeFormat(seconds)}</strong></div>
      <div className="stat-card"><span>Corrette</span><strong>{correct}</strong></div>
      <div className="stat-card"><span>Errate</span><strong>{wrong}</strong></div>
      <div className="stat-card"><span>Rimaste</span><strong>{remaining}</strong></div>
    </div>
  );
}
