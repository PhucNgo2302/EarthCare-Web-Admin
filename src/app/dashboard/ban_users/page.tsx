import React from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import TopCards from '@/app/components/TopCards'
import BanUsersTable from '../../components/BanUsersTable'

const banusers = () => {
  return (
    <main className="bg-gray-100 min-h-screen">
      <Sidebar> 
        <Header />
        <TopCards />
        <div className="p-4 grid md:grid-cols-3 gid-cols-1 gap-4">
          <BanUsersTable />
        </div>
      </Sidebar>
      
    </main>
  )
}

export default banusers
