/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";

const Nav = () => {
  const isLogin = true;
  return (
    <div>
      <header className="bg-white shadow p-4">
        <nav className="flex justify-between w-[92%] mx-auto">
          {/* items ฝั่งซ้าย (logo, หน้าหลัก, เมนู) */}
          <div className="flex justify-self-start gap-16">

            {/* โลโก้ OuClean */}
            <div className="">
              <img className="w-16" src="OuClean-logo.png" alt="OuClean" />
            </div>

            {/* หน้าหลัก , เมนู */}
            <div className="flex items-center">
              <ul className="flex flex-row gap-16 text-xl text-gray-700">
                <li className="hover:text-orange-300">
                  <a href="/">หน้าหลัก</a>
                </li>
                <li className="hover:text-orange-300">
                  <a href="/menu">เมนู</a>
                </li>
              </ul>
            </div>
          </div>

          {/* items ฝั่งขวา (cart, profile / login) */}
          <div className="flex items-center gap-16">
            {/* cart */}
            <div className="w-10 h-auto bg-gray-100 rounded-full flex justify-center items-center hover:bg-orange-300 cursor-pointer relative ">
              <a href="cart">
                <img className="" src="cart-icon.png"/>
              </a>
              <span className="flex absolute w-[20px] h-[20px] bg-red-500 rounded-full top-2/3 right-1/2 justify-center items-center text-white text-sm">0</span>
            </div>

            {/* profile / login */}
            {isLogin ? (
              <div className="w-10 h-auto justify-center items-center cursor-pointer">
                <a href="dashboard">
                  <img src="profile-icon.png"/>
                </a>
                
              </div>
              ) : (
                <div className="">
                  <button className="text-white text-center font-bold">
                    <a href="login" className="bg-orange-300 hover:bg-orange-400 px-4 py-2 rounded mt-4 shadow focus:outline-none">
                      เข้าสู่ระบบ / สมัครสมาชิก
                    </a>
                  </button>
                </div>
              )}
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Nav
