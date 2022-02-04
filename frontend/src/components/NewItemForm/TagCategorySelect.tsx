import { setDefaultResultOrder } from 'dns'
import React, { Dispatch, useEffect, useState } from 'react'
import { ActionMeta, OnChangeValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { Category } from '../../types/types'
import { Action, ActionKind, TagSelectProps } from '../../utils/inputReducer'
import {
  createCategory,
  fetchCategories,
  fetchTagsWithCategory,
  wasSuccess,
} from '../../utils/strapiRequests'
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
  const { data, error } = await fetchTagsWithCategory(category.id)
  if (!wasSuccess(data)) {
    console.error('Error: ' + error, 'exiting function')
    /* TODO: error should be exposed to user */
    return
  }

  const tagInput: TagSelectProps = {
    id: category.id,
    name: category.name,
    chosen: [],
    options: data,
  }

  return tagInput
}

const TagCategorySelect = ({ className, dispatch, activeCategories }: Props) => {
  useEffect(() => {
    ;(async () => {
      const { data, error } = await fetchCategories()
      if (wasSuccess(data, error)) setData(data)
      else {
        setError(error)
      }
    })()
  }, [])
  const [createLoading, setCreateLoading] = useState<boolean>(false)
  const [data, setData] = useState<Category[]>([])
  const [error, setError] = useState<string>()

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

    setCreateLoading(false)
    dispatch({
      type: ActionKind.ADDTAGSELECT,
      payload: { newTagSelect: tagSelect, category: tagSelect!.name, categoryId: tagSelect!.id },
      /* ^ TODO: errors are not being handled in .name, .id from addShownTagInput func */
    })
  }

  const handleCreate = async (inputValue: string) => {
    setCreateLoading(true)
    const { data, error } = await createCategory(inputValue)

    if (!wasSuccess(data, error)) return
    /* TODO: handle database failure ^ */

    const val: Category = { name: inputValue, id: data.id }

    setCreateLoading(false)

    const tagSelect = await addShownTagInput(val)

    dispatch({
      type: ActionKind.ADDTAGSELECT,
      payload: { newTagSelect: tagSelect, category: tagSelect!.name, categoryId: tagSelect!.id },
      /* ^ TODO: errors are not being handled in .name, .id from addShownTagInput func */
    })
  }

  // anledning, plassering, instrumentering
  return (
    <CreatableSelect
      id="select-id"
      instanceId="select-id-category"
      isClearable
      // isDisabled={loading || createLoading}
      // isLoading={loading || createLoading}
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
