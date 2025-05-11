import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/navigators/Breadcrumb'
import Card from '../components/Card'

const menu = () => {

  const mockData = [
    {
      id: 1234,
      image: "https://files.vogue.co.th/uploads/healthy-food-4.jpg",
      name: "ข้าวผัดไข่ ซาบะย่าง และผักสลัด",
      price: 150.00
    },
    {
      id: 5678,
      image: "https://files.vogue.co.th/uploads/healthy-food-7.jpg",
      name: "สลัดอกไก่โรยงา กินคู่กับน้ำสลัดญี่ปุ่น",
      price: 120.00
    },
    {
      id: 9011,
      image: "https://files.vogue.co.th/uploads/healthy-food-10.jpg",
      name: "เมี่ยงปลาเผา",
      price: 100.00
    },
    {
      id: 5344,
      image: "https://files.vogue.co.th/uploads/healthy-food-11.jpg",
      name: "แกงจืดไก่ก้อนเต้าหู้ไข่",
      price: 80.00
    },
    {
      id: 4563,
      image: "https://files.vogue.co.th/uploads/healthy-food-7.jpg",
      name: "สลัดอกไก่โรยงา กินคู่กับน้ำสลัดญี่ปุ่น",
      price: 120.00
    },
    {
      id: 6588,
      image: "https://files.vogue.co.th/uploads/healthy-food-10.jpg",
      name: "เมี่ยงปลาเผา",
      price: 100.00
    },
    {
      id: 9402,
      image: "https://files.vogue.co.th/uploads/healthy-food-11.jpg",
      name: "แกงจืดไก่ก้อนเต้าหู้ไข่",
      price: 80.00
    },
    {
      id: 4599,
      image: "https://files.vogue.co.th/uploads/healthy-food-7.jpg",
      name: "สลัดอกไก่โรยงา กินคู่กับน้ำสลัดญี่ปุ่น",
      price: 120.00
    },
    {
      id: 4532,
      image: "https://files.vogue.co.th/uploads/healthy-food-10.jpg",
      name: "เมี่ยงปลาเผา",
      price: 100.00
    },
    {
      id: 1122,
      image: "https://files.vogue.co.th/uploads/healthy-food-11.jpg",
      name: "แกงจืดไก่ก้อนเต้าหู้ไข่",
      price: 80.00
    }
  ]

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='sticky top-0 z-50'>
        <Header />
      </header>

      <main>
        <Breadcrumb crumbs={[{ name: "Home", link: "/" }, { name: "menu", link: "/menu" }]} />
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mt-5 w-[75%] m-auto'>
          {mockData.map((item, index) => (
            <Card key={index} id={item.id} image={item.image} imagealt={item.name} name={item.name} price={item.price} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default menu
