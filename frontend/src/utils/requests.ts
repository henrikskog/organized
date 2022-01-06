import { Tag, TagCategory } from '../types/types'

export interface DBItem {
  name: string
  org_number: number
  tags: number[]
}

const ROOT = process.env.api_root as string

// Make an HTTP POST Request
const post = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  // Awaiting response.json()
  const resData = await response.json()

  // Returning result data
  return resData
}

export const storeItem = async (item: DBItem) => {
  const res = await post(ROOT + '/note', item)
  return res
}

export const getCategories = async () => {
  const res = await fetch(ROOT + '/categories')
  const data = await res.json()

  return data
}

export const newCategory = async (name: string): Promise<number> => {
  let insertId = 0
  await post(ROOT + '/category', { name: name })
    .then((res) => (insertId = res.insertId))
    .catch((e) => console.log(e))
  return insertId
}

export const getTags = async (catId: number) => {
  const res = await fetch(ROOT + '/tags/' + catId)
  const data = await res.json()
  return data
}

export const newTag = async (name: string, categoryId: number): Promise<number> => {
  let insertId = 0
  await post(ROOT + '/tag', { name, categoryId })
    .then((res) => (insertId = res.insertId))
    .catch((e) => console.log(e))
  return insertId
}
