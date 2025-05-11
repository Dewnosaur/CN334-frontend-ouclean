/* eslint-disable @next/next/no-html-link-for-pages */
function SignUpForm() {
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
            <form className='text-black'>
                {/*ชื่อผู้ใช้งาน*/}
                <div className='mb-4'>
                    <label htmlFor='username' className='block text-sm mb-3'>  
                        ชื่อผู้ใช้งาน
                    </label>
                    <div>
                        <input id='username' type='text' autoComplete='off' className='shadow appearance-none rounded w-full 
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
                        <input id='email' type='email' autoComplete='off' className='shadow appearance-none rounded w-full 
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
                        <input id='password' type='password' autoComplete='off' className='shadow appearance-none rounded w-full 
                                                                                    px-4 py-2 leading-tight focus:outline-none
                                                                                    focus:shadow-outline text-gray-700'/>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <button type='submit' className='bg-orange-300 hover:bg-orange-400 text-white font-bold px-4 py-2 rounded mt-4 shadow focus:outline-none'>
                        สมัครสมาชิก
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUpForm
