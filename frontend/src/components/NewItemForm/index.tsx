import { useEffect, useReducer, useRef, useState } from 'react'
import { getErrorMessage } from '../../backend/prisma/utils/getErrorMessage'
import {
  ActionKind,
  initialState,
  LOCALSTORAGEKEY,
  TagSelectProps,
  reducer,
  AllTagSelects,
} from '../../utils/inputReducer'
import { DBItem, storeItem } from '../../utils/strapiRequests'
import { getStorageValue } from '../../utils/useLocalStorage'
import CategorySelect from './CategorySelect'
import TagSelect from './TagSelect'

const BTN =
  'mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none'
const INP =
  'leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200'

const NewItemForm = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const numberRef = useRef<HTMLInputElement>(null)
  const [state, dispatch] = useReducer(reducer, initialState)

  const onSubmit = async () => {
    // Add a new document with a generated id.
    if (!nameRef.current || !numberRef.current) {
      return
    }

    const name = nameRef.current.value
    const number = numberRef.current.value

    nameRef.current.value = ''
    numberRef.current.value = ''

    const tags: number[] = []

    Object.values(state).forEach((inp: TagSelectProps) => {
      inp.chosen.forEach((tag) => tags.push(tag.id))
    })

    const storedObject: DBItem = {
      name: name,
      tags: tags,
    }

    console.log('object: ', storedObject)

    const { data, error } = await storeItem(storedObject)
    console.log(data)
    console.log(error)
  }

  useEffect(() => {
    if (typeof window != 'undefined') {
      const localStorageItems: AllTagSelects = getStorageValue(LOCALSTORAGEKEY, [])
      console.log(localStorageItems)

      if (Object.keys(localStorageItems).length) {
        Object.values(localStorageItems).forEach((cat: TagSelectProps) => {
          dispatch({
            type: ActionKind.ADDTAGSELECT,
            payload: {
              // category and cat id not needed in this action but made mandatory to simplify reducer function
              newTagSelect: cat,
              categoryId: cat.id,
              category: cat.name,
            },
          })
        })
      }
    }
  }, [])

  return (
    <>
      <form className="w-[80%] mx-auto md:w-full">
        <h2 className="text-4xl">New item</h2>
        <div className="flex flex-col mt-8">
          <label className="font-semibold leading-none">Name</label>
          <input ref={nameRef} type="text" className={INP} />
        </div>
        <div className="flex flex-col mt-4">
          <label className="font-semibold leading-none">Number</label>
          <input ref={numberRef} type="number" className={INP} />
        </div>
        <h2 className="text-3xl my-8">Tags</h2>
        {Object.keys(state).length ? (
          Object.values(state).map((category, i) => (
            <TagSelect key={i} category={category} dispatch={dispatch} />
          ))
        ) : (
          <div className="text-gray-400">No chosen categories</div>
        )}
        <hr className="mt-16 mb-4" />

        <div className="flex flex-col mt-4">
          <label className="font-semibold leading-none">New tag category</label>
          <CategorySelect dispatch={dispatch} className="mt-4" activeCategories={Object.values(state)} />
        </div>
        <div className="flex items-center justify-center w-full">
          <button
            onClick={(e) => {
              e.preventDefault()
              onSubmit()
            }}
            className={BTN}>
            Create
          </button>
        </div>
      </form>
    </>
  )
}

export default NewItemForm
