import LottieDecor from './LottieDecor' // ← Añadir esta importación

const themes = {
  stars: {
    border: '#a78bfa',
    glow: '#7c3aed',
    decoration: () => (
      <svg viewBox="0 0 300 400" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
        <defs>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/>
          </radialGradient>
        </defs>
        {[...Array(12)].map((_, i) => (
          <g key={i} transform={`translate(${15 + (i%4)*80}, ${15 + Math.floor(i/4)*120})`}>
            <text fontSize="18" style={{animation:`twinkle ${1+i*0.3}s infinite alternate`}}>
              {['✨','⭐','🌙','💫','🪐','🌟'][i%6]}
            </text>
          </g>
        ))}
        <rect x="4" y="4" width="292" height="392" rx="16" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.6"/>
      </svg>
    )
  },
  flowers: {
    border: '#f9a8d4',
    glow: '#ec4899',
    decoration: () => (
      <svg viewBox="0 0 300 400" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
        <rect x="4" y="4" width="292" height="392" rx="16" fill="none" stroke="#f9a8d4" strokeWidth="1.5" opacity="0.7"/>
        {/* Esquina superior izquierda */}
        <text x="8" y="30" fontSize="22">🌸</text>
        <text x="30" y="20" fontSize="16">🌿</text>
        <text x="50" y="35" fontSize="18">🌺</text>
        <text x="8" y="55" fontSize="16">🌿</text>
        {/* Esquina superior derecha */}
        <text x="258" y="30" fontSize="22">🌸</text>
        <text x="238" y="20" fontSize="16">🌿</text>
        <text x="218" y="35" fontSize="18">🌺</text>
        <text x="265" y="55" fontSize="16">🌿</text>
        {/* Esquina inferior izquierda */}
        <text x="8" y="375" fontSize="22">🌸</text>
        <text x="30" y="390" fontSize="16">🌿</text>
        <text x="50" y="372" fontSize="18">🌺</text>
        {/* Esquina inferior derecha */}
        <text x="258" y="375" fontSize="22">🌸</text>
        <text x="235" y="390" fontSize="16">🌿</text>
        <text x="215" y="372" fontSize="18">🌺</text>
        {/* Lados */}
        <text x="140" y="18" fontSize="16">🌷</text>
        <text x="140" y="390" fontSize="16">🌷</text>
        <text x="4" y="205" fontSize="16">🌿</text>
        <text x="272" y="205" fontSize="16">🌿</text>
      </svg>
    )
  },
  nature: {
    border: '#86efac',
    glow: '#22c55e',
    decoration: () => (
      <svg viewBox="0 0 300 400" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
        <rect x="4" y="4" width="292" height="392" rx="16" fill="none" stroke="#86efac" strokeWidth="1.5" opacity="0.7"/>
        <text x="8" y="30" fontSize="20">🦋</text>
        <text x="32" y="22" fontSize="16">🍃</text>
        <text x="52" y="34" fontSize="18">🌿</text>
        <text x="258" y="30" fontSize="20">🦋</text>
        <text x="236" y="22" fontSize="16">🍃</text>
        <text x="216" y="34" fontSize="18">🌿</text>
        <text x="8" y="375" fontSize="20">🌱</text>
        <text x="30" y="390" fontSize="16">🍃</text>
        <text x="258" y="375" fontSize="20">🌱</text>
        <text x="236" y="390" fontSize="16">🍃</text>
        <text x="138" y="18" fontSize="16">🍀</text>
        <text x="138" y="392" fontSize="16">🍀</text>
        <text x="4" y="205" fontSize="16">🌿</text>
        <text x="272" y="205" fontSize="16">🌿</text>
      </svg>
    )
  },
  galaxy: {
    border: '#67e8f9',
    glow: '#06b6d4',
    decoration: () => (
      <svg viewBox="0 0 300 400" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
        <rect x="4" y="4" width="292" height="392" rx="16" fill="none" stroke="#67e8f9" strokeWidth="1.5" strokeDasharray="12 3" opacity="0.7"/>
        <text x="8" y="30" fontSize="20">🌌</text>
        <text x="32" y="22" fontSize="16">⭐</text>
        <text x="52" y="34" fontSize="18">🪐</text>
        <text x="258" y="30" fontSize="20">🌌</text>
        <text x="236" y="22" fontSize="16">⭐</text>
        <text x="216" y="34" fontSize="18">🪐</text>
        <text x="8" y="375" fontSize="20">🌙</text>
        <text x="30" y="390" fontSize="16">💫</text>
        <text x="258" y="375" fontSize="20">🌙</text>
        <text x="236" y="390" fontSize="16">💫</text>
        <text x="138" y="18" fontSize="16">✨</text>
        <text x="138" y="392" fontSize="16">✨</text>
      </svg>
    )
  },
  tulips: {
    border: '#fcd34d',
    glow: '#f59e0b',
    decoration: () => (
      <svg viewBox="0 0 300 400" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
        <rect x="4" y="4" width="292" height="392" rx="16" fill="none" stroke="#fcd34d" strokeWidth="1.5" opacity="0.7"/>
        <text x="8" y="30" fontSize="20">🌷</text>
        <text x="32" y="22" fontSize="16">🌱</text>
        <text x="52" y="34" fontSize="18">🌷</text>
        <text x="258" y="30" fontSize="20">🌷</text>
        <text x="236" y="22" fontSize="16">🌱</text>
        <text x="216" y="34" fontSize="18">🌷</text>
        <text x="8" y="375" fontSize="20">🌷</text>
        <text x="30" y="390" fontSize="16">🌱</text>
        <text x="258" y="375" fontSize="20">🌷</text>
        <text x="236" y="390" fontSize="16">🌱</text>
        <text x="136" y="18" fontSize="16">🌷</text>
        <text x="136" y="392" fontSize="16">🌷</text>
        <text x="4" y="205" fontSize="16">🌱</text>
        <text x="272" y="205" fontSize="16">🌱</text>
      </svg>
    )
  },
}

const lottieMap = {
  stars: {
    tl: '/every-moment/animations/estrellas.json',
    tr: '/every-moment/animations/luna.json',
    bl: '/every-moment/animations/Destellos.json',
    br: '/every-moment/animations/estrellas.json',
  },
  flowers: {
    tl: '/every-moment/animations/gerbera.json',
    tr: '/every-moment/animations/rosa.json',
    bl: '/every-moment/animations/petalos.json',
    br: '/every-moment/animations/gerbera.json',
  },
  nature: {
    tl: '/every-moment/animations/mariposa.json',
    tr: '/every-moment/animations/hojas.json',
    bl: '/every-moment/animations/hojas.json',
    br: '/every-moment/animations/mariposa.json',
  },
  galaxy: {
    tl: '/every-moment/animations/estrellas.json',
    tr: '/every-moment/animations/luna.json',
    bl: '/every-moment/animations/Destellos.json',
    br: '/every-moment/animations/estrellas.json',
  },
  tulips: {
    tl: '/every-moment/animations/tulipan.json',
    tr: '/every-moment/animations/petalos.json',
    bl: '/every-moment/animations/tulipan.json',
    br: '/every-moment/animations/rosa.json',
  },
}

function CardPreview({ card, onClick }) {
  const theme = themes[card.decoration] || themes.stars

  return (
    <div
      onClick={onClick}
      style={{
        background: card.background || 'linear-gradient(135deg, #1a1a4e, #2d1b69)',
        borderRadius: '16px',
        padding: '2rem 1.5rem',
        cursor: 'pointer',
        border: `2px solid ${theme.border}44`,
        transition: 'all 0.4s ease',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
        e.currentTarget.style.boxShadow = `0 0 40px ${theme.glow}66`
        e.currentTarget.style.border = `2px solid ${theme.border}99`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.border = `2px solid ${theme.border}44`
      }}
    >
      {/* Animaciones Lottie en esquinas */}
      <LottieDecor
        src={lottieMap[card.decoration]?.tl || lottieMap.stars.tl}
        style={{ position: 'absolute', top: -10, left: -10, width: 90, height: 90, zIndex: 2 }}
      />
      <LottieDecor
        src={lottieMap[card.decoration]?.tr || lottieMap.stars.tr}
        style={{ position: 'absolute', top: -10, right: -10, width: 90, height: 90, zIndex: 2, transform: 'scaleX(-1)' }}
      />
      <LottieDecor
        src={lottieMap[card.decoration]?.bl || lottieMap.stars.bl}
        style={{ position: 'absolute', bottom: -10, left: -10, width: 90, height: 90, zIndex: 2, transform: 'scaleY(-1)' }}
      />
      <LottieDecor
        src={lottieMap[card.decoration]?.br || lottieMap.stars.br}
        style={{ position: 'absolute', bottom: -10, right: -10, width: 90, height: 90, zIndex: 2, transform: 'scale(-1)' }}
      />

      {/* Contorno decorativo SVG */}
      {theme.decoration()}

      {/* Imagen */}
      {card.image && (
        <div style={{
          width: '75px',
          height: '75px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: `2px solid ${theme.border}88`,
          boxShadow: `0 0 15px ${theme.glow}44`,
          marginBottom: '0.8rem',
          zIndex: 1,
        }}>
          <img src={card.image} alt={card.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        </div>
      )}

      {/* Título */}
      <h3 style={{
        fontFamily: 'Times New Roman, serif',
        fontStyle: 'italic',
        fontSize: '1.1rem',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: '0.8rem',
        textShadow: `0 0 15px ${theme.border}88`,
        zIndex: 1,
        position: 'relative',
      }}>
        {card.title}
      </h3>

      {/* Mensaje */}
      <p style={{
        fontFamily: 'Times New Roman, serif',
        fontStyle: 'italic',
        fontSize: '0.85rem',
        color: '#ffffffcc',
        textAlign: 'center',
        lineHeight: 1.7,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        zIndex: 1,
        position: 'relative',
        padding: '0 1.5rem',
      }}>
        {card.message}
      </p>

      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.4; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}

export default CardPreview