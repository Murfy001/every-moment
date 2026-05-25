import CardPreview from './CardPreview'

function CardGrid({ cards, onSelectCard, onAddCard }) {
  return (
    <section style={{
      padding: '4rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 1,
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
        fontStyle: 'italic',
        fontFamily: 'Times New Roman, serif',
        color: '#a78bfa',
        marginBottom: '1rem',
        textShadow: '0 0 20px #a78bfa55',
      }}>
        ✨ Tus Cartas Estelares ✨
      </h2>
      <p style={{
        textAlign: 'center',
        color: '#c8d8f088',
        marginBottom: '3rem',
        fontStyle: 'italic',
      }}>
        Cada carta guarda un pedacito de mi corazón
      </p>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <button
          onClick={onAddCard}
          style={{
            background: 'transparent',
            border: '2px solid #4a9eff',
            color: '#4a9eff',
            padding: '0.8rem 2rem',
            borderRadius: '30px',
            fontSize: '1rem',
            fontStyle: 'italic',
            fontFamily: 'Times New Roman, serif',
            cursor: 'pointer',
            boxShadow: '0 0 15px #4a9eff44',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.target.style.background = '#4a9eff'
            e.target.style.color = '#0a1128'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'transparent'
            e.target.style.color = '#4a9eff'
          }}
        >
          + Añadir nueva carta
        </button>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '2rem',
      }}>
        {cards.map(card => (
          <CardPreview
            key={card.id}
            card={card}
            onClick={() => onSelectCard(card)}
          />
        ))}
      </div>
      {cards.length === 0 && (
        <p style={{
          textAlign: 'center',
          color: '#c8d8f055',
          fontStyle: 'italic',
          marginTop: '2rem',
        }}>
          Aún no hay cartas... ¡Añade la primera! 💌
        </p>
      )}
    </section>
  )
}

export default CardGrid