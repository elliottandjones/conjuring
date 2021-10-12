import { useEffect, useState } from 'react'

export const useLocalStorage = (key, initialValue) => {
  // pass initial state function to useState so logic is only executed once
  const [value, setStoredValue] = useState(() => {
    try {
      let item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })
  // return a wrapped version of useState's setter fuction that
  // persists the new value to localStorage
  const setValue = storedValue => {
    try {
      // allow storedValue to be a function so we have same API as useState
      const valueToStore = storedValue instanceof Function ? storedValue(value) : storedValue
      // save that state, baby
      setStoredValue(valueToStore)
    } catch (error) {
      // TODO: actually handle this error
      console.error(error)
    }
  }

  useEffect(() => {
    // save to local storage when value changes
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
