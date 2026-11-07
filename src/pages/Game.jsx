import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LetterWheel from "../components/LetterWheel";
import QuestionPanel from "../components/QuestionPanel";
import GameStats from "../components/GameStats";
import { ALPHABET, categories, questionSets } from "../data/questions";
import { isCorrectAnswer, nextAvailableLetter, saveResult } from "../utils/game";
import "../styles/game.css";

const GAME_SECONDS = 180;
const getCounts = (statuses) => ({
  correct: Object.values(statuses).filter((s) => s === "correct").length,
  wrong: Object.values(statuses).filter((s) => s === "wrong").length,
});

export default function Game() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = categories.find((item) => item.id === categoryId);
  const questions = questionSets[categoryId];
  const [phase, setPhase] = useState("ready");
  const [statuses, setStatuses] = useState({});
  const [currentLetter, setCurrentLetter] = useState(ALPHABET[0]);
  const [seconds, setSeconds] = useState(GAME_SECONDS);
  const [feedback, setFeedback] = useState(null);
  const savedRef = useRef(false);
  const stateRef = useRef({ phase, statuses, currentLetter });
  stateRef.current = { phase, statuses, currentLetter };

  const finish = useCallback((finalStatuses) => {
    if (savedRef.current) return;
    savedRef.current = true;
    const { correct, wrong } = getCounts(finalStatuses);
    saveResult({ id: crypto.randomUUID(), categoryId, date: new Date().toISOString(), correct, wrong, total: ALPHABET.length });
    setPhase("finished");
  }, [categoryId]);

  useEffect(() => {
    if (phase !== "playing") return undefined;
    const timer = window.setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "playing" && seconds === 0) finish(statuses);
  }, [phase, seconds, statuses, finish]);

  function start() {
    savedRef.current = false;
    setStatuses({}); setCurrentLetter(ALPHABET[0]); setSeconds(GAME_SECONDS); setFeedback(null); setPhase("playing");
  }

  function advance(updatedStatuses, current) {
    const next = nextAvailableLetter(ALPHABET, updatedStatuses, current);
    if (next) setCurrentLetter(next);
    else finish(updatedStatuses);
  }

  function answer(value) {
    const state = stateRef.current;
    if (state.phase !== "playing") return;
    const letter = state.currentLetter;
    const question = questions[letter];
    const correct = isCorrectAnswer(question, value);
    const updated = { ...state.statuses, [letter]: correct ? "correct" : "wrong" };
    setStatuses(updated);
    setFeedback({ letter, correct, answer: question.answer });
    advance(updated, letter);
  }

  function pass() {
    const state = stateRef.current;
    if (state.phase !== "playing") return;
    const letter = state.currentLetter;
    const updated = { ...state.statuses, [letter]: "passed" };
    setStatuses(updated); setFeedback(null);
    const next = nextAvailableLetter(ALPHABET, updated, letter);
    if (next === letter) {
      // Only this letter remains: keep it selected until answered.
      setCurrentLetter(letter);
    } else if (next) setCurrentLetter(next);
  }

  function selectLetter(letter) {
    if (phase !== "playing") return;
    if (statuses[letter] === "correct" || statuses[letter] === "wrong") return;
    setCurrentLetter(letter); setFeedback(null);
  }

  if (!category || !questions) return (
    <div className="container empty-category"><h1>Categoria non trovata.</h1><Link className="btn btn-primary" to="/">Torna alla home</Link></div>
  );

  const { correct, wrong } = getCounts(statuses);
  const remaining = ALPHABET.length - correct - wrong;
  const activeQuestion = questions[currentLetter];
  const finishedByTime = seconds === 0;

  return (
    <div className="container game-page">
      <div className="game-topline"><button type="button" className="back-link" onClick={() => navigate("/")}><i className="bi bi-arrow-left" aria-hidden="true" /> Categorie</button><span>{category.title}</span></div>
      {phase === "ready" ? (
        <div className="game-ready">
          <div><p className="eyebrow">SEI PRONTO?</p><h1>{category.title}<span>.</span></h1><p>21 lettere, 21 domande e 3 minuti di tempo. Una risposta sbagliata chiude la lettera; con “Passaparola” puoi tornarci più tardi.</p><button type="button" onClick={start} className="btn btn-primary">Comincia la partita <i className="bi bi-arrow-right" aria-hidden="true" /></button></div>
          <LetterWheel />
        </div>
      ) : phase === "finished" ? (
        <section className="game-result">
          <p className="eyebrow">PARTITA TERMINATA</p><h1>{finishedByTime ? "Tempo scaduto!" : "Giro completato!"}</h1>
          <strong className="result-score">{correct}<span> / {ALPHABET.length}</span></strong>
          <p>Risposte corrette: {correct} · Errate: {wrong} · Non risposte: {remaining}</p>
          <div className="result-actions"><button type="button" className="btn btn-primary" onClick={start}>Rigioca <i className="bi bi-arrow-clockwise" aria-hidden="true" /></button><Link to="/" className="btn btn-ghost">Cambia categoria</Link><Link to="/profilo" className="btn btn-ghost">Vedi risultati</Link></div>
          <LetterWheel statuses={statuses} />
        </section>
      ) : (
        <>
          <GameStats seconds={seconds} correct={correct} wrong={wrong} remaining={remaining} />
          <div className="game-grid">
            <div className="game-wheel-area"><LetterWheel statuses={statuses} activeLetter={currentLetter} onSelect={selectLetter} /><div className="wheel-legend"><span><i className="legend-dot legend-current" /> Attuale</span><span><i className="legend-dot legend-correct" /> Corretta</span><span><i className="legend-dot legend-wrong" /> Errata</span></div></div>
            <div className="game-question-area">
              <QuestionPanel key={currentLetter} question={activeQuestion} letter={currentLetter} onAnswer={answer} onPass={pass} disabled={seconds === 0} />
              {feedback && <p className={`answer-feedback ${feedback.correct ? "good" : "bad"}`} role="status">{feedback.correct ? `✓ Lettera ${feedback.letter}: risposta corretta!` : `✕ Lettera ${feedback.letter}: la risposta era “${feedback.answer}”.`}</p>}
              <p className="game-hint"><i className="bi bi-info-circle" aria-hidden="true" /> Puoi selezionare qualsiasi lettera ancora da completare.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
