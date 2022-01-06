interface Option {
  label: string
  value: string
}

interface Item {
  id: number
  name: string
  org_number?: number
}

interface Tag {
  id: number
  name: string
  category_id: number
}

interface TagCategory {
  id: number
  name: string
}

export type { Option, TagCategory, Item, Tag }
