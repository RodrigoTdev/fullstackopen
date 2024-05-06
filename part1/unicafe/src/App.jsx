import { useState } from 'react'
import { Statistics } from './components/Statistics'
import { Button } from './components/Button'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>
      <Button
        text='good'
        state={good}
        setState={setGood}
      />
      <Button
        text='neutral'
        state={neutral}
        setState={setNeutral}
      />
      <Button
        text='bad'
        state={bad}
        setState={setBad}
      />

      <h2>Statistics</h2>
      {good || neutral || bad ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
        />
      ) : (
        'No feedback given'
      )}
    </div>
  )
}

export default App
