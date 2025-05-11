import { useState, useEffect, use } from 'react'
import Header from './components/Header'
import Breadcrumb from './components/navigators/Breadcrumb'
import Card from './components/Card'
import Footer from './components/Footer'

export default function Home() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentIndex, setCurrentIndex] = useState(0)
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
  }

  const slides = [
    {
      url: "https://www.mindful.sodexo.com/wp-content/uploads/2017/02/simple-guide.jpg"
    },
    {
      url: "https://cdn-prod.medicalnewstoday.com/content/images/articles/320/320865/various-fruits-and-vegetables-that-are-considered-clean-eating.jpg"
    },
    {
      url: "https://hips.hearstapps.com/countryliving/assets/17/16/1492542444-clean-eating-recipes-.jpg"
    }
  ]

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
  ]

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(autoSlide)
  }, [currentIndex])

  return (
    <div className=''>
      <header className='sticky top-0 z-50'>
        <Header />
      </header>

      <main>
        <Breadcrumb crumbs={[{ name: "Home", link: "/" }]} />
        <div className='h-[400px] w-full mt-5 m-auto realative group'>
          <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }} className='w-full h-full bg-center bg-cover duration-500'>

          </div>
        </div>
        <div className='mt-10 text-center'>
          <h1 className='flex justify-center text-center text-3xl font-bold'>OuClean (อู๋คลีน)</h1>
          <p className='mt-5 flex justify-center text-justify px-[25%]'>
            ร้าน OuClean (อู๋คลีน) ร้านขายอาหารคลีนเพื่อสุขภาพ อาหารทุกจานทำจากวัตถุดิบคุณภาพดี ทำสดใหม่ทุกวัน รสชาติดี ทานง่าย ถูกปากทุกคน
            มีเมนูให้เลือกมากมาย พร้อมจัดส่งถึงหน้าบ้าน
            อาหารทุกเมนูมีแคลลอรี่และโภชนาการกำกับไว้ ง่ายต่อการคำนวณแคลลอรี่ที่ต้องได้รับต่อวัน เหมาะสำหรับท่านที่คุมน้ำหนัก
          </p>
        </div>
        <div className='mt-5 px-[25%]'>
          <h1 className='text-3xl font-bold'>เมนูแนะนำ</h1>
          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5'>
            {mockData.map((item, index) => (
              <Card key={index} id={item.id} image={item.image} imagealt={item.name} name={item.name} price={item.price} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
