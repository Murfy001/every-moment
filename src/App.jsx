import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { initialCards } from './data/initialCards'
import HeroSection from './components/HeroSection'
import CardGrid from './components/CardGrid'
import CardDetailModal from './components/CardDetailModal'
import AddCardModal from './components/AddCardModal'
import AudioController from './components/AudioController'
import Login from './components/Login'

function App() {
  const [session, setSession] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(true)
  const [cards, setCards] = useState(initialCards)
  const [selectedCard, setSelectedCard] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  // Verificar sesión
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoadingAuth(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Cargar cartas de Supabase
  useEffect(() => {
    if (!session) return
    const fetchCards = async () => {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .order('created_at', { ascending: true })
      if (!error && data.length > 0) setCards(data)
    }
    fetchCards()
  }, [session])

  const handleAddCard = async (newCard) => {
    const card = {
      ...newCard,
      user_email: session.user.email,
    }
    const { data, error } = await supabase.from('cards').insert([card]).select()
    if (!error && data) setCards(prev => [...prev, data[0]])
    setShowAddModal(false)
  }

  const handleDeleteCard = async (id) => {
    await supabase.from('cards').delete().eq('id', id)
    setCards(prev => prev.filter(c => c.id !== id))
    setSelectedCard(null)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  if (loadingAuth) return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Times New Roman, serif',
      fontStyle: 'italic',
      color: '#4a9eff',
      fontSize: '1.2rem',
    }}>
      Cargando tu universo... 💫
    </div>
  )

  if (!session) return <Login />

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <AudioController />

      {/* Botón cerrar sesión */}
      <button
        onClick={handleLogout}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 999,
          background: 'transparent',
          border: '1px solid #ffffff22',
          color: '#ffffff55',
          padding: '0.4rem 1rem',
          borderRadius: '20px',
          fontFamily: 'Times New Roman, serif',
          fontStyle: 'italic',
          fontSize: '0.85rem',
          cursor: 'pointer',
        }}
        onMouseEnter={e => e.target.style.color = '#ffffff'}
        onMouseLeave={e => e.target.style.color = '#ffffff55'}
      >
        Salir
      </button>

      <HeroSection />
      <CardGrid
        cards={cards}
        onSelectCard={setSelectedCard}
        onAddCard={() => setShowAddModal(true)}
      />
      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onDelete={handleDeleteCard}
        />
      )}
      {showAddModal && (
        <AddCardModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddCard}
        />
      )}
    </div>
  )
}

export default App