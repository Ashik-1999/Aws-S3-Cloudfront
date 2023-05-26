import React, {useEffect, useState} from 'react'
import SinglePost from '../components/SinglePost'
import {useNavigate} from 'react-router-dom'
import axios from '../utils/axios'
import Navbar from '../components/Navbar'

const ViewPost = () => {
    const [posts, setPosts] = useState([])


    useEffect(() => {
        const fetchPosts = async() => {
            const {data} = await axios.get('/posts/get-posts')
            setPosts(data)
        }
        fetchPosts()
    }, [])
    console.log(posts)
    

  return (
    <div className="App">

    <div className="flex flex-col space-y-100 items-center divide-y bg-gray-100">
      {posts.map(post => (
        <div key={`post-${post.id}`} className="px-5 py-14">

          <SinglePost className="relative" post={post}></SinglePost>
          
        </div>
      ))}
    </div>

  </div>

  )
}

export default ViewPost
