import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const cart = () => {
    const [cartData, setCartData] = useState([]);
    const [quantities, setQuantities] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartData(storedCart);
        setQuantities(storedCart.map(item => item.quantity));
    }, []);

    const increment = (index) => {
        const newQuantities = quantities.map((q, i) => (i === index ? q + 1 : q));
        setQuantities(newQuantities);
        updateCartQuantity(index, newQuantities[index]);
    };

    const decrement = (index) => {
        const newQuantities = quantities.map((q, i) => (i === index ? Math.max(q - 1, 1) : q));
        setQuantities(newQuantities);
        updateCartQuantity(index, newQuantities[index]);
    };

    const updateCartQuantity = (index, newQuantity) => {
        const updatedCart = [...cartData];
        updatedCart[index].quantity = newQuantity;
        setCartData(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const totalPrice = cartData.reduce((total, item, index) => {
        return total + item.price * (quantities[index] || 1);
    }, 0);

    return (
        <div className='flex flex-col min-h-screen'>
            <header className='sticky top-0 z-50'>
                <Header />
            </header>

            <main className='flex-1'>

                <div className='mt-10 mx-[20%] flex flex-col items-center shadow-md'>

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
                            {cartData.map((item, index) => (
                                <tr key={index}>
                                    <td className='p-4 text-sm flex items-center'>
                                        <img src={item.image} className='w-20 h-20 mr-4' alt={item.name} />
                                        <a href='#' className='hover:underline hover:text-orange-400'>{item.name}</a>
                                    </td>
                                    <td className='p-4 text-sm'>{item.price}</td>
                                    <td className='p-4 text-sm'>
                                        <div className='flex items-center text-white'>
                                            <button
                                                onClick={() => decrement(index)}
                                                className='bg-orange-300 px-2 py-1 rounded-l hover:bg-orange-400'
                                            >
                                                -
                                            </button>
                                            <div className='bg-orange-300 px-4 py-1'>{quantities[index]}</div>
                                            <button
                                                onClick={() => increment(index)}
                                                className='bg-orange-300 px-2 py-1 rounded-r hover:bg-orange-400'
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className='p-4 text-sm'>{(item.price * (quantities[index] || 1)).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className='bg-white'>
                            <tr className=''>
                                <td></td>
                                <td></td>
                                <td className='font-bold'>
                                    <div className='p-6'>ยอดรวม</div>
                                </td>
                                <td id='totalPrice' className='font-bold'>{totalPrice.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="4" className='p-4'>
                                    <div className='flex justify-between'>
                                        <a href="menu" className='bg-orange-300 px-4 py-2 m-5 text-white hover:bg-orange-400 w-50 text-center rounded shadow-md'>กลับไปดูเมนู</a>
                                        <a href="checkout" className='bg-lime-400 px-4 py-2 m-5 text-white hover:bg-lime-500  w-50 text-center rounded shadow-md'>ดำเนินการสั่งซื้อ</a>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default cart;
