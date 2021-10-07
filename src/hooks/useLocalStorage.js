import { useState } from 'react'

export const useLocalStorage = (key, initialValue) => {
  // pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      let item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })
  // return a wrapped version of useState's setter fuction that
  // persists the new value to localStorage
  const setValue = value => {
    try {
      // allow value be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // save that state, baby
      setStoredValue(valueToStore)
      // save to loval storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // TODO: actually handle this error
      console.log(error)
    }
  }

  return [storedValue, setValue]
}
