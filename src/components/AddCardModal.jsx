import { useState } from 'react'

const backgroundOptions = [
  { label: '🌌 Espacial', value: 'linear-gradient(135deg, #1a1a4e, #2d1b69)' },
  { label: '🌿 Jardín', value: 'linear-gradient(135deg, #0d2b1d, #1a4a2e)' },
  { label: '🌅 Atardecer', value: 'linear-gradient(135deg, #4a1a2e, #8b2252)' },
  { label: '🌊 Océano', value: 'linear-gradient(135deg, #0a2a4a, #1a5a8a)' },
  { label: '💜 Lavanda', value: 'linear-gradient(135deg, #2a1a4e, #6a3a8e)' },
]

function AddCardModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    title: '',
    message: '',
    decoration: 'stars',
    background: backgroundOptions[0].value,
    image: null,
  })

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setForm(f => ({ ...f, image: ev.target.result }))
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    if (!form.title.trim() || !form.message.trim()) {
      alert('Por favor escribe un título y un mensaje 💌')
      return
    }
    onSave(form)
  }

  const inputStyle = {
    width: '100%',
    background: '#ffffff11',
    border: '1px solid #4a9eff44',
    borderRadius: '10px',
    padding: '0.8rem 1rem',
    color: '#ffffff',
    fontFamily: 'Times New Roman, serif',
    fontStyle: 'italic',
    fontSize: '1rem',
    outline: 'none',
    marginTop: '0.4rem',
  }

  const labelStyle = {
    display: 'block',
    color: '#a78bfa',
    fontStyle: 'italic',
    fontFamily: 'Times New Roman, serif',
    fontSize: '0.95rem',
    marginBottom: '1.2rem',
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
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0d1635',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid #4a9eff44',
          boxShadow: '0 0 60px #4a9eff22',
        }}
      >
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'Times New Roman, serif',
          fontStyle: 'italic',
          color: '#a78bfa',
          marginBottom: '1.5rem',
          fontSize: '1.5rem',
        }}>
          💌 Nueva Carta
        </h2>

        <label style={labelStyle}>
          Título de la carta
          <input
            type="text"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="Ej: El día más especial..."
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Mensaje
          <textarea
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            placeholder="Escribe tu mensaje desde el corazón..."
            rows={5}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </label>

        <label style={labelStyle}>
          Decoración
          <select
  value={form.decoration}
  onChange={e => setForm(f => ({ ...f, decoration: e.target.value }))}
  style={inputStyle}
>
  <option value="stars">✨ Estrellas</option>
  <option value="flowers">🌸 Flores y Gerberas</option>
  <option value="tulips">🌷 Tulipanes</option>
  <option value="nature">🦋 Naturaleza y Mariposas</option>
  <option value="galaxy">🌌 Galaxia</option>
</select>
        </label>

        <label style={labelStyle}>
          Fondo de la carta
          <select
            value={form.background}
            onChange={e => setForm(f => ({ ...f, background: e.target.value }))}
            style={inputStyle}
          >
            {backgroundOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>

        <label style={labelStyle}>
          Imagen (opcional)
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            style={{ ...inputStyle, padding: '0.5rem' }}
          />
        </label>

        {form.image && (
          <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
            <img
              src={form.image}
              alt="preview"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #4a9eff',
              }}
            />
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={handleSubmit}
            style={{
              background: '#4a9eff',
              border: 'none',
              color: '#0a1128',
              padding: '0.8rem 2rem',
              borderRadius: '25px',
              fontSize: '1rem',
              fontStyle: 'italic',
              fontFamily: 'Times New Roman, serif',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            💌 Guardar carta
          </button>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '2px solid #ffffff44',
              color: '#ffffff88',
              padding: '0.8rem 2rem',
              borderRadius: '25px',
              fontSize: '1rem',
              fontStyle: 'italic',
              fontFamily: 'Times New Roman, serif',
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddCardModal