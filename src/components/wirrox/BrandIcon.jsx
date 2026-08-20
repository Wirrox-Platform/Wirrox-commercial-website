import React from "react";

export default function BrandIcon({ className = "" }) {
  return (
    <span className={`brand-icon ${className}`.trim()} role="img" aria-label="WIRROX">
      <img
        src="/favicon.svg"
        alt=""
        aria-hidden="true"
        className="brand-icon__asset brand-icon__asset--light"
      />
      <img
        src="/brand/WIRROX_Favicon_Platform_Dark.svg"
        alt=""
        aria-hidden="true"
        className="brand-icon__asset brand-icon__asset--dark"
      />
    </span>
  );
}
