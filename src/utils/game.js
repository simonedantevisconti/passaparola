export function normalizeAnswer(value = "") {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("it-IT").replace(/[^a-z0-9]/g, "");
}

export function isCorrectAnswer(question, input) {
  return [question.answer, ...(question.aliases || [])].some((value) => normalizeAnswer(value) === normalizeAnswer(input));
}

export function nextAvailableLetter(letters, statuses, current) {
  const start = Math.max(0, letters.indexOf(current));
  for (let step = 1; step <= letters.length; step += 1) {
    const letter = letters[(start + step) % letters.length];
    if (!statuses[letter] || statuses[letter] === "passed" || statuses[letter] === "pending") return letter;
  }
  return null;
}

const STORAGE_KEY = "passaparola.history.v1";
const PROFILE_KEY = "passaparola.nickname.v1";

export function getHistory() {
  try { const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); return Array.isArray(value) ? value : []; }
  catch { return []; }
}

export function saveResult(result) {
  const history = getHistory();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([result, ...history].slice(0, 30)));
}

export function getNickname() { return localStorage.getItem(PROFILE_KEY) || ""; }
export function saveNickname(name) { localStorage.setItem(PROFILE_KEY, name.trim().slice(0, 24)); }
