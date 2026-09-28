import React from "react";

// Shared clock: enter, pause for 1.65 seconds, continue, then rest before repeating.
export const FLOW_DURATION = "5.5s";
export const flowAnimation = (name) => ({ animation: `${name} ${FLOW_DURATION} linear infinite` });

export function flowFrames(name, points) {
  return `@keyframes ${name} { ${points.map(([time, x, y, opacity = 1]) =>
    `${time}% { transform:translate(${x}px,${y}px); opacity:${opacity}; }`
  ).join(" ")} }`;
}

export function curvePoint(t, p) {
  const m = 1 - t;
  return [0, 1].map(k => m ** 3 * p[0][k] + 3 * m ** 2 * t * p[1][k] + 3 * m * t ** 2 * p[2][k] + t ** 3 * p[3][k]);
}

export function fanFrames(name, points) {
  const frames = [[0, ...points[0], 0], [59.99, ...points[0], 0]];
  for (let i = 0; i <= 24; i++) frames.push([60 + i / 24 * 25, ...curvePoint(i / 24, points)]);
  frames.push([85.01, ...points[3], 0], [100, ...points[3], 0]);
  return flowFrames(name, frames);
}

export function FlowMark({ x, y, size = 40 }) {
  return <>
    <image className="brand-svg-icon--light" href="/brand/WIRROX_Mark_Light.svg" x={x} y={y} width={size} height={size} />
    <image className="brand-svg-icon--dark" href="/brand/WIRROX_Mark_Dark.svg" x={x} y={y} width={size} height={size} />
  </>;
}

export function FlowDot({ name, kind = "entry" }) {
  return <circle data-flow-dot={kind} cx={0} cy={0} r={3.5} fill="#C9A96E" opacity={0} style={flowAnimation(name)} />;
}
