// Make an HTTP POST Request
const postStrapi = async (suffix: string, data: any): Promise<FetchResult> => {
  const fetchResult: FetchResult = {} as FetchResult
  let response

  try {
    response = await fetch(`${ROOT}/${suffix}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (e) {
    fetchResult.error = e as Error
  }

  // Awaiting response.json()
  if (response) {
    const data = await response.json()
    fetchResult.data = data
  }

  // Returning result data
  return fetchResult
}

const getStrapi = async (suffix: string): Promise<FetchResult> => {
  const fetchResult: FetchResult = {} as FetchResult
  let response

  try {
    response = await fetch(`${ROOT}/${suffix}`)
  } catch (e) {
    fetchResult.error = e as Error
  }

  // Awaiting response.json()
  if (response) {
    const data = await response.json()
    fetchResult.data = data
  }

  // Returning result data
  return fetchResult
}

export const getItems = async (): Promise<FetchResult> => {
  const response: FetchResult = await getStrapi('items')
  return response
}

export const storeItem = async (item: DBItem): Promise<FetchResult> => {
  const response: FetchResult = await postStrapi(ROOT + '/items', { data: item })
  return response
}

export const getCategories = async (): Promise<FetchResult> => {
  const result = await getStrapi(ROOT + '/categories')
  return result
}

export const storeCategory = async (name: string): Promise<FetchResult> => {
  const result = await postStrapi(ROOT + '/categories', { data: name })
  return result
}

export const getTags = async (catId: number): Promise<FetchResult> => {
  const response = await getStrapi(`${ROOT}/categories/${catId}/tags`)
  return response
}

export const newTag = async (name: string, categoryId: number): Promise<FetchResult> => {
  const response = await postStrapi(ROOT + '/tags', { data: { name, categoryId } })
  return response
}
