import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import TopCards from '../components/TopCards'

const dashboard = () => {
  return (
    <main className="bg-gray-100 min-h-screen"> 
      <Sidebar> 
        <Header />
        <TopCards />
      </Sidebar>
      
    </main>
  )
}

export default dashboard
