import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dbService from '../appwrite/dbServices';

function PostCardPreview({ $id, title, featuredImage }) {
    const [imgUrl, setImgUrl] = useState(null);

    dbService.getFilePreview(featuredImage).then((url) => {
        if (url) {
            setImgUrl(url);
        }
    });


    return (
        <Link to={`/posts/${$id}`}>
            <div className='w-full bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
                <div className='w-full flex justify-center mb-4'>
                    {imgUrl ? (
                        <img src={imgUrl} alt={title} className='rounded-xl w-full h-48 object-cover border-2 border-gray-300' />
                    ) : (
                        <div className='w-full h-48 bg-gray-200 rounded-xl animate-pulse'></div>
                    )}
                </div>
                <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
            </div>
        </Link>
    );
}

export default PostCardPreview;