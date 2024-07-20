
import React, {useEffect, useState} from 'react'
import dbService from "../appwrite/dbServices";
import {Container, Loader, PostCardPreview} from '../components'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state)=>state.auth.status)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dbService.listPosts().then((posts) => {
            if (posts) {
                setLoading(false)
                setPosts(posts.documents)
            }else setLoading(false)
        })
    }, [])
  
    if(!authStatus){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold ">
                                Please <Link to={'/login'} className='text-blue-700 underline'> Login </Link> to see posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
     }else if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {loading? <Loader/> : "No Post Available"}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
                    {posts.map((post) => (
                        <div key={post.$id} className=''>
                            <PostCardPreview {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
