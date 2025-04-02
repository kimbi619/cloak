import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../page/dashboard/Dashboard'
import Home from '../page/private/Home'

const PrivateRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default PrivateRoute
