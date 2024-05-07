import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import TopCards from '@/app/components/TopCards'
import Activities from '@/app/components/Activities'
import React from 'react'

const activites = () => {
  return (
    <div>
      <main className="bg-gray-100 min-h-screen">
      <Sidebar> 
        <Header />
        <TopCards />    
        <div className="p-4 grid md:grid-cols-3 gid-cols-1 gap-4">
          <Activities />
        </div>
      </Sidebar>
      
    </main>
    </div>
  )
}

export default activites
