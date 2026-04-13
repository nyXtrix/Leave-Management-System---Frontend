import Navbar from '../common/navbar/Navbar'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='h-full w-full'>
        <Navbar className='h-20'/>
        <main className='h-full w-full p-4'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AuthLayout