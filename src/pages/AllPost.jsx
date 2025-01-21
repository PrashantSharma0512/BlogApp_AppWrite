import React, { useState, useEffect } from 'react'
import appwriteService from '../appWrite/configDB'
import { Container, PostCard } from '../component/index'
import Loader from '../utils/PulseLoader'

function AllPost() {
    const [posts, setPosts] = useState([])
    const [loading, SetLoading] = useState(false)
    useEffect(() => {
        SetLoading(true)
        const fetchPosts = async () => {
            try {
                const posts = await appwriteService.getPostList([]);
                if (posts) {
                    setPosts(posts.documents);
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                SetLoading(false);
            }
        };
        fetchPosts();

    }, []);

    return (
        loading ?
            <div className='flex justify-center items-center '>
                <Loader />
            </div>
            :
            <div className='w-full py-8 '>
                <Container>
                    <div className='flex flex-wrap max-md:flex-col'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
    )
}

export default AllPost