import { useState, useEffect } from 'react'

export function getStorageValue(key: any, defaultValue: any) {
  // getting stored value
  const saved = localStorage.getItem(key)

  const returnVal = saved ? JSON.parse(saved) : defaultValue

  return returnVal
}

export const useLocalStorage = (key: any, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue)
  })

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
