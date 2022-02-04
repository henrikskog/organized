import React, { Dispatch, useState } from 'react'

import CreatableSelect from 'react-select/creatable'
import { ActionMeta, OnChangeValue } from 'react-select'
import { Option, Tag, Category } from '../../types/types'
import { Action, ActionKind, AllTagSelects, TagSelectProps } from '../../utils/inputReducer'
import { createTag, wasSuccess } from '../../utils/strapiRequests'

interface Props {
  category: TagSelectProps
  className?: string
  dispatch: Dispatch<Action>
}

const TagSelect = ({ className, category: { id, name, options }, dispatch }: Props) => {
  console.log(options)

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
        categoryId: id,
        category: name,
        newChosen: newVals,
      },
    })
  }

  const handleCreate = async (inputValue: string) => {
    setIsLoading(true)

    const { data, error } = await createTag(inputValue, id)
    console.log(data, error)

    if (!wasSuccess(data, error)) {
      console.log(error)
      return
    }

    const newOption: Tag = {
      category_id: id,
      id: data.id,
      name: inputValue,
    }

    setIsLoading(false)

    dispatch({
      type: ActionKind.ADDOPTION,
      payload: {
        categoryId: id,
        category: name,
        newOption: newOption,
      },
    })

    dispatch({
      type: ActionKind.ADDCHOSEN,
      payload: {
        categoryId: id,
        category: name,
        newSingleChosen: newOption,
      },
    })
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
        id={`tag-${id.toString()}`}
        instanceId={`tag-${id.toString()}`}
      />
    </div>
  )
}

export default TagSelect
