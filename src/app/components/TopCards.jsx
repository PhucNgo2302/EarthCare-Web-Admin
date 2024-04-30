import React from 'react'

const TopCards = () => {
  return (
    <div className='grid lg:grid-cols-5 gap-4 p-4'>
      <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pd-4'>
            <p className='text-2xl font-bold'>Number of Users</p>
            <p className='text-gray-600'>100</p>
        </div>
      </div>
      <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pd-4'>
            <p className='text-2xl font-bold'>Number of Users</p>
            <p className='text-gray-600'>100</p>
        </div>
      </div>
      <div className=' bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pd-4'>
            <p className='text-2xl font-bold'>Number of Users</p>
            <p className='text-gray-600'>100</p>
        </div>
      </div>
    </div>
  )
}

export default TopCards
