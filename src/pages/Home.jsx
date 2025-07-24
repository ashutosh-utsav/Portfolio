import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Sun, Moon, Mail, Linkedin } from 'lucide-react';

// --- DATA (Your information is preserved) ---

const personalInfo = {
  name: "Ashutosh Utsav",
  bio: "AI/ML backend devloper From India Open for work.",
  email: "utsav.ashutosh@gmail.com",
  github: "https://github.com/ashutosh-utsav",
  linkedin: "https://linkedin.com/in/ashutosh-utsav",
  resume: "#"
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
    title: "DishaAI – GenAI for Academic Assistance",
    description: "DishaAI is an AI-powered academic support platform that enhances learning with intelligent automation. Built with a Flask REST API on the backend and a Vue.js CLI frontend, it features role-based authentication implemented using Flask-Security. The application integrates multiple GenAI features, including a general-purpose chatbot, a virtual teaching assistant, and a machine learning-based student risk prediction system using Langchain and Gemini. It employs a hybrid database approach, using SQLAlchemy with SQLite for structured data and PyMongo with MongoDB for unstructured content, providing efficient data handling across diverse user interactions.3",
    tech: ["Flask", "VueJS", "Langchain", "SQLite", "ChromaDB", "Gemini"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "Large Language Model from Scratch",
    description: "This project is a ground-up implementation of a transformer-based large language model using PyTorch. It begins with a simple Bigram model and evolves into a decoder-only GPT-style architecture, covering key components such as token embeddings, positional encodings, masked multi-head self-attention, and feed-forward layers. The project serves as both an educational tool and a technical foundation, offering insights into the inner workings of LLMs. It also explores advanced concepts such as fine-tuning, quantization, and integration with the Hugging Face ecosystem for real-world scalability and experimentation.",
    tech: ["PyTorch", "Transformers", "Python"],
    githubUrl: "#",
    liveUrl: "#"
  }
];

const experiences = [
    {
        role: "Backend AI/ML Intern",
        company: "AmeyaaNXT",
        period: "June 2025 – Present",
        description: "At AmeyaaNXT, I am working as a Backend AI/ML Intern where I have fine-tuned and deployed advanced machine learning models to enhance the accuracy and efficiency of fraud detection systems. I have designed and implemented high-performance backend services using Rust, ensuring both speed and memory safety in production environments. Additionally, I built and integrated an AI-powered chatbot that simplifies user interaction and provides intelligent support, contributing to an overall smarter and more user-friendly application experience."
    }
];

const toolCategories = [
    {
        title: "Languages & Frameworks",
        tools: "Python, Rust, JavaScript, SQL"
    },
    {
        title: "AI/ML & Data",
        tools: "Pandas, NumPy, Scikit-learn, TensorFlow, LangChain, Transformers"
    },
    {
        title: "Developer Tools",
        tools: "VS Code, Git, Linux, Docker, Postman, Figma"
    }
];

// --- REUSABLE COMPONENTS (with Hover Animations) ---

const ProjectCard = ({ project }) => (
  <div className="p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-zinc-900 hover:-translate-y-1">
    <div className="flex items-center justify-between">
      <h3 className="text-base font-medium text-zinc-100">{project.title}</h3>
      <div className="flex items-center space-x-4 text-sm">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-zinc-400 hover:text-zinc-100 transition-colors">
          <span>GitHub</span>
          <ExternalLink size={14} />
        </a>
        {project.liveUrl !== "#" && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-zinc-400 hover:text-zinc-100 transition-colors">
            <span>View</span>
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
    <p className="my-2 text-zinc-400 text-sm leading-relaxed">{project.description}</p>
    <div className="flex flex-wrap items-center gap-x-2 text-xs text-zinc-500">
        {project.tech.map((tech, index) => (
            <React.Fragment key={index}>
                <span>{tech}</span>
                {index < project.tech.length - 1 && <span className="text-zinc-600">/</span>}
            </React.Fragment>
        ))}
    </div>
  </div>
);

const ExperienceItem = ({ item }) => (
    <div className="p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-zinc-900 hover:-translate-y-1">
        <h3 className="text-base font-medium text-zinc-100">{item.role}</h3>
        <p className="text-sm text-zinc-400">{item.company} &middot; {item.period}</p>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{item.description}</p>
    </div>
);

const ToolCategory = ({ category }) => (
    <div className="p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-zinc-900 hover:-translate-y-1">
        <h3 className="text-base font-medium text-zinc-100 mb-2">{category.title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{category.tools}</p>
    </div>
);


// --- MAIN PORTFOLIO COMPONENT ---

const Home = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [activeTab, setActiveTab] = useState('Projects');
  
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const navTabs = ['Projects', 'Experience', 'Tools'];
    
    const renderContent = () => {
        switch (activeTab) {
            case 'Experience':
                return <div className="space-y-8">{experiences.map((item, index) => <ExperienceItem key={index} item={item} />)}</div>;
            case 'Tools':
                 return <div className="space-y-8">{toolCategories.map((cat, index) => <ToolCategory key={index} category={cat} />)}</div>;
            case 'Projects':
            default:
                return <div className="space-y-8">{projects.map((project, index) => <ProjectCard key={index} project={project} />)}</div>;
        }
    };

    return (
        <div>
            <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">

                {/* --- HEADER --- */}
                <header>
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">Hey, I'm {personalInfo.name}</h1>
                        <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-zinc-500 hover:text-zinc-100 transition-colors" aria-label="Toggle theme">
                            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-sm leading-relaxed mb-6">{personalInfo.bio}</p>
                    <div className="flex items-center space-x-4 text-sm text-zinc-500 dark:text-zinc-500">
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-100 transition-colors"><Github size={18} /></a>
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-100 transition-colors"><Linkedin size={18} /></a>
                        <a href={`mailto:${personalInfo.email}`} className="hover:text-zinc-100 transition-colors"><Mail size={18} /></a>
                    </div>
                </header>

                <main>
                    {/* --- NAVIGATION --- */}
                    <nav className="my-10">
                        <ul className="flex items-center space-x-6">
                            {navTabs.map(tab => (
                                <li key={tab}>
                                    <button
                                        onClick={() => setActiveTab(tab)}
                                        className={`text-sm transition-colors ${
                                            activeTab === tab 
                                            ? 'font-medium text-zinc-100' 
                                            : 'text-zinc-500 hover:text-zinc-100'
                                        }`}
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
        </div>
    );
};

export default Home;
