export const LANDING_PAGE_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MesseMatch — Job Matching Platform</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
            --bg:        #050816;
            --bg2:       #090d1f;
            --surface:   rgba(255,255,255,0.04);
            --border:    rgba(255,255,255,0.08);
            --blue:      #3b82f6;
            --violet:    #8b5cf6;
            --cyan:      #06b6d4;
            --emerald:   #10b981;
            --amber:     #f59e0b;
            --rose:      #f43f5e;
            --text1:     #f1f5f9;
            --text2:     #94a3b8;
            --text3:     #475569;
            --grad-hero: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
            --grad-card: linear-gradient(145deg, rgba(59,130,246,0.12), rgba(139,92,246,0.06));
        }

        html { scroll-behavior: smooth; }

        body {
            font-family: 'Inter', system-ui, sans-serif;
            background: var(--bg);
            color: var(--text1);
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* ── Canvas Background ── */
        #bg-canvas {
            position: fixed;
            inset: 0;
            z-index: 0;
            pointer-events: none;
        }

        /* ── Noise Overlay ── */
        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
            pointer-events: none;
            z-index: 0;
            opacity: 0.4;
        }

        /* ── Layout ── */
        .wrapper { position: relative; z-index: 1; }

        /* ── Navbar ── */
        nav {
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.1rem 2.5rem;
            background: rgba(5, 8, 22, 0.7);
            backdrop-filter: blur(18px);
            border-bottom: 1px solid var(--border);
        }
        .nav-logo {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            font-size: 1.25rem;
            font-weight: 800;
            letter-spacing: -0.02em;
        }
        .nav-logo .logo-icon {
            width: 34px; height: 34px;
            background: var(--grad-hero);
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            box-shadow: 0 0 18px rgba(59,130,246,0.45);
        }
        .nav-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.3rem 0.85rem;
            background: rgba(16,185,129,0.12);
            border: 1px solid rgba(16,185,129,0.3);
            border-radius: 50px;
            font-size: 0.75rem;
            color: var(--emerald);
            font-weight: 600;
        }
        .pulse-dot {
            width: 7px; height: 7px;
            background: var(--emerald);
            border-radius: 50%;
            box-shadow: 0 0 8px var(--emerald);
            animation: dot-pulse 1.8s ease-in-out infinite;
        }
        @keyframes dot-pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50%       { transform: scale(1.5); opacity: 0.6; }
        }

        /* ── Hero ── */
        .hero {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 8rem 2rem 4rem;
            text-align: center;
            position: relative;
        }
        .hero-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.4rem 1rem;
            background: rgba(59,130,246,0.1);
            border: 1px solid rgba(59,130,246,0.25);
            border-radius: 50px;
            font-size: 0.78rem;
            font-weight: 600;
            color: #93c5fd;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            margin-bottom: 1.8rem;
            animation: fade-in-down 0.7s ease both;
        }
        .hero-eyebrow svg { width: 14px; height: 14px; }

        .hero-title {
            font-size: clamp(2.6rem, 6vw, 5rem);
            font-weight: 900;
            line-height: 1.08;
            letter-spacing: -0.04em;
            max-width: 820px;
            animation: fade-in-up 0.8s ease 0.1s both;
        }
        .hero-title .gradient-text {
            background: var(--grad-hero);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .hero-sub {
            margin-top: 1.4rem;
            font-size: clamp(1rem, 2vw, 1.2rem);
            color: var(--text2);
            max-width: 560px;
            line-height: 1.7;
            animation: fade-in-up 0.8s ease 0.2s both;
        }

        .hero-buttons {
            margin-top: 2.4rem;
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
            animation: fade-in-up 0.8s ease 0.3s both;
        }
        .btn-primary {
            padding: 0.8rem 1.9rem;
            background: var(--grad-hero);
            color: #fff;
            border: none;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 24px rgba(59,130,246,0.4);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(59,130,246,0.55); }
        .btn-outline {
            padding: 0.8rem 1.9rem;
            background: transparent;
            color: var(--text1);
            border: 1px solid var(--border);
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: border-color 0.2s, background 0.2s;
        }
        .btn-outline:hover { border-color: rgba(139,92,246,0.5); background: rgba(139,92,246,0.08); }

        /* ── Match Animation ── */
        .match-visual {
            margin-top: 4rem;
            width: 100%;
            max-width: 760px;
            animation: fade-in-up 1s ease 0.5s both;
        }
        .match-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
        }
        .match-card {
            background: var(--grad-card);
            border: 1px solid var(--border);
            border-radius: 18px;
            padding: 1.4rem 1.6rem;
            flex: 1;
            max-width: 230px;
            backdrop-filter: blur(12px);
            transition: transform 0.3s, box-shadow 0.3s;
            position: relative;
            overflow: hidden;
        }
        .match-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 2px;
        }
        .match-card.installer::before { background: linear-gradient(90deg, var(--blue), var(--violet)); }
        .match-card.company::before  { background: linear-gradient(90deg, var(--emerald), var(--cyan)); }
        .match-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,0,0,0.4); }
        .match-card .card-label {
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            margin-bottom: 0.8rem;
        }
        .match-card.installer .card-label { color: var(--blue); }
        .match-card.company  .card-label { color: var(--emerald); }
        .match-card .card-avatar {
            width: 44px; height: 44px;
            border-radius: 12px;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.4rem;
            margin-bottom: 0.8rem;
        }
        .match-card.installer .card-avatar { background: rgba(59,130,246,0.15); }
        .match-card.company  .card-avatar  { background: rgba(16,185,129,0.15); }
        .match-card .card-name {
            font-size: 0.92rem;
            font-weight: 700;
            margin-bottom: 0.6rem;
            color: var(--text1);
        }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }
        .skill-tag {
            padding: 0.22rem 0.6rem;
            border-radius: 6px;
            font-size: 0.67rem;
            font-weight: 600;
        }
        .skill-tag.blue    { background: rgba(59,130,246,0.15); color: #93c5fd; border: 1px solid rgba(59,130,246,0.2); }
        .skill-tag.violet  { background: rgba(139,92,246,0.15); color: #c4b5fd; border: 1px solid rgba(139,92,246,0.2); }
        .skill-tag.cyan    { background: rgba(6,182,212,0.15);  color: #67e8f9; border: 1px solid rgba(6,182,212,0.2); }
        .skill-tag.green   { background: rgba(16,185,129,0.15); color: #6ee7b7; border: 1px solid rgba(16,185,129,0.2); }
        .skill-tag.amber   { background: rgba(245,158,11,0.15); color: #fcd34d; border: 1px solid rgba(245,158,11,0.2); }
        .skill-tag.rose    { background: rgba(244,63,94,0.15);  color: #fda4af; border: 1px solid rgba(244,63,94,0.2); }

        /* Match connector */
        .match-connector {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.3rem;
            flex-shrink: 0;
        }
        .connector-line {
            width: 60px;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--violet), transparent);
            position: relative;
            overflow: hidden;
        }
        .connector-line::after {
            content: '';
            position: absolute;
            top: 0; left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, #fff 50%, transparent);
            animation: line-sweep 1.8s linear infinite;
        }
        @keyframes line-sweep { to { left: 200%; } }
        .match-icon {
            width: 42px; height: 42px;
            background: linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.3));
            border: 1px solid rgba(139,92,246,0.4);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: 1rem;
            animation: match-spin 4s ease-in-out infinite;
            box-shadow: 0 0 20px rgba(139,92,246,0.35), inset 0 0 12px rgba(59,130,246,0.15);
        }
        @keyframes match-spin {
            0%,100% { transform: scale(1) rotate(0deg);   box-shadow: 0 0 20px rgba(139,92,246,0.35); }
            25%      { transform: scale(1.12) rotate(8deg);  box-shadow: 0 0 32px rgba(59,130,246,0.55); }
            50%      { transform: scale(1.05) rotate(-4deg); box-shadow: 0 0 28px rgba(6,182,212,0.45); }
            75%      { transform: scale(1.1) rotate(6deg);  box-shadow: 0 0 30px rgba(139,92,246,0.5); }
        }
        .match-percent {
            font-size: 0.72rem;
            font-weight: 800;
            color: var(--violet);
            letter-spacing: 0.04em;
        }

        /* ── Stats Bar ── */
        .stats-bar {
            display: flex;
            justify-content: center;
            gap: 3rem;
            flex-wrap: wrap;
            padding: 2rem 2rem 4rem;
            animation: fade-in-up 0.8s ease 0.7s both;
        }
        .stat-item { text-align: center; }
        .stat-num {
            font-size: 2rem;
            font-weight: 900;
            background: var(--grad-hero);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            letter-spacing: -0.03em;
        }
        .stat-label { font-size: 0.8rem; color: var(--text2); font-weight: 500; margin-top: 0.2rem; }
        .stat-divider { width: 1px; background: var(--border); align-self: stretch; margin: 0.5rem 0; }

        /* ── Section ── */
        section { padding: 5rem 2rem; }
        .section-label {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--violet);
            margin-bottom: 1rem;
        }
        .section-label::before, .section-label::after {
            content: '';
            display: block;
            width: 20px; height: 1px;
            background: var(--violet);
            opacity: 0.5;
        }
        .section-title {
            font-size: clamp(1.8rem, 3.5vw, 2.8rem);
            font-weight: 800;
            letter-spacing: -0.03em;
            line-height: 1.15;
            max-width: 560px;
        }
        .section-desc {
            margin-top: 0.9rem;
            color: var(--text2);
            line-height: 1.7;
            max-width: 480px;
            font-size: 1rem;
        }

        /* ── How It Works ── */
        .how-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1.5rem;
            max-width: 1100px;
            margin: 3rem auto 0;
        }
        .step-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 2rem;
            position: relative;
            overflow: hidden;
            transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
            cursor: default;
        }
        .step-card:hover {
            transform: translateY(-6px);
            border-color: rgba(139,92,246,0.3);
            box-shadow: 0 20px 50px rgba(0,0,0,0.35), 0 0 30px rgba(139,92,246,0.08);
        }
        .step-card::after {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(139,92,246,0.08), transparent 55%);
            opacity: 0;
            transition: opacity 0.4s;
            pointer-events: none;
        }
        .step-card:hover::after { opacity: 1; }
        .step-num {
            font-size: 3.5rem;
            font-weight: 900;
            line-height: 1;
            letter-spacing: -0.05em;
            background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.1));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 1rem;
        }
        .step-icon {
            width: 52px; height: 52px;
            border-radius: 14px;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 1.2rem;
        }
        .step-icon.blue    { background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.2); }
        .step-icon.violet  { background: rgba(139,92,246,0.12); border: 1px solid rgba(139,92,246,0.2); }
        .step-icon.cyan    { background: rgba(6,182,212,0.12);  border: 1px solid rgba(6,182,212,0.2); }
        .step-icon.emerald { background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.2); }
        .step-title  { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; }
        .step-desc   { font-size: 0.88rem; color: var(--text2); line-height: 1.65; }

        /* ── Features ── */
        .features-wrap {
            max-width: 1100px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }
        @media (max-width: 760px) { .features-wrap { grid-template-columns: 1fr; gap: 2rem; } }
        .feature-list { display: flex; flex-direction: column; gap: 1.2rem; margin-top: 2.4rem; }
        .feature-item {
            display: flex;
            gap: 1rem;
            align-items: flex-start;
            padding: 1.1rem 1.3rem;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 14px;
            transition: border-color 0.25s, transform 0.25s;
        }
        .feature-item:hover { border-color: rgba(59,130,246,0.3); transform: translateX(5px); }
        .feature-item-icon {
            width: 40px; height: 40px; flex-shrink: 0;
            border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.1rem;
        }
        .feature-item-text h4 { font-size: 0.92rem; font-weight: 700; margin-bottom: 0.3rem; }
        .feature-item-text p  { font-size: 0.82rem; color: var(--text2); line-height: 1.55; }

        /* Live feed panel */
        .live-panel {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 22px;
            overflow: hidden;
            backdrop-filter: blur(12px);
        }
        .live-panel-header {
            padding: 1rem 1.4rem;
            border-bottom: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.82rem;
            font-weight: 600;
            color: var(--text2);
        }
        .live-badge {
            display: flex; align-items: center; gap: 0.4rem;
            font-size: 0.7rem; font-weight: 700;
            color: var(--rose);
            text-transform: uppercase; letter-spacing: 0.08em;
        }
        .live-dot {
            width: 7px; height: 7px;
            background: var(--rose); border-radius: 50%;
            box-shadow: 0 0 8px var(--rose);
            animation: dot-pulse 1.2s ease-in-out infinite;
        }
        .feed-list { padding: 0.5rem 0; }
        .feed-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.85rem 1.4rem;
            border-bottom: 1px solid rgba(255,255,255,0.03);
            transition: background 0.2s;
            animation: slide-in-right 0.5s ease both;
        }
        .feed-item:hover { background: rgba(255,255,255,0.03); }
        .feed-avatar {
            width: 36px; height: 36px; flex-shrink: 0;
            border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            font-size: 1rem;
        }
        .feed-content { flex: 1; min-width: 0; }
        .feed-title   { font-size: 0.82rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .feed-meta    { font-size: 0.72rem; color: var(--text2); margin-top: 0.15rem; }
        .feed-tag {
            flex-shrink: 0;
            padding: 0.18rem 0.55rem;
            border-radius: 6px;
            font-size: 0.66rem;
            font-weight: 700;
        }
        .feed-tag.match  { background: rgba(16,185,129,0.15); color: var(--emerald); border: 1px solid rgba(16,185,129,0.25); }
        .feed-tag.new    { background: rgba(59,130,246,0.15);  color: #93c5fd;       border: 1px solid rgba(59,130,246,0.25); }
        .feed-tag.hired  { background: rgba(139,92,246,0.15);  color: #c4b5fd;       border: 1px solid rgba(139,92,246,0.25); }

        /* ── Skill Cloud ── */
        .skills-section {
            text-align: center;
            padding: 5rem 2rem;
        }
        .skill-cloud {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.7rem;
            max-width: 800px;
            margin: 2.5rem auto 0;
        }
        .cloud-tag {
            padding: 0.5rem 1.1rem;
            border-radius: 50px;
            font-size: 0.82rem;
            font-weight: 600;
            transition: transform 0.25s, box-shadow 0.25s;
            cursor: default;
            animation: float-tag var(--dur, 4s) ease-in-out infinite;
            animation-delay: var(--delay, 0s);
        }
        .cloud-tag:hover { transform: scale(1.12); }
        @keyframes float-tag {
            0%,100% { transform: translateY(0); }
            50%      { transform: translateY(-5px); }
        }

        /* ── Tech Stack ── */
        .tech-row {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
            margin-top: 2rem;
        }
        .tech-chip {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.55rem 1.1rem;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 50px;
            font-size: 0.8rem;
            font-weight: 600;
            transition: border-color 0.2s;
        }
        .tech-chip:hover { border-color: rgba(139,92,246,0.4); }

        /* ── Footer ── */
        footer {
            padding: 2.5rem;
            border-top: 1px solid var(--border);
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.6rem;
        }
        .footer-logo { font-size: 1rem; font-weight: 800; letter-spacing: -0.02em; }
        .footer-sub  { font-size: 0.8rem; color: var(--text3); }

        /* ── Glow Orbs ── */
        .orb {
            position: fixed;
            border-radius: 50%;
            filter: blur(80px);
            pointer-events: none;
            z-index: 0;
            opacity: 0.18;
        }
        .orb-1 { width: 500px; height: 500px; background: var(--blue);   top: -100px; left: -100px; animation: orb-drift 18s ease-in-out infinite; }
        .orb-2 { width: 400px; height: 400px; background: var(--violet); bottom: -80px; right: -80px; animation: orb-drift 22s ease-in-out infinite reverse; }
        .orb-3 { width: 300px; height: 300px; background: var(--cyan);   top: 45%; left: 55%; animation: orb-drift 15s ease-in-out infinite 3s; }
        @keyframes orb-drift {
            0%,100% { transform: translate(0,0) scale(1); }
            33%      { transform: translate(40px,-30px) scale(1.05); }
            66%      { transform: translate(-20px,50px) scale(0.95); }
        }

        /* ── Animations ── */
        @keyframes fade-in-up   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fade-in-down { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slide-in-right { from { opacity:0; transform:translateX(-12px); } to { opacity:1; transform:translateX(0); } }
        @keyframes counter-up { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }

        /* ── Divider ── */
        .divider {
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--border), transparent);
            margin: 0 auto;
        }

        /* ── Scroll Indicator ── */
        .scroll-hint {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            margin-top: 3.5rem;
            opacity: 0.4;
            animation: fade-in-up 1s ease 1.2s both;
        }
        .scroll-hint span { font-size: 0.72rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; }
        .scroll-mouse {
            width: 22px; height: 36px;
            border: 1.5px solid var(--text2);
            border-radius: 12px;
            position: relative;
        }
        .scroll-wheel {
            width: 3px; height: 7px;
            background: var(--text2);
            border-radius: 2px;
            position: absolute;
            top: 5px; left: 50%; transform: translateX(-50%);
            animation: scroll-down 1.8s ease-in-out infinite;
        }
        @keyframes scroll-down {
            0%   { transform: translateX(-50%) translateY(0); opacity:1; }
            80%  { transform: translateX(-50%) translateY(12px); opacity:0; }
            100% { transform: translateX(-50%) translateY(0); opacity:0; }
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
            .stats-bar { gap: 1.5rem; }
            .stat-divider { display: none; }
            nav { padding: 1rem 1.2rem; }
            .match-card { padding: 1rem 1.1rem; }
        }
    </style>
</head>
<body>

    <!-- Background Orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    <canvas id="bg-canvas"></canvas>

    <div class="wrapper">

        <!-- Navbar -->
        <nav>
            <div class="nav-logo">
                <div class="logo-icon">🔗</div>
                <span style="background: var(--grad-hero); -webkit-background-clip:text; background-clip:text; color:transparent;">MesseMatch</span>
            </div>
            <div class="nav-badge">
                <span class="pulse-dot"></span>
                API Live
            </div>
        </nav>

        <!-- Hero -->
        <section class="hero">
            <div class="hero-eyebrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                Smarter Job Matching
            </div>

            <h1 class="hero-title">
                Connect <span class="gradient-text">Skilled Installers</span><br>
                with the Right Companies
            </h1>
            <p class="hero-sub">
                MesseMatch bridges the gap between talented installers and businesses looking for exactly their skills — instantly, intelligently, and efficiently.
            </p>

            <div class="hero-buttons">
                <button class="btn-primary">Post a Job →</button>
                <button class="btn-outline">Find Installers</button>
            </div>

            <!-- Match Visual -->
            <div class="match-visual">
                <div class="match-row">
                    <div class="match-card installer">
                        <div class="card-label">Installer</div>
                        <div class="card-avatar">👷</div>
                        <div class="card-name">Alex Morrison</div>
                        <div class="skill-tags">
                            <span class="skill-tag blue">Electrical</span>
                            <span class="skill-tag violet">HVAC</span>
                            <span class="skill-tag cyan">Solar</span>
                            <span class="skill-tag amber">Plumbing</span>
                        </div>
                    </div>

                    <div class="match-connector">
                        <div class="connector-line"></div>
                        <div class="match-icon">⚡</div>
                        <div class="match-percent">98% Match</div>
                        <div class="connector-line"></div>
                    </div>

                    <div class="match-card company">
                        <div class="card-label">Company</div>
                        <div class="card-avatar">🏢</div>
                        <div class="card-name">GreenBuild Corp</div>
                        <div class="skill-tags">
                            <span class="skill-tag green">Solar</span>
                            <span class="skill-tag cyan">HVAC</span>
                            <span class="skill-tag blue">Electrical</span>
                            <span class="skill-tag rose">Urgent</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="scroll-hint">
                <span>Scroll</span>
                <div class="scroll-mouse"><div class="scroll-wheel"></div></div>
            </div>
        </section>

        <div class="divider"></div>

        <!-- Stats -->
        <div class="stats-bar">
            <div class="stat-item">
                <div class="stat-num" id="cnt-1">0</div>
                <div class="stat-label">Installers Registered</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
                <div class="stat-num" id="cnt-2">0</div>
                <div class="stat-label">Companies Hiring</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
                <div class="stat-num" id="cnt-3">0</div>
                <div class="stat-label">Jobs Matched</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
                <div class="stat-num" id="cnt-4">0</div>
                <div class="stat-label">Success Rate</div>
            </div>
        </div>

        <div class="divider"></div>

        <!-- How It Works -->
        <section style="max-width:1100px; margin:0 auto;">
            <div style="text-align:center;">
                <div class="section-label">How It Works</div>
                <h2 class="section-title" style="margin:0 auto;">From posting to hiring<br>in four simple steps</h2>
            </div>
            <div class="how-grid">
                <div class="step-card" onmousemove="tiltCard(event,this)" onmouseleave="resetCard(this)">
                    <div class="step-num">01</div>
                    <div class="step-icon blue">📋</div>
                    <div class="step-title">Installer Posts Skills</div>
                    <div class="step-desc">Installers create a profile listing all their certified skills, experience, and availability for jobs.</div>
                </div>
                <div class="step-card" onmousemove="tiltCard(event,this)" onmouseleave="resetCard(this)">
                    <div class="step-num">02</div>
                    <div class="step-icon violet">🏗️</div>
                    <div class="step-title">Company Lists Requirements</div>
                    <div class="step-desc">Companies post job openings with required skill sets, location, timeline, and budget details.</div>
                </div>
                <div class="step-card" onmousemove="tiltCard(event,this)" onmouseleave="resetCard(this)">
                    <div class="step-num">03</div>
                    <div class="step-icon cyan">⚡</div>
                    <div class="step-title">Smart Matching Engine</div>
                    <div class="step-desc">Our algorithm scores and ranks installers against job requirements for the highest compatibility match.</div>
                </div>
                <div class="step-card" onmousemove="tiltCard(event,this)" onmouseleave="resetCard(this)">
                    <div class="step-num">04</div>
                    <div class="step-icon emerald">🤝</div>
                    <div class="step-title">Hire with Confidence</div>
                    <div class="step-desc">Companies review top matches, connect directly, and onboard the perfect installer for the role.</div>
                </div>
            </div>
        </section>

        <div class="divider" style="margin-top:5rem;"></div>

        <!-- Features + Live Feed -->
        <section style="max-width:1100px; margin:0 auto;">
            <div class="features-wrap">
                <div>
                    <div class="section-label">Platform Features</div>
                    <h2 class="section-title">Everything you need to find the perfect fit</h2>
                    <p class="section-desc">Built for speed, precision, and transparency at every step of the hiring journey.</p>
                    <div class="feature-list">
                        <div class="feature-item">
                            <div class="feature-item-icon" style="background:rgba(59,130,246,0.12); border:1px solid rgba(59,130,246,0.2);">🎯</div>
                            <div class="feature-item-text">
                                <h4>Skill-Based Matching</h4>
                                <p>Precise algorithm matches installer skill sets against company requirements with a compatibility score.</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <div class="feature-item-icon" style="background:rgba(139,92,246,0.12); border:1px solid rgba(139,92,246,0.2);">🔔</div>
                            <div class="feature-item-text">
                                <h4>Real-Time Notifications</h4>
                                <p>Instant alerts when a new match is found, an offer is made, or a job status changes.</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <div class="feature-item-icon" style="background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.2);">✅</div>
                            <div class="feature-item-text">
                                <h4>Verified Profiles</h4>
                                <p>Every installer is vetted with verified credentials so companies hire with full confidence.</p>
                            </div>
                        </div>
                        <div class="feature-item">
                            <div class="feature-item-icon" style="background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.2);">📍</div>
                            <div class="feature-item-text">
                                <h4>Location-Aware Search</h4>
                                <p>Filter matches by proximity to ensure installers are available in the right area for the job.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="live-panel">
                    <div class="live-panel-header">
                        <span>Recent Activity</span>
                        <span class="live-badge"><span class="live-dot"></span>Live</span>
                    </div>
                    <div class="feed-list" id="feed-list">
                        <div class="feed-item" style="animation-delay:0.1s">
                            <div class="feed-avatar" style="background:rgba(59,130,246,0.12);">👷</div>
                            <div class="feed-content">
                                <div class="feed-title">James K. joined as Installer</div>
                                <div class="feed-meta">Electrical · HVAC · Solar — 2 min ago</div>
                            </div>
                            <span class="feed-tag new">New</span>
                        </div>
                        <div class="feed-item" style="animation-delay:0.2s">
                            <div class="feed-avatar" style="background:rgba(16,185,129,0.12);">🏢</div>
                            <div class="feed-content">
                                <div class="feed-title">TechBuild Inc. posted a job</div>
                                <div class="feed-meta">Needs: Solar · Plumbing — 5 min ago</div>
                            </div>
                            <span class="feed-tag new">New</span>
                        </div>
                        <div class="feed-item" style="animation-delay:0.3s">
                            <div class="feed-avatar" style="background:rgba(139,92,246,0.12);">⚡</div>
                            <div class="feed-content">
                                <div class="feed-title">Match found — Sarah M. & Nova Corp</div>
                                <div class="feed-meta">97% compatibility — 8 min ago</div>
                            </div>
                            <span class="feed-tag match">97%</span>
                        </div>
                        <div class="feed-item" style="animation-delay:0.4s">
                            <div class="feed-avatar" style="background:rgba(16,185,129,0.12);">🤝</div>
                            <div class="feed-content">
                                <div class="feed-title">Daniel R. hired by GreenBuild</div>
                                <div class="feed-meta">HVAC Installer — 15 min ago</div>
                            </div>
                            <span class="feed-tag hired">Hired</span>
                        </div>
                        <div class="feed-item" style="animation-delay:0.5s">
                            <div class="feed-avatar" style="background:rgba(59,130,246,0.12);">👷</div>
                            <div class="feed-content">
                                <div class="feed-title">Maria L. updated skills profile</div>
                                <div class="feed-meta">Added: Fire Suppression — 22 min ago</div>
                            </div>
                            <span class="feed-tag new">Update</span>
                        </div>
                        <div class="feed-item" style="animation-delay:0.6s">
                            <div class="feed-avatar" style="background:rgba(245,158,11,0.12);">🏗️</div>
                            <div class="feed-content">
                                <div class="feed-title">Summit Builders posted urgent role</div>
                                <div class="feed-meta">Plumbing · Certified — 31 min ago</div>
                            </div>
                            <span class="feed-tag match">Urgent</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="divider" style="margin-top:5rem;"></div>

        <!-- Skill Cloud -->
        <section class="skills-section">
            <div class="section-label">Skills on the Platform</div>
            <h2 class="section-title" style="margin:0 auto; max-width:460px;">Every trade skill,<br>one platform</h2>
            <div class="skill-cloud">
                <span class="skill-tag blue cloud-tag"   style="--dur:4.2s;--delay:0.0s;font-size:0.9rem;padding:0.5rem 1.1rem;">Electrical Wiring</span>
                <span class="skill-tag violet cloud-tag" style="--dur:5.1s;--delay:0.3s;">HVAC Installation</span>
                <span class="skill-tag cyan cloud-tag"   style="--dur:3.8s;--delay:0.6s;">Solar Panels</span>
                <span class="skill-tag green cloud-tag"  style="--dur:4.7s;--delay:0.2s;">Plumbing</span>
                <span class="skill-tag amber cloud-tag"  style="--dur:5.5s;--delay:0.9s;">Fire Suppression</span>
                <span class="skill-tag rose cloud-tag"   style="--dur:4.0s;--delay:0.4s;">Security Systems</span>
                <span class="skill-tag blue cloud-tag"   style="--dur:5.2s;--delay:0.7s;">Network Cabling</span>
                <span class="skill-tag violet cloud-tag" style="--dur:3.6s;--delay:1.1s;">EV Charging</span>
                <span class="skill-tag cyan cloud-tag"   style="--dur:4.9s;--delay:0.5s;">Refrigeration</span>
                <span class="skill-tag green cloud-tag"  style="--dur:4.4s;--delay:0.8s;">Gas Lines</span>
                <span class="skill-tag amber cloud-tag"  style="--dur:5.8s;--delay:0.1s;">Smart Home</span>
                <span class="skill-tag rose cloud-tag"   style="--dur:3.9s;--delay:1.3s;">Roofing</span>
                <span class="skill-tag blue cloud-tag"   style="--dur:4.6s;--delay:0.2s;">Data Centers</span>
                <span class="skill-tag violet cloud-tag" style="--dur:5.3s;--delay:0.6s;">Sprinkler Systems</span>
                <span class="skill-tag cyan cloud-tag"   style="--dur:4.1s;--delay:1.0s;">Telecom</span>
                <span class="skill-tag green cloud-tag"  style="--dur:5.6s;--delay:0.4s;">BMS</span>
            </div>
        </section>

        <div class="divider"></div>

        <!-- Tech Stack -->
        <section style="text-align:center; padding:4rem 2rem;">
            <div class="section-label">Powered By</div>
            <h2 class="section-title" style="margin:0 auto;">Built on modern,<br>reliable technology</h2>
            <div class="tech-row">
                <div class="tech-chip" style="border-color:rgba(59,130,246,0.3);">🟦 Node.js</div>
                <div class="tech-chip" style="border-color:rgba(139,92,246,0.3);">🟣 TypeScript</div>
                <div class="tech-chip" style="border-color:rgba(16,185,129,0.3);">🍃 MongoDB</div>
                <div class="tech-chip" style="border-color:rgba(245,158,11,0.3);">🟡 Express</div>
                <div class="tech-chip" style="border-color:rgba(6,182,212,0.3);">🔐 JWT Auth</div>
                <div class="tech-chip" style="border-color:rgba(244,63,94,0.3);">📧 Nodemailer</div>
            </div>
        </section>

        <!-- Footer -->
        <footer>
            <div class="footer-logo" style="background:var(--grad-hero);-webkit-background-clip:text;background-clip:text;color:transparent;">🔗 MesseMatch</div>
            <div class="footer-sub">Job Matching Platform — API Backend v1.0</div>
            <div class="footer-sub">Built with ❤️ by Alif &nbsp;·&nbsp; Node.js + Express + TypeScript + MongoDB</div>
        </footer>
    </div>

    <script>
        // ── Particle Canvas ──
        const canvas = document.getElementById('bg-canvas');
        const ctx = canvas.getContext('2d');
        let W, H, particles = [];

        function resize() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        function makeParticle() {
            return {
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.5 + 0.3,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                alpha: Math.random() * 0.4 + 0.05,
                color: ['#3b82f6','#8b5cf6','#06b6d4','#10b981'][Math.floor(Math.random()*4)]
            };
        }

        for (let i = 0; i < 120; i++) particles.push(makeParticle());

        function drawParticles() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2,'0');
                ctx.fill();
            });

            // Draw connections between close particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = 'rgba(139,92,246,' + (0.06 * (1 - dist/100)) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(drawParticles);
        }
        drawParticles();

        // ── Counter Animation ──
        function animateCount(el, target, suffix, duration) {
            const start = performance.now();
            function tick(now) {
                const p = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(ease * target) + suffix;
                if (p < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    animateCount(document.getElementById('cnt-1'), 4800, '+', 1800);
                    animateCount(document.getElementById('cnt-2'), 1200, '+', 1800);
                    animateCount(document.getElementById('cnt-3'), 9300, '+', 2000);
                    animateCount(document.getElementById('cnt-4'), 96,   '%', 1600);
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        observer.observe(document.getElementById('cnt-1'));

        // ── Card Tilt ──
        function tiltCard(e, el) {
            const r  = el.getBoundingClientRect();
            const x  = (e.clientX - r.left) / r.width  - 0.5;
            const y  = (e.clientY - r.top)  / r.height - 0.5;
            el.style.transform = \`translateY(-6px) rotateX(\${-y*10}deg) rotateY(\${x*10}deg)\`;
            el.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
            el.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
        }
        function resetCard(el) {
            el.style.transform = '';
        }

        // ── Live Feed Rotation ──
        const newItems = [
            { icon:'👷', bg:'rgba(59,130,246,0.12)', title:'Carlos M. verified credentials', meta:'Electrical · Certified — just now', tag:'new', label:'New' },
            { icon:'🏢', bg:'rgba(16,185,129,0.12)', title:'Apex Systems posted 3 roles', meta:'Network · Security · HVAC — 1 min ago', tag:'new', label:'New' },
            { icon:'⚡', bg:'rgba(139,92,246,0.12)', title:'Match — Ryan T. & BlueSky Corp', meta:'99% compatibility — 3 min ago', tag:'match', label:'99%' },
            { icon:'🤝', bg:'rgba(16,185,129,0.12)', title:'Priya S. hired by SmartGrid', meta:'Solar Installer — 7 min ago', tag:'hired', label:'Hired' },
        ];
        let feedIdx = 0;
        setInterval(() => {
            const list = document.getElementById('feed-list');
            const item = newItems[feedIdx % newItems.length]; feedIdx++;
            const el = document.createElement('div');
            el.className = 'feed-item';
            el.innerHTML = \`
                <div class="feed-avatar" style="background:\${item.bg}">\${item.icon}</div>
                <div class="feed-content">
                    <div class="feed-title">\${item.title}</div>
                    <div class="feed-meta">\${item.meta}</div>
                </div>
                <span class="feed-tag \${item.tag}">\${item.label}</span>\`;
            list.insertBefore(el, list.firstChild);
            if (list.children.length > 7) list.removeChild(list.lastChild);
        }, 4000);
    </script>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = (otp: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 500px; margin: 40px auto; background: #ffffff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">MesseMatch</h1>
    </div>
    <div style="padding: 40px 30px; text-align: center;">
      <h2 style="color: #333; margin: 0 0 10px;">Password Reset OTP</h2>
      <p style="color: #666; margin: 0 0 30px;">Use the code below to reset your password</p>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 0 0 30px;">
        <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #333;">${otp}</span>
      </div>
      <p style="color: #999; font-size: 14px; margin: 0;">This code expires in 15 minutes</p>
    </div>
    <div style="background: #f8f9fa; padding: 20px; text-align: center;">
      <p style="color: #999; font-size: 12px; margin: 0;">If you didn't request this, please ignore this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const EMAIL_VERIFICATION_TEMPLATE = (otp: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 500px; margin: 40px auto; background: #ffffff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">MesseMatch</h1>
    </div>
    <div style="padding: 40px 30px; text-align: center;">
      <h2 style="color: #333; margin: 0 0 10px;">Verify Your Email</h2>
      <p style="color: #666; margin: 0 0 30px;">Use the code below to complete your registration</p>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 0 0 30px;">
        <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #333;">${otp}</span>
      </div>
      <p style="color: #999; font-size: 14px; margin: 0;">This code expires in 15 minutes</p>
    </div>
    <div style="background: #f8f9fa; padding: 20px; text-align: center;">
      <p style="color: #999; font-size: 12px; margin: 0;">If you didn't create an account, please ignore this email.</p>
    </div>
  </div>
</body>
</html>
`;
