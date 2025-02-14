import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const projects = [
  {
    title: "Library Management App",
    description: "A full-stack library management system built using Flask and Vue.js.",
    tech: "Flask, Vue.js, SQlite",
    link: "https://github.com/ashutosh-utsav/MAD2-Project-IITM-May-2024",
  },
  {
    title: "Chat Bot Using RAG",
    description: "An AI chatbot that utilizes Retrieval-Augmented Generation for intelligent responses.",
    tech: "Python, LangChain, Gemini API",
    link: "https://github.com/ashutosh-utsav/Chat-Bot-Using-RAG",
  },
  {
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase projects, blogs, and skills.",
    tech: "React, CSS",
    link: "https://github.com/ashutosh-utsav/Portfolio",
  },
];

const blogs = [
  { title: "Understanding RAG in AI", link: "#", summary: "Exploring Retrieval-Augmented Generation and its applications." },
  { title: "Vue.js vs React", link: "#", summary: "A comparison of Vue.js and React for modern web development." },
];

const App = () => {
  return (
    <div className="container">
      {/* Header Section */}
      <header>
        <h1>Ashutosh Utsav</h1>
        <p>I code, build apps, analyze data, and bring ideas to life.</p>
      </header>

       {/* Skills Section */}
       <section className="skills">
         <h2>🚀 Technologies & Skills</h2>  

         <h3>Languages & Frameworks</h3>  
         <div className="icons">
           <img src="https://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=white"/>
           <img src="https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black"/>
           <img src="https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js&logoColor=white"/>
           <img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black"/>
           <img src="https://img.shields.io/badge/-SQL-025E8C?style=flat&logo=sqlite&logoColor=white"/>

         </div>
         <div className="icons">
         <img src="https://img.shields.io/badge/-Java-007396?style=flat&logo=java&logoColor=white"/>
           <img src="https://img.shields.io/badge/-Flask-000000?style=flat&logo=flask&logoColor=white"/>
           <img src="https://img.shields.io/badge/-Vue.js-4FC08D?style=flat&logo=vue.js&logoColor=white"/>
           <img src="https://img.shields.io/badge/Shell-Bash?logo=gnu-bash&logoColor=white"/>

           <img src="https://img.shields.io/badge/-Redis-DC382D?style=flat&logo=redis&logoColor=white"/>
           <img src="https://img.shields.io/badge/-Celery-37814A?style=flat&logo=celery&logoColor=white"/>
         </div>

         <h3>Machine Learning & Data Analysis</h3>  
         <div className="icons">
           <img src="https://img.shields.io/badge/-Supervised_Learning-00599C?style=flat&logo=scikit-learn&logoColor=white"/>
           <img src="https://img.shields.io/badge/-Unsupervised_Learning-3498DB?style=flat&logo=tensorflow&logoColor=white"/>
           <img src="https://img.shields.io/badge/-Deep_Learning-FF6F00?style=flat&logo=pytorch&logoColor=white"/>
          
         </div>
         <div className="icons">
           <img src="https://img.shields.io/badge/-Pandas-150458?style=flat&logo=pandas&logoColor=white"/>
           <img src="https://img.shields.io/badge/-NumPy-013243?style=flat&logo=numpy&logoColor=white"/>
           <img src="https://img.shields.io/badge/-Scikit--Learn-F7931E?style=flat&logo=scikit-learn&logoColor=white"/>
           <img src="https://img.shields.io/badge/-Data_Visualization-1E88E5?style=flat&logo=tableau&logoColor=white"/>
         </div>

         <h3>Developer Tools</h3>   
         <div className="icons">
           <img src="https://img.shields.io/badge/-VS_Code-007ACC?style=flat&logo=visual-studio-code&logoColor=white"/>
           <img src="https://img.shields.io/badge/-Jupyter-DA5B0B?style=flat&logo=jupyter&logoColor=white"/>
           <img src="https://img.shields.io/badge/-Eclipse-2C2255?style=flat&logo=eclipse&logoColor=white"/>
           <img src="https://img.shields.io/badge/-Linux-FCC624?style=flat&logo=linux&logoColor=black"/>
           <img src="https://img.shields.io/badge/-Git-F05032?style=flat&logo=git&logoColor=white"/>
         </div>


      </section>
    



      {/* Projects Section */}
      <section className="projects">
        <h2>Projects</h2>

        <div className="project-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <small>{project.tech}</small>
              <a href={project.link} target="_blank" className="btn">View Project</a>
            </div>

          ))}
        </div>
        
      </section>

      {/* Blogs Section */}
      <section className="blogs">
        <h2>New Blogs</h2>
        <div className="blog-list">
          {blogs.map((blog, index) => (
            <div key={index} className="blog-item">
              <h3><a href={blog.link} target="_blank">{blog.title}</a></h3>
              <p>{blog.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>Contact Me</h2>
        <div className="icons">
          <a href="https://linkedin.com/in/ashutosh-utsav" target="_blank"><FaLinkedin /></a>
          <a href="https://github.com/ashutosh-utsav" target="_blank"><FaGithub /></a>
          <a href="mailto:utsav.ashutosh@gmail.com"><FaEnvelope /></a>
        </div>
      </section>
    </div>
  );
};

export default App;
