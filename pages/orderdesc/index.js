import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/navigators/Breadcrumb'

const OrderDesc = () => {
  const router = useRouter()
  const { id } = router.query

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) return
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/orders/${id}/`)
        if (!res.ok) throw new Error("ไม่พบคำสั่งซื้อ")
        const data = await res.json()
        setOrder(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!order) return null

  // Calculate total price from all items (if not provided)
  const totalPrice = order.total_price || (
    order.product_orders
      ? order.product_orders.reduce((sum, item) => sum + item.total_price, 0)
      : 0
  )

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='sticky top-0 z-50'>
        <Header />
      </header>
      <main className='flex-1'>
        <Breadcrumb crumbs={[
          { name: "Home", link: "/" },
          { name: "Order Dashboard", link: "/dashboard" },
          { name: order.id, link: `/orderdesc?id=${order.id}` }
        ]} />
        <div className='mt-5 mx-[20%] flex justify-between'>
          <h1 className='text-4xl font-bold'>คำสั่งซื้อที่ : #{order.id}</h1>
          <h1 className='text-4xl font-bold'>วันที่สั่งซื้อ : {order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}</h1>
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
              {order.product_orders && order.product_orders.map((item, index) => (
                <tr key={index}>
                  <td className='p-4 text-sm flex items-center'>
                    <img src={item.product?.picture || item.product?.image} className='w-20 h-20 mr-4' alt={item.product_name} />
                    <a href={`/menu/${item.product}`} className='hover:underline hover:text-orange-400'>{item.product_name}</a>
                  </td>
                  <td className='p-4 text-sm'>{item.product?.price || '-'}</td>
                  <td className='p-4 text-sm'>{item.quantity}</td>
                  <td className='p-4 text-sm'>{item.total_price.toFixed(2)}</td>
                </tr>
              ))}
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
                <td className='font-bold'>{order.payment || '-'}</td>
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

export default OrderDesc
