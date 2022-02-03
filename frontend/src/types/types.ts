interface Option {
  label: string
  value: string
}

interface Item {
  id: number
  name: string
}

interface Tag {
  id: number
  name: string
  category_id: number
}

interface Category {
  id: number
  name: string
}

export type { Option, Category, Item, Tag }
