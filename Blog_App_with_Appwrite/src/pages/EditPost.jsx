import React from 'react'
import { Container, PostForm } from '../components'
import dbService from '../appwrite/dbServices'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = React.useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()


    React.useEffect(() => {
        if (slug) {
            dbService.getPost(slug).then((post) => {
                if(post){
                    setPost(post)
                }
            })

        } else {
            navigate('/')
        }

    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost