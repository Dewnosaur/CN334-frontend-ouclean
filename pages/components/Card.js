import Image from 'next/image'
<<<<<<< HEAD
import React from 'react'
import { useRouter } from 'next/router'
=======
import {React, useState} from 'react'
>>>>>>> 28c46a0fc548689aad3f06a3844c374a8ca587da

const Card = ({ id, image, imagealt, name, price, onAddToCart }) => {
    const router = useRouter();

<<<<<<< HEAD
=======

const Card = ({id, image, imagealt, name, price }) => {

    const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')

    const existing = cart.find(item => item.id === id)
    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({ id, image, name, price, quantity: 1 })
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    alert('ใส่ตะกร้าแล้ว')

    window.location.reload()
  }

>>>>>>> 28c46a0fc548689aad3f06a3844c374a8ca587da
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
<<<<<<< HEAD
                        <button
                            className='bg-orange-300 py-2 px-5 rounded text-white hover:bg-orange-400'
                            onClick={() => {
                                const item = { id, name, price, image };
                                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                                const existing = cart.find(i => i.id === item.id);
                                if (existing) {
                                    existing.quantity += 1;
                                } else {
                                    cart.push({ ...item, quantity: 1 });
                                }
                                localStorage.setItem('cart', JSON.stringify(cart));
                                router.push('/cart'); // Navigate to cart page
                            }}
                        >
=======
                        <button className='bg-orange-300 py-2 px-5 rounded text-white hover:bg-orange-400'
                        onClick={addToCart}>
>>>>>>> 28c46a0fc548689aad3f06a3844c374a8ca587da
                            ใส่ตะกร้า
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
