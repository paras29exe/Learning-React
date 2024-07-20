import React, { useEffect } from 'react'
import { ID } from 'appwrite'
import { useForm } from 'react-hook-form'
import { Button, Input, SelectField, RTE, Loader } from '../index'
import dbService from '../../appwrite/dbServices'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors }, clearErrors } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || '',
        }
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const [loading, setLoading] = React.useState(false)

    const [prevImgUrl, setPrevImgUrl] = React.useState(null)
    const [newImgFile, setNewImgFile] = React.useState(null)
    const [newImgPreview, setNewImgPreview] = React.useState(null)

    const fileInputRef = React.useRef(null)

    useEffect(() => {
        if (post) {
            setValue('slug', post.$id);
            dbService.getFilePreview(post.featuredImage).then((url) => {
                if (url) {
                    setPrevImgUrl(url);
                }
            });
        } else {
            setValue('slug', ID.unique());
        }

    }, [])
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setNewImgFile(file)
            clearErrors("image")
            const reader = new FileReader()
            reader.onloadend = () => {
                setNewImgPreview(reader.result)
            }
            reader.readAsDataURL(file)
        } else {
            setNewImgPreview(null)
        }
    }

    const removeImage = () => {
        setNewImgFile(null)
        setNewImgPreview(null)
        setPrevImgUrl(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const submit = async (data) => {
        setLoading(true)
        if (post) {
            const file = newImgFile ? await dbService.uploadFile(newImgFile) : null

            if (file) {
                dbService.deleteFile(post.featuredImage)
            }

            const updatedPost = await dbService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : null,
            })

            if (updatedPost) {
                setLoading(false)
                navigate(`/posts/${updatedPost.$id}`)
            }
        } else {
            // handle create post logic
            const file = await dbService.uploadFile(newImgFile)

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId

                const newPost = await dbService.createPost({
                    ...data,
                    userId: userData.$id,
                })
                if (newPost) {
                    navigate(`/posts/${newPost.$id}`)
                    setLoading(false)
                }
            } else {
                console.error("File upload failed")
                setLoading(false)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="flex max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-xl">
            <div className="w-full md:w-2/3 px-2 mb-4">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && <span className="text-red-500 mt">{errors.title.message}</span>}
                <Input
                    label="Document ID :"
                    placeholder="Slug"
                    className="mb-4 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("slug", { required: "Slug is required" })}
                    readOnly
                />
                {errors.slug && <span className="text-red-500 mt">{errors.slug.message}</span>}
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.content && <span className="text-red-500 mt">{errors.content.message}</span>}
            </div>
            <div className="w-full md:w-1/3 px-2 mb-4">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post && !newImgFile && "Image is required" })}
                    onChange={handleImageChange}
                    ref={fileInputRef}
                />
                {errors.image && <span className="text-red-500 mt">{errors.image.message}</span>}
                {newImgPreview ? (
                    <div className="relative w-full mb-4">
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-600 w-6 h-6 rounded-full text-white text-2xl font-bold flex items-center justify-center pb-1 shadow-md hover:bg-red-700 transition-colors duration-200"
                        >
                            &times;
                        </button>

                        <img
                            src={newImgPreview}
                            alt="New Preview"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                ) : (
                    (post && prevImgUrl) && (
                        <div className="w-full mb-4">
                            <img
                                src={prevImgUrl}
                                alt={post.title}
                                className="rounded-lg shadow-md"
                            />

                        </div>
                    )
                )}
                <SelectField
                    options={["active", "inactive"]}
                    label="Status :"
                    className="mb-4 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("status", { required: "Status is required" })}
                />
                {errors.status && <span className="text-red-500 mt">{errors.status.message}</span>}
                {loading ? <Loader /> : <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : "bg-blue-500"}
                    className="w-full py-2 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    btnText={post ? "Update" : "Create"}
                />
                }

            </div>
        </form>
    )
}

export default PostForm
