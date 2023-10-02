import React from 'react'

function FriendsPlaying() {
  return (
    <div>

      <div className='flex flex-row gap-6'>


          <div className='backdrop-blur-sm relative bg-white/20 sm:w-full lg:w-[500px] rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
            <div className='mx-4 pb-1' >
                <a href="#"><img className='pt-2 rounded-lg w-full h-full justify-self-center' src={require('../assets/dash-small-pic-placeholder.jpg')} /></a>
                <div className='text-white text-xl ml-2 mt-2'>
                    Baldur's Gate 3
                    <br />
                    $59.99
                </div>
            </div>
          </div>
          <div className='backdrop-blur-sm relative bg-white/20 sm:w-full lg:w-[500px] rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
            <div className='mx-4 pb-1' >
                <a href="#"><img className='pt-2 rounded-lg w-full h-full justify-self-center' src={require('../assets/dash-small-pic-placeholder.jpg')} /></a>
                <div className='text-white text-xl ml-2 mt-2'>
                    Baldur's Gate 3
                    <br />
                    $59.99
                </div>
            </div>
          </div>
          <div className='backdrop-blur-sm relative bg-white/20 sm:w-full lg:w-[500px] rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
            <div className='mx-4 pb-1' >
                <a href="#"><img className='pt-2 rounded-lg w-full h-full justify-self-center' src={require('../assets/dash-small-pic-placeholder.jpg')} /></a>
                <div className='text-white text-xl ml-2 mt-2'>
                    Baldur's Gate 3
                    <br />
                    $59.99
                </div>
            </div>
          </div>
          

      </div>

    </div>
  )
}

export default FriendsPlaying
