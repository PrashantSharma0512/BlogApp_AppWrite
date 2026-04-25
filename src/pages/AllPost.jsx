import React, { useState, useEffect } from 'react'
import appwriteService from '../appWrite/configDB'
import { Container, PostCard } from '../component/index'

import Loader from '../utils/PulseLoader'

function AllPost() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await appwriteService.getPostList([]);
                if (response) {
                    setPosts(response.documents);
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchPosts();
    }, []);
    
    return (
        <div className="w-full py-12 min-h-screen">
            <Container>
                <div className="flex flex-col gap-10">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-white tracking-tight">Explore All Stories</h1>
                        <p className="text-muted-foreground">Discover perspectives from creators around the world.</p>
                        <div className="h-1.5 w-20 bg-primary rounded-full"></div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader />
                        </div>
                    ) : posts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {posts.map((post) => (
                                <PostCard key={post.$id} {...post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 glass-dark rounded-[2rem] border border-white/5">
                            <p className="text-muted-foreground">No posts found yet.</p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default AllPost
