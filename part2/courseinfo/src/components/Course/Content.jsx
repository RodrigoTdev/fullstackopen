import React from 'react'
import { Part } from './Part'

export const Content = ({ parts }) => {
  return (
    <div>
      {parts?.map((item) => (
        <Part
          key={item.id}
          part={item}
        />
      ))}
      <b>{`total of ${parts.reduce(
        (acc, part) => acc + part.exercises,
        0
      )} exercises`}</b>
    </div>
  )
}
