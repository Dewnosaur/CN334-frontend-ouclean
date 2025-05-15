/* eslint-disable @next/next/no-html-link-for-pages */
import { useEffect, useState } from "react";

const Nav = () => {
  const isLogin = true;
  const [menuOpen, setMenuOpen] = useState(false);

  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const handleStorageChange = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
      setCartQuantity(totalQuantity);
    };

    // เรียกใช้ handleStorageChange เมื่อ component โหลดขึ้นมา
    handleStorageChange();

    // ฟังการเปลี่ยนแปลงใน localStorage
    window.addEventListener("storage", handleStorageChange);

    // Clean up เมื่อ component ถูก unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);  // เรียกแค่ครั้งเดียวเมื่อ component โหลด

  return (
    <header className="bg-white shadow p-4">
      <nav className="w-[92%] mx-auto flex justify-between items-center">
        {/* ฝั่งซ้าย: โลโก้และเมนู (desktop) */}
        <div className="flex items-center gap-4">
          {/* โลโก้ */}
          <div>
            <img className="w-16" src="/OuClean-logo.png" alt="OuClean" />
          </div>

          {/* เมนูใหญ่ (ซ่อนบนมือถือ) */}
          <ul className="hidden md:flex flex-row gap-10 text-xl text-gray-700">
            <li className="hover:text-orange-300">
              <a href="/">หน้าหลัก</a>
            </li>
            <li className="hover:text-orange-300">
              <a href="/menu">เมนู</a>
            </li>
          </ul>
        </div>

        {/* ฝั่งขวา: cart + profile/login */}
        <div className="flex items-center gap-6">
          {/* cart */}
          <div className="w-10 h-auto bg-gray-100 rounded-full flex justify-center items-center hover:bg-orange-300 cursor-pointer relative">
            <a href="/cart">
              <img src="/cart-icon.png" alt="cart" />
            </a>
            <span id="cart" className="absolute w-[20px] h-[20px] bg-red-500 rounded-full top-2/3 right-1/2 flex justify-center items-center text-white text-sm">{cartQuantity}</span>
          </div>

          {/* profile / login */}
          {isLogin ? (
            <div className="w-10 h-auto cursor-pointer">
              <a href="/dashboard">
                <img src="/profile-icon.png" alt="profile" />
              </a>
            </div>
          ) : (
            <button className="text-white font-bold">
              <a
                href="login"
                className="bg-orange-300 hover:bg-orange-400 px-3 py-2 rounded shadow focus:outline-none"
              >
                เข้าสู่ระบบ / สมัครสมาชิก
              </a>
            </button>
          )}

          {/* Hamburger menu (mobile only) */}
          <button
            className="md:hidden flex flex-col justify-center items-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </button>
        </div>
      </nav>

      {/* เมนูบนมือถือ (แสดงเมื่อคลิก hamburger) */}
      {menuOpen && (
        <div className="md:hidden mt-5 bg-white border-t border-gray-200 px-4 pb-2">
          <ul className="flex flex-col gap-4 text-lg text-gray-700">
            <li>
              <a href="/" className="block hover:text-orange-300 mt-5">
                หน้าหลัก
              </a>
            </li>
            <li>
              <a href="/menu" className="block hover:text-orange-300">
                เมนู
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Nav;
