import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function getProducts() {
      try {
        setLoading(true)
        setError(false)
        const response = await axios.get('/api/products?search=' + search, {
          signal: controller.signal
        })

        setProducts(response.data)
        setLoading(false)
      } catch (error) {
        if (axios.isCancel(error)) {
          return
        }
        setError(true)
        setLoading(false)
      }
    }
    getProducts()

    // cleanup Code
    return () => {
      controller.abort()
    }
  }, [search])

  return (
    <div className="App">
      <input type="text" placeholder='Search Products'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && (<h1>Loading...</h1>)}
      {error && (<h1>Something went wrong</h1>)}

      <h2>No. of Products : {products.length}</h2>
      {search &&
        products.map((product) => (
          <div key={product.id}>
            <h3>{product.name} - {product.price}</h3>
            <img src={product.image} alt={product.name} />
          </div>
        ))
      }
    </div>
  )

}

export default App
