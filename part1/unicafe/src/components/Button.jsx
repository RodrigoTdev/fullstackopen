import React from 'react'

export const Button = ({ text, state, setState }) => {
  const handleClick = () => {
    setState(state + 1)
  }
  return <button onClick={handleClick}>{text}</button>
}
