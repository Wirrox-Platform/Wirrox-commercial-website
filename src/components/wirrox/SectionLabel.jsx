import React from "react";

export default function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="w-5 h-px bg-bronze" />
      <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-bronze">
        {label}
      </span>
    </div>
  );
}