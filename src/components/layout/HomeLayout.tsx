import HomeNavbar from '../common/navbar/HomeNavbar'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div className='h-full w-full'>
        <HomeNavbar/>
        <main className='h-full w-full'>
            <Outlet/>
        </main>
    </div>
  )
}

export default HomeLayout