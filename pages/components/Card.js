import Image from 'next/image'
import React from 'react'



const Card = ({id, image, imagealt, name, price }) => {
    return (
        <div className='bg-white rounded shadow-md'>
            <a href={`/menu/${id}`}>
                <img src={image} alt={imagealt} className='w-full h-56 rounded' />
            </a>
            
            <div className='p-2'>
                <div className='w-full flex justify-center h-12'>
                    <a href={`/menu/${id}`} className='font-bold text-center mt-1'>{name}</a>
                </div>
                <div className=''>
                    <p className='text-center mt-1'>{price} บาท</p>
                    <div className='mt-1 text-center flex justify-center'>
                        <button className='bg-orange-300 py-2 px-5 rounded text-white hover:bg-orange-400'>ใส่ตะกร้า</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Card
