import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/navigators/Breadcrumb'
import Card from '../components/Card'

const Menu = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://three34-ouclean.onrender.com/api/products/")
        if (!res.ok) throw new Error("ไม่สามารถโหลดเมนูได้")
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='sticky top-0 z-50'>
        <Header />
      </header>

      <main>
        <Breadcrumb crumbs={[{ name: "Home", link: "/" }, { name: "menu", link: "/menu" }]} />
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mt-5 w-[75%] m-auto'>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            products.map((item, index) => (
              <Card
                key={item.id}
                id={item.id}
                image={item.picture || item.image}
                imagealt={item.name}
                name={item.name}
                price={item.price}
              />
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Menu
