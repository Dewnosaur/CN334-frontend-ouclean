/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Breadcrumb from '../../components/navigators/Breadcrumb'

const OrderDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null)
  const [payment, setPayment] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrderAndPayment = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No token in localStorage')
        // Fetch orders
        const res = await fetch('https://three34-ouclean.onrender.com/api/my-orders/', {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        })
        if (!res.ok) throw new Error('Failed to fetch orders')
        const orders = await res.json()
        const foundOrder = orders.find(o => String(o.id) === String(id))
        if (!foundOrder) throw new Error('Order not found')
        setOrder(foundOrder)

        // Fetch payment if payment id exists
        if (foundOrder.payment) {
          const paymentRes = await fetch(`https://three34-ouclean.onrender.com/api/payments/${foundOrder.payment}/`, {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json',
            },
          })
          if (paymentRes.ok) {
            const paymentData = await paymentRes.json()
            setPayment(paymentData)
          }
        }
        // Fetch all products
        const productRes = await fetch('https://three34-ouclean.onrender.com/api/products/', {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        })
        if (productRes.ok) {
          const productData = await productRes.json()
          setProducts(productData)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchOrderAndPayment()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!order) return null

  const totalPrice = order.total_price

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='sticky top-0 z-50'>
        <Header />
      </header>
      <main className='flex-1'>
        <Breadcrumb crumbs={[
          { name: "Home", link: "/" },
          { name: "Order Dashboard", link: "/dashboard" },
          { name: order.id, link: `/dashboard/${order.id}` }
        ]} />
        <div className='mt-5 mx-[20%] flex justify-between'>
          <h1 className='text-4xl font-bold'>คำสั่งซื้อที่ : #{order.id}</h1>
          <h1 className='text-4xl font-bold'>วันที่สั่งซื้อ : {new Date(order.created_at).toLocaleDateString('th-TH')}</h1>
        </div>

        <div className='mt-5 mx-[20%] flex flex-col items-center shadow-md'>
          <table className='w-full'>
            <thead className='bg-orange-400 rounded'>
              <tr className='text-white'>
                <th className='p-4 text-sm font-semibold trackingwide text-left'>รายการอาหาร</th>
                <th className='p-4 text-sm font-semibold trackingwide text-left'>ราคา</th>
                <th className='p-4 text-sm font-semibold trackingwide text-left'>จำนวน</th>
                <th className='p-4 text-sm font-semibold trackingwide text-left'>ยอดรวม</th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {order.product_orders.map((item, index) => {
                // Find the product by name
                const product = products.find(p => p.name === item.product_name)
                return (
                  <tr key={index}>
                    <td className='p-4 text-sm flex items-center'>
                      <img
                        src={product ? product.picture : ''}
                        className='w-20 h-20 mr-4'
                        alt={item.product_name}
                      />
                      <span className='hover:underline hover:text-orange-400'>{item.product_name}</span>
                    </td>
                    <td className='p-4 text-sm'>{product ? product.price : '-'}</td>
                    <td className='p-4 text-sm'>{item.quantity}</td>
                    <td className='p-4 text-sm'>{(item.total_price).toFixed(2)}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot className='bg-white'>
              <tr>
                <td></td>
                <td></td>
                <td className='font-bold p-6'>ยอดรวม</td>
                <td className='font-bold'>{totalPrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td className='font-bold p-6'>ประเภทการชำระ</td>
                <td className='font-bold'>{payment && payment.method ? payment.method : '-'}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td className='font-bold p-6'>สถานะ</td>
                <td className='font-bold'>{order.status}</td>
              </tr>
              <tr>
                <td colSpan="4" className='p-4'>
                  <div className='flex justify-between'>
                    <a href="/dashboard" className='bg-orange-300 px-4 py-2 m-5 text-white hover:bg-orange-400 w-50 text-center rounded shadow-md'>ย้อนกลับ</a>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default OrderDetail
