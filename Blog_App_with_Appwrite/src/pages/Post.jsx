import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/dbServices";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const [imgUrl, setImgUrl] = useState(null);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            dbService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    dbService.getFilePreview(post.featuredImage).then((url) => {
                        if (url) {
                            setImgUrl(url);
                        }
                    });
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        dbService.deletePost(post.$id).then((status) => {
            if (status) {
                dbService.deleteFile(post.featuredImage);
                navigate("/my-posts");
            }
        });
    };

    return post ? (
        <div className="py-8 text-center">
            <Container>
                <div className="max-w-2xl  mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200">
                    <div className="relative mb-4">
                        <img
                            src={imgUrl}
                            alt={post.title}
                            className="w-full h-auto object-contain rounded-lg border border-gray-700"
                        />
                        {isAuthor && (
                            <div className="absolute right-4 top-4">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button
                                        bgColor="bg-green-500 hover:bg-green-600"
                                        className="mr-3 transition-colors ease-in-out duration-200"
                                        btnText={"Edit"}
                                    />
                                </Link>
                                <Button
                                    bgColor="bg-red-500 hover:bg-red-600"
                                    className="transition-colors ease-in-out duration-200"
                                    onClick={deletePost}
                                    btnText={"Delete Post"}
                                />
                            </div>
                        )}
                    </div>
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
                    </div>
                    <div className="text-left text-gray-700">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}