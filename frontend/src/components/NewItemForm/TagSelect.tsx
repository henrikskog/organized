import React, { Dispatch, useState } from 'react'

import CreatableSelect from 'react-select/creatable'
import { ActionMeta, OnChangeValue } from 'react-select'
import { Option, Tag, TagCategory } from '../../types/types'
import { Action, ActionKind, TagSelectDataProps } from '../../utils/inputReducer'
import { newTag } from '../../utils/requests'

export interface TagSelectProps {
  category: TagSelectDataProps
  className?: string
  dispatch: Dispatch<Action>
  setRender: (val: boolean) => void
  render: boolean
}

const TagSelect = ({
  render,
  setRender,
  className,
  category: { id, name, options },
  dispatch,
}: TagSelectProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (newValue: OnChangeValue<Option, true>, actionMeta: ActionMeta<Option>) => {
    // dette er helt krise dårlig, men funker
    const newVals: Tag[] = []
    newValue.forEach((val) => {
      const catId = options.filter((opt) => opt.id == Number(val.value))[0].category_id
      newVals.push({
        category_id: catId,
        id: Number(val.value),
        name: val.label,
      })
    })

    dispatch({
      type: ActionKind.SETCHOSEN,
      payload: {
        category: name,
        newChosen: newVals,
      },
    })
  }

  const handleCreate = async (inputValue: string) => {
    setIsLoading(true)

    const insertedId = await newTag(inputValue, id)

    if (insertedId == 0) {
      console.log('Fetch failed')
      return
    }

    const newOption: Tag = {
      category_id: id,
      id: insertedId,
      name: inputValue,
    }

    setIsLoading(false)

    dispatch({
      type: ActionKind.ADDOPTION,
      payload: {
        category: name,
        newOption: newOption,
      },
    })

    dispatch({
      type: ActionKind.ADDCHOSEN,
      payload: {
        category: name,
        newSingleChosen: newOption,
      },
    })
    setRender(!render)
  }

  // anledning, plassering, instrumentering
  return (
    <div className="flex flex-col mt-4">
      <label className="font-semibold leading-none capitalize">{name}</label>
      <CreatableSelect
        isClearable
        isMulti
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={options.map((c) => ({ value: c.id.toString(), label: c.name }))}
        className={className + ' mt-4'}
      />
    </div>
  )
}

export default TagSelect
