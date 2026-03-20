import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Sun, Moon, Mail, Linkedin, FileText } from 'lucide-react';

// --- DATA ---

const personalInfo = {
  name: "Ashutosh Utsav",
  bio: "AI/ML backend devloper From India Open for work.",
  email: "utsav.ashutosh@gmail.com",
  github: "https://github.com/ashutosh-utsav",
  linkedin: "https://linkedin.com/in/ashutosh-utsav",
  resume: "https://drive.google.com/file/d/1oGEdPFCGh2falpJvNa_IU7mMdLueRLOR/view?usp=sharing"
};

const projects = [
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
    githubUrl: "#",
    liveUrl: "#"
  }
];

const experiences = [
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
        title: "Languages & Frameworks",
        tools: "Python, VueJS, FastAPI, Flask, JavaScript, SQL, C"
    },
    {
        title: "AI/ML & Data",
        tools: "PyTorch, Scikit-learn, LangChain, Transformers, RAG, Fine-tuning"
    },
    {
        title: "Developer Tools",
        tools: "Docker, Azure, Git, Linux, SQLite"
    }
];

// --- REUSABLE COMPONENTS ---

const ProjectCard = ({ project }) => (
  <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] transition-all duration-300 ease-in-out hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:-translate-y-1 shadow-sm">
    <div className="flex items-center justify-between">
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
      <div className="flex items-center space-x-4 text-sm">
        {project.githubUrl !== "#" && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
              <span>GitHub</span>
              <ExternalLink size={14} />
            </a>
        )}
        {project.liveUrl !== "#" && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
            <span>View</span>
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
    <p className="my-3 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{project.description}</p>
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500 dark:text-zinc-500 font-medium">
        {project.tech.map((tech, index) => (
            <React.Fragment key={index}>
                <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">{tech}</span>
            </React.Fragment>
        ))}
    </div>
  </div>
);

const ExperienceItem = ({ item }) => (
    <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] transition-all duration-300 ease-in-out hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:-translate-y-1 shadow-sm">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{item.role}</h3>
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-1">{item.company} &middot; <span className="text-zinc-500 dark:text-zinc-400 font-normal">{item.period}</span></p>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.description}</p>
    </div>
);

const ToolCategory = ({ category }) => (
    <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] transition-all duration-300 ease-in-out hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:-translate-y-1 shadow-sm">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{category.title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{category.tools}</p>
    </div>
);


// --- MAIN PORTFOLIO COMPONENT ---

const Home = () => {
    // Check local storage or system preference to default dark mode beautifully
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
    const [activeTab, setActiveTab] = useState('Projects');
  
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const navTabs = ['Projects', 'Experience', 'Tools'];
    
    const renderContent = () => {
        switch (activeTab) {
            case 'Experience':
                return <div className="space-y-6">{experiences.map((item, index) => <ExperienceItem key={index} item={item} />)}</div>;
            case 'Tools':
                 return <div className="space-y-6">{toolCategories.map((cat, index) => <ToolCategory key={index} category={cat} />)}</div>;
            case 'Projects':
            default:
                return <div className="space-y-6">{projects.map((project, index) => <ProjectCard key={index} project={project} />)}</div>;
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-200 transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">

                {/* --- HEADER --- */}
                <header>
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col">
                           <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Hey, I'm {personalInfo.name}</h1>
                           <a href={personalInfo.resume} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors w-fit shadow-sm">
                                <FileText size={16} />
                                <span>View Resume</span>
                           </a>
                        </div>
                        <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all shadow-sm" aria-label="Toggle theme">
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-base leading-relaxed mb-6">{personalInfo.bio}</p>
                    <div className="flex items-center space-x-5 text-zinc-500 dark:text-zinc-500">
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><Github size={20} /></a>
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><Linkedin size={20} /></a>
                        <a href={`mailto:${personalInfo.email}`} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><Mail size={20} /></a>
                    </div>
                </header>

                <main>
                    {/* --- NAVIGATION --- */}
                    <nav className="my-12 border-b border-zinc-200 dark:border-zinc-800">
                        <ul className="flex items-center space-x-8">
                            {navTabs.map(tab => (
                                <li key={tab}>
                                    <button
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 text-sm font-medium transition-colors relative ${
                                            activeTab === tab 
                                            ? 'text-zinc-900 dark:text-zinc-100' 
                                            : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                                        }`}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-zinc-900 dark:bg-zinc-100 rounded-t-full"></span>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* --- DYNAMIC CONTENT --- */}
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default Home;
