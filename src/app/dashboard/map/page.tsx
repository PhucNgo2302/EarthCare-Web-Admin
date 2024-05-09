import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import React from 'react'
import MapLocation  from '@/app/components/MapLocation'

const Map = () => {
  return (
    <main className="bg-gradient-to-br from-cyan-200 to-cyan-700 min-h-screen"> 
      <Sidebar> 
        <Header />
        <div className='w-full p-4'>
            <div className="w-full bg-white p-4 rounded-lg">
                <MapLocation />
            </div>
        </div>
      </Sidebar>
      
    </main>
  )
}

export default Map
