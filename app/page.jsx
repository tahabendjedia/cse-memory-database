"use client";
import { useState } from "react";
import { FOLDERS, LEVELS } from "@/lib/data";
import Puzzle from "@/components/Puzzle";
import FolderIcon from "@/components/FolderIcon";

export default function Home() {
  const [folder, setFolder] = useState(null);
  const [level, setLevel] = useState(null);

  const path = ["CSE:", "memory", folder?.id, level].filter(Boolean).join("/");
  const back = () => (level ? setLevel(null) : setFolder(null));

  return (
    <main className="desk">
      <section className="win" aria-label="CSE Memory database">
        <header className="titlebar">
          <span className="orb" />
          <strong>CSE Memory database</strong>
          <span className="winbtns" aria-hidden="true"><i>–</i><i>▢</i><i className="x">✕</i></span>
        </header>
        <div className="addr">
          <button className="btn small" onClick={back} disabled={!folder}>Back</button>
          <code>{path}</code>
        </div>

        <div className="content">
          {!folder && (
            <>
              <h1>Pick a folder to open</h1>
              <div className="folders">
                {FOLDERS.map((f) => (
                  <button key={f.id} className="folder" onClick={() => setFolder(f)}>
                    <FolderIcon id={f.id} hue={f.hue} />
                    <span>{f.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {folder && !level && (
            <>
              <h1>{folder.label}: choose a difficulty</h1>
              <div className="levels">
                {Object.entries(LEVELS).map(([key, l]) => (
                  <button key={key} className="btn big" onClick={() => setLevel(key)}>
                    {l.label}<small>{l.hint}</small>
                  </button>
                ))}
              </div>
            </>
          )}

          {folder && level && (
            <Puzzle key={folder.id + level} folder={folder} level={level} onLevels={() => setLevel(null)} onFolders={() => { setLevel(null); setFolder(null); }} />
          )}
        </div>
      </section>
    </main>
  );
}
