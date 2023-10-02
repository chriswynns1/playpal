import React from 'react'

function FriendCard() {
  return (
    <div className='overflow-y-auto h-72 relative max-w mx-auto bg-white dark:bg-slate-800 rounded-xl flex flex-col divide-y dark:divide-slate-200/5'>
        <div className='pt-2 text-2xl text-center font-bold'>Friends</div>
            <div className='flex items-center gap-4 p-4'>
                <img className='w-12 h-12 rounded-full' src={require('../assets/aviplace.png')} />
                <div className='flex flex-col'>
                    <span className='pl-3 text-lg'>Friend's username</span>
                    <span className='pl-3 text-sm text-gray-500'>Online</span>
                </div>
            </div>
            <div className='flex items-center gap-4 p-4'>
                <img className='w-12 h-12 rounded-full' src={require('../assets/aviplace.png')} />
                <div className='flex flex-col'>
                    <span className='pl-3 text-lg'>Friend's username</span>
                    <span className='pl-3 text-sm text-gray-500'>Online</span>
                </div>
            </div>
            <div className='flex items-center gap-4 p-4'>
                <img className='w-12 h-12 rounded-full' src={require('../assets/aviplace.png')} />
                <div className='flex flex-col'>
                    <span className='pl-3 text-lg'>Friend's username</span>
                    <span className='pl-3 text-sm text-gray-500'>Online</span>
                </div>
            </div>
            <div className='flex items-center gap-4 p-4'>
                <img className='w-12 h-12 rounded-full' src={require('../assets/aviplace.png')} />
                <div className='flex flex-col'>
                    <span className='pl-3 text-lg'>Friend's username</span>
                    <span className='pl-3 text-sm text-gray-500'>Online</span>
                </div>
            </div>
            <div className='flex items-center gap-4 p-4'>
                <img className='w-12 h-12 rounded-full' src={require('../assets/aviplace.png')} />
                <div className='flex flex-col'>
                    <span className='pl-3 text-lg'>Friend's username</span>
                    <span className='pl-3 text-sm text-gray-500'>Online</span>
                </div>
            </div>
            <div className='flex items-center gap-4 p-4'>
                <img className='w-12 h-12 rounded-full' src={require('../assets/aviplace.png')} />
                <div className='flex flex-col'>
                    <span className='pl-3 text-lg'>Friend's username</span>
                    <span className='pl-3 text-sm text-gray-500'>Online</span>
                </div>
            </div>
            <div className='flex items-center gap-4 p-4'>
                <img className='w-12 h-12 rounded-full' src={require('../assets/aviplace.png')} />
                <div className='flex flex-col'>
                    <span className='pl-3 text-lg'>Friend's username</span>
                    <span className='pl-3 text-sm text-gray-500'>Online</span>
                </div>
            </div>
    </div>
  )
}

export default FriendCard
