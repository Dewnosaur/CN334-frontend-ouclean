import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/navigators/Breadcrumb';

const Dashboard = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/my-orders/")
                if (!res.ok) throw new Error("ไม่สามารถโหลดข้อมูลคำสั่งซื้อได้")
                const data = await res.json()
                setOrders(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    return (
        <div className='flex flex-col min-h-screen'>
            <header className='sticky top-0 z-50'>
                <Header />
            </header>
            <main className='flex-1'>
                <Breadcrumb crumbs={[{name : "Home", link: "/"}, { name: "Order Dashboard", link: "/dashboard" }]} />

                <div className='mt-5 mx-[20%] flex flex-col items-center shadow-md'>
                    <table className='w-full mx-auto'>
                        <thead className='bg-orange-400 rounded'>
                            <tr className='text-white'>
                                <th className='p-4 text-sm font-semibold trackingwide text-left'>รหัสคำสั่งซื้อ</th>
                                <th className='p-4 text-sm font-semibold trackingwide text-left'>วันที่</th>
                                <th className='p-4 text-sm font-semibold trackingwide text-left'>ยอดรวม</th>
                                <th className='p-4 text-sm font-semibold trackingwide text-left'>สถานะ</th>
                                <th className='text-sm font-semibold trackingwide text-center'></th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {loading ? (
                                <tr><td colSpan={5}>Loading...</td></tr>
                            ) : error ? (
                                <tr><td colSpan={5} className="text-red-500">{error}</td></tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id}>
                                        <td className='p-4 text-sm'>
                                            <a href={`/dashboard/${order.id}`} className='hover:underline hover:text-orange-400'>#{order.id}</a>
                                        </td>
                                        <td className='p-4 text-sm'>{order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}</td>
                                        <td className='p-4 text-sm'>{order.total_price}</td>
                                        <td className='p-4 text-sm'>{order.status}</td>
                                        <td className='p-4 text-sm'>
                                            <div className="flex justify-center items-center">
                                                <a href={`/dashboard/${order.id}`} className='bg-orange-300 text-white px-5 py-2 rounded hover:bg-orange-400'>
                                                    ดูรายละเอียด
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Dashboard
