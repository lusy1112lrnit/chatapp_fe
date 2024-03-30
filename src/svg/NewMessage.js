import React from "react";

export default function NewMessage({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="blue"
      className={className || "bi bi-dot"}
      viewBox="0 0 16 16"

    >
      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
    </svg>
  );
}
