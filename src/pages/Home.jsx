import React, { useEffect, useState } from 'react';
import appwriteService from '../appWrite/configDB';
import { Container, PostCard } from '../component/index';
import Loader from '../utils/PulseLoader';
import authService from '../appWrite/auth';

function Home() {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userExist, setUserExist] = useState(false);
    useEffect(() => {
        // Check if the user is logged in
        const fetchUser = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    setUserExist(true);
                } else {
                    console.log("User is not logged in");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);
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
            !userExist ? (
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
                <div className="w-full py-8 mt-4 text-center h-[54.7vh]">
                    <Container>
                        <div className="flex justify-center items-center">
                            <h1 className="text-xl sm:text-2xl font-bold hover:text-gray-500">
                                Posts not found
                            </h1>
                        </div>
                    </Container>
                </div>
            )
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
