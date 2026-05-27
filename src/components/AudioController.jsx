import { useState, useEffect, useRef } from 'react'

const playlist = [
  { title: 'Theme of Mitsuha', file: '/every-moment/audio/mitsuha.mp3' },
  { title: 'Merry-Go-Round of Life from Howls Moving Castle', file: '/every-moment/audio/Merry-Go-Round of Life from Howls Moving Castle.mp3' },
  { title: 'Rikai to aijo to yasashi manazashi', file: '/every-moment/audio/Rikai to aijo to yasashi manazashi.mp3' },
  { title: 'inv(l.i) A Silent Voice soundtrack', file: '/every-moment/audio/inv(l.i) A Silent Voice soundtrack.mp3' },
  { title: 'roh A Silent Voice soundtrack', file: '/every-moment/audio/roh A Silent Voice soundtrack.mp3' },
  { title: 'lvs A Silent Voice soundtrack', file: '/every-moment/audio/lvs A Silent Voice soundtrack.mp3' },
  { title: 'rev A Silent Voice soundtrack', file: '/every-moment/audio/rev A Silent Voice soundtrack.mp3' },
  { title: 'lvs(var)  A Silent Voice soundtrack', file: '/every-moment/audio/lvs(var)  A Silent Voice soundtrack.mp3' },
  { title: 'lit A Silent Voice soundtrack', file: '/every-moment/audio/lit A Silent Voice soundtrack.mp3' },
]

function AudioController() {
  const audioRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio(playlist[0].file)
    audio.loop = false
    audio.volume = 0.4
    audioRef.current = audio

    audio.addEventListener('ended', () => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % playlist.length
        audio.src = playlist[next].file
        audio.play()
        return next
      })
    })

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const handleStart = () => {
    audioRef.current.play()
      .then(() => {
        setStarted(true)
        setIsPlaying(true)
      })
      .catch(() => setStarted(true))
  }

  const toggleMute = () => {
    audioRef.current.muted = !audioRef.current.muted
    setMuted(prev => !prev)
  }

  const nextSong = () => {
    const next = (currentIndex + 1) % playlist.length
    audioRef.current.src = playlist[next].file
    audioRef.current.play()
    setCurrentIndex(next)
  }

  const prevSong = () => {
    const prev = (currentIndex - 1 + playlist.length) % playlist.length
    audioRef.current.src = playlist[prev].file
    audioRef.current.play()
    setCurrentIndex(prev)
  }

  return (
    <>
      {/* Overlay de inicio */}
      {!started && (
        <div
          onClick={handleStart}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0a1128f0',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
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

          <div style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #4a9eff',
            boxShadow: '0 0 30px #4a9eff88',
            animation: 'pulse 2s infinite',
            cursor: 'pointer',
          }}>
            <img
              src="/every-moment/photo.jpg"
              alt="nosotros"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <p style={{
            marginTop: '1.5rem',
            color: '#4a9eff',
            fontStyle: 'italic',
            fontFamily: 'Times New Roman, serif',
            fontSize: '1rem',
          }}>
            Toca para comenzar
          </p>

          <style>{`
            @keyframes pulse {
              0%, 100% { transform: scale(1); box-shadow: 0 0 30px #4a9eff88; }
              50% { transform: scale(1.05); box-shadow: 0 0 50px #4a9effbb; }
            }
          `}</style>
        </div>
      )}

      {/* Reproductor flotante */}
      {started && (
        <div style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 999,
          background: '#0d163599',
          backdropFilter: 'blur(10px)',
          border: '1px solid #4a9eff44',
          borderRadius: '50px',
          padding: '0.5rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 0 20px #4a9eff22',
        }}>
          {/* Botón anterior */}
          <button
            onClick={prevSong}
            style={{
              background: 'none',
              border: 'none',
              color: '#4a9eff',
              fontSize: '1rem',
              cursor: 'pointer',
              padding: '0.3rem',
            }}
          >
            ⏮
          </button>

          {/* Nombre de la canción */}
          <span style={{
            fontFamily: 'Times New Roman, serif',
            fontStyle: 'italic',
            fontSize: '0.8rem',
            color: '#c8d8f0',
            maxWidth: '120px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {playlist[currentIndex].title}
          </span>

          {/* Botón siguiente */}
          <button
            onClick={nextSong}
            style={{
              background: 'none',
              border: 'none',
              color: '#4a9eff',
              fontSize: '1rem',
              cursor: 'pointer',
              padding: '0.3rem',
            }}
          >
            ⏭
          </button>

          {/* Botón mute */}
          <button
            onClick={toggleMute}
            style={{
              background: 'none',
              border: 'none',
              color: '#4a9eff',
              fontSize: '1.1rem',
              cursor: 'pointer',
              padding: '0.3rem',
            }}
          >
            {muted ? '🔇' : '🔊'}
          </button>
        </div>
      )}
    </>
  )
}

export default AudioController