import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sun, Moon, Clock, Calendar } from 'lucide-react';

const postModules = import.meta.glob('../posts/*.mdx');

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const [PostComponent, setPostComponent] = useState(null);
    const [frontmatter, setFrontmatter] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        const key = `../posts/${slug}.mdx`;
        if (!postModules[key]) {
            setNotFound(true);
            return;
        }
        postModules[key]().then((mod) => {
            setPostComponent(() => mod.default);
            setFrontmatter(mod.frontmatter);
        });
    }, [slug]);

    if (notFound) {
        return (
            <div className="container">
                <p className="card-desc">Post not found.</p>
                <button className="btn-primary" onClick={() => navigate('/')}>Go back</button>
            </div>
        );
    }

    if (!PostComponent || !frontmatter) {
        return <div className="container"><p className="card-desc">Loading…</p></div>;
    }

    return (
        <div className="container">
            <header className="blog-post-header">
                <div className="blog-post-topbar">
                    <button className="back-btn" onClick={() => navigate('/?tab=Blog')}>
                        <ArrowLeft size={16} /> Back
                    </button>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="theme-toggle"
                        aria-label="Toggle theme"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                <div className="pills" style={{ marginBottom: '1rem' }}>
                    {frontmatter.tags?.map((tag, i) => <span key={i} className="pill">{tag}</span>)}
                </div>

                <h1 className="blog-post-title">{frontmatter.title}</h1>

                <div className="blog-post-meta">
                    <span><Calendar size={13} /> {new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span><Clock size={13} /> {frontmatter.readTime}</span>
                </div>
            </header>

            <article className="prose">
                <PostComponent />
            </article>
        </div>
    );
};

export default BlogPost;
