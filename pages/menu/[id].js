import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/navigators/Breadcrumb'

const MenuDetail = () => {
  const router = useRouter()
  const { id } = router.query

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [quantity, setQuantity] = useState(1)

  const increment = () => setQuantity(q => (product && product.stock ? Math.min(q + 1, product.stock) : q + 1))
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1))

  useEffect(() => {
    if (!id) return
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/products/${id}/details/`)
        if (!res.ok) throw new Error("ไม่พบสินค้า")
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!product) return null

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      alert('จำนวนสินค้ามีไม่เพียงพอในสต็อก');
      return;
    }
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const index = existingCart.findIndex((item) => item.id === product.id);

    if (index > -1) {
      // Prevent exceeding stock in cart
      if (existingCart[index].quantity + quantity > product.stock) {
        alert('จำนวนสินค้ามีไม่เพียงพอในสต็อก');
        return;
      }
      existingCart[index].quantity += quantity;
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || product.picture,
        quantity: quantity,
      });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('เพิ่มลงตะกร้าแล้ว!');
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='sticky top-0 z-50'>
        <Header />
      </header>
      <main className='flex-1'>
        <Breadcrumb crumbs={[
          { name: "Home", link: "/" },
          { name: "menu", link: "/menu" },
          { name: product.name, link: `/menu/${product.id}` }
        ]} />
        <div className='mt-5 mx-[5%] flex flex-col md:flex-row gap-15'>
          <img src={product.picture || product.image} className=' md:w-[20%] w-[50%]' />

          {/* ก้อนข้อมูลสินค้า */}
          <div className='flex flex-col'>
            <h1 className='text-4xl font-bold'>{product.name}</h1>
            <h2 className='mt-10 text-3xl'>ราคา : {product.price} บาท</h2>
            <h2 className='mt-10 text-2xl'>รายละเอียดเพิ่มเติม</h2>

            <p className='mt-5'>
              {(product.description || "").split('\n').map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>

            <div className='mt-5 flex gap-[10rem]'>

              <div className='flex items-center text-white'>
                <button
                  onClick={decrement}
                  className='bg-orange-300 px-5 py-2 rounded-l hover:bg-orange-400'
                >
                  -
                </button>
                <div className='bg-orange-300 px-5 py-2'>{quantity}</div>
                <button
                  onClick={increment}
                  className='bg-orange-300 px-5 py-2 rounded-r hover:bg-orange-400'
                >
                  +
                </button>
              </div>

              <div className='mt-1 text-center flex justify-center'>
                <button className='bg-orange-300 py-2 px-8 rounded text-white hover:bg-orange-400'
                onClick={handleAddToCart}>
                  ใส่ตะกร้า</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default MenuDetail
