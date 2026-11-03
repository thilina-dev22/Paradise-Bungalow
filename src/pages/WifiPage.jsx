import React, { useState, useEffect } from 'react';
import { Wifi, Copy, Check, Zap, Shield, ChevronRight, ExternalLink } from 'lucide-react';

// ─── WiFi configuration ───────────────────────────────────────────────────────
const NETWORKS = [
  { ssid: 'PB Fiber Main',    band: '2.4 / 5 GHz', hint: 'Nearest rooms & lobby' },
  { ssid: 'PB Fiber AP1 5G',  band: '5 GHz',        hint: 'Upper floor · fastest speed' },
  { ssid: 'PB Fiber AP1 2.4G',band: '2.4 GHz',      hint: 'Upper floor · best range' },
  { ssid: 'PB Fiber AP2',     band: '2.4 / 5 GHz', hint: 'Best range · garden & cabana' },
];
const PASSWORD = 'pb@12345';
// ─────────────────────────────────────────────────────────────────────────────

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 ${
        copied
          ? 'bg-emerald-700 text-amber-300'
          : 'bg-emerald-950/80 text-amber-400 hover:bg-emerald-800'
      }`}
    >
      {copied ? (
        <><Check className="w-3.5 h-3.5" /> Copied!</>
      ) : (
        <><Copy className="w-3.5 h-3.5" /> Copy</>
      )}
    </button>
  );
}

function NetworkCard({ network }) {
  const [copied, setCopied] = useState(false);

  const handleCopySSID = async () => {
    try {
      await navigator.clipboard.writeText(network.ssid);
    } catch {
      const el = document.createElement('textarea');
      el.value = network.ssid;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center gap-3 hover:bg-white/15 transition-all duration-200">
      {/* Wifi icon */}
      <div className="shrink-0 w-8 h-8 rounded-lg bg-amber-400/15 flex items-center justify-center">
        <Wifi className="w-4 h-4 text-amber-400" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-bold text-white text-sm truncate">{network.ssid}</p>
          <button
            onClick={handleCopySSID}
            className={`shrink-0 p-1.5 rounded-lg transition-all active:scale-95 ${
              copied ? 'bg-amber-400/20 text-amber-300' : 'text-white/50 hover:text-amber-400 hover:bg-white/10'
            }`}
            title="Copy network name"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
        <p className="text-amber-300/80 text-[11px] font-semibold mt-0.5">{network.band}</p>
        <p className="text-white/50 text-[11px] mt-0.5">{network.hint}</p>
      </div>
    </div>
  );
}

export default function WifiPage() {
  const [pageVisible, setPageVisible] = useState(false);

  useEffect(() => {
    document.title = 'WiFi · Paradise Bungalow';

    // Enforce noindex on this page
    let meta = document.querySelector('meta[name="robots"]');
    if (meta) {
      meta.setAttribute('content', 'noindex, nofollow');
    } else {
      meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      document.head.appendChild(meta);
    }

    const t = setTimeout(() => setPageVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 transition-opacity duration-700 ${
        pageVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: 'linear-gradient(160deg, #0a1f19 0%, #0d2b22 40%, #122e26 70%, #0a1f19 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-800/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-900/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">

        {/* Logo — links to main website */}
        <a
          href="https://paradisebungalow.lk"
          className="flex flex-col items-center mb-8 group"
          title="Visit Paradise Bungalow website"
        >
          {/* Round frame that matches the dark-green page background so logo blends cleanly */}
          <div
            className="w-36 h-36 rounded-full flex items-center justify-center overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-amber-400/20 group-hover:ring-amber-400/50 transition-all duration-300"
            style={{ background: '#0d3d2e' }}
          >
            <img
              src="/images/logo.png"
              alt="Paradise Bungalow"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-amber-400/70 text-[11px] font-bold uppercase tracking-[0.2em] mt-4">
            Midigama · Sri Lanka
          </p>
          <span className="inline-flex items-center gap-1 text-white/30 text-[10px] mt-1 group-hover:text-amber-400/60 transition-colors duration-200">
            <ExternalLink className="w-2.5 h-2.5" />
            paradisebungalow.lk
          </span>
        </a>

        {/* Card */}
        <div
          className="rounded-3xl overflow-hidden shadow-2xl shadow-black/60"
          style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          {/* Header */}
          <div className="px-6 pt-7 pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/15 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg leading-tight">Guest Wi-Fi</h1>
                <p className="text-white/50 text-[11px] mt-0.5">Complimentary high-speed internet</p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/15 text-amber-300 text-[10px] font-bold uppercase tracking-wide">
                <Zap className="w-3 h-3" /> Gigabit Fiber
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wide">
                <Shield className="w-3 h-3" /> WPA2 Secured
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white/60 text-[10px] font-semibold">
                Dialog Air Fiber
              </span>
            </div>
          </div>

          {/* Password */}
          <div className="px-6 py-5 border-b border-white/10">
            <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest mb-2">Password (all networks)</p>
            <div className="flex items-center justify-between gap-3 bg-black/30 rounded-xl px-4 py-3">
              <code className="text-amber-300 font-mono font-bold text-lg tracking-widest select-all">
                {PASSWORD}
              </code>
              <CopyButton text={PASSWORD} label="password" />
            </div>
          </div>

          {/* Networks */}
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest">Available Networks</p>
              <span className="text-white/40 text-[10px]">Pick the strongest signal</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {NETWORKS.map((net) => (
                <NetworkCard key={net.ssid} network={net} />
              ))}
            </div>

            {/* Tip */}
            <div className="mt-4 flex items-start gap-2 bg-amber-400/8 rounded-xl px-3.5 py-3 border border-amber-400/15">
              <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-amber-300/80 text-[11px] leading-relaxed">
                <span className="font-bold">Tip:</span> All four networks share the same password.
                Choose the network with the strongest signal bars on your device.
              </p>
            </div>
          </div>

          {/* Footer strip */}
          <div className="px-6 py-4 bg-black/20 border-t border-white/8 flex items-center justify-between">
            <div>
              <p className="text-white/80 text-[11px] font-bold">Need help connecting?</p>
              <p className="text-white/40 text-[10px] mt-0.5">Ask at reception or WhatsApp us</p>
            </div>
            <a
              href="https://wa.me/94762825336"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all text-white text-[11px] font-bold"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom link to main website */}
        <div className="flex justify-center mt-8">
          <a
            href="https://paradisebungalow.lk"
            className="inline-flex items-center gap-1.5 text-white/30 hover:text-amber-400/70 text-[11px] font-semibold uppercase tracking-widest transition-colors duration-200"
          >
            <ExternalLink className="w-3 h-3" />
            Visit our website
          </a>
        </div>

      </div>
    </div>
  );
}
