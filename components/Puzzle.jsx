"use client";
import { useEffect, useRef, useState } from "react";
import { LEVELS, placeholderArt } from "@/lib/data";

const shuffle = (len) => {
  let a;
  do {
    a = Array.from({ length: len }, (_, i) => i);
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  } while (a.every((v, i) => v === i));
  return a;
};

export default function Puzzle({ folder, level, onLevels, onFolders }) {
  const N = LEVELS[level].n;
  const [img, setImg] = useState(null);
  const [placeholder, setPlaceholder] = useState(false);
  const [order, setOrder] = useState(null); // order[slot] = piece id
  const [sel, setSel] = useState(null);
  const [moves, setMoves] = useState(0);
  const [secs, setSecs] = useState(0);
  const [peek, setPeek] = useState(false);
  const dragFrom = useRef(null);

  useEffect(() => {
  let cancelled = false;
  const candidates = [...folder.photos].sort(() => Math.random() - 0.5);
  const tryNext = () => {
    const src = candidates.shift();
    if (!src) { setPlaceholder(true); setImg(placeholderArt(folder)); return; }
    const im = new Image();
    im.onload = () => !cancelled && setImg(src);
    im.onerror = () => !cancelled && tryNext();
    im.src = src;
  };
  tryNext();
  setOrder(shuffle(N * N));
  return () => { cancelled = true; };
}, [folder, N]);

  const solved = !!order && order.every((v, i) => v === i);
  const running = !!order && !solved && moves > 0;

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const swap = (a, b) => {
    if (a === null || a === b || solved) return;
    setOrder((o) => { const n = [...o]; [n[a], n[b]] = [n[b], n[a]]; return n; });
    setMoves((m) => m + 1);
    setSel(null);
  };
  const click = (i) => (sel === null ? setSel(i) : sel === i ? setSel(null) : swap(sel, i));
  const restart = () => { setOrder(shuffle(N * N)); setMoves(0); setSecs(0); setSel(null); };
  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  if (!order || !img) return <p className="loading">Opening {folder.label}…</p>;

  return (
    <div className="play">
      <div className="stats">
        <span>Moves <b>{moves}</b></span>
        <span>Time <b>{fmt(secs)}</b></span>
        <button className="btn small" onMouseDown={() => setPeek(true)} onMouseUp={() => setPeek(false)} onMouseLeave={() => setPeek(false)} onTouchStart={() => setPeek(true)} onTouchEnd={() => setPeek(false)}>Hold to preview</button>
        <button className="btn small" onClick={restart}>Shuffle again</button>
      </div>

      <div className="board" style={{ gridTemplateColumns: `repeat(${N}, 1fr)` }}>
        {order.map((p, i) => (
          <button
            key={i}
            draggable={!solved}
            aria-label={`Piece ${i + 1}${p === i ? ", correct" : ""}`}
            className={`piece${sel === i ? " sel" : ""}${p === i ? " ok" : ""}`}
            onClick={() => click(i)}
            onDragStart={() => { dragFrom.current = i; }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => swap(dragFrom.current, i)}
            style={{
              backgroundImage: `url("${img}")`,
              backgroundSize: `${N * 100}% ${N * 100}%`,
              backgroundPosition: `${((p % N) / (N - 1)) * 100}% ${(Math.floor(p / N) / (N - 1)) * 100}%`,
            }}
          />
        ))}
        {peek && <div className="peek" style={{ backgroundImage: `url("${img}")` }} />}
        {solved && (
          <div className="win-card" role="status">
            <h2>Memory restored</h2>
            <p>{folder.label} · {LEVELS[level].label} · {moves} moves · {fmt(secs)}</p>
            <div className="row">
              <button className="btn small" onClick={restart}>Play again</button>
              <button className="btn small" onClick={onLevels}>Change difficulty</button>
              <button className="btn small" onClick={onFolders}>Other folders</button>
            </div>
          </div>
        )}
      </div>
      <p className="tip">Click two pieces to swap them, or drag one onto another.{placeholder && ` Showing a placeholder: add public/photos/${folder.id}.jpg.`}</p>
    </div>
  );
}
