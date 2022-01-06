import React, { ReactElement } from 'react'

interface Props {
  number: number
  name: string
}

function ListItem({ number, name }: Props): ReactElement {
  return (
    <tr>
      <td className="p-2 whitespace-nowrap">
        <div className="flex items-center">
          <div className="font-medium text-gray-800">{number}</div>
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">{name}</div>
      </td>
    </tr>
  )
}

export default ListItem
