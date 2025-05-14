/* eslint-disable @next/next/no-html-link-for-pages */
import { useState } from "react";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password,
          address,
          tel
        })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data?.detail || "Registration failed");
        return;
      }
      // Registration successful, redirect or show success
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className='flex justify-center items-center my-20'>
        <div className='bg-white shadow-md rounded px-16 pt-6 pb-8 mb-4 w-full max-w-xl'>
            <h2 className='flex gap-6 justify-center text-3xl font-bold my-6'>
                <span className='text-black hover:text-orange-300'>
                    <a href='/login'>เข้าสู่ระบบ</a>
                    </span>
                <span className='text-black'>/</span>
                <span className='text-orange-300'>
                    <a href='/signup'>สมัครสมาชิก</a>
                </span>
            </h2>
            <form className='text-black' onSubmit={handleRegister}>
                {/*ชื่อผู้ใช้งาน*/}
                <div className='mb-4'>
                    <label htmlFor='username' className='block text-sm mb-3'>  
                        ชื่อผู้ใช้งาน
                    </label>
                    <div>
                        <input id='username' type='text' autoComplete='off' value={username} onChange={(e) => setUsername(e.target.value)} className='shadow appearance-none rounded w-full 
                                                                                    px-4 py-2 leading-tight focus:outline-none
                                                                                    focus:shadow-outline text-gray-700'/>
                    </div>
                </div>
                {/* อีเมล */}
                <div className='mb-4'>
                    <label htmlFor='email' className='block text-sm mb-3'>  
                        อีเมล
                    </label>
                    <div>
                        <input id='email' type='email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} className='shadow appearance-none rounded w-full 
                                                                                    px-4 py-2 leading-tight focus:outline-none
                                                                                    focus:shadow-outline text-gray-700'/>
                    </div>
                </div>
                {/* รหัสผ่าน */}
                <div className='mb-4'>
                    <label htmlFor='password' className='block text-sm mb-3'>  
                        รหัสผ่าน
                    </label>
                    <div>
                        <input id='password' type='password' autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} className='shadow appearance-none rounded w-full 
                                                                                    px-4 py-2 leading-tight focus:outline-none
                                                                                    focus:shadow-outline text-gray-700'/>
                    </div>
                </div>
                {/* ที่อยู่ */}
                <div className='mb-4'>
                    <label htmlFor='address' className='block text-sm mb-3'>  
                        ที่อยู่
                    </label>
                    <div>
                        <input id='address' type='text' autoComplete='off' value={address} onChange={(e) => setAddress(e.target.value)} className='shadow appearance-none rounded w-full 
                                                                                    px-4 py-2 leading-tight focus:outline-none
                                                                                    focus:shadow-outline text-gray-700'/>
                    </div>
                </div>
                {/* เบอร์โทร */}
                <div className='mb-4'>
                    <label htmlFor='tel' className='block text-sm mb-3'>  
                        เบอร์โทร
                    </label>
                    <div>
                        <input id='tel' type='text' autoComplete='off' value={tel} onChange={(e) => setTel(e.target.value)} className='shadow appearance-none rounded w-full 
                                                                                    px-4 py-2 leading-tight focus:outline-none
                                                                                    focus:shadow-outline text-gray-700'/>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <button type='submit' className='bg-orange-300 hover:bg-orange-400 text-white font-bold px-4 py-2 rounded mt-4 shadow focus:outline-none'>
                        สมัครสมาชิก
                    </button>
                </div>
                {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
            </form>
        </div>
    </div>
  )
}

export default SignUpForm
