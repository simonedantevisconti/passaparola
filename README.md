# PASSAPAROLA — Base React + Vite

Sito di gioco responsive con ruota delle 21 lettere italiane, quattro categorie (84 domande), timer 3 minuti, gestione risposte e «Passaparola», pagine Home / Regole / Profilo e punteggi salvati localmente.

## Per inserire nel tuo progetto

Copia `src/` e `index.html` nella tua cartella `passaparola`, mantenendo la disposizione `src/components`, `src/layout`, `src/pages`, `src/styles`. Aggiungi anche `src/data` e `src/utils`. L'immagine `public/passaparola-logo.png` del pacchetto è un **segnaposto minimale**: puoi mantenerla o sostituirla con il tuo logo esistente.

Il pacchetto contiene anche `package.json`, `vite.config.js` ed `eslint.config.js` per avviarlo autonomamente; **se hai già modificato questi file nel tuo progetto, non sovrascriverli**, verifica solamente la presenza delle dipendenze.

```bash
npm install
npm run dev
```

Dipendenze richieste: `react`, `react-dom`, `react-router-dom`, `bootstrap-icons`.

Se le hai già installate, non devi reinstallarle. Altrimenti:

```bash
npm install react-router-dom bootstrap-icons
```

## Rotte

- `/` — Home e categorie
- `/gioca/generale` — Cultura generale
- `/gioca/geografia` — Geografia
- `/gioca/scienza` — Scienza e natura
- `/gioca/sport` — Sport
- `/come-si-gioca` — Regole
- `/profilo` — Nickname e risultati locali

## Domande

Modifica `src/data/questions.js` per aggiungere o correggere le domande. Ogni categoria richiede una domanda per ognuna delle 21 lettere definite in `ALPHABET`. La risposta deve iniziare con la relativa lettera; `aliases` consente varianti accettate.

## Funzionalità implementate

- Ruota responsive e stato visivo delle risposte: in attesa / saltata / corretta / errata.
- Timer da 180 secondi; la partita termina se finiscono le lettere o il tempo.
- `Passaparola` rimanda a una domanda senza bruciarla.
- Verifica risposta case-insensitive e tollerante ad accenti, spazi e punteggiatura.
- Punteggio e cronologia locale fino alle ultime 30 partite.
- Profilo locale **senza login vero**. L'autenticazione Firebase può essere aggiunta più avanti.
- Font Unbounded / Albert Sans e palette richiesta.

## Nota sui contenuti

Le 84 domande sono un set originale di partenza e possono essere raffinate o ampliate. Il progetto è una reinterpretazione autonoma del formato del gioco delle lettere, non una copia del codice Educaplay.
