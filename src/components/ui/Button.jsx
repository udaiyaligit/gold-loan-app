import React from "react";

export default function Button({ children, className = "", ...rest }) {
  return (
    <button {...rest} className={`px-4 py-2 rounded-lg ${className}`}>
      {children}
    </button>
  );
}
