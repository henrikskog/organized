import { Tag } from '../types/types'

export interface TagSelectDataProps {
  id: number
  name: string
  options: Tag[]
  chosen: Tag[]
}

export const LOCALSTORAGEKEY = 'active_categories'

export const initialState: TagSelectDataProps[] = []

// An enum with all the types of actions to use in our reducer
export enum ActionKind {
  SETCHOSEN = 'SETCHOSEN',
  ADDCHOSEN = 'ADDCHOSEN',
  ADDCATEGORY = 'ADDCATEGORY',
  SETOPTIONS = 'SETOPTIONS',
  ADDOPTION = 'ADDOPTION',
  ADDTAGSELECTS = 'ADDTAGSELECTS',
  ADDTAGSELECT = 'ADDTAGSELECT',
}

interface Payload {
  categoryId?: number
  category?: string
  newChosen?: Tag[]
  newSingleChosen?: Tag
  newOptions?: Tag[]
  newOption?: Tag
  newTagSelects?: TagSelectDataProps[]
  newTagSelect?: TagSelectDataProps
}

// An interface for our actions
export interface Action {
  type: ActionKind
  payload: Payload
}

// Our reducer function that uses a switch statement to handle our actions
export const reducer = (state: TagSelectDataProps[], action: Action) => {
  const { type, payload } = action
  const { category: name } = payload

  switch (type) {
    case ActionKind.SETCHOSEN:
      state.forEach((cat) => {
        if (cat.name == name && payload.newChosen) cat.chosen = payload.newChosen
      })
      break
    case ActionKind.SETOPTIONS:
      state.forEach((cat) => {
        if (cat.name == name && payload.newOptions) cat.options = payload.newOptions
      })
      break
    case ActionKind.ADDCHOSEN:
      state.forEach((cat) => {
        if (cat.name == name && payload.newSingleChosen) cat.chosen.push(payload.newSingleChosen)
      })
      break
    case ActionKind.ADDOPTION:
      state.forEach((cat) => {
        if (cat.name == name && payload.newOption) cat.options.push(payload.newOption)
      })
      break
    case ActionKind.ADDCATEGORY:
      if (!payload.categoryId || !payload.category) return state
      state.push({
        id: payload.categoryId,
        chosen: [],
        name: payload.category,
        options: [],
      })
      break
    case ActionKind.ADDTAGSELECT:
      if (!payload.newTagSelect) return state
      state.push(payload.newTagSelect)
      break
    case ActionKind.ADDTAGSELECTS:
      if (!payload.newTagSelects) return state
      state = [...state, ...payload.newTagSelects]
      break
    default:
      return state
  }

  localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(state))
  return state
}
