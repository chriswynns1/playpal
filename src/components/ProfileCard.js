import React from 'react'

function ProfileCard({ name, avatar }) {
  return (
    <div>
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-end px-4 pt-4">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
            </div>
            <div class="flex flex-col items-center pb-10">
                <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={avatar} alt={name}/>
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">Online</span>
                <div class="flex mt-4 space-x-3 md:mt-6">
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileCard
