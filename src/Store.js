import React, { createContext, useState } from 'react'

export const CTX = createContext()

const Store = (props) => {
  const [creatureName, setCreatureName] = useState('')
  const [action, setAction] = useState(null)
  const [proceed, setProceed] = useState(false)

  const sendRoll = (e, cName, cAction) => {
    e.preventDefault()
    setCreatureName(cName)
    setAction(cAction)
    setProceed(true)
  }
  const clearRollState = () => {
    setProceed(false)
  }

  return (
    <CTX.Provider value={{ proceed, creatureName, action, sendRoll, clearRollState }}>{props.children}</CTX.Provider>
  )
}

export default Store
