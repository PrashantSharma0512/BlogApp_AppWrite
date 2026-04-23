import React, { useEffect, useState } from 'react';
import appwriteService from '../appWrite/configDB';
import { Container, PostCard, Button } from '../component/index';
import Loader from '../utils/PulseLoader';
import authService from '../appWrite/auth';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userExist, setUserExist] = useState(false);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    setUserExist(true);
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
                const response = await appwriteService.getPostList();
                if (response) {
                    setPost(response.documents);
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
        <div className="w-full min-h-screen">
            {loading ? (
                <div className="flex justify-center items-center min-h-[70vh]">
                    <Loader />
                </div>
            ) : post.length === 0 ? (
                <div className="py-24 text-center relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
                    
                    <Container>
                        <div className="max-w-4xl mx-auto space-y-10 relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-blue-400 uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-700">
                                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                                Discover the world of stories
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                                {userExist ? "Your feed is empty." : "Write. Read. Connect."}
                            </h1>
                            
                            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                                {userExist 
                                    ? "You haven't followed anyone or created any posts. Start your creative journey now." 
                                    : "A premium platform for creators and thinkers to share their most meaningful stories with the world."}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                                {!userExist ? (
                                    <>
                                        <Button 
                                            variant="secondary"
                                            onClick={() => navigate('/signup')}
                                            className="px-10 py-5 text-lg hover:scale-110"
                                        >
                                            Get Started
                                        </Button>
                                        <Button 
                                            variant="outline"
                                            onClick={() => navigate('/login')}
                                            className="px-10 py-5 text-lg hover:scale-110"
                                        >
                                            Sign In
                                        </Button>
                                    </>
                                ) : (
                                    <Button 
                                        variant="primary"
                                        onClick={() => navigate('/add-post')}
                                        className="px-10 py-5 text-lg hover:scale-110"
                                    >
                                        Create Your First Post
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Container>
                </div>
            ) : (
                <div className="py-16">
                    <Container>
                        <div className="space-y-12">
                            <div className="flex items-end justify-between border-b border-white/5 pb-8">
                                <div className="space-y-2">
                                    <h2 className="text-4xl font-bold text-white tracking-tight">Recent Stories</h2>
                                    <p className="text-zinc-500 text-sm font-medium">LATEST UPDATES FROM OUR CREATORS</p>
                                </div>
                                <div className="hidden md:block h-px flex-grow mx-8 bg-gradient-to-r from-white/5 to-transparent"></div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                                {post.map((postItem) => (
                                    <PostCard key={postItem.$id} {...postItem} />
                                ))}
                            </div>
                        </div>
                    </Container>
                </div>
            )}
        </div>
    );
}

export default Home;
