import {
  CategoriesResponse,
  CategoryResponse,
  ItemResponse,
  ItemsResponse,
  StrapiResponse,
  TagResponse,
  TagsResponse,
} from '../types/strapiTypes'
import { Item, Category, Tag } from '../types/types'
import qs from 'qs'
import { get, post } from './requests'
import { getErrorMessage } from '../backend/prisma/utils/getErrorMessage'

// helper function to tell typescript if data should be defined or not
export const wasSuccess = <T>(data: T, error: string): data is T => {
  return !error
}

/* ITEM TABLE */
export const fetchItems = async (): Promise<StrapiResponse<Item[]>> => {
  let returnValues = {} as StrapiResponse<Item[]>

  try {
    const fetchedItems = await get<ItemsResponse>('/api/items')
    if (fetchedItems.error) return { error: fetchedItems.error.message, data: null }

    const items: Item[] = fetchedItems.data.map((item) => ({
      name: item.attributes.name,
      id: fetchedItems.data[0].id,
    }))
    returnValues.data = items
  } catch (error) {
    returnValues.error = getErrorMessage(error)
  }

  return { data: returnValues.data, error: returnValues.error }
}

export const createItem = async (name: string): Promise<StrapiResponse<Item>> => {
  let returnValue = {} as StrapiResponse<Item>

  try {
    const response = await post<string, ItemResponse>(
      '/api/items',
      JSON.stringify({
        data: {
          name: name,
        },
      })
    )

    if (response.error) return { error: response.error.message, data: null }

    const item: Item = {
      name: response.data.attributes.name,
      id: response.data.id,
    }
    returnValue.data = item
  } catch (error) {
    returnValue.error = getErrorMessage(error)
  }

  return { error: returnValue.error, data: returnValue.data }
}

/* CATEGORY TABLE */
export const fetchCategories = async (): Promise<StrapiResponse<Category[]>> => {
  let returnValues = {} as StrapiResponse<Category[]>

  try {
    const fetchedCategories = await get<CategoriesResponse>('/api/categories')
    if (fetchedCategories.error) return { error: fetchedCategories.error.message, data: [] }

    const Categories: Category[] = fetchedCategories.data.map((cat) => ({
      name: cat.attributes.name,
      id: fetchedCategories.data[0].id,
    }))
    returnValues.data = Categories
  } catch (error) {
    returnValues.error = getErrorMessage(error)
  }

  return { data: returnValues.data, error: returnValues.error }
}

export const createCategory = async (name: string): Promise<StrapiResponse<Category>> => {
  let returnValue = {} as StrapiResponse<Category>

  try {
    const response = await post<string, CategoryResponse>(
      '/api/categories',
      JSON.stringify({
        data: {
          name: name,
        },
      })
    )

    if (response.error) return { error: response.error.message, data: null }

    const category: Category = {
      name: response.data.attributes.name,
      id: response.data.id,
    }
    returnValue.data = category
  } catch (error) {
    returnValue.error = getErrorMessage(error)
  }

  return { error: returnValue.error, data: returnValue.data }
}

/* TAG TABLE */

/* fetchTags TODO AS NO CURRENT NEED: */

export const fetchTagsWithCategory = async (categoryId: number): Promise<StrapiResponse<Tag[]>> => {
  const query = qs.stringify(
    {
      filters: {
        category: {
          id: {
            $eq: categoryId,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  let returnValues = {} as StrapiResponse<Tag[]>

  try {
    const fetchedTags = await get<TagsResponse>(`/api/tags?${query}`)
    if (fetchedTags.error) return { error: fetchedTags.error.message, data: null }

    const tags: Tag[] = fetchedTags.data.map((tag) => ({
      id: tag.id,
      name: tag.attributes.name,
      category_id: fetchedTags.data[0].id,
    }))

    returnValues.data = tags
  } catch (error) {
    returnValues.error = getErrorMessage(error)
  }

  return { data: returnValues.data, error: returnValues.error }
}

export const createTag = async (name: string, categoryID: string): Promise<StrapiResponse<Category>> => {
  let returnValue = {} as StrapiResponse<Category>

  try {
    const response = await post<string, TagResponse>(
      '/api/tags',
      JSON.stringify({
        data: {
          name: name,
          category: categoryID,
        },
      })
    )

    if (response.error) return { error: response.error.message, data: null }

    const tag: Tag = {
      name: response.data.attributes.name,
      id: response.data.id,
      category_id: response.data.attributes.category.data.id,
    }

    returnValue.data = tag
  } catch (error) {
    returnValue.error = getErrorMessage(error)
  }

  return { error: returnValue.error, data: returnValue.data }
}
