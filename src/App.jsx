import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Terminal, Cpu, Rocket, ChevronRight, Code2, BrainCircuit, Target,
  Lightbulb, User, Award, BookOpen, Briefcase, GitBranch, Layers,
  Database, ExternalLink, Mail, Github, Linkedin, MapPin
} from 'lucide-react';

// Utility for Tailwind classes
const getColorClasses = (color) => {
  const variants = {
    emerald: {
      bg: "bg-emerald-500",
      bgLight: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500",
      ring: "ring-emerald-500",
      gradient: "from-emerald-500 to-emerald-600"
    },
    blue: {
      bg: "bg-blue-500",
      bgLight: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500",
      ring: "ring-blue-500",
      gradient: "from-blue-500 to-blue-600"
    },
    purple: {
      bg: "bg-purple-500",
      bgLight: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500",
      ring: "ring-purple-500",
      gradient: "from-purple-500 to-purple-600"
    },
    amber: {
      bg: "bg-amber-500",
      bgLight: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500",
      ring: "ring-amber-500",
      gradient: "from-amber-500 to-amber-600"
    },
    yellow: {
      bg: "bg-yellow-500",
      bgLight: "bg-yellow-500/10",
      text: "text-yellow-400",
      border: "border-yellow-500",
      ring: "ring-yellow-500",
      gradient: "from-yellow-500 to-yellow-600"
    },
    pink: {
      bg: "bg-pink-500",
      bgLight: "bg-pink-500/10",
      text: "text-pink-400",
      border: "border-pink-500",
      ring: "ring-pink-500",
      gradient: "from-pink-500 to-pink-600"
    }
  };
  return variants[color] || variants.emerald;
};

// --- Components ---

const SectionHeading = ({ children, icon: Icon, color = "emerald" }) => {
  const theme = getColorClasses(color);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-8"
    >
      <div className={`p-2 rounded-lg ${theme.bgLight} ${theme.text}`}>
        <Icon size={24} />
      </div>
      <h2 className="text-3xl font-bold text-white">{children}</h2>
    </motion.div>
  );
};

const ExperienceCard = ({ role, company, period, location, points, color }) => {
  const theme = getColorClasses(color);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="relative pl-8 pb-12 border-l border-slate-800 last:pb-0"
    >
      <div className={`absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full ${theme.bg} ring-4 ring-slate-950`} />

      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
        <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
          <div>
            <h3 className="text-xl font-bold text-white">{role}</h3>
            <div className={`${theme.text} font-medium flex items-center gap-2`}>
              {company}
            </div>
          </div>
          <div className="text-right">
            <div className="text-slate-400 text-sm font-mono">{period}</div>
            <div className="text-slate-500 text-xs flex items-center justify-end gap-1 mt-1">
              <MapPin size={10} /> {location}
            </div>
          </div>
        </div>

        <ul className="space-y-3">
          {points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
              <ChevronRight size={16} className={`mt-1 ${theme.text} opacity-50 shrink-0`} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ title, tech, desc, stats, color }) => {
  const theme = getColorClasses(color);
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all group"
    >
      <div className={`h-2 bg-gradient-to-r ${theme.gradient}`} />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className={`text-xl font-bold text-white group-hover:${theme.text} transition-colors`}>{title}</h3>
          <div className="flex gap-2">
            <Github size={18} className="text-slate-500 hover:text-white cursor-pointer" />
          </div>
        </div>

        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          {desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tech.map((t) => (
            <span key={t} className="px-2 py-1 rounded-md bg-slate-800 text-xs text-slate-300 border border-slate-700">
              {t}
            </span>
          ))}
        </div>

        {stats && (
          <div className="grid grid-cols-2 gap-2 mt-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-slate-950/50 p-2 rounded border border-slate-800/50 text-center">
                <div className={`${theme.text} font-bold text-sm`}>{stat.value}</div>
                <div className="text-[10px] text-slate-500 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const StatBadge = ({ icon: Icon, value, label, color }) => {
  const theme = getColorClasses(color);
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center gap-4"
    >
      <div className={`p-3 rounded-lg ${theme.bgLight} ${theme.text}`}>
        <Icon size={24} />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
      </div>
    </motion.div>
  );
};

const EducationCard = ({ school, degree, score, year, color = "emerald" }) => {
  const theme = getColorClasses(color);
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800/50">
      <div className={`p-2 rounded-lg ${theme.bgLight} ${theme.text} shrink-0`}>
        <BookOpen size={20} />
      </div>
      <div>
        <h4 className="text-white font-bold">{school}</h4>
        <div className="text-slate-400 text-sm">{degree}</div>
        <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 font-mono">
          <span>{year}</span>
          <span className={`px-2 py-0.5 rounded ${theme.bgLight} ${theme.text}`}>{score}</span>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-white tracking-tight flex items-center gap-2">
            <img src="/logo.png" alt="RD Logo" className="h-8 w-auto" />
          </div>
          <div className="hidden sm:flex gap-6 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">

        {/* Hero Section */}
        <section id="about" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for Internships
            </div>

            <div className="flex flex-col-reverse md:flex-row items-center gap-12">
              <div className="flex-1">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                  Building the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">
                    Intelligent Infrastructure
                  </span> <br />
                  of Tomorrow.
                </h1>

                <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl">
                  I'm <span className="text-white font-semibold">Ravikoti Deekshith</span>, an undergrad from <span className="text-white">IIT (BHU)</span> with a keen interest in software engineering. I enjoy applying structured engineering thinking to build practical, reliable software systems.
                </p>

                <div className="flex flex-wrap gap-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=prsds10082003@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white text-slate-950 rounded-lg font-bold flex items-center gap-2"
                  >
                    <Mail size={18} /> Contact Me
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/Dattuog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-slate-900 text-white border border-slate-700 rounded-lg font-medium flex items-center gap-2 hover:bg-slate-800"
                  >
                    <Github size={18} /> GitHub
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.linkedin.com/in/deekshith-ravikoti-b65ba9225/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-slate-900 text-white border border-slate-700 rounded-lg font-medium flex items-center gap-2 hover:bg-slate-800"
                  >
                    <Linkedin size={18} /> LinkedIn
                  </motion.a>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative shrink-0"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <img
                  src="/profile.jpg"
                  alt="Ravikoti Deekshith"
                  className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-slate-900 shadow-2xl"
                />
                <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur border border-slate-700 p-2 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Online
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Stats Grid */}
        <section className="mb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatBadge icon={Award} value="2036" label="LeetCode Knight" color="yellow" />
          <StatBadge icon={Code2} value="1625" label="Codeforces Expert" color="blue" />
          <StatBadge icon={Briefcase} value="2" label="Major Internships" color="emerald" />
          <StatBadge icon={Terminal} value="Dev" label="Coder & Developer" color="purple" />
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-32">
          <SectionHeading icon={Briefcase} color="blue">Professional Voyage</SectionHeading>

          <div className="ml-4">
            <ExperienceCard
              role="Software Engineer Intern"
              company="Seekvens.ai"
              period="May 2025 - Jul 2025"
              location="Remote (Dallas, TX)"
              color="blue"
              points={[
                "Engineered Threat Scoring Engine using LLMs for insider-threat detection.",
                "Deployed distributed Cribl suite (AWS EC2 + on-prem) processing 100K+ log events.",
                "Reduced log noise by 80%+ with JS filters and built AI dashboard for insights.",
                "Developed Voice AI agents (LiveKit) projected to cut screening effort by 70%."
              ]}
            />
            <ExperienceCard
              role="Software Engineer Intern"
              company="Edvenswa Tech"
              period="Dec 2024 - Jan 2025"
              location="Hyderabad"
              color="emerald"
              points={[
                "Built RAG pipelines for medical records with patient-specific recommendations.",
                "Implemented OCR for text/layout-preserving PDF processing.",
                "Boosted POC efficiency by 30% with Streamlit interfaces.",
                "Managed retrieval pipelines enabling accurate, contextual responses."
              ]}
            />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-32">
          <SectionHeading icon={Rocket} color="purple">Featured Inventions</SectionHeading>

          <div className="grid md:grid-cols-2 gap-6">
            <ProjectCard
              title="Rate Limiter Middleware"
              desc="Designed a Redis-based Rate Limiter middleware handling 500+ RPS. Implemented Fixed Window algorithm to enforce fair API usage and prevent abuse."
              tech={["Node.js", "Redis", "Express", "System Design"]}
              color="purple"
              stats={[
                { value: "500+", label: "Req/Sec" },
                { value: "10k+", label: "Simulated Req" }
              ]}
            />
            <ProjectCard
              title="Full-Stack Chat Application"
              desc="Real-time chat app with MERN stack and Socket.io. Features secure JWT auth, role-based authorization, and seamless media sharing via Cloudinary."
              tech={["React", "Node.js", "Socket.io", "MongoDB", "JWT"]}
              color="pink"
              stats={[
                { value: "Real-time", label: "Latency" },
                { value: "Secure", label: "JWT Auth" }
              ]}
            />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-20">
          <SectionHeading icon={Cpu} color="amber">Technical Arsenal</SectionHeading>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-slate-400 font-mono text-sm mb-3">LANGUAGES</h3>
                <div className="flex flex-wrap gap-2">
                  {["C++", "Java", "JavaScript", "SQL"].map(s => (
                    <span key={s} className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-300 text-sm hover:border-amber-500/50 transition-colors cursor-default">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-slate-400 font-mono text-sm mb-3">FRAMEWORKS</h3>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "React.js", "Express", "Flask", "FastAPI", "TailwindCSS"].map(s => (
                    <span key={s} className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-300 text-sm hover:border-amber-500/50 transition-colors cursor-default">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-slate-400 font-mono text-sm mb-3">CLOUD & TOOLS</h3>
                <div className="flex flex-wrap gap-2">
                  {["AWS", "Redis", "Docker", "Git", "MongoDB", "Cribl"].map(s => (
                    <span key={s} className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-300 text-sm hover:border-amber-500/50 transition-colors cursor-default">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-slate-400 font-mono text-sm mb-3">AI SPECIALIZATIONS</h3>
                <div className="flex flex-wrap gap-2">
                  {["RAG Pipelines", "LLM Integration", "Voice AI Agents", "OCR", "Sentiment Analysis"].map(s => (
                    <span key={s} className="px-3 py-1.5 bg-purple-900/20 border border-purple-500/30 rounded text-purple-300 text-sm hover:bg-purple-900/30 transition-colors cursor-default">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-32">
          <SectionHeading icon={BookOpen} color="emerald">Education</SectionHeading>
          <div className="grid md:grid-cols-2 gap-4">
            <EducationCard
              school="Indian Institute of Technology (BHU)"
              degree="Bachelor's in Civil Engineering (Dual Degree)"
              score="GPA: 8.58"
              year="2026"
              color="emerald"
            />
            <EducationCard
              school="Narayana Junior College"
              degree="TSBIE (XII)"
              score="98.8%"
              year="2021"
              color="blue"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 pt-12 pb-8 text-center">
          <p className="text-slate-500 text-sm mb-4">
            Designed & Built by Ravikoti Deekshith
          </p>
          <div className="flex justify-center gap-6 text-slate-600">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=prsds10082003@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">Email</a>
            <a href="https://github.com/Dattuog" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/deekshith-ravikoti-b65ba9225/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">LinkedIn</a>
          </div>
        </footer>

      </main>
    </div>
  );
}
