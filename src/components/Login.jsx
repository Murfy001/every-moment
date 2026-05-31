import { supabase } from '../supabase'
import { useState, useEffect } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [photoUrl, setPhotoUrl] = useState('/every-moment/photo.jpg')

  useEffect(() => {
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
    loadPhoto()
  }, [])

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Email o contraseña incorrectos 💔')
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    background: '#ffffff11',
    border: '1px solid #4a9eff44',
    borderRadius: '12px',
    padding: '0.9rem 1.2rem',
    color: '#ffffff',
    fontFamily: 'Times New Roman, serif',
    fontStyle: 'italic',
    fontSize: '1rem',
    outline: 'none',
    marginTop: '0.4rem',
    colorScheme: 'dark',
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      position: 'relative',
    }}>

      {/* Resplandor de fondo */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #4a9eff08 0%, #a78bfa05 50%, transparent 70%)',
        pointerEvents: 'none',
        animation: 'breathe 4s ease-in-out infinite',
      }} />

      <div style={{
        background: '#0d163599',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        maxWidth: '420px',
        width: '100%',
        border: '1px solid #4a9eff33',
        boxShadow: '0 0 80px #4a9eff11',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Foto */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #4a9eff',
            boxShadow: '0 0 30px #4a9eff66',
            margin: '0 auto',
            animation: 'float 4s ease-in-out infinite',
          }}>
            <img
  src={photoUrl}
  alt="nosotros"
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
          </div>
        </div>

        {/* Título */}
        <h1 style={{
          textAlign: 'center',
          fontFamily: 'Times New Roman, serif',
          fontStyle: 'italic',
          fontSize: '1.6rem',
          background: 'linear-gradient(135deg, #ffffff, #4a9eff, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem',
        }}>
          Every Moment
        </h1>

       <p style={{
  textAlign: 'center',
  color: '#c8d8f088',
  fontStyle: 'italic',
  fontFamily: 'Times New Roman, serif',
  fontSize: '0.9rem',
  marginBottom: '2rem',
}}>
  Yo elegí amarte desde el día que me diste una y mil razones para hacerlo 💗
</p>

        {/* Email */}
        <label style={{
          display: 'block',
          color: '#a78bfa',
          fontStyle: 'italic',
          fontFamily: 'Times New Roman, serif',
          fontSize: '0.95rem',
          marginBottom: '1.2rem',
        }}>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
            style={inputStyle}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
        </label>

        {/* Contraseña */}
        <label style={{
          display: 'block',
          color: '#a78bfa',
          fontStyle: 'italic',
          fontFamily: 'Times New Roman, serif',
          fontSize: '0.95rem',
          marginBottom: '1.5rem',
        }}>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={inputStyle}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
        </label>

        {/* Error */}
        {error && (
          <p style={{
            color: '#ff4a4a',
            textAlign: 'center',
            fontStyle: 'italic',
            fontFamily: 'Times New Roman, serif',
            fontSize: '0.9rem',
            marginBottom: '1rem',
          }}>
            {error}
          </p>
        )}

        {/* Botón */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #4a9eff, #a78bfa)',
            border: 'none',
            color: '#ffffff',
            padding: '1rem',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontStyle: 'italic',
            fontFamily: 'Times New Roman, serif',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'all 0.3s',
            boxShadow: '0 0 20px #4a9eff44',
          }}
        >
          {loading ? 'Entrando...' : 'Entrar 💫'}
        </button>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes breathe {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  )
}

export default Login