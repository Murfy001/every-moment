function HeroSection() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      position: 'relative',
    }}>

      {/* Foto principal */}
      <div style={{
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid #4a9eff',
        boxShadow: '0 0 30px #4a9eff88, 0 0 60px #4a9eff33',
        marginBottom: '2rem',
      }}>
        <img
          src="/photo.jpg"
          alt="Dayanee"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:4rem">💫</div>'
          }}
        />
      </div>

      {/* Decoración superior */}
      <p style={{ fontSize: '1.5rem', marginBottom: '1rem', letterSpacing: '8px' }}>
        ✨ 🌙 ✨
      </p>

      {/* Título principal */}
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontStyle: 'italic',
        fontFamily: 'Times New Roman, serif',
        background: 'linear-gradient(135deg, #ffffff, #4a9eff, #a78bfa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '1.5rem',
        lineHeight: 1.3,
      }}>
        Every Moment of My Life With You
      </h1>

      {/* Mensaje */}
      <p style={{
        fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
        fontStyle: 'italic',
        fontFamily: 'Times New Roman, serif',
        color: '#c8d8f0',
        maxWidth: '600px',
        lineHeight: 1.8,
        marginBottom: '2rem',
      }}>
        Este espacio es tuyo, un pequeño universo construido con cada pensamiento,
        cada recuerdo y cada momento que has hecho brillar mi vida. 🌟
      </p>

      {/* Decoración inferior */}
      <p style={{ fontSize: '1.2rem', letterSpacing: '6px', color: '#a78bfa' }}>
        🌿 💜 🌿
      </p>

      {/* Flecha hacia abajo */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        fontSize: '1.5rem',
        animation: 'bounce 2s infinite',
        color: '#4a9eff',
      }}>
        ↓
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
      `}</style>
    </section>
  )
}

export default HeroSection