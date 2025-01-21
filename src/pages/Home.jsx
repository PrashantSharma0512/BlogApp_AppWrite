import React, { useEffect, useState } from 'react';
import appwriteService from '../appWrite/configDB';
import { Container, PostCard } from '../component/index';
import Loader from '../utils/PulseLoader';

function Home() {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const posts = await appwriteService.getPostList();
                if (posts) {
                    setPost(posts.documents);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        loading ? (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        ) : post.length === 0 ? (
            <div className="w-full py-8 mt-4 text-center h-[54.7vh]">
                <Container>
                    <div className="flex justify-center items-center">
                        <h1 className="text-xl sm:text-2xl font-bold hover:text-gray-500">
                            Login to view content
                        </h1>
                    </div>
                </Container>
            </div>
        ) : (
            <div className="w-full py-8">
                <Container>
                    {/* Responsive Grid for Post Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {post.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                </Container>
            </div>
        )
    );
}

export default Home;
