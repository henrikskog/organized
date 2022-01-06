import { useEffect, useState } from 'react'

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T>({} as T)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    console.log(url)

    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        setError(err)
        console.log(err)
      })
      .then((_) => setLoading(false))
  }, [url])

  return { data, loading, error, setData }
}
