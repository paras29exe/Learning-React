import axios from 'axios'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    axios.get('/api/jokes')
      .then((response) => {
        setJokes(response.data)
      })

      .catch((error) => {
        console.log(error)
      })
  })

  return (
    <>
      <h1>Hello</h1>
      <p>Jokes : {jokes.length}</p>
      {
        jokes.map((joke) => {
          return (
            <div key={joke.id}>
              <h2>{joke.joke}</h2>
            </div>
          )
        })
      }
    </>
  )
}

export default App
