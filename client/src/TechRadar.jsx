import React from "react";

const OUTER_ITEMS = [
  {
    name: "React.js",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    s: "0deg",
    r: "95px",
    dur: "9s",
    delay: "0s",
    glow: "#61DAFB"
  },
  {
    name: "Node.js",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    s: "60deg",
    r: "95px",
    dur: "12s",
    delay: "-3s",
    glow: "#68A063"
  },
  {
    name: "MongoDB",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    s: "120deg",
    r: "95px",
    dur: "10s",
    delay: "-5s",
    glow: "#4FAE4E"
  },
  {
    name: "Express.js",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    s: "180deg",
    r: "95px",
    dur: "14s",
    delay: "-7s",
    glow: "#c8ff00",
    invert: true
  },
  {
    name: "Python",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    s: "240deg",
    r: "95px",
    dur: "11s",
    delay: "-2s",
    glow: "#FFD43B"
  },
  {
    name: "Java",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    s: "300deg",
    r: "95px",
    dur: "13s",
    delay: "-6s",
    glow: "#f89820"
  }
];

const INNER_ITEMS = [
  {
    name: "JavaScript",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    s: "20deg",
    r: "55px",
    dur: "7s",
    delay: "-1s",
    glow: "#F7DF1E"
  },
  {
    name: "GitHub",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    s: "110deg",
    r: "55px",
    dur: "8s",
    delay: "-4s",
    glow: "#ffffff",
    invert: true
  },
  {
    name: "VS Code",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    s: "200deg",
    r: "55px",
    dur: "9s",
    delay: "-2s",
    glow: "#007ACC"
  },
  {
    name: "Redis",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    s: "300deg",
    r: "55px",
    dur: "6s",
    delay: "-3s",
    glow: "#FF4438"
  }
];

const ITEMS = [...OUTER_ITEMS, ...INNER_ITEMS];

function TechRadar() {
  return (
    <section className="tech-radar-wrap" aria-label="Tech stack radar">
      <style>{`
        .tech-radar-wrap {
          width: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: "JetBrains Mono", monospace;
        }

        .tech-radar-label {
          color: #8892a4;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-align: center;
        }

        .tech-radar {
          position: relative;
          width: 260px;
          height: 260px;
          background: transparent;
        }

        .tech-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
        }

        .ring-1 {
          width: 260px;
          height: 260px;
          border: 1px solid rgba(0, 212, 255, 0.1);
        }

        .ring-2 {
          width: 185px;
          height: 185px;
          border: 1px solid rgba(0, 212, 255, 0.17);
        }

        .ring-3 {
          width: 110px;
          height: 110px;
          border: 1px solid rgba(0, 212, 255, 0.26);
        }

        .ring-4 {
          width: 44px;
          height: 44px;
          border: 1px solid rgba(0, 212, 255, 0.35);
        }

        .tech-radar-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .tech-radar-sweep {
          position: absolute;
          width: 260px;
          height: 260px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: tech-spin 4s linear infinite;
          pointer-events: none;
        }

        .tech-sweep-fan {
          position: absolute;
          width: 50%;
          height: 50%;
          top: 0;
          left: 50%;
          transform-origin: bottom left;
          background: conic-gradient(from -90deg at 0% 100%, rgba(0, 212, 255, 0.22) 0deg, transparent 65deg);
          border-radius: 0 100% 0 0;
        }

        .tech-sweep-line {
          position: absolute;
          width: 50%;
          height: 2px;
          top: 50%;
          left: 50%;
          transform-origin: left center;
          transform: rotate(-4deg);
          background: linear-gradient(to right, transparent, #00d4ff);
          box-shadow: 0 0 8px #00d4ff, 0 0 20px rgba(0, 212, 255, 0.4);
        }

        .tech-center-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 12px;
          height: 12px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: #00d4ff;
          box-shadow: 0 0 12px #00d4ff, 0 0 30px rgba(0, 212, 255, 0.5);
          z-index: 20;
        }

        .tech-center-dot::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 26px;
          height: 26px;
          transform: translate(-50%, -50%);
          border: 1.5px solid rgba(0, 212, 255, 0.4);
          border-radius: 50%;
          animation: tech-pulse-c 2.2s ease-out infinite;
        }

        .tech-node {
          --s: 0deg;
          --r: 95px;
          --dur: 9s;
          --delay: 0s;
          --glow: #00d4ff;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 38px;
          height: 38px;
          margin: -19px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.12);
          background: #0c1525;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: tech-orbit var(--dur) linear infinite, tech-blip var(--dur) linear infinite;
          animation-delay: var(--delay), var(--delay);
          z-index: 12;
        }

        .tech-node:hover {
          border-color: var(--glow);
          box-shadow: 0 0 14px var(--glow);
          z-index: 30;
        }

        .tech-node img {
          width: 22px;
          height: 22px;
          object-fit: contain;
        }

        .tech-node .tip {
          position: absolute;
          bottom: calc(100% + 7px);
          left: 50%;
          transform: translateX(-50%);
          background: #0f1629;
          border: 1px solid rgba(0, 212, 255, 0.35);
          padding: 3px 9px;
          border-radius: 4px;
          font-size: 9px;
          color: #00d4ff;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .tech-node:hover .tip {
          opacity: 1;
        }

        .tech-radar-status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          width: 100%;
        }

        .tech-status-item {
          color: #8892a4;
          font-size: 9px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .tech-online-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #39ff14;
          box-shadow: 0 0 8px #39ff14, 0 0 18px rgba(57, 255, 20, 0.6);
          animation: tech-blink 1.8s infinite;
        }

        .tech-scanning {
          color: #00d4ff;
          letter-spacing: 0.15em;
          animation: tech-scanpulse 4s ease-in-out infinite;
        }

        .tech-radar-count {
          font-size: 9px;
          color: #8892a4;
          border: 1px solid rgba(0, 212, 255, 0.18);
          padding: 3px 10px;
          border-radius: 20px;
          background: rgba(0, 212, 255, 0.04);
        }

        @keyframes tech-spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes tech-pulse-c {
          from {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.9;
          }
          to {
            transform: translate(-50%, -50%) scale(2.8);
            opacity: 0;
          }
        }

        @keyframes tech-orbit {
          from {
            transform: rotate(var(--s)) translateX(var(--r)) rotate(calc(-1 * var(--s)));
          }
          to {
            transform: rotate(calc(var(--s) + 360deg)) translateX(var(--r)) rotate(calc(-1 * (var(--s) + 360deg)));
          }
        }

        @keyframes tech-blip {
          0%,
          88%,
          100% {
            box-shadow: none;
          }
          90% {
            box-shadow: 0 0 0 3px var(--glow), 0 0 14px var(--glow);
          }
          95% {
            box-shadow: 0 0 0 6px transparent;
          }
        }

        @keyframes tech-blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.25;
          }
        }

        @keyframes tech-scanpulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      <p className="tech-radar-label">$ scanning tech_stack --all</p>

      <div className="tech-radar" role="img" aria-label="Animated radar showing tech stack orbiting icons">
        <div className="tech-ring ring-1" />
        <div className="tech-ring ring-2" />
        <div className="tech-ring ring-3" />
        <div className="tech-ring ring-4" />

        <svg className="tech-radar-grid" viewBox="0 0 260 260" aria-hidden="true">
          <line x1="130" y1="0" x2="130" y2="260" stroke="rgba(0,212,255,0.07)" />
          <line x1="0" y1="130" x2="260" y2="130" stroke="rgba(0,212,255,0.07)" />
          <line x1="37" y1="37" x2="223" y2="223" stroke="rgba(0,212,255,0.04)" />
          <line x1="223" y1="37" x2="37" y2="223" stroke="rgba(0,212,255,0.04)" />
        </svg>

        <div className="tech-radar-sweep" aria-hidden="true">
          <div className="tech-sweep-fan" />
          <div className="tech-sweep-line" />
        </div>

        <div className="tech-center-dot" />

        {ITEMS.map((item) => (
          <div
            key={item.name}
            className="tech-node"
            style={{
              "--s": item.s,
              "--r": item.r,
              "--dur": item.dur,
              "--delay": item.delay,
              "--glow": item.glow
            }}
          >
            <img src={item.src} alt={item.name} style={item.invert ? { filter: "invert(1)" } : undefined} />
            <span className="tip">{item.name}</span>
          </div>
        ))}
      </div>

      <div className="tech-radar-status" aria-hidden="true">
        <span className="tech-status-item">
          <span className="tech-online-dot" />
          10 systems online
        </span>
        <span className="tech-status-item tech-scanning">? SCANNING</span>
        <span className="tech-status-item">4s / cycle</span>
      </div>

      <div className="tech-radar-count" aria-hidden="true">
        outer: 6 core · inner: 4 tools
      </div>
    </section>
  );
}

export default TechRadar;
