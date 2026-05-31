import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase'
import PhotoManager from './PhotoManager'

function HeroSection() {
  const canvasRef = useRef(null)
  const [photoUrl, setPhotoUrl] = useState('/every-moment/photo.jpg')
  const [showPhotoManager, setShowPhotoManager] = useState(false)

  useEffect(() => {
    loadPhoto()
  }, [])

  const loadPhoto = async () => {
    const { data } = await supabase
      .from('config')
      .select('value')
      .eq('key', 'photo_url')
      .single()
    if (data) {
      const { data: urlData } = supabase.storage
        .from('photos')
        .getPublicUrl(data.value)
      setPhotoUrl(urlData.publicUrl + '?t=' + Date.now())
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random(),
      opacitySpeed: Math.random() * 0.01 + 0.003,
    }))

    let animId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        p.opacity += p.opacitySpeed
        if (p.opacity > 1 || p.opacity < 0) p.opacitySpeed *= -1
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.8})`
        ctx.fill()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
      overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, #4a9eff08 0%, #a78bfa05 50%, transparent 70%)', pointerEvents: 'none', zIndex: 0, animation: 'breathe 4s ease-in-out infinite' }} />

      {/* Foto con botón de cambio */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: '2rem' }}>
        <div style={{ position: 'absolute', inset: '-12px', borderRadius: '50%', border: '2px solid #a78bfa44', animation: 'spin 8s linear infinite' }} />
        <div style={{ position: 'absolute', inset: '-6px', borderRadius: '50%', border: '1px solid #4a9eff33', animation: 'spin 5s linear infinite reverse' }} />

        <div
          onClick={() => setShowPhotoManager(true)}
          title="Cambiar foto"
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #4a9eff',
            boxShadow: '0 0 40px #4a9eff66, 0 0 80px #4a9eff22',
            animation: 'float 4s ease-in-out infinite',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <img src={photoUrl} alt="nosotros" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* Overlay al hover */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: '#00000066',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.3s',
            fontSize: '1.5rem',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0}
          >
            📸
          </div>
        </div>
      </div>

      <p style={{ fontSize: '1.3rem', letterSpacing: '10px', marginBottom: '1rem', zIndex: 1, position: 'relative', animation: 'float 3s ease-in-out infinite' }}>
        ✨ 🌙 ✨
      </p>

      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontStyle: 'italic',
        fontFamily: 'Times New Roman, serif',
        background: 'linear-gradient(135deg, #ffffff, #4a9eff, #a78bfa, #f9a8d4)',
        backgroundSize: '300% 300%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '1.5rem',
        lineHeight: 1.3,
        zIndex: 1,
        position: 'relative',
        animation: 'gradientShift 5s ease infinite',
      }}>
        Every Moment of My Life With You
      </h1>

      <p style={{
        fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
        fontStyle: 'italic',
        fontFamily: 'Times New Roman, serif',
        color: '#c8d8f0',
        maxWidth: '580px',
        lineHeight: 1.9,
        marginBottom: '2rem',
        zIndex: 1,
        position: 'relative',
        opacity: 0.9,
      }}>
        Este espacio es tuyo, un pequeño universo construido con cada
        pensamiento, cada recuerdo y cada momento que has hecho brillar mi vida. 🌟
      </p>

      <p style={{ fontSize: '1.2rem', letterSpacing: '8px', color: '#a78bfa', zIndex: 1, position: 'relative', animation: 'float 3.5s ease-in-out infinite reverse' }}>
        🌿 💜 🌿
      </p>

      <div style={{ position: 'absolute', bottom: '2rem', fontSize: '1.5rem', color: '#4a9eff', zIndex: 1, animation: 'bounce 2s infinite' }}>↓</div>

      {showPhotoManager && (
        <PhotoManager
          onClose={() => setShowPhotoManager(false)}
          onPhotoUpdated={(url) => setPhotoUrl(url)}
        />
      )}

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes breathe { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.1); opacity: 1; } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
      `}</style>
    </section>
  )
}

export default HeroSection