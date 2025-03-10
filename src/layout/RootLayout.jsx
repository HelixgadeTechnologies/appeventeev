import React from 'react'
import { Outlet } from 'react-router-dom'
import DisplayLayout from './DisplayLayout'

const RootLayout = () => {
  return (
    <DisplayLayout>
      <Outlet/>
    </DisplayLayout>
  )
}

export default RootLayout
