import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Github, ExternalLink, Sun, Moon, Mail, Linkedin, FileText, Code2, Terminal, Brain, Cloud, Clock, Calendar, ArrowRight } from 'lucide-react';
import { SiPython, SiMysql, SiGnubash, SiJavascript, SiHtml5, SiFlask, SiFastapi, SiVuedotjs, SiLinux, SiGit, SiRedis, SiPytorch, SiDocker } from 'react-icons/si';

// --- DATA ---
const personalInfo = {
  name: "Ashutosh Utsav",
  education: "IIT Madras · BS Data Science & Programming · 2022–2025",
  bio: "ML Engineer at YOYO AI building voice AI systems, speaker embeddings, diarization, and scalable audio backends. National level BharatGen AI Hackathon winner. I like to work on end-to-end pipelines, from speech recognition and voice interfaces to scalable backend infrastructure powering AI applications. I also have a soft spot for films and books, which you can find in the sections below. Always open to connecting with fellow tech enthusiasts, cinephiles, or anyone curious about AI and its real-world applications.",
  email: "utsav.ashutosh@gmail.com",
  github: "https://github.com/ashutosh-utsav",
  linkedin: "https://linkedin.com/in/ashutosh-utsav",
  resume: "https://drive.google.com/file/d/1oGEdPFCGh2falpJvNa_IU7mMdLueRLOR/view?usp=sharing"
};


const projects = [
  {
    title: "Live Meeting Transcriber & Summarizer",
    description: "Built a robust clinical ambient listening application designed to transcribe and summarize live audio into structured medical formats via real-time WebSockets. Engineered a scalable backend utilizing a FastAPI origin that intelligently chunks and packetizes streams into Azure Queues. Designed an asynchronous worker ecosystem that reassembles buffers, filters silence using Voice Activity Detection (VAD), and triggers concurrent parallel OpenAI Whisper transcriptions. The system securely stages artifacts into Azure Blob Storage while maintaining fast retrieval indexing through Azure Tables.",
    tech: ["Python", "FastAPI", "WebSockets", "Azure Queues", "Azure Blob", "OpenAI Whisper"],
    githubUrl: "https://github.com/ashutosh-utsav/Ambient-Listning/tree/psychdesk-main",
    liveUrl: "#"
  },
  {
    title: "AI Financial Assistant",
    description: "A multi-agent AI-powered financial assistant that delivers real-time market insights and personalized portfolio analysis through a sleek Streamlit web interface. The backend, built using FastAPI and LangGraph, orchestrates agents responsible for fetching financial data (via yFinance and RSS feeds), performing contextual retrieval (using FAISS and Sentence-Transformers), and generating insights through Gemini and OpenAI LLMs.",
    tech: ["Python", "FastAPI", "LangGraph", "Streamlit", "Gemini", "OpenAI API"],
    githubUrl: "https://github.com/ashutosh-utsav/finance-assistance",
    liveUrl: "#"
  },
  {
    title: "JanVaani",
    description: "Built a full-stack, voice-first citizen engagement platform with four microservices (Flask) for grievances, schemes, analytics, and announcements, containerized using Docker. Developed a multilingual voice assistant using OpenAI (STT, Chat, TTS) for guided grievance reporting, auto-filling forms via an embedded iframe. Created a scheme discovery agent that uses LLMs to extract tags from user conversations and filter a JSON-based scheme database.",
    tech: ["Python", "Flask", "Docker", "PyTorch", "Agents"],
    githubUrl: "#",
    liveUrl: "Live"
  },
  {
    title: "DishaAI",
    description: "DishaAI is an AI-powered academic support platform that enhances learning with intelligent automation. Built with a Flask REST API on the backend and a Vue.js CLI frontend, it features role-based authentication implemented using Flask-Security. The application integrates multiple GenAI features, including a general-purpose chatbot, a virtual teaching assistant, and a machine learning-based student risk prediction system using Langchain and Gemini. It employs a hybrid database approach, using SQLAlchemy with SQLite for structured data and PyMongo with MongoDB for unstructured content, providing efficient data handling across diverse user interactions.",
    tech: ["Flask", "VueJS", "Langchain", "SQLite", "ChromaDB", "Gemini"],
    githubUrl: "https://github.com/ashutosh-utsav/DishaAI",
    liveUrl: "#"
  }
];

const experiences = [
    {
        role: "Machine Learning Engineer",
        company: "YOYO AI",
        period: "Apr 2026 – Present",
        description: "Getting into the voice AI stack — currently exploring voice embeddings for speaker identity and researching how they fit into the broader voice pipeline. Early days, but the work touches on audio processing, speaker representation, and how these pieces connect at scale."
    },
    {
        role: "SDE Intern",
        company: "Unitecare",
        period: "Sep 2025 – Dec 2025",
        description: "Built a Dockerized microservices pipeline with a FastAPI web server and asynchronous Python worker to process clinical audio transcription tasks. Implemented a queue-driven processing system using Azure Queue Storage, integrating OpenAI APIs for transcription and summarization and managing audio data via Azure Blob + Table Storage. Deployed containerized microservices on Azure Container Apps, enabling scalable background processing, session-based task tracking, and production-ready infrastructure."
    },
    {
        role: "Backend AI/ML Intern",
        company: "AmeyaaNXT",
        period: "June 2025 – August 2025",
        description: "Fine-tuned BERT for classification and deployed inference pipelines for real-time fraud analysis. Built a RAG (Retrieval-Augmented Generation) chatbot to enable intelligent question answering by combining LLM responses with structured knowledge retrieval. Developed and maintained backend APIs, enabling seamless integration between frontend services and backend infrastructure."
    }
];

const toolCategories = [
    {
        title: "Languages",
        icon: Code2,
        tools: [
            { label: "Python", icon: SiPython, color: "#3776AB" },
            { label: "C", icon: null, color: "#A8B9CC" },
            { label: "SQL", icon: SiMysql, color: "#4479A1" },
            { label: "Shell", icon: SiGnubash, color: "#4EAA25" },
            { label: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
            { label: "HTML/CSS", icon: SiHtml5, color: "#E34F26" },
        ]
    },
    {
        title: "Technologies / Frameworks",
        icon: Terminal,
        tools: [
            { label: "Flask", icon: SiFlask, color: "#000000" },
            { label: "FastAPI", icon: SiFastapi, color: "#009688" },
            { label: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
            { label: "Linux", icon: SiLinux, color: "#FCC624" },
            { label: "Git", icon: SiGit, color: "#F05032" },
            { label: "Redis", icon: SiRedis, color: "#FF4438" },
            { label: "Celery", icon: null, color: "#37814A" },
        ]
    },
    {
        title: "ML / LLM",
        icon: Brain,
        tools: [
            { label: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
            { label: "Scikit-learn", icon: null, color: "#F7931E" },
            { label: "Fine-tuning", icon: null, color: "#8B5CF6" },
            { label: "RAG", icon: null, color: "#10b981" },
            { label: "VAD", icon: null, color: "#06B6D4" },
            { label: "LLM Prompting", icon: null, color: "#F59E0B" },
        ]
    },
    {
        title: "Deployment",
        icon: Cloud,
        tools: [
            { label: "Docker", icon: SiDocker, color: "#2496ED" },
            { label: "Azure Container Apps", icon: null, color: "#0078D4" },
            { label: "Queues", icon: null, color: "#0078D4" },
            { label: "Table Storage", icon: null, color: "#0078D4" },
            { label: "VPS", icon: null, color: "#6B7280" },
        ]
    }
];

// --- FILMS ---
const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_IMG = 'https://image.tmdb.org/t/p/w342';

const FILM_IDS = [
  598826,  // Sardar Udham (2021)
  41053,   // Pyaasa (1957)
  191714,  // The Lunchbox (2013)
  128207,  // Ship of Theseus (2012)
  336203,  // Masaan (2015)
  45316,   // Udaan (2010)
  927547,  // All We Imagine as Light (2024)
  838145,  // A Night of Knowing Nothing (2022)
  541813,  // Bounded-Boundless (2008)
  1016217, // While We Watched (2023)
  408624,  // A Death in the Gunj (2016)
  157336,  // Interstellar (2014)
  575351,  // Kumbalangi Nights (2019)
  962571,  // Joyland (2022)
  21557,   // Hazaaron Khwaishein Aisi (2003)
  1136423, // Meiyazhagan (2024)
  786064,  // The Great Indian Kitchen (2021)
  53767,   // Kaagaz Ke Phool (1959)
  128206,  // Shahid (2013)
  79731,   // Suraj Ka Satvan Ghoda (1992)
  260669,  // Ram ke Naam / In the Name of God (1992)
  687163, // Project hail mary (2026)
  1007695, // Pokhar ke dunu paar
  475250, // Omerta
  668435, // Thappad
  411010, // An Insignificant Man
  666277, // Past Lives (2023)
  14705, // Omkara (2006)
  280795, // Haidaar (2021)

];

// --- BLOG POSTS ---
const postModules = import.meta.glob('../posts/*.mdx', { eager: true });
const blogPosts = Object.entries(postModules)
    .map(([path, mod]) => ({
        slug: path.replace('../posts/', '').replace('.mdx', ''),
        ...mod.frontmatter,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

// --- REUSABLE COMPONENTS ---

const FilmSection = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all(
            FILM_IDS.map(id =>
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_KEY}&append_to_response=credits`)
                    .then(r => r.json())
                    .then(data => {
                        const crew = data.credits?.crew || [];
                        const director = crew.find(c => c.job === 'Director')?.name || '';
                        const writer = crew.find(c =>
                            ['Screenplay', 'Writer', 'Story', 'Novel'].includes(c.job)
                        )?.name || '';
                        return {
                            id: data.id,
                            title: data.title,
                            year: data.release_date?.slice(0, 4) || '',
                            poster: data.poster_path,
                            director,
                            writer,
                        };
                    })
            )
        ).then(setFilms).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="film-grid">
                {FILM_IDS.map(id => (
                    <div key={id} className="film-card">
                        <div className="film-poster-skeleton" />
                        <div className="film-info-skeleton" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="film-grid">
            {films.map(film => (
                <div key={film.id} className="film-card">
                    <div className="film-poster-wrap">
                        {film.poster
                            ? <img src={`${TMDB_IMG}${film.poster}`} alt={film.title} className="film-poster" loading="lazy" />
                            : <div className="film-poster-placeholder">{film.title}</div>
                        }
                    </div>
                    <div className="film-info">
                        <p className="film-title">{film.title}</p>
                        <p className="film-year">{film.year}</p>
                        {film.director && <p className="film-credit">Dir. {film.director}</p>}
                        {film.writer && film.writer !== film.director && <p className="film-credit">Wri. {film.writer}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
};


const BlogCard = ({ post, onNavigate }) => (
    <article className="card blog-card" onClick={() => onNavigate(`/blog/${post.slug}`)} style={{ cursor: 'pointer' }}>
        <div className="card-header">
            <h3 className="card-title">{post.title}</h3>
            <ArrowRight size={16} className="blog-card-arrow" />
        </div>
        <p className="card-desc">{post.description}</p>
        <div className="blog-card-footer">
            <div className="pills">
                {post.tags?.map((tag, i) => <span key={i} className="pill">{tag}</span>)}
            </div>
            <div className="blog-card-meta">
                <span><Calendar size={12} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                <span><Clock size={12} /> {post.readTime}</span>
            </div>
        </div>
    </article>
);

const ProjectCard = ({ project }) => (
  <article className="card">
    <div className="card-header">
      <h3 className="card-title">{project.title}</h3>
      <div className="card-links">
        {project.githubUrl !== "#" && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="card-link">
              <Github size={14} /> <span>GitHub</span>
            </a>
        )}
        {project.liveUrl !== "#" && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="card-link">
            <ExternalLink size={14} /> <span>Live Preview</span>
          </a>
        )}
      </div>
    </div>
    <p className="card-desc">{project.description}</p>
    <div className="pills">
        {project.tech.map((tech, index) => (
            <span key={index} className="pill">{tech}</span>
        ))}
    </div>
  </article>
);

const ExperienceItem = ({ item }) => (
    <article className="card">
        <h3 className="card-title">{item.role}</h3>
        <p className="card-subtitle">{item.company} &middot; <span>{item.period}</span></p>
        <p className="card-desc">{item.description}</p>
    </article>
);

const ToolCategory = ({ category }) => {
    const CategoryIcon = category.icon;
    return (
        <article className="card">
            <div className="tool-category-header">
                {CategoryIcon && <CategoryIcon className="tool-category-icon" />}
                <h3 className="card-title">{category.title}</h3>
            </div>
            <div className="tool-chips">
                {category.tools.map((tool, i) => {
                    const Icon = tool.icon;
                    return (
                        <span key={i} className="tool-chip">
                            {Icon
                                ? <Icon style={{ color: tool.color, flexShrink: 0 }} />
                                : <span className="tool-chip-dot" style={{ background: tool.color }} />}
                            {tool.label}
                        </span>
                    );
                })}
            </div>
        </article>
    );
};

// --- MAIN PORTFOLIO COMPONENT ---

const Home = () => {
    // Check local storage or system preference
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme === 'dark';
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return true;
    });
    
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'Experience';
    const navigate = useNavigate();

    const setActiveTab = (tab) => setSearchParams({ tab });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const navTabs = ['Experience', 'Projects', 'Tools', 'Films', 'Books', 'Blog'];

    const renderContent = () => {
        switch (activeTab) {
            case 'Experience':
                return <div className="card-grid">{experiences.map((item, index) => <ExperienceItem key={index} item={item} />)}</div>;
            case 'Tools':
                return <div className="card-grid">{toolCategories.map((cat, index) => <ToolCategory key={index} category={cat} />)}</div>;
            case 'Films':
                return <FilmSection />;
            case 'Books':
                return (
                    <div className="coming-soon-wrap">
                        <p className="coming-soon-emoji"></p>
                        <p className="coming-soon-title">Coming soon... probably.</p>
                        <p className="coming-soon-desc">I have a whole list of books I keep meaning to add here. I also have a whole list of books I keep meaning to read. We don't talk about either list.</p>
                    </div>
                );
            case 'Blog':
                return <div className="card-grid">{blogPosts.map((post, index) => <BlogCard key={index} post={post} onNavigate={navigate} />)}</div>;
            case 'Projects':
            default:
                return <div className="card-grid">{projects.map((project, index) => <ProjectCard key={index} project={project} />)}</div>;
        }
    };

    return (
        <div className="container">
            {/* --- HEADER --- */}
            <header className="header-wrapper">
                <div className="flex justify-between items-start">
                    <div className="flex-col">
                        <h1 className="title">Hey, I'm {personalInfo.name}</h1>
                        <p className="education-line">{personalInfo.education}</p>
                        <a href={personalInfo.resume} target="_blank" rel="noopener noreferrer" className="btn-primary">
                            <FileText size={16} />
                            View Resume
                        </a>
                    </div>
                    <button 
                        onClick={() => setDarkMode(!darkMode)} 
                        className="theme-toggle" 
                        aria-label="Toggle theme"
                        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
                
                <p className="bio">{personalInfo.bio}</p>
                
                <div className="icon-links">
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="icon-link">
                        <Github size={22} />
                    </a>
                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="icon-link">
                        <Linkedin size={22} />
                    </a>
                    <a href={`mailto:${personalInfo.email}`} className="icon-link">
                        <Mail size={22} />
                    </a>
                </div>
            </header>

            <main>
                {/* --- NAVIGATION --- */}
                <nav>
                    <ul className="nav-menu">
                        {navTabs.map(tab => (
                            <li key={tab} className="nav-item">
                                <button
                                    onClick={() => setActiveTab(tab)}
                                    className={activeTab === tab ? 'active' : ''}
                                >
                                    {tab}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* --- DYNAMIC CONTENT --- */}
                {renderContent()}
            </main>
        </div>
    );
};

export default Home;
