import React, { useEffect, useState } from 'react'
import appwriteService from '../appWrite/configDB'
import { Container, PostCard } from '../component/index'
// import authSlice from '../store/authSlice';

function Home() {
    const [post, setPost] = useState([]);
    useEffect(() => {
        appwriteService.getPostList().then((posts) => {
            if (posts) {
                setPost(posts.documents)
            }
        })  
    }, [])
    console.log("post length",post.length);
    if (post.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                login for view content
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else{
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {post.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
    
}

export default Home