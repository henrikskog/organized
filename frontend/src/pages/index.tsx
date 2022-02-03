import React, { ReactElement } from 'react'
import { Item } from '../types/types'
import List from '../components/List'
import Navbar from '../components/Navbar'
import { createItem, fetchCategories, fetchItems, fetchTagsWithCategory } from '../utils/strapiRequests'
import { getErrorMessage } from '../backend/prisma/utils/getErrorMessage'

interface Props {
  items: Item[]
  error: string | null
}

const test = async () => {
  try {
    const t = await fetchItems()
    console.log(t)
  } catch (error) {
    console.log(getErrorMessage(error))
  }
}

const Read = (): ReactElement => <button onClick={test}>klikk meg pls</button>

// export function Read({ items, error }: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
//   return (
//     <div>
//       <button onClick={test}>klikk meg pls</button>
//       <Navbar />
//       <List items={items.map((i) => ({ id: i.id, name: i.name }))} />
//       {error && <div>{error}</div>}
//     </div>
//   )
// }

// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//   console.log('on serverside')

//   let result: Item[] = []
//   let error: string = ''
//   try {
//     result = await fetchItems()
//     console.log('TRYIIING')
//   } catch (error) {
//     error = getErrorMessage(error)
//     console.log('in error', error)
//   }

//   return {
//     props: {
//       items: result,
//       error: error,
//     },
//   }
// }

export default Read
