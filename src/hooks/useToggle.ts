import { useState } from 'react'

export const useToggleHeight = (initialState: any[]) => {
  const [toggleState, setToggleState] = useState(initialState[0])
  const [heightState, setHeightState] = useState(0)
  // let heightStateMemo = useMemo(() => (!toggleState ? 0 : initialState[1].current.clientHeight), [toggleState, initialState])
  const toggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setToggleState(!toggleState)
    setHeightState(initialState[1].current.clientHeight)
    // setHeightState(heightStateMemo)
  }
  return [toggleState, heightState, toggle]
}

export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState)
  const toggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setState(!state)
  }
  return [state, toggle]
}

// export { useToggle, useToggleHeight };
