import React from 'react'
import { StatisticLine } from './StatisticLine'

export const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <StatisticLine
        text='good'
        value={good}
      />
      <StatisticLine
        text='neutral'
        value={neutral}
      />
      <StatisticLine
        text='bad'
        value={bad}
      />
      <StatisticLine
        text='all'
        value={good + neutral + bad}
      />
      <StatisticLine
        text='average'
        value={(good - bad) / (good + neutral + bad)}
      />
      <StatisticLine
        text='positive'
        value={(good / (good + neutral + bad)) * 100 + '%'}
      />
    </div>
  )
}
