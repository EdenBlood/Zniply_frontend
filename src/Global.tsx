import { Outlet } from 'react-router-dom'
import SpaceTraffic from './components/SpaceTraffic'
import { Bounce, ToastContainer } from 'react-toastify'

export default function Global() {
  return (
    <>
      <div className="spaces-particles min-h-screen">
        <SpaceTraffic />
        <Outlet />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}  
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Bounce}
      />
    </>
  )
}
