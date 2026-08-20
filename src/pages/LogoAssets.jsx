import React from "react";

const assets = [
  {
    label: "Commercial wordmark",
    file: "WIRROX_Wordmark_Light.svg",
    href: "/brand/WIRROX_Wordmark_Light.svg",
    previewClass: "bg-white",
  },
  {
    label: "Platform wordmark",
    file: "WIRROX_Wordmark_Dark.svg",
    href: "/brand/WIRROX_Wordmark_Dark.svg",
    previewClass: "bg-[#0F0F0F]",
  },
];

export default function LogoAssets() {
  return (
    <div className="min-h-screen bg-canvas p-6 sm:p-12 text-ink">
      <div className="max-w-4xl mx-auto">
        <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-bronze mb-3">
          Brand Assets
        </p>
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Official WIRROX logo files</h1>
        <p className="text-sm text-muted-foreground mb-12">
          Supplied Brand Identity Workbook v1.6 SVG masters. Do not edit, stretch, or recreate the wordmark.
        </p>

        <div className="grid gap-8">
          {assets.map((asset) => (
            <div key={asset.file} className="rounded-lg border border-rule bg-card p-6 sm:p-8 shadow-panel">
              <div
                className={`mb-6 flex h-36 items-center overflow-hidden rounded-lg border border-rule ${asset.previewClass}`}
              >
                <img src={asset.href} alt={asset.label} className="w-full h-auto" />
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold">{asset.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{asset.file}</p>
                </div>
                <a
                  href={asset.href}
                  download={asset.file}
                  className="rounded-md px-6 py-2.5 bg-ink text-canvas text-[11px] font-mono uppercase tracking-[0.16em] hover:bg-bronze hover:text-ink transition-colors duration-300"
                >
                  Download SVG
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
