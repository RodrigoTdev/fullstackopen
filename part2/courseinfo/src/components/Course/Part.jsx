import React from 'react'

export const Part = ({ part }) => {
  const { name, exercises } = part
  return <div>{`${name} ${exercises}`}</div>
}
