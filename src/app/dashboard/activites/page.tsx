import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import TopCards from '@/app/components/TopCards'
import Activities from '@/app/components/Activities'
import RecentCard from "@/app/components/RecentCard";
import React from 'react'

const activites = () => {
  return (
    <div>
      <main className="bg-gradient-to-br from-cyan-200 to-cyan-700 min-h-screen">
      <Sidebar> 
        <Header />
        <TopCards />    
        <div className="p-4 grid md:grid-cols-3 gid-cols-1 gap-4">
          <Activities />
          <RecentCard />
        </div>
      </Sidebar>
      
    </main>
    </div>
  )
}

export default activites
