import { useRef } from 'react'
import { toPng } from 'html-to-image'

const themes = {
  stars: {
    border: '#a78bfa',
    glow: '#7c3aed',
    bg: 'linear-gradient(135deg, #1a1a4e, #2d1b69)',
    corners: ['✨','⭐','🌙','💫'],
    side: '🪐',
  },
  flowers: {
    border: '#f9a8d4',
    glow: '#ec4899',
    bg: 'linear-gradient(135deg, #3b0a2a, #6b1a4a)',
    corners: ['🌸','🌺','🌸','🌺'],
    side: '🌿',
  },
  nature: {
    border: '#86efac',
    glow: '#22c55e',
    bg: 'linear-gradient(135deg, #0d2b1d, #1a4a2e)',
    corners: ['🦋','🍃','🌿','🍀'],
    side: '🌱',
  },
  galaxy: {
    border: '#67e8f9',
    glow: '#06b6d4',
    bg: 'linear-gradient(135deg, #0a1a3a, #0a2a4a)',
    corners: ['🌌','🪐','🌙','⭐'],
    side: '✨',
  },
  tulips: {
    border: '#fcd34d',
    glow: '#f59e0b',
    bg: 'linear-gradient(135deg, #2a1a0a, #4a2a0a)',
    corners: ['🌷','🌱','🌷','🌱'],
    side: '🌷',
  },
}

function BorderSVG({ theme }) {
  return (
    <svg
      viewBox="0 0 500 600"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Borde principal */}
      <rect
        x="6" y="6" width="488" height="588" rx="20"
        fill="none"
        stroke={theme.border}
        strokeWidth="2"
        strokeDasharray="10 5"
        opacity="0.7"
      />
      {/* Borde interior */}
      <rect
        x="14" y="14" width="472" height="572" rx="16"
        fill="none"
        stroke={theme.border}
        strokeWidth="1"
        opacity="0.3"
      />

      {/* Esquinas */}
      <text x="10" y="38" fontSize="26">{theme.corners[0]}</text>
      <text x="452" y="38" fontSize="26">{theme.corners[1]}</text>
      <text x="10" y="578" fontSize="26">{theme.corners[2]}</text>
      <text x="452" y="578" fontSize="26">{theme.corners[3]}</text>

      {/* Lados superior e inferior */}
      <text x="120" y="30" fontSize="18">{theme.side}</text>
      <text x="180" y="30" fontSize="18">{theme.corners[0]}</text>
      <text x="240" y="30" fontSize="18">{theme.side}</text>
      <text x="300" y="30" fontSize="18">{theme.corners[1]}</text>
      <text x="360" y="30" fontSize="18">{theme.side}</text>

      <text x="120" y="592" fontSize="18">{theme.side}</text>
      <text x="180" y="592" fontSize="18">{theme.corners[2]}</text>
      <text x="240" y="592" fontSize="18">{theme.side}</text>
      <text x="300" y="592" fontSize="18">{theme.corners[3]}</text>
      <text x="360" y="592" fontSize="18">{theme.side}</text>

      {/* Lados izquierdo y derecho */}
      <text x="8" y="180" fontSize="18">{theme.side}</text>
      <text x="8" y="240" fontSize="18">{theme.corners[0]}</text>
      <text x="8" y="300" fontSize="18">{theme.side}</text>
      <text x="8" y="360" fontSize="18">{theme.corners[2]}</text>
      <text x="8" y="420" fontSize="18">{theme.side}</text>

      <text x="468" y="180" fontSize="18">{theme.side}</text>
      <text x="468" y="240" fontSize="18">{theme.corners[1]}</text>
      <text x="468" y="300" fontSize="18">{theme.side}</text>
      <text x="468" y="360" fontSize="18">{theme.corners[3]}</text>
      <text x="468" y="420" fontSize="18">{theme.side}</text>
    </svg>
  )
}

function CardDetailModal({ card, onClose, onDelete }) {
  const cardRef = useRef(null)
  const theme = themes[card.decoration] || themes.stars

  const handleExport = async () => {
    if (!cardRef.current) return
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: '#0a1128',
      })
      const link = document.createElement('a')
      link.download = `carta-${card.title.replace(/\s+/g, '-')}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Error al exportar:', err)
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000000cc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0a1128',
          borderRadius: '24px',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: `2px solid ${theme.border}55`,
          boxShadow: `0 0 80px ${theme.glow}44, 0 0 30px ${theme.glow}22`,
        }}
      >
        {/* Carta exportable */}
        <div
          ref={cardRef}
          style={{
            background: card.background || theme.bg,
            borderRadius: '22px 22px 0 0',
            padding: '3rem 2.5rem',
            textAlign: 'center',
            position: 'relative',
            minHeight: '420px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Contorno decorativo */}
          <BorderSVG theme={theme} />

          {/* Imagen */}
          {card.image && (
            <div style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: `3px solid ${theme.border}88`,
              boxShadow: `0 0 25px ${theme.glow}66`,
              marginBottom: '1.5rem',
              zIndex: 1,
              position: 'relative',
            }}>
              <img
                src={card.image}
                alt={card.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}

          {/* Título */}
          <h2 style={{
            fontFamily: 'Times New Roman, serif',
            fontStyle: 'italic',
            fontSize: '1.9rem',
            color: '#ffffff',
            marginBottom: '1.5rem',
            textShadow: `0 0 25px ${theme.border}99`,
            zIndex: 1,
            position: 'relative',
            lineHeight: 1.3,
          }}>
            {card.title}
          </h2>

          {/* Separador decorativo */}
          <div style={{
            width: '60%',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${theme.border}, transparent)`,
            marginBottom: '1.5rem',
            zIndex: 1,
            position: 'relative',
          }} />

          {/* Mensaje */}
          <p style={{
            fontFamily: 'Times New Roman, serif',
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: '#ffffffdd',
            lineHeight: 2,
            maxWidth: '380px',
            zIndex: 1,
            position: 'relative',
          }}>
            {card.message}
          </p>

          {/* Separador decorativo inferior */}
          <div style={{
            width: '60%',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${theme.border}, transparent)`,
            marginTop: '1.5rem',
            zIndex: 1,
            position: 'relative',
          }} />

          {/* Firma */}
          <p style={{
            marginTop: '1.2rem',
            fontSize: '0.9rem',
            color: `${theme.border}bb`,
            fontStyle: 'italic',
            fontFamily: 'Times New Roman, serif',
            zIndex: 1,
            position: 'relative',
          }}>
            Every moment of my life with you 💫
          </p>
        </div>

        {/* Botones */}
        <div style={{
          padding: '1.5rem',
          display: 'flex',
          gap: '0.8rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          background: '#0d1635',
          borderRadius: '0 0 22px 22px',
        }}>
          <button
            onClick={handleExport}
            style={{
              background: 'transparent',
              border: `2px solid ${theme.border}`,
              color: theme.border,
              padding: '0.7rem 1.4rem',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontStyle: 'italic',
              fontFamily: 'Times New Roman, serif',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.target.style.background = theme.border
              e.target.style.color = '#0a1128'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent'
              e.target.style.color = theme.border
            }}
          >
            📥 Guardar imagen
          </button>

          <button
            onClick={() => onDelete(card.id)}
            style={{
              background: 'transparent',
              border: '2px solid #ff4a4a',
              color: '#ff4a4a',
              padding: '0.7rem 1.4rem',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontStyle: 'italic',
              fontFamily: 'Times New Roman, serif',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.target.style.background = '#ff4a4a'
              e.target.style.color = '#ffffff'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent'
              e.target.style.color = '#ff4a4a'
            }}
          >
            🗑️ Eliminar
          </button>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '2px solid #ffffff33',
              color: '#ffffff77',
              padding: '0.7rem 1.4rem',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontStyle: 'italic',
              fontFamily: 'Times New Roman, serif',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.target.style.borderColor = '#ffffff88'
              e.target.style.color = '#ffffff'
            }}
            onMouseLeave={e => {
              e.target.style.borderColor = '#ffffff33'
              e.target.style.color = '#ffffff77'
            }}
          >
            ✕ Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardDetailModal