import React, { Dispatch, useState } from 'react'
import { ActionMeta, OnChangeValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { Tag, Category } from '../../types/types'
import { Action, ActionKind, TagSelectProps } from '../../utils/inputReducer'
import { getTags, storeCategory } from '../../utils/strapiRequests'
import useFetch from '../../utils/useFetch'

interface Props {
  className: string
  dispatch: Dispatch<Action>
  activeCategories: Category[]
}

interface Option {
  label: string
  value: string
}

const addShownTagInput = async (category: Category) => {
  const tags = await getTags(category.id)

  // const tags = await Promise.all(promises)
  console.log(tags)

  const tagInput: TagSelectProps = {
    id: category.id,
    name: category.name,
    chosen: [],
    options: tags,
  }

  return tagInput
}

const CategorySelect = ({ className, dispatch, activeCategories }: Props) => {
  const [createLoading, setCreateLoading] = useState<boolean>(false)

  const {
    data,
    error,
    loading,
    setData: setCats,
  } = useFetch<Category[]>('http://localhost:1337/api/categories')

  const getNoneActiveCategories = () => {
    const activeIds = activeCategories.map((cat) => cat.id)
    return data.filter((cat) => !activeIds.includes(cat.id))
  }

  const handleChange = async (newValue: OnChangeValue<Option, false>, actionMeta: ActionMeta<Option>) => {
    console.log('changing', newValue)

    setCreateLoading(true)
    if (!newValue) return
    const val: Category = { name: newValue.label, id: Number(newValue.value) }

    const tagSelect = await addShownTagInput(val)

    console.log(tagSelect)

    setCreateLoading(false)
    dispatch({
      type: ActionKind.ADDTAGSELECT,
      payload: { newTagSelect: tagSelect, category: tagSelect.name, categoryId: tagSelect.id },
    })
  }

  const handleCreate = async (inputValue: string) => {
    setCreateLoading(true)
    const insertId = await storeCategory(inputValue)

    const val: Category = { name: inputValue, id: insertId }

    setCreateLoading(false)

    const tagSelect = await addShownTagInput(val)

    dispatch({
      type: ActionKind.ADDTAGSELECT,
      payload: { newTagSelect: tagSelect, category: tagSelect.name, categoryId: tagSelect.id },
    })
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

export default CategorySelect
