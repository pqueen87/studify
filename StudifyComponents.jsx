// Studify — Shared UI Components

const GRAD = 'linear-gradient(135deg, #D81B8A 0%, #9B59B6 50%, #7B61FF 100%)';
const GRAD90 = 'linear-gradient(90deg, #D81B8A 0%, #9B59B6 50%, #7B61FF 100%)';
const GRAD_PURPLE = 'linear-gradient(135deg, #5E35B1 0%, #B39DDB 100%)';

// ── Icons ──────────────────────────────────────────────────────
const HomeIcon = ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const CreateIcon = ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
const MusicIcon = ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
const UserIcon = ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const ListIcon = ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
const PlayIcon = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const PauseIcon = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>;
const ChevronLeft = ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;
const ChevronRight = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;
const UploadIcon = ({ size = 28 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const CameraIcon = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const HeartIcon = ({ size = 20, filled = false }) => <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#D81B8A' : 'none'} stroke={filled ? '#D81B8A' : 'currentColor'} strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const SkipBack = ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
const SkipFwd = ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
const CheckIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>;
const SparkleIcon = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>;
const RepeatIcon = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>;
const ShuffleIcon = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>;
const ShareIcon = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
const MoreIcon = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>;
const BookIcon = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
const TrendIcon = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;

// ── Button ──────────────────────────────────────────────────
const StudifyButton = ({ children, variant = 'primary', size = 'md', onClick, style = {}, disabled = false }) => {
  const [pressed, setPressed] = React.useState(false);
  const base = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, borderRadius: 12, transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)', transform: pressed ? 'scale(0.97)' : 'scale(1)', opacity: disabled ? 0.5 : 1 };
  const sizes = { sm: { padding: '8px 16px', fontSize: 13 }, md: { padding: '14px 24px', fontSize: 15 }, lg: { padding: '17px 32px', fontSize: 16 } };
  const variants = {
    primary: { background: GRAD, color: '#fff', boxShadow: pressed ? '0 0 10px rgba(155,89,182,0.3)' : '0 0 22px rgba(155,89,182,0.4)' },
    secondary: { background: '#1C1C27', color: '#F0F0FF', border: '1px solid rgba(255,255,255,0.10)' },
    ghost: { background: 'transparent', color: '#9090A8', border: '1px solid rgba(255,255,255,0.08)' },
  };
  return (
    <button
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onClick={onClick}
      disabled={disabled}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
    >{children}</button>
  );
};

// ── Top Bar ─────────────────────────────────────────────────
const TopBar = ({ title, onBack, right, logo }) => (
  <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px 10px', gap: 8, flexShrink: 0 }}>
    {onBack && (
      <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 10, color: '#9090A8', cursor: 'pointer', padding: 6, display: 'flex', marginLeft: -4 }}>
        <ChevronLeft />
      </button>
    )}
    {logo
      ? <img src="assets/logo-purple-gradient.png" style={{ height: 30, objectFit: 'contain' }} />
      : <div style={{ flex: 1, fontSize: 17, fontWeight: 700, color: '#F0F0FF', letterSpacing: '-0.01em' }}>{title}</div>
    }
    {logo && <div style={{ flex: 1 }} />}
    {right}
  </div>
);

// ── Bottom Nav ──────────────────────────────────────────────
const BottomNav = ({ active, onNav }) => {
  const items = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'create', label: 'Create', icon: CreateIcon },
    { id: 'playlists', label: 'Playlists', icon: ListIcon },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];
  return (
    <div style={{ flexShrink: 0, background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', padding: '10px 0 24px' }}>
      {items.map(item => {
        const isActive = active === item.id;
        const Ic = item.icon;
        return (
          <div key={item.id} onClick={() => onNav(item.id)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer',
              color: isActive ? '#9B59B6' : '#505065',
              filter: isActive ? 'drop-shadow(0 0 6px rgba(155,89,182,0.7))' : 'none',
              transition: 'all 0.2s' }}>
            <Ic size={22} />
            <span style={{ fontSize: 10, fontWeight: 600, color: isActive ? '#B39DDB' : '#505065', letterSpacing: '0.03em' }}>{item.label}</span>
            {isActive && <div style={{ width: 4, height: 4, borderRadius: '50%', background: GRAD, marginTop: -2 }} />}
          </div>
        );
      })}
    </div>
  );
};

// ── Mini Player ─────────────────────────────────────────────
const MiniPlayer = ({ song, playing, onToggle, onExpand }) => {
  const [progress, setProgress] = React.useState(22);
  React.useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setProgress(p => Math.min(p + 0.25, 100)), 250);
    return () => clearInterval(t);
  }, [playing]);
  return (
    <div onClick={onExpand} style={{ margin: '0 12px 10px', background: '#13131A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: song?.color || GRAD, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MusicIcon size={18} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F0FF', marginBottom: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{song?.title || 'Mitosis — Pop Mix'}</div>
        <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 9999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: GRAD90, borderRadius: 9999, transition: 'width 0.25s' }} />
        </div>
      </div>
      <button onClick={e => { e.stopPropagation(); onToggle(); }}
        style={{ background: GRAD, border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 14px rgba(155,89,182,0.45)', flexShrink: 0 }}>
        {playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
      </button>
    </div>
  );
};

// ── Genre Chip ──────────────────────────────────────────────
const GenreChip = ({ label, emoji, selected, onClick }) => (
  <div onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: `1px solid ${selected ? 'rgba(155,89,182,0.5)' : 'rgba(255,255,255,0.07)'}`, background: selected ? 'rgba(155,89,182,0.15)' : '#1C1C27', color: selected ? '#F0F0FF' : '#9090A8', boxShadow: selected ? '0 0 14px rgba(155,89,182,0.2)' : 'none', transition: 'all 0.2s', flexShrink: 0, userSelect: 'none' }}>
    {selected && <CheckIcon size={12} />}{label}
  </div>
);

// ── Song Row ────────────────────────────────────────────────
const TrashIcon = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>;

const SongCard = ({ title, subject, genre, time, color, onClick, showMore, onDelete }) => {
  const [hov, setHov] = React.useState(false);
  const [confirmDel, setConfirmDel] = React.useState(false);
  return (
    <div onPointerEnter={() => setHov(true)} onPointerLeave={() => { setHov(false); setConfirmDel(false); }}
      onClick={onClick}
      style={{ background: hov ? '#1C1C27' : '#13131A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ width: 48, height: 48, borderRadius: 10, background: color || GRAD, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MusicIcon size={18} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F0FF', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
        <div style={{ fontSize: 12, color: '#9090A8' }}>{subject} · {time}</div>
        <span style={{ display: 'inline-flex', marginTop: 4, padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, background: 'rgba(155,89,182,0.12)', color: '#B39DDB', letterSpacing: '0.03em' }}>{genre}</span>
      </div>
      {showMore && !onDelete && (
        <div style={{ color: '#505065', padding: 4 }}><MoreIcon size={18} /></div>
      )}
      {onDelete && (
        confirmDel
          ? <div style={{ display: 'flex', gap: 6, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
              <button onClick={() => { onDelete(); setConfirmDel(false); }}
                style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, color: '#EF4444', fontSize: 11, fontWeight: 700, padding: '4px 10px', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif" }}>Delete</button>
              <button onClick={() => setConfirmDel(false)}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#9090A8', fontSize: 11, fontWeight: 700, padding: '4px 10px', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif" }}>Cancel</button>
            </div>
          : <button onClick={e => { e.stopPropagation(); setConfirmDel(true); }}
              style={{ background: 'none', border: 'none', color: '#505065', cursor: 'pointer', padding: 4, display: 'flex', flexShrink: 0 }}>
              <TrashIcon size={16} />
            </button>
      )}
    </div>
  );
};

// ── Playlist Card ────────────────────────────────────────────
const PlaylistCard = ({ name, count, subject, gradient, onClick }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <div onClick={onClick} onPointerEnter={() => setHov(true)} onPointerLeave={() => setHov(false)}
      style={{ flexShrink: 0, width: 150, cursor: 'pointer', transition: 'transform 0.2s', transform: hov ? 'translateY(-2px)' : 'none' }}>
      <div style={{ width: 150, height: 150, borderRadius: 16, background: gradient, position: 'relative', overflow: 'hidden', marginBottom: 10, boxShadow: hov ? '0 8px 28px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.3)' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MusicIcon size={40} />
        </div>
        <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{count} songs</div>
        </div>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#F0F0FF', marginBottom: 2 }}>{name}</div>
      <div style={{ fontSize: 11, color: '#9090A8' }}>{subject}</div>
    </div>
  );
};

// ── Waveform Animation ───────────────────────────────────────
const Waveform = ({ playing, color = '#7B61FF' }) => {
  const bars = 32;
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setTick(x => x + 1), 80);
    return () => clearInterval(t);
  }, [playing]);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2.5, height: 40, width: '100%' }}>
      {Array.from({ length: bars }).map((_, i) => {
        const seed = Math.sin(i * 0.9 + tick * 0.4) * 0.5 + Math.sin(i * 0.3 + tick * 0.7) * 0.5;
        const h = playing ? Math.max(4, (seed + 1) * 18 + 4) : Math.max(4, Math.abs(Math.sin(i * 0.7)) * 14 + 4);
        return (
          <div key={i} style={{ flex: 1, height: h, borderRadius: 9999, background: playing ? color : 'rgba(255,255,255,0.12)', transition: playing ? 'height 0.08s' : 'none' }} />
        );
      })}
    </div>
  );
};

// ── Stat Pill ────────────────────────────────────────────────
const StatPill = ({ value, label }) => (
  <div style={{ background: '#13131A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 10px', textAlign: 'center', flex: 1 }}>
    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 10, color: '#9090A8', fontWeight: 500, marginTop: 2 }}>{label}</div>
  </div>
);

Object.assign(window, {
  StudifyButton, TopBar, BottomNav, MiniPlayer, GenreChip, SongCard,
  PlaylistCard, Waveform, StatPill,
  HomeIcon, CreateIcon, MusicIcon, UserIcon, ListIcon, PlayIcon, PauseIcon,
  ChevronLeft, ChevronRight, UploadIcon, CameraIcon, HeartIcon, SkipBack, SkipFwd,
  CheckIcon, SparkleIcon, RepeatIcon, ShuffleIcon, ShareIcon, MoreIcon, BookIcon, TrendIcon,
  TrashIcon, GRAD, GRAD90, GRAD_PURPLE,
});
