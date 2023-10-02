import React from 'react'

function DashHead() {
  return (
    <div className= 'content-center'>
      <div className='pt-2 backdrop-blur-sm bg-white/20 flex-row sm:w-full lg:w-full rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
        <div className='mx-4 pb-1' >
            <a href="https://store.steampowered.com/app/108600/Project_Zomboid/"><img className='rounded-lg w-full h-3/6 justify-self-center' src={require('../assets/dash-head-placeholder.jpg')} /></a>
            <div className='text-white text-2xl ml-4 mt-2'>
                Project Zomboid
                <br />

                <p className='text-4xl' >$19.99</p>
                
                
            </div>
        </div>
      </div>

    </div>
  )
}

export default DashHead
