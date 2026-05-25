const decorations = {
  stars: '✨ 🌙 ⭐ 🪐 ✨',
  plants: '🌿 🌸 🌱 🌺 🌿',
  mixed: '🌿 ✨ 🌙 🌸 💫',
}

function CardPreview({ card, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: card.background || 'linear-gradient(135deg, #1a1a4e, #2d1b69)',
        borderRadius: '16px',
        padding: '1.5rem',
        cursor: 'pointer',
        border: '1px solid #ffffff22',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = '0 0 30px #4a9eff55'
        e.currentTarget.style.border = '1px solid #4a9eff88'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.border = '1px solid #ffffff22'
      }}
    >
      <p style={{ fontSize: '0.85rem', letterSpacing: '4px', marginBottom: '1rem', opacity: 0.8, textAlign: 'center' }}>
        {decorations[card.decoration] || decorations.stars}
      </p>
      {card.image && (
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1rem', border: '2px solid #ffffff44' }}>
          <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      <h3 style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic', fontSize: '1.1rem', color: '#ffffff', textAlign: 'center', marginBottom: '0.8rem' }}>
        {card.title}
      </h3>
      <p style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic', fontSize: '0.85rem', color: '#ffffffbb', textAlign: 'center', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {card.message}
      </p>
      <p style={{ fontSize: '0.85rem', letterSpacing: '4px', marginTop: '1rem', opacity: 0.8, textAlign: 'center' }}>
        {decorations[card.decoration] || decorations.stars}
      </p>
    </div>
  )
}

export default CardPreview