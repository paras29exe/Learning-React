import React, { useEffect, useState } from 'react';
import dbService from '../appwrite/dbServices';
import { Container, Loader, PostCardPreview } from '../components';
import { useSelector } from 'react-redux';

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        dbService.listPosts([]).then((posts) => {
            if (userData) {
                const userPosts = posts.documents.filter((post) => post.userId === userData.$id)
                userPosts ? (setPosts(userPosts), setLoading(false)) : setLoading(false)

            } else {
                setLoading(false);
            }
        });
    }, [])


    return (
        <div className='w-full py-8'>
            <Container>
                {loading ? (
                    <Loader />
                ) : (
                    <div className='px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
                        {posts.map((post) => (
                            <div key={post.$id}>
                                <PostCardPreview {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default MyPosts;