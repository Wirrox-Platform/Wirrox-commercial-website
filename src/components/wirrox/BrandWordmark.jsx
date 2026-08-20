import React from "react";

export default function BrandWordmark({ className = "" }) {
  return (
    <span
      className={`brand-wordmark ${className}`.trim()}
      role="img"
      aria-label="WIRROX"
    >
      <img
        src="/brand/WIRROX_Wordmark_Light.svg"
        alt=""
        aria-hidden="true"
        className="brand-wordmark__asset brand-wordmark__asset--light"
      />
      <img
        src="/brand/WIRROX_Wordmark_Dark.svg"
        alt=""
        aria-hidden="true"
        className="brand-wordmark__asset brand-wordmark__asset--dark"
      />
    </span>
  );
}
