import {React, useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const checkout = () => {

    const mockData = [
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

    // คำนวณยอดรวมจำนวนรายการและราคารวมทั้งหมด
    const totalItems = mockData.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = mockData.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showPopup, setShowPopup] = useState(false)

    return (
        <div className='flex flex-col min-h-screen'>
            <header className='sticky top-0 z-50'>
                <Header />
            </header>
            <main className="flex flex-1 mt-5 justify-center py-8">
                <form className="flex flex-col md:flex-row items-start gap-10 w-full max-w-6xl px-10" onSubmit={(e) => {
                    e.preventDefault();
                    // ทำการ submit form ทั้งหมด
                    console.log("Form submitted")
                }}>

                    {/* กล่องซ้าย (ข้อมูลผู้สั่งซื้อ / ที่อยู่) */}
                    <div className="bg-white rounded-lg shadow-md p-20 min-h-[200px] w-full md:w-1/2">
                        <h1 className='text-orange-400 text-bold text-3xl mb-5'>ข้อมูลผู้สั่งซื้อ</h1>
                        {/* ชื่อจริง */}
                        <div className='mb-5'>
                            <label htmlFor='firstname' className='block text-sm mb-3'>
                                ชื่อจริง
                            </label>
                            <div>
                                <input id='firstname' type='text' autoComplete='off' className='shadow appearance-none rounded w-full 
                                                                                    px-4 py-2 leading-tight focus:outline-none
                                                                                    focus:shadow-outline text-gray-700'/>
                            </div>
                        </div>

                        {/* นามสกุล */}
                        <div className='mb-5'>
                            <label htmlFor='lastname' className='block text-sm mb-3'>
                                นามสกุล
                            </label>
                            <div>
                                <input id='lastname' type='text' autoComplete='off' className='shadow appearance-none rounded w-full 
                                                                                    px-4 py-2 leading-tight focus:outline-none
                                                                                    focus:shadow-outline text-gray-700'/>
                            </div>
                        </div>

                        {/* เบอร์โทรศัพท์ */}
                        <div className='mb-5'>
                            <label htmlFor='tel' className='block text-sm mb-3'>
                                เบอร์โทรศัพท์
                            </label>
                            <div>
                                <input id='tel' type='text' autoComplete='off' className='shadow appearance-none rounded w-full 
                                                                                    px-4 py-2 leading-tight focus:outline-none
                                                                                    focus:shadow-outline text-gray-700'/>
                            </div>
                        </div>

                        <h1 className='text-orange-400 text-bold text-3xl mb-5'>ที่อยู่สำหรับการจัดส่ง</h1>
                        <div className="mb-5">
                            <label htmlFor="province" className="block text-sm mb-3">
                                จังหวัด
                            </label>
                            <select id="province" className="shadow appearance-none rounded w-full px-4 py-2 leading-tight focus:outline-none focus:shadow-outline text-gray-700">
                                <option value="">เลือกจังหวัด</option>
                                <option value="bangkok">กรุงเทพมหานคร</option>
                                <option value="chiangmai">เชียงใหม่</option>
                                <option value="chonburi">ชลบุรี</option>
                                {/* เพิ่มจังหวัดอื่น ๆ ตามต้องการ */}
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="district" className="block text-sm mb-3">
                                อำเภอ/เขต
                            </label>
                            <select id="district" className="shadow appearance-none rounded w-full px-4 py-2 leading-tight focus:outline-none focus:shadow-outline text-gray-700">
                                <option value="">เลือกอำเภอ/เขต</option>
                                <option value="mueang">เมือง</option>
                                <option value="saraphi">สารภี</option>
                                <option value="banglamung">บางละมุง</option>
                                {/* เพิ่มอำเภอ/เขตอื่น ๆ ตามต้องการ */}
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="subdistrict" className="block text-sm mb-3">
                                ตำบล/แขวง
                            </label>
                            <select id="subdistrict" className="shadow appearance-none rounded w-full px-4 py-2 leading-tight focus:outline-none focus:shadow-outline text-gray-700">
                                <option value="">เลือกตำบล/แขวง</option>
                                <option value="changphueak">ช้างเผือก</option>
                                <option value="surasak">สุรศักดิ์</option>
                                <option value="bangkapi">บางกะปิ</option>
                                {/* เพิ่มตำบล/แขวงอื่น ๆ ตามต้องการ */}
                            </select>
                        </div>
                        <div className='mb-5'>
                            <label htmlFor='zipcode' className='block text-sm mb-3'>
                                รหัสไปรษณีย์
                            </label>
                            <div>
                                <input id='zipcode' type='text' autoComplete='off' className='shadow appearance-none rounded w-full 
                                                                                    px-4 py-2 leading-tight focus:outline-none
                                                                                    focus:shadow-outline text-gray-700'/>
                            </div>
                        </div>
                        <div className='mb-5'>
                            <label htmlFor='address' className='text-sm'>
                                ที่อยู่
                            </label>
                            <textarea
                                id="address"
                                rows="3"
                                className="shadow appearance-none rounded w-full px-4 py-2 leading-tight focus:outline-none focus:shadow-outline text-gray-700"
                                autoComplete="off"
                                placeholder="กรอกที่อยู่ของคุณที่นี่"
                            />
                        </div>
                    </div>


                    {/* กล่องขวา (สินค้า / การชำระเงิน) */}
                    <div className="bg-white rounded-lg shadow-md p-20 min-h-[200px] w-full md:w-1/2">
                        <h1 className='text-orange-400 text-bold text-3xl mb-5'>รายละเอียดคำสั่งซื้อ</h1>

                        {/* รายละเอียดคำสั่งซื้อ (สิ้นค้า / ยอดรวมทั้งหมด) */}
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="text-left py-3">รายละเอียดสินค้า</th>
                                    <th className="text-right py-3">ยอดรวม</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockData.map((item, idx) => (
                                    <tr key={idx} className="">
                                        <td className="py-5">
                                            <div>{item.name}</div>
                                            <div className="text-sm text-gray-500">จำนวน {item.quantity}</div>
                                        </td>
                                        <td className="py-5 text-right">
                                            ฿{(item.price * item.quantity).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                <tr className=''>
                                    <td className="py-5 font-bold text-left">ยอดรวม {totalItems} รายการ</td>
                                    <td className="py-5 font-bold text-right text-orange-500">฿{totalPrice.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* ประเภทการชำระเงิน */}
                        <div className="mt-8">
                            <label htmlFor='payment' className='text-xl'>ประเภทการชำระ</label>
                            <div className="flex flex-col gap-4 mt-4">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="cod"
                                        name="payment"
                                        value="cod"
                                        className="mr-2"
                                        defaultChecked
                                    />
                                    <label htmlFor="cod" className="">ปลายทาง</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="qrcode"
                                        name="payment"
                                        value="qrcode"
                                        className="mr-2"
                                    />
                                    <label htmlFor="qrcode" className="">QrCode</label>
                                </div>
                            </div>
                        </div>
                        <div className='mt-15 flex justify-end'>
                            <button type='submit' className='text-white bg-lime-400 hover:bg-lime-500 py-2 px-8 rounded shadow-md'
                            onClick={() => setShowPopup(true)}>ยืนยันคำสั่งซื้อ</button>
                        </div>


                    </div>
                </form>

                {/* Popup */}
                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
                        <div className="bg-white rounded-lg shadow-lg px-15 py-15 text-center">
                            <div className="text-2xl text-green-500 mb-2">สั่งซื้อสำเร็จ</div>
                            <div className="text-2xl text-green-500 mb-2">ต้องการไปยังหน้าดูคำสั่งซื้อหรือไม่</div>
                            <div className="flex justify-between mt-8">
                                <button
                                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
                                    style={{ minWidth: 120 }}
                                    onClick={() => {
                                        window.location.href = "/";
                                    }}
                                >
                                    กลับหน้าหลัก
                                </button>
                                <button
                                    className="px-6 py-2 bg-lime-400 hover:bg-lime-500 text-white rounded"
                                    style={{ minWidth: 120 }}
                                    onClick={() => {
                                        window.location.href = "/dashboard";
                                    }}
                                >
                                    ไปหน้าดูคำสั่งซื้อ
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default checkout
