/* SVG charts — small, no deps */

function LineChart({ data, w = 720, h = 200, accent = "var(--primary)" }) {
  const pad = { l: 36, r: 16, t: 18, b: 26 };
  const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
  const max = Math.max(...data.map(d => d.v));
  const min = Math.min(...data.map(d => d.v));
  const span = Math.max(1, max - min);
  const x = (i) => pad.l + (i / (data.length - 1)) * iw;
  const y = (v) => pad.t + ih - ((v - min) / span) * ih;
  const path = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.v)}`).join(" ");
  const area = `${path} L ${x(data.length - 1)} ${pad.t + ih} L ${x(0)} ${pad.t + ih} Z`;
  const yTicks = 4;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="lc-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: yTicks + 1 }).map((_, i) => {
        const yy = pad.t + (ih * i) / yTicks;
        const v = Math.round(max - (span * i) / yTicks);
        return (
          <g key={i}>
            <line x1={pad.l} x2={w - pad.r} y1={yy} y2={yy} stroke="var(--hairline)" />
            <text x={pad.l - 8} y={yy + 3} textAnchor="end" fontSize="10" fill="var(--muted)" fontFamily="var(--font-mono)">{v.toLocaleString()}</text>
          </g>
        );
      })}
      <path d={area} fill="url(#lc-grad)" />
      <path d={path} fill="none" stroke={accent} strokeWidth="1.6" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(d.v)} r="2.4" fill="var(--paper)" stroke={accent} strokeWidth="1.6" />
          <text x={x(i)} y={h - 8} textAnchor="middle" fontSize="10.5" fill="var(--muted)">{d.m}</text>
        </g>
      ))}
    </svg>
  );
}

function BarChart({ data, w = 360, h = 200, vertical = false }) {
  const pad = { l: vertical ? 130 : 28, r: 16, t: 14, b: vertical ? 14 : 26 };
  const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
  const max = Math.max(...data.map(d => d.v)) * 1.1;
  if (vertical) {
    const rowH = ih / data.length;
    return (
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        {data.map((d, i) => {
          const yy = pad.t + i * rowH + 4;
          const bw = (d.v / max) * iw;
          return (
            <g key={i}>
              <text x={pad.l - 10} y={yy + rowH / 2} textAnchor="end" fontSize="11.5" fill="var(--ink-2)" dominantBaseline="middle">{d.name}</text>
              <rect x={pad.l} y={yy} width={iw} height={rowH - 8} fill="var(--bg-deep)" rx="3" />
              <rect x={pad.l} y={yy} width={bw} height={rowH - 8} fill={d.color} rx="3" />
              <text x={pad.l + bw + 6} y={yy + rowH / 2} fontSize="11" fontFamily="var(--font-mono)" fill="var(--ink-2)" dominantBaseline="middle">{d.v}</text>
            </g>
          );
        })}
      </svg>
    );
  }
  const bw = iw / data.length - 8;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`}>
      {data.map((d, i) => {
        const xx = pad.l + i * (bw + 8);
        const bh = (d.v / max) * ih;
        return (
          <g key={i}>
            <rect x={xx} y={pad.t + ih - bh} width={bw} height={bh} fill={d.color || "var(--primary)"} rx="3" />
            <text x={xx + bw / 2} y={h - 10} textAnchor="middle" fontSize="10.5" fill="var(--muted)">{d.m || d.name}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Donut({ data, size = 180, thickness = 22, label }) {
  const total = data.reduce((s, d) => s + d.v, 0);
  const r = size / 2 - thickness / 2;
  const c = size / 2;
  let acc = 0;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={c} cy={c} r={r} fill="none" stroke="var(--bg-deep)" strokeWidth={thickness} />
        {data.map((d, i) => {
          const frac = d.v / total;
          const len = 2 * Math.PI * r * frac;
          const gap = 2 * Math.PI * r - len;
          const offset = -2 * Math.PI * r * acc;
          acc += frac;
          return (
            <circle key={i} cx={c} cy={c} r={r} fill="none"
              stroke={d.color} strokeWidth={thickness}
              strokeDasharray={`${len - 2} ${gap + 2}`}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${c} ${c})`} />
          );
        })}
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 30, lineHeight: 1 }}>{total}</div>
          <div style={{ color: "var(--muted)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 2 }}>{label}</div>
        </div>
      </div>
    </div>
  );
}

function Heatmap({ grid }) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const weeks = ["W19", "W18", "W17", "W16", "W15"];
  const cell = 24, gap = 4;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: `28px repeat(7, ${cell}px)`, gap, marginBottom: 6 }}>
        <div></div>
        {days.map((d, i) => <div key={i} style={{ fontSize: 10, color: "var(--muted)", textAlign: "center" }}>{d}</div>)}
      </div>
      {grid.map((row, ri) => (
        <div key={ri} style={{ display: "grid", gridTemplateColumns: `28px repeat(7, ${cell}px)`, gap, marginBottom: gap }}>
          <div style={{ fontSize: 10, color: "var(--muted)", display: "flex", alignItems: "center" }}>{weeks[ri]}</div>
          {row.map((v, ci) => {
            const a = 0.15 + v * 0.85;
            const bg = `color-mix(in oklab, var(--primary) ${Math.round(a * 100)}%, var(--bg-deep))`;
            return (
              <div key={ci} title={`${Math.round(v * 100)}%`}
                style={{ width: cell, height: cell, borderRadius: 4, background: bg }} />
            );
          })}
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 11, color: "var(--muted)" }}>
        <span>Low</span>
        {[0.1, 0.3, 0.5, 0.7, 0.9].map(a => (
          <div key={a} style={{ width: 14, height: 14, borderRadius: 3, background: `color-mix(in oklab, var(--primary) ${Math.round(a * 100)}%, var(--bg-deep))` }} />
        ))}
        <span>High</span>
      </div>
    </div>
  );
}

Object.assign(window, { LineChart, BarChart, Donut, Heatmap });
