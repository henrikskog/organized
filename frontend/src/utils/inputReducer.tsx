import { Tag } from '../types/types'

export interface AllTagSelects {
  [id: number]: TagSelectProps
}

export interface TagSelectProps {
  id: number
  name: string
  options: Tag[]
  chosen: Tag[]
}

export const LOCALSTORAGEKEY = 'active_categories'

export const initialState: AllTagSelects = {}

// An enum with all the types of actions to use in our reducer
export enum ActionKind {
  SETCHOSEN,
  ADDCHOSEN,
  ADDCATEGORY,
  SETOPTIONS,
  ADDOPTION,
  ADDTAGSELECTS,
  ADDTAGSELECT,
}

interface Payload {
  categoryId: number
  category: string
  newChosen?: Tag[]
  newSingleChosen?: Tag
  newOptions?: Tag[]
  newOption?: Tag
  newTagSelects?: TagSelectProps[]
  newTagSelect?: TagSelectProps
}

// An interface for our actions
export interface Action {
  type: ActionKind
  payload: Payload
}

// Our reducer function that uses a switch statement to handle our actions
export const reducer = (state: AllTagSelects, action: Action) => {
  const { type, payload } = action
  const { category: name, categoryId: id } = payload

  switch (type) {
    case ActionKind.SETCHOSEN:
      if (!payload.newChosen) throw new Error('Payload and Action Kind does not match')
      state[id].chosen = payload.newChosen
      break
    case ActionKind.SETOPTIONS:
      if (!payload.newOptions) throw new Error('Payload and Action Kind does not match')
      state[id].options = payload.newOptions
      break
    case ActionKind.ADDCHOSEN:
      if (!payload.newSingleChosen) throw new Error('Payload and Action Kind does not match')
      state[id].chosen.push(payload.newSingleChosen)
      break
    case ActionKind.ADDOPTION:
      if (!payload.newOption || !state[id]) throw new Error('Payload and Action Kind does not match')
      state[id].options.push(payload.newOption)
      break
    case ActionKind.ADDCATEGORY:
      state[id] = {
        chosen: [],
        name: payload.category,
        options: [],
        id: id,
      }
      break
    case ActionKind.ADDTAGSELECT:
      if (!payload.newTagSelect) throw new Error('Payload and Action Kind does not match')
      state[id] = payload.newTagSelect
      break
    case ActionKind.ADDTAGSELECTS:
      console.log(payload)

      if (!payload.newTagSelects) throw new Error('Payload and Action Kind does not match')
      payload.newTagSelects.forEach((ts) => {
        state[ts.id] = { name: ts.name, chosen: ts.chosen, options: ts.options, id: id }
      })
      break
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }

  localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(state))
  return JSON.parse(JSON.stringify(state)) as AllTagSelects
}
