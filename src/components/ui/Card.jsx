import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl p-0 overflow-hidden shadow ${className}`}>
      {children}
    </div>
  );
}
