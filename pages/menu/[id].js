import React from 'react'
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/navigators/Breadcrumb'

const MenuDetail = () => {

  const mockData = {
    id: 11123,
    image: "https://files.vogue.co.th/uploads/healthy-food-4.jpg",
    name: "ข้าวผัดไข่ ซาบะย่าง และผักสลัด",
    description: "-180 cal\n-2g Carbs\n-2g Fat\n36g Protein",
    price: 150.00
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='sticky top-0 z-50'>
        <Header />
      </header>
      <main className='flex-1'>
        <Breadcrumb crumbs={[{ name: "Home", link: "/" }, { name: "menu", link: "/menu" }, { name: mockData.name, link: `/menu/${mockData.id}` }]} />
        <div className='mt-5 mx-[5%] flex flex-col md:flex-row gap-15'>
          <img src={mockData.image} className=' md:w-[20%] w-[50%]' />

          {/* ก้อนข้อมูลสินค้า */}
          <div className='flex flex-col'>
            <h1 className='text-4xl font-bold'>{mockData.name}</h1>
            <h2 className='mt-10 text-3xl'>ราคา : {mockData.price} บาท</h2>
            <h2 className='mt-10 text-2xl'>รายละเอียดเพิ่มเติม</h2>

            <p className='mt-5'>
              {mockData.description.split('\n').map((line, idx) => (
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
                <button className='bg-orange-300 py-2 px-8 rounded text-white hover:bg-orange-400'>ใส่ตะกร้า</button>
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
