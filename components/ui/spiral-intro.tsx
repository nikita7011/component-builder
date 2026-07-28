import { SpiralDemo } from "../spiral-demo"
import { useState } from "react"

export function SpiralIntro({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <SpiralDemo 
      onEnter={() => {
        setVisible(false)
        onComplete()
      }} 
    />
  )
}