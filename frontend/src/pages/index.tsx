import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Item } from '../types/types'
import List from '../components/List'
import Navbar from '../components/Navbar'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

interface Props {
  items: Item[]
  error: boolean
}

function Read({ items, error }: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  return (
    <div>
      <Navbar />
      <List items={items} />
      {error && <div>Could not fetch data from database</div>}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  let error = false
  let response: any
  try {
    response = await fetch('http://localhost:8000/notes')
  } catch (e) {
    error = true
  }

  let items: Item[] = []
  if (!error) {
    items = await response.json()
  }

  return {
    props: {
      items: items,
      error: error,
    },
  }
}

export default Read
