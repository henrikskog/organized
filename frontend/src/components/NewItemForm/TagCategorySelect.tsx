import React, { Dispatch, useState } from 'react'
import { ActionMeta, OnChangeValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { Tag, TagCategory } from '../../types/types'
import { Action, ActionKind, TagSelectDataProps } from '../../utils/inputReducer'
import { getTags, newCategory } from '../../utils/requests'
import useFetch from '../../utils/useFetch'

interface Props {
  className: string
  dispatch: Dispatch<Action>
  setRender: (val: boolean) => void
  render: boolean
  activeCategories: TagCategory[]
}

interface Option {
  label: string
  value: string
}

const addShownTagInput = async (category: TagCategory) => {
  const promises = await getTags(category.id)
  const tags = await Promise.all(promises)

  const tagInput: TagSelectDataProps = {
    id: category.id,
    name: category.name,
    chosen: [],
    options: tags,
  }

  return tagInput
}

const TagCategorySelect = ({ render, setRender, className, dispatch, activeCategories }: Props) => {
  const [createLoading, setCreateLoading] = useState<boolean>(false)

  const {
    data,
    error,
    loading,
    setData: setCats,
  } = useFetch<TagCategory[]>('http://localhost:8000/categories')

  const getNoneActiveCategories = () => {
    const activeIds = activeCategories.map((cat) => cat.id)
    return data.filter((cat) => !activeIds.includes(cat.id))
  }

  const handleChange = async (newValue: OnChangeValue<Option, false>, actionMeta: ActionMeta<Option>) => {
    console.log('changing', newValue)

    setCreateLoading(true)
    if (!newValue) return
    const val: TagCategory = { name: newValue.label, id: Number(newValue.value) }

    const tagSelect = await addShownTagInput(val)

    console.log(tagSelect)

    setCreateLoading(false)
    dispatch({
      type: ActionKind.ADDTAGSELECT,
      payload: { newTagSelect: tagSelect },
    })
    setRender(!render)
  }

  const handleCreate = async (inputValue: string) => {
    setCreateLoading(true)
    const insertId = await newCategory(inputValue)

    const val: TagCategory = { name: inputValue, id: insertId }

    setCreateLoading(false)

    const tagSelect = await addShownTagInput(val)

    dispatch({
      type: ActionKind.ADDTAGSELECT,
      payload: { newTagSelect: tagSelect },
    })
    setRender(!render)
  }

  // anledning, plassering, instrumentering
  return (
    <CreatableSelect
      id="select-id"
      instanceId="select-id-category"
      isClearable
      isDisabled={loading || createLoading}
      isLoading={loading || createLoading}
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={
        data.length ? getNoneActiveCategories().map((v) => ({ value: v.id.toString(), label: v.name })) : []
      }
      className={className}
    />
  )
}

export default TagCategorySelect
