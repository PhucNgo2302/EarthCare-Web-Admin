import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import TopCards from '../components/TopCards'
import UsersTable from "../components/UserTable";

const dashboard = () => {
  return (
    <main className="bg-gray-100 min-h-screen"> 
      <Sidebar> 
        <Header />
        <TopCards />
        <div className="p-4 grid md:grid-cols-3 gid-cols-1 gap-4">
          <UsersTable />
        </div>
      </Sidebar>
      
    </main>
  )
}

export default dashboard
