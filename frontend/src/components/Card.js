import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
export function Card({ title, meta, right, children }) {
  /** Standard card component with optional header content. */
  return (
    <section className="card">
      {(title || meta || right) && (
        <header className="cardHeader">
          <div>
            {title && <h3 className="cardTitle">{title}</h3>}
            {meta && <p className="cardMeta">{meta}</p>}
          </div>
          {right ? <div>{right}</div> : null}
        </header>
      )}
      <div className="cardBody">{children}</div>
    </section>
  );
}
