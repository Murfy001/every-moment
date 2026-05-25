import { useState, useEffect } from 'react'
import { initialCards } from './data/initialCards'
import HeroSection from './components/HeroSection'
import CardGrid from './components/CardGrid'
import CardDetailModal from './components/CardDetailModal'
import AddCardModal from './components/AddCardModal'
import AudioController from './components/AudioController'

function App() {
  const [cards, setCards] = useState(() => {
  const saved = localStorage.getItem('every-moment-cards')
  return saved ? JSON.parse(saved) : initialCards
})
  const [selectedCard, setSelectedCard] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    localStorage.setItem('every-moment-cards', JSON.stringify(cards))
  }, [cards])

  const handleAddCard = (newCard) => {
    const card = { ...newCard, id: Date.now() }
    setCards(prev => [...prev, card])
    setShowAddModal(false)
  }

  const handleDeleteCard = (id) => {
    setCards(prev => prev.filter(c => c.id !== id))
    setSelectedCard(null)
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <AudioController />
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