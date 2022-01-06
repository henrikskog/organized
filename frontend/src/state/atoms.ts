import { atom } from 'recoil'

const activeFormCategoriesState = atom<number[]>({
  key: 'formState',
  default: [],
})
