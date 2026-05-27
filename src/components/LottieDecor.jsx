import Lottie from 'lottie-react'
import { useState, useEffect } from 'react'

function LottieDecor({ src, style }) {
  const [animData, setAnimData] = useState(null)

  useEffect(() => {
    fetch(src)
      .then(r => r.json())
      .then(setAnimData)
      .catch(() => setAnimData(null))
  }, [src])

  if (!animData) return null

  return (
    <Lottie
      animationData={animData}
      loop={true}
      style={{ pointerEvents: 'none', ...style }}
    />
  )
}

export default LottieDecor