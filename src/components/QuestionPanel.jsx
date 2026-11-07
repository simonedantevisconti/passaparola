import { useEffect, useRef, useState } from "react";
import "../styles/question-panel.css";

export default function QuestionPanel({ question, letter, onAnswer, onPass, disabled }) {
  const [answer, setAnswer] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    // Reset the field whenever a new letter is selected.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnswer("");
    inputRef.current?.focus();
  }, [letter]);

  function submit(event) {
    event.preventDefault();
    if (answer.trim() && !disabled) onAnswer(answer);
  }

  if (!question) return null;

  return (
    <section className="question-panel" aria-live="polite">
      <p className="eyebrow">LA TUA DOMANDA</p>
      <div className="question-heading">Lettera <strong>{letter}</strong></div>
      <h2>{question.clue}</h2>
      <form onSubmit={submit} className="answer-form">
        <label htmlFor="answer-input">La tua risposta</label>
        <input
          ref={inputRef} id="answer-input" value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Scrivi la parola..." autoComplete="off" spellCheck="false"
          disabled={disabled} maxLength={80}
        />
        <div className="answer-actions">
          <button type="submit" className="btn btn-primary" disabled={disabled || !answer.trim()}>Conferma <i className="bi bi-arrow-right" aria-hidden="true" /></button>
          <button type="button" className="btn btn-ghost" disabled={disabled} onClick={onPass}>Passaparola <i className="bi bi-skip-forward" aria-hidden="true" /></button>
        </div>
      </form>
    </section>
  );
}
