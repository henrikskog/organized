import React, { ReactElement } from 'react'
import { Item } from '../types/types'
import List from '../components/List'
import Navbar from '../components/Navbar'
import {
  createItem,
  fetchCategories,
  fetchItems,
  fetchTagsWithCategory,
  wasSuccess,
} from '../utils/strapiRequests'
import { getErrorMessage } from '../backend/prisma/utils/getErrorMessage'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

interface Props {
  items: Item[]
  error?: string
}

const test = async () => {
  try {
    const t = await fetchItems()
    console.log(t)
  } catch (error) {
    console.log(getErrorMessage(error))
  }
}

// const Read = (): ReactElement => <button onClick={test}>klikk meg pls</button>

export function Read({ items, error }: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  {
    console.log(items)
  }
  return (
    <div>
      {error ? (
        <>
          <Navbar />
          <List items={items} />
        </>
      ) : null}
      {/* TODO: ERROR COMPONENT / SOMETHING SHOULD RENDER EVEN ON ERROR */}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data, error } = await fetchItems()
  console.log(data, error)

  return {
    props: {
      items: data || [],
      error,
    },
  }
}

export default Read
