import React from 'react'

const Footer = () => {
  return (
    <footer className='mt-20 absolute-bottom top-0 left-0 w-full h-full bg-white py-14 px-4 md:px-16 lg:px-28'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div>
                <h2 className='text-lg font-bold mb-4'>OuClean (อู๋คลีน)</h2>
                <p>อู๋คลีน ร้านขายอาหารคลีนเพิ่อสุขภาพ ทำจากวัตถุดิบคุณภาพ 
                ปรุงสดใหม่ทุกวัน สุขภาพดีทุกคำที่กิน</p>
            </div>
            <div>
            </div>
            <div>
                <h2 className='text-lg font-bold mb-4'>ติดต่อเรา</h2>
                <ul>
                    <li>Tel : 911</li>
                    <li>Email : ouclean@gmail.com</li>
                    <li>line : @OuCleanFood</li>
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer
