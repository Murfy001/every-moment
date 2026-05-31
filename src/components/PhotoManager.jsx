import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

function PhotoManager({ onClose, onPhotoUpdated }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [currentPhoto, setCurrentPhoto] = useState(null)

  useEffect(() => {
    loadCurrentPhoto()
  }, [])

  const loadCurrentPhoto = async () => {
    const { data } = await supabase
      .from('config')
      .select('value')
      .eq('key', 'photo_url')
      .single()
    if (data) {
      const { data: urlData } = supabase.storage
        .from('photos')
        .getPublicUrl(data.value)
      setCurrentPhoto(urlData.publicUrl)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

 const handleUpload = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  setUploading(true)

  // Eliminar foto anterior primero
  await supabase.storage.from('photos').remove(['photo.jpg'])

  // Subir nueva foto
  const { error } = await supabase.storage
  .from('photos')
  .upload('photo.jpg', file, {
    upsert: true,
    contentType: file.type,
  })

console.log('Error de subida:', error)
console.log('Subida exitosa')

  if (error) {
    console.error('Error subiendo:', error)
    setUploading(false)
    return
  }

  // Actualizar config
  await supabase
    .from('config')
    .upsert({ key: 'photo_url', value: 'photo.jpg' })

  // Obtener URL pública con timestamp para evitar caché
  const { data: urlData } = supabase.storage
    .from('photos')
    .getPublicUrl('photo.jpg')

  const newUrl = urlData.publicUrl + '?t=' + Date.now()
  onPhotoUpdated(newUrl)
  setUploading(false)
  onClose()
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
        zIndex: 2000,
        padding: '1rem',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0d1635',
          borderRadius: '24px',
          padding: '2.5rem',
          maxWidth: '400px',
          width: '100%',
          border: '1px solid #4a9eff44',
          boxShadow: '0 0 60px #4a9eff22',
          textAlign: 'center',
        }}
      >
        <h2 style={{
          fontFamily: 'Times New Roman, serif',
          fontStyle: 'italic',
          color: '#a78bfa',
          fontSize: '1.4rem',
          marginBottom: '1.5rem',
        }}>
          📸 Cambiar nuestra foto
        </h2>

        {/* Foto actual */}
        <div style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid #4a9eff',
          boxShadow: '0 0 30px #4a9eff66',
          margin: '0 auto 1.5rem',
        }}>
          <img
            src={preview || currentPhoto}
            alt="foto actual"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <p style={{
          color: '#c8d8f088',
          fontStyle: 'italic',
          fontFamily: 'Times New Roman, serif',
          fontSize: '0.9rem',
          marginBottom: '1.5rem',
        }}>
          Esta foto aparecerá para los dos 💗
        </p>

        {/* Input de archivo */}
        <label style={{
          display: 'block',
          background: 'linear-gradient(135deg, #4a9eff, #a78bfa)',
          color: '#ffffff',
          padding: '0.9rem 2rem',
          borderRadius: '25px',
          cursor: uploading ? 'not-allowed' : 'pointer',
          fontFamily: 'Times New Roman, serif',
          fontStyle: 'italic',
          fontSize: '1rem',
          marginBottom: '1rem',
          opacity: uploading ? 0.7 : 1,
          boxShadow: '0 0 20px #4a9eff44',
        }}>
          {uploading ? 'Subiendo... ⏳' : '🖼️ Elegir nueva foto'}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            style={{ display: 'none' }}
            disabled={uploading}
          />
        </label>

        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: '1px solid #ffffff33',
            color: '#ffffff66',
            padding: '0.7rem 2rem',
            borderRadius: '25px',
            fontFamily: 'Times New Roman, serif',
            fontStyle: 'italic',
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default PhotoManager