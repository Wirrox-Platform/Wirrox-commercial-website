import React, { useRef } from "react";

// SVG icon: X with bronze dot, stroke width matched to WIRROX font weight
const XIconLight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="800" height="800">
    <rect width="200" height="200" fill="#FFFFFF"/>
    {/* Top-left arm */}
    <line x1="45" y1="45" x2="88" y2="88" stroke="#0F0F0F" strokeWidth="14" strokeLinecap="square"/>
    {/* Top-right arm */}
    <line x1="155" y1="45" x2="112" y2="88" stroke="#0F0F0F" strokeWidth="14" strokeLinecap="square"/>
    {/* Bottom-left arm */}
    <line x1="45" y1="155" x2="88" y2="112" stroke="#0F0F0F" strokeWidth="14" strokeLinecap="square"/>
    {/* Bottom-right arm */}
    <line x1="155" y1="155" x2="112" y2="112" stroke="#0F0F0F" strokeWidth="14" strokeLinecap="square"/>
    {/* Bronze center dot */}
    <circle cx="100" cy="100" r="13" fill="#C9A96E"/>
  </svg>
);

const XIconDark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="800" height="800">
    <rect width="200" height="200" fill="#0F0F0F"/>
    <line x1="45" y1="45" x2="88" y2="88" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="square"/>
    <line x1="155" y1="45" x2="112" y2="88" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="square"/>
    <line x1="45" y1="155" x2="88" y2="112" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="square"/>
    <line x1="155" y1="155" x2="112" y2="112" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="square"/>
    <circle cx="100" cy="100" r="13" fill="#C9A96E"/>
  </svg>
);

const WordmarkLight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="1560" height="360">
    <rect width="520" height="120" fill="#FFFFFF"/>
    <text
      x="20" y="88"
      fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
      fontWeight="900"
      fontSize="80"
      letterSpacing="6"
      fill="#0F0F0F"
    >WIRROX</text>
    <circle cx="500" cy="78" r="8" fill="#C9A96E"/>
  </svg>
);

const WordmarkDark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="1560" height="360">
    <rect width="520" height="120" fill="#0F0F0F"/>
    <text
      x="20" y="88"
      fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
      fontWeight="900"
      fontSize="80"
      letterSpacing="6"
      fill="#FFFFFF"
    >WIRROX</text>
    <circle cx="500" cy="78" r="8" fill="#C9A96E"/>
  </svg>
);

function downloadSVG(svgRef, filename) {
  const svgEl = svgRef.current.querySelector("svg");
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svgEl);
  const blob = new Blob([svgStr], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const assets = [
  { label: "Wordmark — Light", component: WordmarkLight, file: "wirrox-wordmark-light.svg", aspect: "wide" },
  { label: "Wordmark — Dark", component: WordmarkDark, file: "wirrox-wordmark-dark.svg", aspect: "wide" },
  { label: "X Icon — Light", component: XIconLight, file: "wirrox-icon-light.svg", aspect: "square" },
  { label: "X Icon — Dark", component: XIconDark, file: "wirrox-icon-dark.svg", aspect: "square" },
];

export default function LogoAssets() {
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const refs = [ref0, ref1, ref2, ref3];

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-12">
      <div className="max-w-4xl mx-auto">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C9A96E] mb-3">Brand Assets</p>
        <h1 className="text-3xl font-black tracking-tight text-[#0F0F0F] mb-2">WIRROX Logo Files</h1>
        <p className="text-sm text-gray-500 font-mono mb-12">Download as SVG — scalable, perfect quality, transparent-ready.</p>

        <div className="grid gap-8">
          {assets.map((asset, i) => {
            const Comp = asset.component;
            return (
              <div key={i} className="bg-white border border-gray-200 p-8">
                <div
                  ref={refs[i]}
                  className={`flex items-center justify-center mb-6 bg-gray-50 border border-gray-100 overflow-hidden ${
                    asset.aspect === "wide" ? "h-32" : "h-64"
                  }`}
                >
                  <div className={asset.aspect === "wide" ? "w-full" : "w-64"} style={{ lineHeight: 0 }}>
                    <Comp />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#0F0F0F]">{asset.label}</p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{asset.file}</p>
                  </div>
                  <button
                    onClick={() => downloadSVG(refs[i], asset.file)}
                    className="px-6 py-2.5 bg-[#0F0F0F] text-white text-[11px] font-mono uppercase tracking-[0.18em] hover:bg-[#C9A96E] hover:text-[#0F0F0F] transition-colors duration-300"
                  >
                    Download SVG
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-gray-400 font-mono mt-10 leading-relaxed">
          SVG files are infinitely scalable and work at any resolution. To export as PNG, open the SVG in a browser, right-click → Save as image, or use Figma / Inkscape.
        </p>
      </div>
    </div>
  );
}