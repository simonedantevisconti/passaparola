import { ALPHABET } from "../data/questions";
import "../styles/letter-wheel.css";

export default function LetterWheel({ statuses = {}, activeLetter, onSelect }) {
  return (
    <div className="wheel" role="group" aria-label="Ruota delle lettere">
      <div className="wheel-track" aria-hidden="true" />
      {ALPHABET.map((letter, index) => {
        const angle = ((index / ALPHABET.length) * 2 * Math.PI) - Math.PI / 2;
        const style = { "--x": `${50 + 44 * Math.cos(angle)}%`, "--y": `${50 + 44 * Math.sin(angle)}%` };
        const status = statuses[letter] || "pending";
        const isActive = activeLetter === letter;
        return (
          <button
            key={letter}
            type="button"
            className={`wheel-letter ${status} ${isActive ? "selected" : ""}`}
            style={style}
            aria-label={`Lettera ${letter}, ${status === "correct" ? "corretta" : status === "wrong" ? "errata" : status === "passed" ? "passata" : "da giocare"}`}
            aria-pressed={isActive}
            disabled={status === "correct" || status === "wrong" || !onSelect}
            onClick={() => onSelect?.(letter)}
          >{letter}</button>
        );
      })}
      <div className="wheel-center" aria-hidden="true"><span>PASSA</span><span>PAROLA<span className="accent">.</span></span></div>
    </div>
  );
}
