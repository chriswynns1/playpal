import React from 'react'

function DashHead() {
  return (
    <div className= 'grid gap-4 px-10 pt-3 grid-cols-4'>
      <div className='backdrop-blur-sm bg-white/20 col-span-4 rounded-lg'>
        <div className='mr-4 pb-4' >
            <img className='rounded-lg max-w-full' src={require('../assets/dash-head-placeholder.jpg')} />
            <div className='text-white text-2xl ml-4 mt-2'>
                Project Zomboid
                <br />
                <p className='text-4xl' >$19.99</p>
                    <a href="#" class="inline-flex float-right items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="w-full">Check it out on Steam</span>
                    <svg class="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                    </a> 
            </div>
        </div>
      </div>

    </div>
  )
}

export default DashHead
