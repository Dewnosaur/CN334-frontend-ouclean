import {React, useState, useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import useAuthRedirect from '../../hooks/useAuthRedirect';

const checkout = () => {
    useAuthRedirect();
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartData(storedCart);
    }, []);

    // Calculate totals based on cartData
    const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [showPopup, setShowPopup] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [receiptImage, setReceiptImage] = useState(null);

    return (
        <div className='flex flex-col min-h-screen'>
            <header className='sticky top-0 z-50'>
                <Header />
            </header>
            <main className="flex flex-1 mt-5 justify-center py-8">
                <form className="flex flex-col md:flex-row items-start gap-10 w-full max-w-6xl px-10" onSubmit={async (e) => {
                    e.preventDefault();

                    // Compose shipping address as a single string
                    const shipping_address =
                        `ที่อยู่: ${e.target.address.value}, ` +
                        `ตำบล/แขวง: ${e.target.subdistrict.value}, ` +
                        `อำเภอ/เขต: ${e.target.district.value}, ` +
                        `จังหวัด: ${e.target.province.value}, ` +
                        `รหัสไปรษณีย์: ${e.target.zipcode.value}`;

                    // Get user token and user id (replace with your actual logic)
                    const token = localStorage.getItem('token'); // or however you store it
                    const userId = localStorage.getItem('user_id'); // or get from context/auth

                    console.log('Token:', token);

                    // 1. Create Payment
                    const paymentForm = new FormData();
                    paymentForm.append('payment_owner', userId);
                    paymentForm.append('method', paymentMethod === "cod" ? "cod" : "promptpay");
                    if (paymentMethod === "promptpay" && receiptImage) {
                        paymentForm.append('slip', receiptImage);
                    }

                    let paymentId = null;
                    try {
                        const token = localStorage.getItem('token');
                        const paymentRes = await fetch('https://three34-ouclean.onrender.com/api/payments/', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Token ${token}`,
                            },
                            body: paymentForm,
                        });
                        if (!paymentRes.ok) {
                            const errorText = await paymentRes.text();
                            alert('เกิดข้อผิดพลาดในการสร้างข้อมูลการชำระเงิน\n' + errorText);
                            return;
                        }
                        const paymentData = await paymentRes.json();
                        paymentId = paymentData.id;
                    } catch (err) {
                        alert('เกิดข้อผิดพลาดในการเชื่อมต่อ (ชำระเงิน)');
                        return;
                    }

                    // 2. Create Order
                    const orderData = {
                        total_price: totalPrice,
                        shipping_address: shipping_address,
                        payment: paymentId,
                        products: cartData.map(item => ({
                            name: item.name,
                            quantity: item.quantity,
                            total_price: item.price * item.quantity
                        }))
                    };

                    console.log('Order payload:', orderData);

                    try {
                        const orderRes = await fetch('https://three34-ouclean.onrender.com/api/orders/', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Token ${token}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(orderData),
                        });

                        if (orderRes.ok) {
                            localStorage.removeItem('cart');
                            setShowPopup(true);
                        } else {
                            const errorText = await orderRes.text();
                            alert('เกิดข้อผิดพลาดในการส่งข้อมูลคำสั่งซื้อ\n' + errorText);
                            console.error('Error:', errorText);
                        }
                    } catch (err) {
                        alert('เกิดข้อผิดพลาดในการเชื่อมต่อ (คำสั่งซื้อ)');
                    }
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
                                {cartData.map((item, idx) => (
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
                                        checked={paymentMethod === "cod"}
                                        onChange={() => setPaymentMethod("cod")}
                                    />
                                    <label htmlFor="cod" className="">ปลายทาง</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="promptpay"
                                        name="payment"
                                        value="promptpay"
                                        className="mr-2"
                                        checked={paymentMethod === "promptpay"}
                                        onChange={() => setPaymentMethod("promptpay")}
                                    />
                                    <label htmlFor="promptpay" className="">PromptPay</label>
                                </div>
                            </div>
                            {paymentMethod === "promptpay" && (
                                <div className="mt-4 p-4 bg-gray-100 rounded">
                                    <div className="mb-2 text-lg font-semibold text-blue-600">
                                        081-550-5535 พนมไพร ดาบทอง
                                    </div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        แนบสลิปการชำระเงิน
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setReceiptImage(e.target.files[0])}
                                        className="mb-2"
                                    />
                                    {receiptImage && (
                                        <div className="mt-2">
                                            <img
                                                src={URL.createObjectURL(receiptImage)}
                                                alt="สลิปการชำระเงิน"
                                                className="max-h-40 rounded border"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
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
