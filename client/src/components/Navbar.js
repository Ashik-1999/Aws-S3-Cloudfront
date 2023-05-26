
import React from 'react'
import { useNavigate,NavLink } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  return (
    <nav class="bg-gray-100">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between">
  
        <div class="flex space-x-4">
       
          <div>
            <a href="#" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
              <svg class="h-6 w-6 mr-1 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span class="font-bold">PostWorld</span>
            </a>
          </div>
  
  
          <div class="hidden md:flex items-center space-x-1">
            <NavLink to='/add-post' className="py-5 px-3 text-gray-700 hover:text-gray-900">New Post</NavLink>
            <NavLink to="/" className="py-5 px-3  text-gray-700 hover:text-gray-900">All Posts</NavLink>
          </div>
        </div>
  
    
  
      </div>
    </div>
  </nav>
  )
}

export default Navbar


