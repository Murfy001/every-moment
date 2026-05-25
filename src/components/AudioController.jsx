import { useState, useEffect, useRef } from 'react'

function AudioController() {
  const audioRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const audio = new Audio('/audio/mitsuha.mp3')
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const handleStart = () => {
    audioRef.current.play().catch(err => console.log('Autoplay bloqueado:', err))
    setStarted(true)
  }

  const toggleMute = () => {
    audioRef.current.muted = !audioRef.current.muted
    setMuted(prev => !prev)
  }

  return (
    <>
      {!started && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0a1128ee',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={handleStart}
        >
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            fontStyle: 'italic',
            fontFamily: 'Times New Roman, serif',
            color: '#c8d8f0',
            marginBottom: '2.5rem',
            textAlign: 'center',
            padding: '0 2rem',
          }}>
            Un universo te espera...
          </p>

          <span style={{
            fontSize: '5rem',
            animation: 'pulse 2s infinite',
            filter: 'drop-shadow(0 0 20px #4a9eff)',
            lineHeight: 1,
            cursor: 'pointer',
          }}>
            ⭐
          </span>

          <p style={{
            marginTop: '1.5rem',
            color: '#4a9eff',
            fontStyle: 'italic',
            fontFamily: 'Times New Roman, serif',
            fontSize: '1rem',
            opacity: 0.8,
          }}>
            Toca la estrella para comenzar
          </p>

          <style>{`
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.15); opacity: 0.7; }
            }
          `}</style>
        </div>
      )}

      {started && (
        <button
          onClick={toggleMute}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 999,
            background: '#0d1635',
            border: '2px solid #4a9eff55',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '1.4rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px #4a9eff33',
          }}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      )}
    </>
  )
}

export default AudioController