import Footer from '../../components/Footer'
import LoginForm from '../../components/forms/LoginForm'
import Header from '../../components/Header'

const login = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='sticky top-0 z-50'>
        <Header />
      </header>
      <main className='flex-1'>
        <LoginForm />
      </main>
      <Footer />
    </div>

  )
}

export default login
