import React from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import TopCards from '@/app/components/TopCards'
import BanUsersTable from '../../components/BanUsersTable'
import RecentCard from '@/app/components/RecentCard'

const banusers = () => {
  return (
    <main className="bg-gradient-to-br from-cyan-200 to-cyan-700 min-h-screen">
      <Sidebar> 
        <Header />
        <TopCards />
        <div className="p-4 grid md:grid-cols-3 gid-cols-1 gap-4">
          <BanUsersTable />
          <RecentCard />
        </div>
      </Sidebar>
      
    </main>
  )
}

export default banusers
