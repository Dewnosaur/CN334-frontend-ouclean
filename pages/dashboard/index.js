import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/navigators/Breadcrumb';

const dashboard = () => {

    const mockData = [
        {
            id: "1234",
            date: "2 พค 2568",
            total: 730,
            status: "กำลังดำเนินการ"
        },
        {
            id: "5678",
            date: "3 พค 2568",
            total: 1200,
            status: "จัดส่งเสร็จสิ้น"
        },
        {
            id: "9012",
            date: "4 พค 2568",
            total: 250,
            status: "กำลังจัดส่ง"
        }
    ]

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
                            {mockData.map((order) => (
                                <tr key={order.id}>
                                    <td className='p-4 text-sm'>
                                        <a href='#' className='hover:underline hover:text-orange-400'>#{order.id}</a>
                                    </td>
                                    <td className='p-4 text-sm'>{order.date}</td>
                                    <td className='p-4 text-sm'>{order.total}</td>
                                    <td className='p-4 text-sm'>{order.status}</td>
                                    <td className='p-4 text-sm'>
                                        <div className="flex justify-center items-center">
                                            <a href={`/dashboard/${mockData.id}`} className='bg-orange-300 text-white px-5 py-2 rounded hover:bg-orange-400'>
                                                ดูรายละเอียด
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
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

export default dashboard
