import React, { useState, useEffect } from 'react'
import appwriteService from '../appWrite/configDB'
import { Container, PostCard } from '../component/index'
function AllPost() {
    const [posts, setPosts] = useState([])
    useEffect(() => { }, [])
    appwriteService.getPost([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
    return (
        <div className='w-full py-8'>
            <div>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllPost