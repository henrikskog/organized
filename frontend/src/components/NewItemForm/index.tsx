import { useEffect, useReducer, useRef, useState } from 'react'
import { ActionKind, initialState, LOCALSTORAGEKEY, reducer } from '../../utils/inputReducer'
import { DBItem, storeItem } from '../../utils/requests'
import { getStorageValue } from '../../utils/useLocalStorage'
import TagCategorySelect from './TagCategorySelect'
import TagSelect from './TagSelect'

const BTN =
  'mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none'
const INP =
  'leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200'

const NewItemForm = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const numberRef = useRef<HTMLInputElement>(null)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [render, setRender] = useState<boolean>(false)

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

    state.forEach((inp) => {
      inp.chosen.forEach((tag) => tags.push(tag.id))
    })

    const storedObject: DBItem = {
      name: name,
      org_number: Number(number),
      tags: tags,
    }

    await storeItem(storedObject)
  }

  useEffect(() => {
    if (typeof window != 'undefined') {
      const localStorageItems = getStorageValue(LOCALSTORAGEKEY, [])

      dispatch({
        type: ActionKind.ADDTAGSELECTS,
        payload: {
          newTagSelects: localStorageItems,
        },
      })
      setRender(!render)
    }
  }, [])

  useEffect(() => {}, [state])

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
        {state.length ? (
          state.map((category, i) => (
            <TagSelect
              render={render}
              setRender={setRender}
              key={i}
              category={category}
              dispatch={dispatch}
            />
          ))
        ) : (
          <div className="text-gray-400">No chosen categories</div>
        )}
        <hr className="mt-16 mb-4" />

        <div className="flex flex-col mt-4">
          <label className="font-semibold leading-none">New tag category</label>
          <TagCategorySelect
            render={render}
            setRender={setRender}
            dispatch={dispatch}
            className="mt-4"
            activeCategories={state}
          />
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
