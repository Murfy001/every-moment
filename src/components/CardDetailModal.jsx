import { useRef } from 'react'
import { toPng } from 'html-to-image'

const decorations = {
  stars: '✨ 🌙 ⭐ 🪐 ✨',
  plants: '🌿 🌸 🌱 🌺 🌿',
  mixed: '🌿 ✨ 🌙 🌸 💫',
}

function CardDetailModal({ card, onClose, onDelete }) {
  const cardRef = useRef(null)

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
      style={{ position: 'fixed', inset: 0, background: '#000000cc', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: '#0a1128', borderRadius: '20px', maxWidth: '550px', width: '100%', maxHeight: '90vh', overflowY: 'auto', border: '1px solid #4a9eff44', boxShadow: '0 0 60px #4a9eff22' }}
      >
        <div
          ref={cardRef}
          style={{ background: card.background || 'linear-gradient(135deg, #1a1a4e, #2d1b69)', borderRadius: '20px 20px 0 0', padding: '2.5rem 2rem', textAlign: 'center' }}
        >
          <p style={{ fontSize: '1.2rem', letterSpacing: '8px', marginBottom: '1.5rem' }}>
            {decorations[card.decoration] || decorations.stars}
          </p>
          {card.image && (
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1.5rem', border: '3px solid #ffffff44' }}>
              <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
          <h2 style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic', fontSize: '1.8rem', color: '#ffffff', marginBottom: '1.5rem', textShadow: '0 0 20px #ffffff55' }}>
            {card.title}
          </h2>
          <p style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic', fontSize: '1.1rem', color: '#ffffffdd', lineHeight: 1.9, maxWidth: '420px', margin: '0 auto' }}>
            {card.message}
          </p>
          <p style={{ fontSize: '1.2rem', letterSpacing: '8px', marginTop: '1.5rem' }}>
            {decorations[card.decoration] || decorations.stars}
          </p>
          <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#ffffff66', fontStyle: 'italic' }}>
            Every moment of my life with you 💫
          </p>
        </div>
        <div style={{ padding: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={handleExport} style={{ background: 'transparent', border: '2px solid #4a9eff', color: '#4a9eff', padding: '0.7rem 1.5rem', borderRadius: '25px', fontSize: '0.95rem', fontStyle: 'italic', fontFamily: 'Times New Roman, serif', cursor: 'pointer' }}>
            📥 Guardar como imagen
          </button>
          <button onClick={() => onDelete(card.id)} style={{ background: 'transparent', border: '2px solid #ff4a4a', color: '#ff4a4a', padding: '0.7rem 1.5rem', borderRadius: '25px', fontSize: '0.95rem', fontStyle: 'italic', fontFamily: 'Times New Roman, serif', cursor: 'pointer' }}>
            🗑️ Eliminar carta
          </button>
          <button onClick={onClose} style={{ background: 'transparent', border: '2px solid #ffffff44', color: '#ffffff88', padding: '0.7rem 1.5rem', borderRadius: '25px', fontSize: '0.95rem', fontStyle: 'italic', fontFamily: 'Times New Roman, serif', cursor: 'pointer' }}>
            ✕ Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardDetailModal