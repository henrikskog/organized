import React, { ReactElement, useEffect, useState } from 'react'
import { Item } from '../types/types'
import List from '../components/List'
import Navbar from '../components/Navbar'
import { fetchItems, wasSuccess } from '../utils/strapiRequests'

interface Props {
  items: Item[]
  error?: string
}

export function Read(): ReactElement {
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState<string>()
  useEffect(() => {
    const fetchData = async () => {
      const { data, error: e } = await fetchItems()
      if (wasSuccess(data, e)) setItems(data)
      else {
        setError(e)
      }
    }
    fetchData()
  }, [])
  return (
    <div>
      {!error ? (
        <>
          <Navbar />
          <List items={items} />
        </>
      ) : (
        <div>ERROR: {error}</div>
      )}
      {/* TODO: error component / something should render even on error */}
    </div>
  )
}

/* SERVERSIDEPROPS has conflict with local host, see commit: abf6d348891bb0c47ac2bedecfcdd3219f0e3963 for conflicting implementation */

export default Read
