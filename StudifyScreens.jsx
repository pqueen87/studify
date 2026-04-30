// Studify — All Screens

const { useState, useEffect, useRef } = React;

// ── Splash / Onboarding Screen ─────────────────────────────────
const SplashScreen = ({ onAuth }) => {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0); // 0=splash, 1=slides

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const slides = [
    { title: 'Turn your\nnotes into music.', sub: "Snap a photo of your notes and we'll turn them into a song.", icon: <UploadIcon size={36} /> },
    { title: 'Pick your\nvibe.', sub: 'Pop, reggaetón, lo-fi, trap and more. You choose the genre.', icon: <MusicIcon size={36} /> },
    { title: 'Study\nwhile you listen.', sub: 'The lyrics carry your content. You remember more when you feel the beat.', icon: <SparkleIcon size={36} /> },
  ];

  if (step === 0) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '0 0 40px', background: '#0A0A0F', overflow: 'hidden' }}>
      {/* Hero gradient blob */}
      <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,89,182,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Logo area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)' }}>
        {/* Animated logo ring */}
        <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 28 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, #D81B8A, #9B59B6, #7B61FF, #D81B8A)', animation: 'spin 3s linear infinite', opacity: 0.6 }} />
          <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: '#0A0A0F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="assets/logo-purple-gradient.png" style={{ height: 72, objectFit: 'contain' }} />
          </div>
          <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
        </div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.02em', lineHeight: 1 }}>Studify</div>
        <div style={{ fontSize: 15, color: '#9090A8', marginTop: 8, letterSpacing: '0.01em' }}>Tune It, Ace It</div>
      </div>

      {/* CTA buttons */}
      <div style={{ width: '100%', padding: '0 28px', display: 'flex', flexDirection: 'column', gap: 12, opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1) 0.2s' }}>
        <StudifyButton style={{ width: '100%' }} size="lg" onClick={() => onAuth('register')}>
          Sign up free
        </StudifyButton>
        <StudifyButton variant="ghost" style={{ width: '100%' }} size="lg" onClick={() => onAuth('login')}>
          Sign in
        </StudifyButton>
        <div style={{ textAlign: 'center', marginTop: 4 }}>
          <span style={{ fontSize: 12, color: '#505065' }}>Want to see how it works? </span>
          <span onClick={() => setStep(1)} style={{ fontSize: 12, color: '#9B59B6', fontWeight: 600, cursor: 'pointer' }}>Take a tour →</span>
        </div>
      </div>
    </div>
  );

  // Slides tour
  const [slideIdx, setSlideIdx] = useState(0);
  const cur = slides[slideIdx];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '48px 28px 40px', textAlign: 'center' }}>
      <button onClick={() => setStep(0)} style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: '#505065', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Space Grotesk',sans-serif" }}>Skip</button>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
        <div style={{ width: 110, height: 110, borderRadius: 30, background: 'rgba(155,89,182,0.10)', border: '1px solid rgba(155,89,182,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9B59B6', boxShadow: '0 0 40px rgba(123,97,255,0.18)' }}>
          {cur.icon}
        </div>
        <div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 46, lineHeight: 1.05, color: '#F0F0FF', marginBottom: 14, whiteSpace: 'pre-line' }}>{cur.title}</div>
          <div style={{ fontSize: 15, color: '#9090A8', lineHeight: 1.6, maxWidth: 270 }}>{cur.sub}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {slides.map((_, i) => <div key={i} style={{ height: 6, borderRadius: 9999, background: i === slideIdx ? GRAD : 'rgba(255,255,255,0.10)', width: i === slideIdx ? 28 : 6, transition: 'all 0.3s' }} />)}
      </div>
      {slideIdx < slides.length - 1
        ? <StudifyButton style={{ width: '100%' }} onClick={() => setSlideIdx(i => i + 1)}>Next</StudifyButton>
        : <StudifyButton style={{ width: '100%' }} onClick={() => onAuth('register')}>Get started</StudifyButton>
      }
    </div>
  );
};

// ── Auth Screen (Login / Register) ────────────────────────────
const AuthScreen = ({ mode: initialMode = 'login', onSuccess, onBack }) => {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    if (!email.includes('@')) return 'Please enter a valid email.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (mode === 'register' && name.trim().length < 2) return 'Please enter your name.';
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);

    let authError = null;
    let userData = null;

    if (mode === 'register') {
      const { data, error } = await window.db.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      authError = error;
      userData = data?.user;
      // After sign-up Supabase may require email confirmation — update name in profiles
      if (!error && data?.user) {
        await window.db.from('profiles').update({ name }).eq('id', data.user.id);
      }
    } else {
      const { data, error } = await window.db.auth.signInWithPassword({ email, password });
      authError = error;
      userData = data?.user;
    }

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    onSuccess({ email, name: name || userData?.user_metadata?.name || email.split('@')[0] });
  };

  const EyeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
  const EyeOffIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;

  const inputStyle = { width: '100%', background: '#1C1C27', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '14px 16px', fontSize: 15, color: '#F0F0FF', outline: 'none', fontFamily: "'Space Grotesk', sans-serif", transition: 'border-color 0.2s', boxSizing: 'border-box' };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '14px 20px 0', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 10, color: '#9090A8', cursor: 'pointer', padding: 6, display: 'flex' }}>
          <ChevronLeft />
        </button>
        <div style={{ flex: 1 }} />
        <img src="assets/logo-purple-gradient.png" style={{ height: 28, objectFit: 'contain' }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 32px' }}>
        {/* Title */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, color: '#F0F0FF', lineHeight: 1.0, marginBottom: 6 }}>
            {mode === 'login' ? 'Welcome\nback.' : 'Create your\naccount.'}
          </div>
          <div style={{ fontSize: 14, color: '#9090A8' }}>
            {mode === 'login' ? 'Sign in to continue.' : 'Start for free today.'}
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 12, padding: '12px 14px', marginBottom: 18, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <div style={{ fontSize: 13, color: '#EF4444', lineHeight: 1.4 }}>{error}</div>
          </div>
        )}

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'register' && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#505065', marginBottom: 6, letterSpacing: '0.04em' }}>NAME</div>
              <input
                style={inputStyle}
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                onFocus={e => e.target.style.borderColor = 'rgba(155,89,182,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
              />
            </div>
          )}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#505065', marginBottom: 6, letterSpacing: '0.04em' }}>EMAIL</div>
            <input
              style={inputStyle}
              placeholder="tu@email.com"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={e => e.target.style.borderColor = 'rgba(155,89,182,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
            />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#505065', marginBottom: 6, letterSpacing: '0.04em' }}>PASSWORD</div>
            <div style={{ position: 'relative' }}>
              <input
                style={{ ...inputStyle, paddingRight: 48 }}
                placeholder="At least 6 characters"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={e => e.target.style.borderColor = 'rgba(155,89,182,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              />
              <button onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#505065', cursor: 'pointer', display: 'flex', padding: 2 }}>
                {showPass ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {mode === 'login' && (
            <div style={{ textAlign: 'right', marginTop: -6 }}>
              <span style={{ fontSize: 13, color: '#9B59B6', fontWeight: 600, cursor: 'pointer' }}>Forgot your password?</span>
            </div>
          )}
        </div>

        {/* Submit */}
        <div style={{ marginTop: 28 }}>
          <StudifyButton style={{ width: '100%', position: 'relative' }} size="lg" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                {mode === 'login' ? 'Signing in…' : 'Creating account…'}
              </span>
            ) : (mode === 'login' ? 'Sign in' : 'Create account')}
          </StudifyButton>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <span style={{ fontSize: 12, color: '#505065' }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Social auth */}
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { name: 'Google', icon: <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0 1 12 4.9c1.69 0 3.22.6 4.41 1.59L19.9 3C17.95 1.19 15.11 0 12 0 7.31 0 3.26 2.7 1.28 6.67l3.99 3.09z"/><path fill="#34A853" d="M16.04 18.01A7 7 0 0 1 12 19.1a7.08 7.08 0 0 1-6.72-4.84l-4 3.07C3.25 21.29 7.31 24 12 24c2.93 0 5.73-.98 7.8-2.77l-3.76-3.22z"/><path fill="#4A90D9" d="M19.8 21.23C22.33 18.88 24 15.36 24 12c0-.73-.1-1.5-.24-2.22H12v4.72h6.76a5.6 5.6 0 0 1-2.48 3.55l3.52 3.18z"/><path fill="#FBBC05" d="M5.28 14.27A7.12 7.12 0 0 1 4.9 12c0-.8.12-1.56.34-2.28L1.26 6.63A11.94 11.94 0 0 0 0 12c0 1.92.44 3.74 1.25 5.34l4.03-3.07z"/></svg> },
            { name: 'Apple', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#F0F0FF"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.41c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.39-1.32 2.76-2.53 3.98zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg> },
          ].map(p => (
            <button key={p.name} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 0', background: '#1C1C27', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#F0F0FF', fontFamily: "'Space Grotesk', sans-serif' " }}>
              {p.icon}{p.name}
            </button>
          ))}
        </div>

        {/* Switch mode */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <span style={{ fontSize: 14, color: '#9090A8' }}>
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          </span>
          <span onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            style={{ fontSize: 14, color: '#9B59B6', fontWeight: 700, cursor: 'pointer' }}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </span>
        </div>
      </div>
    </div>
  );
};

// ── Processing / AI Loading Screen ───────────────────────────
const ProcessingScreen = ({ genre = 'Pop', subject = 'Biology', onDone, onError }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [failed, setFailed] = useState(false);
  const [dots, setDots] = useState('');

  const phases = [
    { label: 'Analyzing your notes…', detail: 'Text recognition and key concept extraction', icon: '📄' },
    { label: 'Writing the lyrics…', detail: 'Turning concepts into verses and choruses', icon: '✍️' },
    { label: 'Composing the melody…', detail: `Generating rhythm and harmony in ${genre}`, icon: '🎵' },
    { label: 'Mixing your song…', detail: 'Adjusting levels, adding effects', icon: '🎚️' },
    { label: 'Almost there…', detail: 'Exporting the final audio', icon: '✨' },
  ];

  useEffect(() => {
    // Dots animation
    const dt = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 500);
    return () => clearInterval(dt);
  }, []);

  useEffect(() => {
    // Elapsed timer
    const et = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(et);
  }, []);

  useEffect(() => {
    // Progress simulation (20-40s range)
    let p = 0;
    const t = setInterval(() => {
      // Slow down near phase boundaries for realism
      const phaseIdx = Math.floor(p / 20);
      const nearBoundary = (p % 20) > 17;
      const step = nearBoundary ? 0.3 + Math.random() * 0.4 : 1.2 + Math.random() * 1.8;
      p = Math.min(p + step, 99);
      setProgress(p);
      setPhase(Math.min(Math.floor(p / 20), phases.length - 1));
      if (p >= 99) {
        clearInterval(t);
        setTimeout(() => { setProgress(100); setTimeout(() => onDone && onDone(), 600); }, 300);
      }
    }, 400);
    return () => clearInterval(t);
  }, []);

  const fmtTime = s => s < 60 ? `${s}s` : `${Math.floor(s/60)}m ${s%60}s`;
  const curPhase = phases[phase];

  if (failed) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', gap: 24, textAlign: 'center' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', border: '1.5px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#F0F0FF', marginBottom: 8 }}>Something went wrong.</div>
        <div style={{ fontSize: 14, color: '#9090A8', lineHeight: 1.6 }}>There was a problem generating your song. Please try again.</div>
      </div>
      <StudifyButton style={{ width: '100%' }} onClick={() => { setFailed(false); setProgress(0); setPhase(0); setElapsed(0); }}>
        Try again
      </StudifyButton>
      <StudifyButton variant="ghost" style={{ width: '100%' }} onClick={onError}>
        Back to home
      </StudifyButton>
    </div>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '40px 28px 48px', overflow: 'hidden', position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,89,182,0.18) 0%, transparent 70%)', pointerEvents: 'none', animation: 'breathe 2.5s ease-in-out infinite' }} />
      <style>{`@keyframes breathe { 0%,100%{opacity:0.6;transform:translateX(-50%) scale(1)} 50%{opacity:1;transform:translateX(-50%) scale(1.12)} }`}</style>

      {/* Song info chip */}
      <div style={{ background: '#13131A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, alignSelf: 'stretch' }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: GRAD, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MusicIcon size={16} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F0F0FF' }}>{subject} — {genre} Mix</div>
          <div style={{ fontSize: 11, color: '#9090A8' }}>Generating with AI</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 11, color: '#505065' }}>{fmtTime(elapsed)}</div>
      </div>

      {/* Central animation */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, position: 'relative' }}>
        {/* Orbiting rings */}
        <div style={{ position: 'relative', width: 140, height: 140 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ position: 'absolute', inset: i * 16, borderRadius: '50%', border: `1.5px solid rgba(155,89,182,${0.35 - i * 0.1})`, animation: `spin ${2.5 + i * 0.8}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}` }} />
          ))}
          <div style={{ position: 'absolute', inset: '50%', transform: 'translate(-50%,-50%)', width: 64, height: 64, borderRadius: '50%', background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 32px rgba(155,89,182,0.55)', fontSize: 26 }}>
            {curPhase.icon}
          </div>
        </div>

        {/* Phase text */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, color: '#F0F0FF', marginBottom: 8, lineHeight: 1 }}>
            {curPhase.label.replace('…', '')}{dots}
          </div>
          <div style={{ fontSize: 13, color: '#9090A8', lineHeight: 1.5 }}>{curPhase.detail}</div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ width: '100%' }}>
        {/* Phase steps */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16, justifyContent: 'center' }}>
          {phases.map((p, i) => (
            <div key={i} style={{ height: 4, flex: 1, borderRadius: 9999, background: i < phase ? GRAD : i === phase ? GRAD : 'rgba(255,255,255,0.08)', opacity: i < phase ? 1 : i === phase ? 1 : 0.4, transition: 'all 0.4s' }} />
          ))}
        </div>

        {/* Main bar */}
        <div style={{ height: 6, background: '#1C1C27', borderRadius: 9999, overflow: 'hidden', marginBottom: 10 }}>
          <div style={{ height: '100%', width: `${progress}%`, background: GRAD, borderRadius: 9999, transition: 'width 0.4s ease' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#505065' }}>
          <span>Step {Math.min(phase + 1, phases.length)} of {phases.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>

        {/* Tip */}
        <div style={{ marginTop: 20, background: 'rgba(123,97,255,0.05)', border: '1px solid rgba(123,97,255,0.12)', borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <div style={{ color: '#9B59B6', flexShrink: 0, marginTop: 1 }}><SparkleIcon size={14} /></div>
          <div style={{ fontSize: 12, color: '#9090A8', lineHeight: 1.5 }}>Tip: Las letras of tu canción contienen los conceptos clave of tus apuntes para ayudarte a estudiar.</div>
        </div>

        {/* Error simulation button for demo */}
        <div onClick={() => setFailed(true)} style={{ textAlign: 'center', marginTop: 14, cursor: 'pointer' }}>
          <span style={{ fontSize: 11, color: '#505065' }}>Simulate error →</span>
        </div>
      </div>
    </div>
  );
};

const GENRE_COLOR = {
  'Pop': 'linear-gradient(135deg,#D81B8A,#9B59B6)',
  'Reggaetón': 'linear-gradient(135deg,#F59E0B,#EF4444)',
  'Rock': 'linear-gradient(135deg,#22C55E,#3B82F6)',
  'R&B': 'linear-gradient(135deg,#9B59B6,#7B61FF)',
  'Lo-fi': 'linear-gradient(135deg,#3B82F6,#5E35B1)',
  'Trap': 'linear-gradient(135deg,#505065,#1C1C27)',
  'Cumbia': 'linear-gradient(135deg,#F59E0B,#22C55E)',
  'Jazz': 'linear-gradient(135deg,#D81B8A,#F59E0B)',
  'K-Pop': 'linear-gradient(135deg,#FF6EB4,#9B59B6)',
  'Electro': 'linear-gradient(135deg,#7B61FF,#3B82F6)',
};

// Converts a DB song row into the shape SongCard / PlayerScreen expect
const toSongCard = (s) => ({
  id: s.id, title: s.title || 'Untitled', subject: 'Notes',
  genre: s.genre || '—', time: '—',
  color: GENRE_COLOR[s.genre] || GRAD,
  lyrics: s.lyrics, audio_url: s.audio_url,
});

const SONGS_DATA = [
  { id: 1, title: 'Mitosis — Pop Mix', subject: 'Biology', genre: 'Pop', time: '2:34', color: 'linear-gradient(135deg,#D81B8A,#9B59B6)' },
  { id: 2, title: 'Revolución Francesa', subject: 'History', genre: 'Reggaetón', time: '3:10', color: 'linear-gradient(135deg,#F59E0B,#EF4444)' },
  { id: 3, title: 'Derivadas e Integrales', subject: 'Cálculo', genre: 'Lo-fi', time: '4:02', color: 'linear-gradient(135deg,#3B82F6,#5E35B1)' },
  { id: 4, title: 'Sistema Solar', subject: 'Physics', genre: 'Rock', time: '2:58', color: 'linear-gradient(135deg,#22C55E,#3B82F6)' },
  { id: 5, title: 'La Guerra Fría', subject: 'History', genre: 'Trap', time: '3:22', color: 'linear-gradient(135deg,#505065,#1C1C27)' },
  { id: 6, title: 'Fotosíntesis Beat', subject: 'Biology', genre: 'R&B', time: '2:48', color: 'linear-gradient(135deg,#9B59B6,#7B61FF)' },
];

const PLAYLISTS_DATA = [
  { id: 1, name: 'Sciences', count: 4, subject: 'Biology · Physics', gradient: 'linear-gradient(135deg,#22C55E 0%,#3B82F6 100%)', songs: [1, 4, 6] },
  { id: 2, name: 'History Mix', count: 2, subject: 'History', gradient: 'linear-gradient(135deg,#F59E0B 0%,#EF4444 100%)', songs: [2, 5] },
  { id: 3, name: 'Trap & Math', count: 3, subject: 'Calculus · Algebra', gradient: 'linear-gradient(135deg,#505065 0%,#9B59B6 100%)', songs: [3, 5] },
  { id: 4, name: 'Lo-fi Vibes', count: 3, subject: 'Chill', gradient: 'linear-gradient(135deg,#5E35B1 0%,#B39DDB 100%)', songs: [3, 6] },
];

// ── Home Screen ───────────────────────────────────────────────
const HomeScreen = ({ onNavigate, onPlaySong, user }) => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning,' : hour < 18 ? 'Good afternoon,' : 'Good evening,';
  const displayName = (user?.user_metadata?.name || user?.email?.split('@')[0] || 'there').toLowerCase();
  const [dbSongs, setDbSongs] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    window.db.from('songs').select('*').eq('user_id', user.id)
      .order('created_at', { ascending: false }).limit(10)
      .then(({ data }) => { if (data?.length) setDbSongs(data); });
  }, [user?.id]);

  const songCount = dbSongs.length || 0;
  const genreCount = dbSongs.length > 0 ? new Set(dbSongs.map(s => s.genre).filter(Boolean)).size : 0;

  const handleDelete = async (id) => {
    await window.db.from('songs').delete().eq('id', id);
    setDbSongs(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src="assets/logo-purple-gradient.png" style={{ height: 34, objectFit: 'contain' }} />
          <div onClick={() => onNavigate('profile')}
            style={{ width: 38, height: 38, borderRadius: '50%', background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 16px rgba(155,89,182,0.4)' }}>
            <UserIcon size={18} />
          </div>
        </div>
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 13, color: '#9090A8', marginBottom: 2 }}>{greeting}</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, lineHeight: 1.0, color: '#F0F0FF' }}>
            {displayName}. <span style={{ background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ready to study?</span>
          </div>
        </div>
        {/* Stats row */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <StatPill value={songCount || '—'} label="Songs" />
          <StatPill value={genreCount || '—'} label="Genres" />
          <StatPill value={songCount ? `${songCount * 3}m` : '—'} label="Study time" />
        </div>
      </div>

      {/* Scrollable area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0 0' }}>
        {/* Create CTA */}
        <div style={{ margin: '0 20px 24px' }}>
          <div onClick={() => onNavigate('create')}
            style={{ background: 'rgba(123,97,255,0.07)', border: '1px solid rgba(123,97,255,0.22)', borderRadius: 18, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 20px rgba(155,89,182,0.45)' }}>
              <UploadIcon size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F0F0FF', marginBottom: 3 }}>Make a new song</div>
              <div style={{ fontSize: 13, color: '#9090A8' }}>Snap your notes, pick a genre</div>
            </div>
            <div style={{ background: 'rgba(123,97,255,0.15)', border: '1px solid rgba(123,97,255,0.25)', borderRadius: 8, padding: 6 }}>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>

        {/* Playlists — built from real songs grouped by genre */}
        {(() => {
          const genrePls = Object.entries(
            dbSongs.reduce((acc, s) => { if (s.genre) { (acc[s.genre] = acc[s.genre] || []).push(s); } return acc; }, {})
          ).map(([genre, songs]) => ({ id: `genre-${genre}`, name: genre, count: songs.length, subject: genre, gradient: GENRE_COLOR[genre] || GRAD }));
          const localPls = (() => { try { return JSON.parse(localStorage.getItem('studify_playlists') || '[]'); } catch { return []; } })();
          const allPls = [...genrePls, ...localPls.map(p => ({ ...p, count: dbSongs.length, subject: '' }))];
          if (!allPls.length) return null;
          return (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#505065' }}>My Playlists</div>
                <div onClick={() => onNavigate('playlists')} style={{ fontSize: 12, fontWeight: 600, color: '#9B59B6', cursor: 'pointer' }}>See all</div>
              </div>
              <div style={{ display: 'flex', gap: 14, paddingLeft: 20, overflowX: 'auto', paddingBottom: 4 }}>
                {allPls.slice(0, 4).map(pl => (
                  <PlaylistCard key={pl.id} {...pl} onClick={() => onNavigate('playlists')} />
                ))}
              </div>
            </div>
          );
        })()}

        {/* Recent */}
        <div style={{ padding: '0 20px', paddingBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#505065' }}>Recent Songs</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#9B59B6', cursor: 'pointer' }}>See all</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {dbSongs.length > 0
              ? dbSongs.slice(0, 3).map(s => <SongCard key={s.id} {...toSongCard(s)} showMore onClick={() => onPlaySong(toSongCard(s))} onDelete={() => handleDelete(s.id)} />)
              : SONGS_DATA.slice(0, 3).map(s => <SongCard key={s.id} {...s} showMore onClick={() => onPlaySong(s)} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Create Flow ───────────────────────────────────────────────
const CreateScreen = ({ onBack, onPlaySong }) => {
  const [step, setStep] = useState(0);
  const [genre, setGenre] = useState('Pop');
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('Analyzing notes...');
  const [imageFile, setImageFile] = useState(null);
  const [generatedSong, setGeneratedSong] = useState(null);
  const [genError, setGenError] = useState('');
  const [subject, setSubject] = useState('');
  const fileInputRef = useRef(null);
  const genres = [
    { label: 'Pop' }, { label: 'Reggaetón' }, { label: 'Rock' },
    { label: 'R&B' }, { label: 'Lo-fi' }, { label: 'Trap' },
    { label: 'Cumbia' }, { label: 'Jazz' }, { label: 'K-Pop' }, { label: 'Electro' },
  ];

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const [header, base64] = reader.result.split(',');
      const mediaType = header.match(/data:([^;]+)/)?.[1] || 'image/jpeg';
      resolve({ base64, mediaType });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) { setImageFile(file); setGenError(''); setStep(1); }
  };

  const generate = async () => {
    if (!imageFile) { setGenError('Please upload a photo of your notes first.'); return; }
    setStep(2); setProgress(0); setGenError('');

    const labels = ['Analyzing notes...', 'Writing lyrics...', 'Composing melody...', 'Mixing your song...', 'Almost there...'];
    let p = 0, labelIdx = 0;
    const timer = setInterval(() => {
      p += Math.random() * 0.4 + 0.1;
      if (p > labelIdx * 22 + 22 && labelIdx < labels.length - 1) { labelIdx++; setProgressLabel(labels[labelIdx]); }
      if (p >= 88) { p = 88; clearInterval(timer); }
      setProgress(Math.min(p, 88));
    }, 800);

    try {
      // Step 1 — Claude generates lyrics (~4s)
      const { base64, mediaType } = await fileToBase64(imageFile);
      const { data: lyricsData, error: lyricsError } = await window.db.functions.invoke('generate-song', {
        body: { imageBase64: base64, mediaType, genre, subject: subject.trim() },
      });
      console.log('[Studify] generate-song data:', lyricsData, 'error:', lyricsError);
      if (!lyricsData?.lyrics) throw new Error(lyricsData?.error || lyricsError?.message || 'Could not generate lyrics. Please try again.');

      // Show lyrics to user immediately
      setGeneratedSong({ title: lyricsData.title, lyrics: lyricsData.lyrics, genre, audio_url: null });
      setProgressLabel('Composing melody...');

      // Step 2 — Start Sonauto generation (~2s)
      const { data: audioData, error: audioError } = await window.db.functions.invoke('start-audio', {
        body: { lyrics: lyricsData.lyrics, genre, title: lyricsData.title },
      });
      console.log('[Studify] start-audio data:', audioData, 'error:', audioError);
      if (!audioData?.task_id) throw new Error(audioData?.error || audioError?.message || 'Could not start audio generation. Please try again.');

      setProgressLabel('Mixing your song...');

      // Step 3 — Poll check-song every 6s until audio is ready (up to ~3 min)
      let finalSong = null;
      for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 6000));
        const { data: checkData, error: checkError } = await window.db.functions.invoke('check-song', {
          body: { task_id: audioData.task_id, song_id: audioData.song_id },
        });
        console.log(`[Studify] check-song poll ${i + 1}:`, checkData, 'error:', checkError);
        if (!checkData) continue;
        if (checkData.done && checkData.error) throw new Error(checkData.error);
        if (checkData.done && checkData.audio_url) {
          finalSong = {
            ...(checkData.song || {}),
            title: lyricsData.title,
            lyrics: lyricsData.lyrics,
            genre,
            audio_url: checkData.audio_url,
          };
          break;
        }
      }

      if (!finalSong) throw new Error('Audio generation timed out. Please try again.');

      clearInterval(timer);
      setProgress(100);
      setGeneratedSong({ ...finalSong, subject: 'Notes', time: '—', color: GRAD });
      setTimeout(() => setStep(3), 500);
    } catch (err) {
      clearInterval(timer);
      setGenError(err.message || 'Something went wrong. Please try again.');
      setStep(1);
    }
  };

  if (step === 0) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar title="Upload Notes" onBack={onBack} />
      {/* Hidden file inputs — triggered by the buttons below */}
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileSelect} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 24px 40px' }}>
        <div onClick={() => fileInputRef.current?.click()} style={{ width: '100%', height: 210, border: '1.5px dashed rgba(123,97,255,0.4)', borderRadius: 20, background: 'rgba(123,97,255,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s' }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(123,97,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7B61FF' }}>
            <UploadIcon size={28} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#F0F0FF', marginBottom: 4 }}>Tap to upload notes</div>
            <div style={{ fontSize: 13, color: '#505065' }}>Photo, PDF or image file</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: '#505065' }}>— or —</div>
        <StudifyButton variant="secondary" style={{ width: '100%' }} onClick={() => fileInputRef.current?.click()}>
          <CameraIcon size={18} /> Take a photo
        </StudifyButton>
        {/* Tip */}
        <div style={{ background: '#13131A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '14px 16px', width: '100%', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ color: '#9B59B6', marginTop: 1 }}><SparkleIcon size={16} /></div>
          <div style={{ fontSize: 13, color: '#9090A8', lineHeight: 1.5 }}>Clear, legible handwriting works best. Try to photograph in good lighting.</div>
        </div>
      </div>
    </div>
  );

  if (step === 1) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar title="Pick your genre" onBack={() => setStep(0)} />
      {/* Error banner */}
      {genError ? (
        <div style={{ margin: '0 20px 12px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <div style={{ fontSize: 13, color: '#EF4444' }}>{genError}</div>
        </div>
      ) : null}
      {/* Preview of uploaded file */}
      <div style={{ margin: '0 20px 16px' }}>
        <div style={{ background: '#13131A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 46, height: 46, borderRadius: 10, background: '#1C1C27', border: '1px dashed rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookIcon size={18} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F0FF' }}>{imageFile ? imageFile.name : 'No file selected'}</div>
            <div style={{ fontSize: 12, color: '#9090A8' }}>{imageFile ? `${(imageFile.size / 1024).toFixed(0)} KB · Ready` : 'Tap back to upload'}</div>
          </div>
          {imageFile && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
        </div>
      </div>
      {/* Genre grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
        {/* Subject / topic input */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#505065', marginBottom: 8 }}>Subject (optional)</div>
          <input
            style={{ width: '100%', background: '#1C1C27', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '12px 14px', fontSize: 14, color: '#F0F0FF', outline: 'none', fontFamily: "'Space Grotesk', sans-serif", boxSizing: 'border-box' }}
            placeholder="e.g. Biology: Cell Division"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            onFocus={e => e.target.style.borderColor = 'rgba(155,89,182,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
          />
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#505065', marginBottom: 12 }}>Genre</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
          {genres.map(g => <GenreChip key={g.label} label={g.label} selected={genre === g.label} onClick={() => setGenre(g.label)} />)}
        </div>
        {/* Preview of selected */}
        <div style={{ marginTop: 16, background: 'rgba(155,89,182,0.07)', border: '1px solid rgba(155,89,182,0.18)', borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9090A8', marginBottom: 6 }}>Your song will be</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{subject || 'My notes'} — {genre} Mix</div>
          <div style={{ fontSize: 13, color: '#9090A8', marginTop: 2 }}>AI-generated · ~2:30</div>
        </div>
      </div>
      <div style={{ padding: '14px 20px 24px', flexShrink: 0 }}>
        <StudifyButton style={{ width: '100%' }} size="lg" onClick={generate}>
          <SparkleIcon size={16} /> Generate my song
        </StudifyButton>
      </div>
    </div>
  );

  if (step === 2) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', gap: 36 }}>
      <div style={{ position: 'relative', width: 110, height: 110 }}>
        <div style={{ position: 'absolute', inset: -12, borderRadius: '50%', background: 'rgba(123,97,255,0.08)', animation: 'ping 1.6s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'rgba(123,97,255,0.12)', animation: 'ping 1.6s ease-in-out infinite 0.4s' }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 36px rgba(155,89,182,0.55)' }}>
          <SparkleIcon size={40} />
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 38, color: '#F0F0FF', marginBottom: 8 }}>Composing your song</div>
        <div style={{ fontSize: 14, color: '#9090A8' }}>{progressLabel}</div>
      </div>
      <div style={{ width: '100%' }}>
        <div style={{ height: 5, background: '#1C1C27', borderRadius: 9999, overflow: 'hidden', marginBottom: 8 }}>
          <div style={{ height: '100%', width: `${progress}%`, background: GRAD, borderRadius: 9999, transition: 'width 0.2s ease' }} />
        </div>
        <div style={{ fontSize: 12, color: '#505065', textAlign: 'right' }}>{Math.round(progress)}%</div>
      </div>
      <style>{`@keyframes ping { 0%,100%{transform:scale(1);opacity:0.5} 50%{transform:scale(1.18);opacity:1} }`}</style>
    </div>
  );

  // Step 3 — Done
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar title="" onBack={onBack} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1.5px solid rgba(34,197,94,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(34,197,94,0.2)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: '#F0F0FF', marginBottom: 4, lineHeight: 1 }}>Your song is ready.</div>
          <div style={{ fontSize: 14, color: '#9090A8' }}>Biology · {genre} Mix · 2:47</div>
        </div>
        {/* Album art preview */}
        <div style={{ width: '100%', height: 130, borderRadius: 20, background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(155,89,182,0.3)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(216,27,138,0.4) 0%, transparent 60%)' }} />
          <img src="assets/logo-pink-gradient.png" style={{ height: 80, objectFit: 'contain', position: 'relative' }} />
        </div>
        {/* Lyrics preview */}
        <div style={{ background: '#13131A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '16px 18px', width: '100%' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#505065', marginBottom: 10 }}>Preview lyrics</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, lineHeight: 1.85, color: '#9090A8', whiteSpace: 'pre-wrap' }}>
            {generatedSong?.lyrics
              ? generatedSong.lyrics.split('\n').slice(0, 6).join('\n')
              : 'Lyrics loading…'}
          </div>
        </div>
        <StudifyButton style={{ width: '100%' }} size="lg" onClick={() => onPlaySong({ ...generatedSong, subject: 'Notes', time: '—', color: GRAD })}>
          <PlayIcon size={16} /> Play now
        </StudifyButton>
        <StudifyButton variant="ghost" style={{ width: '100%' }} onClick={onBack}>Back to home</StudifyButton>
      </div>
    </div>
  );
};

// ── Player Screen ──────────────────────────────────────────────
const PlayerScreen = ({ song, onBack }) => {
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [activeTab, setActiveTab] = useState('lyrics');
  const [totalSecs, setTotalSecs] = useState(154);
  const audioRef = useRef(null);

  const s = song || SONGS_DATA[0];

  // Sync play/pause with the real audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    playing ? audio.play().catch(() => setPlaying(false)) : audio.pause();
  }, [playing]);

  // Update progress bar from real audio position
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    const onMeta = () => { setTotalSecs(Math.round(audio.duration) || 154); setPlaying(true); };
    const onEnd  = () => { setPlaying(false); setProgress(0); };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);
    return () => { audio.removeEventListener('timeupdate', onTime); audio.removeEventListener('loadedmetadata', onMeta); audio.removeEventListener('ended', onEnd); };
  }, [s.audio_url]);

  const curSecs = Math.round(totalSecs * progress / 100);
  const fmt = n => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`;

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setProgress(pct);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (pct / 100) * audioRef.current.duration;
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Hidden audio element — plays the real generated song */}
      {s.audio_url && <audio ref={audioRef} src={s.audio_url} preload="auto" />}
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px 8px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 10, color: '#9090A8', cursor: 'pointer', padding: 6, display: 'flex' }}>
          <ChevronLeft />
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#505065' }}>Now Playing</div>
        </div>
        <button onClick={() => setLiked(l => !l)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 10, cursor: 'pointer', padding: 7, display: 'flex' }}>
          <HeartIcon size={19} filled={liked} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Album art */}
        <div style={{ margin: '8px 24px 20px', borderRadius: 24, height: 200, background: s.color || GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 52px rgba(155,89,182,0.35)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 25% 25%, rgba(216,27,138,0.4) 0%, transparent 55%)' }} />
          <img src="assets/logo-pink-gradient.png" style={{ height: 100, objectFit: 'contain', position: 'relative' }} />
        </div>

        {/* Title + genre */}
        <div style={{ padding: '0 24px', marginBottom: 18, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: '#F0F0FF', lineHeight: 1.05, marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: '#9090A8' }}>{s.subject}</div>
          </div>
          <span style={{ padding: '5px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, background: 'rgba(155,89,182,0.14)', color: '#B39DDB', letterSpacing: '0.04em', marginTop: 4, flexShrink: 0 }}>{s.genre}</span>
        </div>

        {/* Waveform */}
        <div style={{ padding: '0 24px', marginBottom: 12 }}>
          <Waveform playing={playing} color="#9B59B6" />
        </div>

        {/* Seekbar */}
        <div style={{ padding: '0 24px', marginBottom: 20 }}>
          <div onClick={handleSeek} style={{ height: 4, background: '#1C1C27', borderRadius: 9999, overflow: 'visible', cursor: 'pointer', position: 'relative' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: GRAD90, borderRadius: 9999, transition: 'width 0.15s', position: 'relative' }}>
              <div style={{ position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%)', width: 12, height: 12, borderRadius: '50%', background: '#F0F0FF', boxShadow: '0 0 8px rgba(155,89,182,0.5)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: '#505065' }}>
            <span>{fmt(curSecs)}</span><span>{fmt(totalSecs)}</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ padding: '0 32px', marginBottom: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setShuffle(s => !s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: shuffle ? '#9B59B6' : '#505065', padding: 4, filter: shuffle ? 'drop-shadow(0 0 6px rgba(155,89,182,0.5))' : 'none' }}>
            <ShuffleIcon size={20} />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9090A8', padding: 4 }}><SkipBack size={22} /></button>
          <button onClick={() => setPlaying(p => !p)}
            style={{ background: GRAD, border: 'none', borderRadius: '50%', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 28px rgba(155,89,182,0.55)', flexShrink: 0 }}>
            {playing ? <PauseIcon size={22} /> : <PlayIcon size={22} />}
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9090A8', padding: 4 }}><SkipFwd size={22} /></button>
          <button onClick={() => setRepeat(r => !r)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: repeat ? '#9B59B6' : '#505065', padding: 4, filter: repeat ? 'drop-shadow(0 0 6px rgba(155,89,182,0.5))' : 'none' }}>
            <RepeatIcon size={20} />
          </button>
        </div>

        {/* Tabs: Lyrics / Info */}
        <div style={{ margin: '0 24px 14px', display: 'flex', background: '#13131A', borderRadius: 12, padding: 4, gap: 4 }}>
          {['lyrics', 'info'].map(tab => (
            <div key={tab} onClick={() => setActiveTab(tab)}
              style={{ flex: 1, textAlign: 'center', padding: '8px 0', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: activeTab === tab ? '#1C1C27' : 'transparent', color: activeTab === tab ? '#F0F0FF' : '#505065', transition: 'all 0.2s', textTransform: 'capitalize' }}>
              {tab}
            </div>
          ))}
        </div>

        {/* Lyrics panel */}
        {activeTab === 'lyrics' && (
          <div style={{ margin: '0 24px 24px', background: '#13131A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '16px 18px' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, lineHeight: 2.0, color: '#9090A8', whiteSpace: 'pre-wrap' }}>
              {s.lyrics || 'No lyrics available.'}
            </div>
          </div>
        )}
        {activeTab === 'info' && (
          <div style={{ margin: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['Subject', s.subject], ['Genre', s.genre], ['Duration', s.time], ['Created', 'Today'], ['Notes source', 'Biology Class 4.jpg']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: 13, color: '#505065' }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#F0F0FF' }}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Playlists Screen ───────────────────────────────────────────
const PlaylistsScreen = ({ onPlaySong, onOpenPlaylist, user, onNavigate }) => {
  const [view, setView] = useState('grid'); // grid | detail
  const [selected, setSelected] = useState(null);
  const [dbSongs, setDbSongs] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState(() => {
    try { return JSON.parse(localStorage.getItem('studify_playlists') || '[]'); } catch { return []; }
  });
  const [showNewPl, setShowNewPl] = useState(false);
  const [newPlName, setNewPlName] = useState('');

  const createPlaylist = () => {
    if (!newPlName.trim()) return;
    const pl = { id: Date.now(), name: newPlName.trim(), gradient: GRAD };
    const updated = [...userPlaylists, pl];
    setUserPlaylists(updated);
    try { localStorage.setItem('studify_playlists', JSON.stringify(updated)); } catch {}
    setNewPlName(''); setShowNewPl(false);
  };

  const deletePlaylist = (id) => {
    const updated = userPlaylists.filter(p => p.id !== id);
    setUserPlaylists(updated);
    try { localStorage.setItem('studify_playlists', JSON.stringify(updated)); } catch {}
  };

  useEffect(() => {
    if (!user?.id) return;
    window.db.from('songs').select('*').eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data?.length) setDbSongs(data); });
  }, [user?.id]);

  const handleDelete = async (id) => {
    await window.db.from('songs').delete().eq('id', id);
    setDbSongs(prev => prev.filter(s => s.id !== id));
  };

  // Build real playlists: one per genre from DB + user-created ones
  const smartPlaylists = Object.entries(
    dbSongs.reduce((acc, s) => { if (s.genre) { (acc[s.genre] = acc[s.genre] || []).push(s); } return acc; }, {})
  ).map(([genre, songs]) => ({
    id: `genre-${genre}`, name: genre, count: songs.length,
    subject: genre, gradient: GENRE_COLOR[genre] || GRAD, type: 'genre', genre,
  }));
  const allPlaylists = [
    ...smartPlaylists,
    ...userPlaylists.map(p => ({ ...p, count: dbSongs.length, type: 'user' })),
  ];

  if (view === 'detail' && selected) {
    const pl = selected;
    const plSongs = pl.type === 'genre'
      ? dbSongs.filter(s => s.genre === pl.genre).map(toSongCard)
      : dbSongs.map(toSongCard);
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar title="" onBack={() => setView('grid')} />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ margin: '0 20px 20px', height: 170, borderRadius: 20, background: pl.gradient, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 0 40px rgba(0,0,0,0.4)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />
            <MusicIcon size={52} />
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: '#F0F0FF', marginTop: 8, position: 'relative' }}>{pl.name}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', position: 'relative' }}>{plSongs.length} songs</div>
          </div>
          <div style={{ padding: '0 20px', marginBottom: 20 }}>
            <StudifyButton style={{ width: '100%' }} onClick={() => plSongs[0] && onPlaySong(plSongs[0])}>
              <PlayIcon size={16} /> Play all
            </StudifyButton>
          </div>
          <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 20 }}>
            {plSongs.length > 0
              ? plSongs.map(s => <SongCard key={s.id} {...s} showMore onClick={() => onPlaySong(s)} />)
              : <div style={{ textAlign: 'center', color: '#505065', fontSize: 14, padding: 24 }}>No songs yet — generate one first!</div>
            }
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar title="Playlists" onBack={onNavigate ? () => onNavigate('home') : undefined} right={
        <span style={{ fontSize: 12, color: '#9090A8', fontWeight: 500 }}>{allPlaylists.length} lists</span>
      } />
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px 20px' }}>
        {/* Featured — first playlist or empty state */}
        {allPlaylists.length > 0 ? (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#505065', marginBottom: 12 }}>Featured</div>
            <div onClick={() => { setSelected(allPlaylists[0]); setView('detail'); }}
              style={{ borderRadius: 20, height: 140, background: allPlaylists[0].gradient, display: 'flex', alignItems: 'flex-end', padding: '20px 20px', cursor: 'pointer', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 28px rgba(0,0,0,0.4)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, color: '#fff', lineHeight: 1 }}>{allPlaylists[0].name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>{allPlaylists[0].count} songs</div>
              </div>
              <div style={{ marginLeft: 'auto', position: 'relative', background: GRAD, borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(155,89,182,0.5)' }}>
                <PlayIcon size={16} />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: 24, background: 'rgba(123,97,255,0.05)', border: '1px solid rgba(123,97,255,0.15)', borderRadius: 20, padding: '28px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: '#9090A8', marginBottom: 8 }}>No playlists yet</div>
            <div style={{ fontSize: 12, color: '#505065' }}>Generate a song to create your first playlist automatically</div>
          </div>
        )}

        {/* All playlists */}
        {allPlaylists.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#505065', marginBottom: 12 }}>All Playlists</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {allPlaylists.map(pl => (
                <div key={pl.id} onClick={() => { setSelected(pl); setView('detail'); }}
                  style={{ background: '#13131A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: pl.gradient, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MusicIcon size={20} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#F0F0FF', marginBottom: 2 }}>{pl.name}</div>
                    <div style={{ fontSize: 12, color: '#9090A8' }}>{pl.count} songs</div>
                  </div>
                  {pl.type === 'user'
                    ? <button onClick={e => { e.stopPropagation(); deletePlaylist(pl.id); }}
                        style={{ background: 'none', border: 'none', color: '#505065', cursor: 'pointer', padding: 4, display: 'flex' }}>
                        <TrashIcon size={15} />
                      </button>
                    : <ChevronRight size={16} />
                  }
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Songs */}
        {dbSongs.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#505065', marginBottom: 12 }}>My Songs</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {dbSongs.map(s => (
                <SongCard key={s.id} {...toSongCard(s)} showMore onClick={() => onPlaySong(toSongCard(s))} onDelete={() => handleDelete(s.id)} />
              ))}
            </div>
          </div>
        )}

        {/* Create playlist */}
        <div style={{ marginTop: 18 }}>
          {showNewPl
            ? <div style={{ border: '1.5px solid rgba(123,97,255,0.4)', borderRadius: 14, padding: '14px 14px', background: 'rgba(123,97,255,0.04)' }}>
                <input
                  autoFocus
                  style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: 14, fontWeight: 600, color: '#F0F0FF', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 12 }}
                  placeholder="Playlist name…"
                  value={newPlName}
                  onChange={e => setNewPlName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') createPlaylist(); if (e.key === 'Escape') { setShowNewPl(false); setNewPlName(''); } }}
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <StudifyButton size="sm" style={{ flex: 1 }} onClick={createPlaylist}>Create</StudifyButton>
                  <StudifyButton size="sm" variant="ghost" style={{ flex: 1 }} onClick={() => { setShowNewPl(false); setNewPlName(''); }}>Cancel</StudifyButton>
                </div>
              </div>
            : <div onClick={() => setShowNewPl(true)} style={{ border: '1.5px dashed rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px 14px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: '#1C1C27', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#505065' }}>
                  <CreateIcon size={22} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#9090A8' }}>New playlist</div>
                  <div style={{ fontSize: 12, color: '#505065' }}>Group your songs by subject</div>
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  );
};

// ── Profile Screen ─────────────────────────────────────────────
const ProfileScreen = ({ onNavigate, user }) => {
  const [notifs, setNotifs] = useState(true);
  const [profile, setProfile] = useState(null);
  const [dbSongs, setDbSongs] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    window.db.from('songs').select('id, genre, created_at').eq('user_id', user.id)
      .then(({ data }) => { if (data) setDbSongs(data); });
  }, [user?.id]);

  useEffect(() => {
    if (!user) return;
    window.db.from('profiles').select('name, email').eq('id', user.id).single()
      .then(({ data }) => { if (data) setProfile(data); });
  }, [user?.id]);

  const displayName = profile?.name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  const displayEmail = user?.email || '';

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar title="Profile" onBack={() => onNavigate('home')} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px 24px' }}>
        {/* Avatar + name */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: 22 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 28px rgba(155,89,182,0.45)', marginBottom: 12 }}>
            <UserIcon size={36} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#F0F0FF', marginBottom: 2 }}>{displayName}</div>
          <div style={{ fontSize: 13, color: '#9090A8', marginBottom: 12 }}>{displayEmail}</div>
          <div style={{ padding: '5px 14px', borderRadius: 9999, background: 'rgba(155,89,182,0.12)', border: '1px solid rgba(155,89,182,0.25)', fontSize: 12, fontWeight: 700, color: '#B39DDB', letterSpacing: '0.04em' }}>PRO PLAN</div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <StatPill value={dbSongs.length || '—'} label="Songs" />
          <StatPill value={new Set(dbSongs.map(s => s.genre).filter(Boolean)).size || '—'} label="Genres" />
          <StatPill value={dbSongs.length ? `${dbSongs.length * 3}m` : '—'} label="Study time" />
        </div>

        {/* Weekly activity — real data from DB */}
        {(() => {
          const DAY_ABBR = ['S','M','T','W','T','F','S'];
          const today = new Date();
          const last7 = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(today);
            d.setDate(d.getDate() - (6 - i));
            return { label: DAY_ABBR[d.getDay()], isToday: i === 6, date: d };
          });
          const counts = last7.map(({ date }) =>
            dbSongs.filter(s => {
              const sd = new Date(s.created_at);
              return sd.getFullYear() === date.getFullYear() && sd.getMonth() === date.getMonth() && sd.getDate() === date.getDate();
            }).length
          );
          const maxH = Math.max(...counts, 1);
          const weekTotal = counts.reduce((a, b) => a + b, 0);
          return (
            <div style={{ background: '#13131A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '16px 16px', marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F0FF' }}>This week</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#22C55E' }}>
                  <TrendIcon size={13} /> +{weekTotal} song{weekTotal !== 1 ? 's' : ''}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 48 }}>
                {last7.map(({ label, isToday }, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: '100%', height: counts[i] ? Math.max(Math.round((counts[i] / maxH) * 40), 8) : 4, borderRadius: 4, background: isToday ? GRAD : counts[i] ? 'rgba(155,89,182,0.35)' : 'rgba(255,255,255,0.1)' }} />
                    <div style={{ fontSize: 9, color: isToday ? '#B39DDB' : '#505065', fontWeight: isToday ? 700 : 400 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { label: 'Favorite genres', sub: 'Pop, Lo-fi, R&B', action: 'chevron' },
            { label: 'Notifications', sub: 'Song ready, reminders', action: 'toggle', val: notifs, toggle: () => setNotifs(n => !n) },
            { label: 'Language', sub: 'English', action: 'chevron' },
            { label: 'Subscription', sub: 'Pro · Renews June 1', action: 'chevron' },
          ].map((item, i) => (
            <div key={item.label} onClick={item.toggle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F0FF', marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: '#505065' }}>{item.sub}</div>
              </div>
              {item.action === 'chevron' && <ChevronRight size={16} />}
              {item.action === 'toggle' && (
                <div style={{ width: 44, height: 26, borderRadius: 9999, background: item.val ? GRAD : '#1C1C27', border: `1px solid ${item.val ? 'transparent' : 'rgba(255,255,255,0.08)'}`, position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', top: 3, left: item.val ? 21 : 3, width: 18, height: 18, borderRadius: '50%', background: '#F0F0FF', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }} />
                </div>
              )}
            </div>
          ))}
          <div style={{ paddingTop: 6 }}>
            <div onClick={() => window.db.auth.signOut()}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0', cursor: 'pointer' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#EF4444' }}>Sign out</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, {
  SplashScreen, AuthScreen, ProcessingScreen,
  HomeScreen, CreateScreen, PlayerScreen, PlaylistsScreen, ProfileScreen,
  SONGS_DATA, PLAYLISTS_DATA,
});
