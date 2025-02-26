import React, { useState, useEffect } from 'react'
import appwriteService from '../appWrite/configDB'
import { Container, PostCard } from '../component/index'

function AllPost() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await appwriteService.getPostList([]);
                if (posts) {
                    setPosts(posts.documents);
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchPosts();
    }, []);
    
    return (
        <div className="w-full py-8">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPost
