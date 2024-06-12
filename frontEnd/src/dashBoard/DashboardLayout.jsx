import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div> this is the dashboard
        <Outlet/>
    </div>
  )
}

export default DashboardLayout