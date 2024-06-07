import React from 'react'
import { service } from '../appwrite/dbServices'
import { Link } from 'react-router-dom'

function PostCardPreview({ $id, title, featuredImage }) {
    // all these props are coming directly from Appwrite not from user and it give ID as $id 
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {/* featured image is give as ID in getFilePreview because $id is the overall post id but we want only the image id and that image ID is associated with image itself*/}
                    <img src={service.getFilePreview(featuredImage)} alt={title}
                        className='rounded-xl' />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCardPreview
