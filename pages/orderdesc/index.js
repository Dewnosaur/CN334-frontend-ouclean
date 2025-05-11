import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/navigators/Breadcrumb'

const orderdesc = () => {

  const mockOrderId = {
    id: 1234,
    date: "2 พค 2568",
    total: 730,
    paymet: "ปลายทาง",
    status: "กำลังดำเนินการ"
  }

  const mockOrders = [
    {
      image: "https://files.vogue.co.th/uploads/healthy-food-4.jpg",
      name: "ข้าวผัดไข่ ซาบะย่าง และผักสลัด",
      price: 150.00,
      quantity: 1
    },
    {
      image: "https://files.vogue.co.th/uploads/healthy-food-7.jpg",
      name: "สลัดอกไก่โรยงา กินคู่กับน้ำสลัดญี่ปุ่น",
      price: 120.00,
      quantity: 2
    },
    {
      image: "https://files.vogue.co.th/uploads/healthy-food-10.jpg",
      name: "เมี่ยงปลาเผา",
      price: 100.00,
      quantity: 1
    },
    {
      image: "https://files.vogue.co.th/uploads/healthy-food-11.jpg",
      name: "แกงจืดไก่ก้อนเต้าหู้ไข่",
      price: 80.00,
      quantity: 3
    }
  ];

  // Calculate total price from all items
  const totalPrice = mockOrders.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='sticky top-0 z-50'>
        <Header />
      </header>
      <main className='flex-1'>
        <Breadcrumb crumbs={[{name : "Home", link: "/"}, { name: "Order Dashboard", link: "/dashboard" }, { name: mockOrderId.id, link: "orderdesc"}]} />
        <div className='mt-5 mx-[20%] flex justify-between'>
          <h1 className='text-4xl font-bold'>คำสั่งซื้อที่ : #{mockOrderId.id}</h1>
          <h1 className='text-4xl font-bold'>วันที่สั่งซื้อ : {mockOrderId.date}</h1>
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
              {mockOrders.map((item, index) => (
                <tr key={index}>
                  <td className='p-4 text-sm flex items-center'>
                    <img src={item.image} className='w-20 h-20 mr-4' alt={item.name} />
                    <a href='#' className='hover:underline hover:text-orange-400'>{item.name}</a>
                  </td>
                  <td className='p-4 text-sm'>{item.price}</td>
                  <td className='p-4 text-sm'>{item.quantity}</td>
                  <td className='p-4 text-sm'>{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className='bg-white'>
              <tr className=''>
                <td></td>
                <td></td>
                <td className='font-bold p-6'>ยอดรวม</td>
                <td id='totalPrice' className='font-bold'>{totalPrice.toFixed(2)}</td>
              </tr>
              <tr className=''>
                <td></td>
                <td></td>
                <td className='font-bold p-6'>ประเภทการชำระ</td>
                <td id='totalPrice' className='font-bold'>{mockOrderId.paymet}</td>
              </tr>
              <tr className=''>
                <td></td>
                <td></td>
                <td className='font-bold p-6'>สถานะ</td>
                <td id='totalPrice' className='font-bold'>{mockOrderId.status}</td>
              </tr>
              <tr>
                <td colSpan="4" className='p-4'>
                  <div className='flex justify-between'>
                    <a href="dashboard" className='bg-orange-300 px-4 py-2 m-5 text-white hover:bg-orange-400 w-50 text-center rounded shadow-md'>ย้อนกลับ</a>
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

export default orderdesc
