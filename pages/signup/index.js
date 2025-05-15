import Footer from '../../components/Footer'
import SignUpForm from '../../components/forms/SignUpForm'
import Header from '../../components/Header'

const signup = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='sticky top-0 z-50'>
        <Header />
      </header>
      <main>
        <SignUpForm />
      </main>

      <Footer />
    </div>
  )
}

export default signup
