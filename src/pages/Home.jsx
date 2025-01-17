import React, { useEffect, useState } from 'react'
import appwriteService from '../appWrite/configDB'
import { Container, PostCard } from '../component/index'
import Loader from '../loader/Loader';
// import authSlice from '../store/authSlice';

function Home() {
    const [post, setPost] = useState([]);
    const [loading, SetLoading] = useState(false)

    useEffect(() => {
        SetLoading(true)
        appwriteService.getPostList().then((posts) => {
            if (posts) {
                setPost(posts.documents)
            }
        })
        SetLoading(false)
    }, [])
    return (
        loading ? (
            <Loader />
        ) :
            post.length === 0 ? (
                <div className="w-full py-8 mt-4 text-center h-[54.7vh]">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    Login to view content
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            ) : (
                <div className="w-full py-8 ">
                    <Container>
                        <div className="flex flex-wrap">
                            {post.map((post) => (
                                <div key={post.$id} className="p-2 w-1/4">
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            )

    )




}

export default Home