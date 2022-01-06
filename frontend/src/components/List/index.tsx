import React, { useEffect, useState } from 'react'
import { Item } from '../../types/types'
import ListItem from './ListItem'

interface Props {
  items: Item[]
}

function findItems(search: string, allItems: Item[]) {
  const all: Item[] = []
  allItems.forEach((item) => {
    if (item.name.toLowerCase().includes(search.toLowerCase())) {
      all.push(item)
    }
  })
  return all
}

const List = ({ items }: Props) => {
  const [shownData, setShownData] = useState<Item[]>([])
  const [input, setInput] = useState<string>('')

  useEffect(() => {
    if (items.length != 0) setShownData(JSON.parse(JSON.stringify(items)))
  }, [items])

  useEffect(() => {
    if (input == '') {
      setShownData(items)
    } else {
      setShownData(findItems(input, items))
    }
  }, [input])

  return (
    <div className="container flex flex-col items-center justify-center max-w-[65ch] mx-auto">
      <div className="py-5 w-full bg-white rounded-md">
        <h3 className="text-4xl leading-6 font-medium text-gray-900 ">Database</h3>
        <p className="mt-4 max-w-2xl text-sm text-gray-500 ">All your items in one place</p>
      </div>
      <section className=" text-gray-600 w-full">
        <div className="flex flex-col w-full mb-2">
          <input
            placeholder="Søk"
            value={input}
            onChange={(val) => setInput(val.target.value)}
            type="text"
            className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 bg-gray-50 border rounded border-gray-200"
          />
        </div>
        <div className="flex flex-col justify-center h-full">
          {/* <!-- Table --> */}
          <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Number</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Number</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {shownData.map((item, i) => (
                      <ListItem key={i} number={item.org_number || 0} name={item.name} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default List
