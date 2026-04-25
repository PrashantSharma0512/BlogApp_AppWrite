import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from '../appWrite/configDB';
import { Button, Container } from "../component/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12 md:py-20 animate-in fade-in duration-700">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Hero Image Section */}
                    <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl mb-12 border border-white/5">
                        {post.featuredImage ? (
                            <img
                                src={appwriteService.getPreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-1000 hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-[300px] md:h-[500px] bg-white/5 flex items-center justify-center">
                                <span className="text-6xl">📝</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                        
                        {isAuthor && (
                            <div className="absolute right-6 top-6 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className="px-5 py-2.5 glass-dark text-white rounded-xl font-medium hover:bg-primary/20 transition-all flex items-center gap-2">
                                        Edit Post
                                    </button>
                                </Link>
                                <button 
                                    onClick={deletePost}
                                    className="px-5 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 backdrop-blur-md rounded-xl font-medium hover:bg-red-500 hover:text-white transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-4 text-muted-foreground text-sm py-4 border-y border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                                        {post.userId?.charAt(0) || 'A'}
                                    </div>
                                    <span className="text-foreground font-medium">Author</span>
                                </div>
                                <span className="w-1 h-1 rounded-full bg-secondary"></span>
                                <span>5 min read</span>
                            </div>
                        </div>

                        <div className="browser-css prose prose-invert prose-lg max-w-none text-foreground leading-relaxed">
                            {parse(post.content)}
                        </div>

                        <div className="pt-12 mt-12 border-t border-white/5">
                            <Link to="/all-posts">
                                <button className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 font-medium">
                                    ← Back to all posts
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}