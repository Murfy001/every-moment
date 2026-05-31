import LottieDecor from './LottieDecor'

const themes = {
  stars: { border: '#a78bfa', glow: '#7c3aed' },
  galaxy: { border: '#67e8f9', glow: '#06b6d4' },
  tulips: { border: '#fcd34d', glow: '#f59e0b' },
  nature: { border: '#86efac', glow: '#22c55e' },
  petalos: { border: '#f9a8d4', glow: '#ec4899' },
  hojas: { border: '#86efac', glow: '#22c55e' },
  destellos: { border: '#a78bfa', glow: '#7c3aed' },
  ramas: { border: '#f9a8d4', glow: '#ec4899' },
  ramasFlores: { border: '#fda4af', glow: '#f43f5e' },
}

// Cubren toda la carta
const fullScreenMap = {
  petalos: '/every-moment/animations/petalos.json',
  hojas: '/every-moment/animations/hojas.json',
  destellos: '/every-moment/animations/Destellos.json',
}

// Contornos
const borderMap = {
  ramas: '/every-moment/animations/RamasRosas.json',
  ramasFlores: '/every-moment/animations/RamasFlores.json',
}

// Esquinas
const cornerMap = {
  stars: {
    tl: '/every-moment/animations/estrellas.json',
    tr: '/every-moment/animations/estrellas.json',
    bl: '/every-moment/animations/luna.json',
    br: '/every-moment/animations/estrellas.json',
  },
  galaxy: {
    tl: '/every-moment/animations/estrellas.json',
    tr: '/every-moment/animations/estrellas.json',
    bl: '/every-moment/animations/luna.json',
    br: '/every-moment/animations/luna.json',
  },
  tulips: {
    tl: '/every-moment/animations/mariposa.json',
    tr: '/every-moment/animations/mariposa.json',
    bl: '/every-moment/animations/mariposa.json',
    br: '/every-moment/animations/mariposa.json',
  },
  nature: {
    tl: '/every-moment/animations/mariposa.json',
    tr: '/every-moment/animations/HojasVerdesC.json',
    bl: '/every-moment/animations/HojasVerdesC.json',
    br: '/every-moment/animations/mariposa.json',
  },
}

function CardPreview({ card, onClick }) {
  const theme = themes[card.decoration] || themes.stars
  const isFullScreen = card.decoration in fullScreenMap
  const isBorder = card.decoration in borderMap
  const isCorner = !isFullScreen && !isBorder

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
      {/* Animación pantalla completa */}
      {isFullScreen && (
        <LottieDecor
          src={fullScreenMap[card.decoration]}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
            opacity: 0.55,
          }}
        />
      )}

      {/* Animación contorno */}
      {isBorder && (
        <LottieDecor
          src={borderMap[card.decoration]}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
            opacity: 0.85,
          }}
        />
      )}

      {/* Animaciones esquinas */}
      {isCorner && cornerMap[card.decoration] && (
  <>
    <LottieDecor
      src={cornerMap[card.decoration].tl}
      style={{ position: 'absolute', top: -10, left: -10, width: 90, height: 90, zIndex: 2 }}
    />
    <LottieDecor
      src={cornerMap[card.decoration].tr}
      style={{ position: 'absolute', top: -10, right: -10, width: 90, height: 90, zIndex: 2 }}
    />
    <LottieDecor
      src={cornerMap[card.decoration].bl}
      style={{ position: 'absolute', bottom: -10, left: -10, width: 90, height: 90, zIndex: 2 }}
    />
    <LottieDecor
      src={cornerMap[card.decoration].br}
      style={{ position: 'absolute', bottom: -10, right: -10, width: 90, height: 90, zIndex: 2 }}
    />
  </>
)}
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
          zIndex: 3,
          position: 'relative',
        }}>
          <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
        zIndex: 3,
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
        zIndex: 3,
        position: 'relative',
        padding: '0 1.5rem',
      }}>
        {card.message}
      </p>
    </div>
  )
}

export default CardPreview