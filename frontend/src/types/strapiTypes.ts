export interface StrapiResponse<T> {
  data: T | null
  // only returning error message from fetching functions, so error is only a string
  error: string | null
}

interface DataAttributes {
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface ErrorAttributes {
  status: string // HTTP status
  name: string // Strapi error name ('ApplicationError' or 'ValidationError')
  message: string // A human reable error message
  details: any
}

interface DataResponse<T> {
  id: number
  attributes: DataAttributes & T
}

export interface ItemResponse {
  data: DataResponse<{ name: string }>
  error?: ErrorAttributes
}

export interface ItemsResponse {
  data: DataResponse<{ name: string }>[]
  error?: ErrorAttributes
}

export interface CategoryResponse {
  data: DataResponse<{ name: string }>
  error?: ErrorAttributes
}

export interface CategoriesResponse {
  data: DataResponse<{ name: string }>[]
  error?: ErrorAttributes
}

export interface TagResponse {
  data: DataResponse<{ name: string; category: CategoryResponse }>
  error?: ErrorAttributes
}

export interface TagsResponse {
  data: DataResponse<{ name: string; category: CategoriesResponse }>[]
  error?: ErrorAttributes
}
