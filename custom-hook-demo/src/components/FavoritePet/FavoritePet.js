import React from 'react'

function useLocalStorage(key, defaultValue, {
  serialize = JSON.stringify,
  deserialize = JSON.parse,
} = {}) {
  const [state, setState] = React.useState(
    () => {
      const localStorageVal = window.localStorage.getItem(key)
      if (localStorageVal) {
        return deserialize(localStorageVal)
      }
      return defaultValue
    }
  )

  const prevKeyRef = React.useRef(key)
  
  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [state, key, serialize])

  return [state, setState]
}

export default function FavoritePet({initialName = ''}) {
  const [name, setName] = useLocalStorage('nameKey', initialName)

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Favorite Pet: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? `Your favorite pet is ${name}` : 'Please give an input'}
    </div>
  )
}
