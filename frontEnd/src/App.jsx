import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/MyFooter'

function App() {
  return (

    <>
    <Navbar/>
    <div className='min-h-screen'>
      <Outlet/>   
      </div>
    <Footer/>
    
    </>
  )
}

export default App