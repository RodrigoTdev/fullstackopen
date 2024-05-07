import React from 'react'
import { Header } from './Header'
import { Content } from './Content'
import { Part } from './Part'

export const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}
