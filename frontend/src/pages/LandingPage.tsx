import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BrainCircuit, BookOpen, MessageSquare, Download, ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black overflow-hidden font-sans">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium text-xl tracking-tight">
            <BrainCircuit className="w-6 h-6" />
            <span>Lumina</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#features" className="hover:text-black transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-black transition-colors">How it Works</a>
            <Link to="/dashboard" className="bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section - Split Layout */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter leading-[0.9] mb-8">
                Learn.<br />
                Think.<br />
                Master.
              </h1>
              <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-md">
                An AI-powered learning platform designed to guide you through complex topics using the Socratic method.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link to="/dashboard" className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-all hover:gap-4">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/courses" className="w-full sm:w-auto bg-transparent border border-gray-200 text-black px-8 py-4 rounded-full text-sm font-medium flex items-center justify-center hover:border-black transition-all">
                  Explore Courses
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center relative overflow-hidden">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0 340deg, black 360deg)'
                  }}
                />
                <BrainCircuit className="w-32 h-32 text-gray-200" />
              </div>
              
              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -left-10 bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-black/5"
              >
                <MessageSquare className="w-6 h-6 mb-2" />
                <div className="text-sm font-medium">Socratic AI</div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 -right-10 bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-black/5"
              >
                <BookOpen className="w-6 h-6 mb-2" />
                <div className="text-sm font-medium">Smart Quizzes</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section - Minimal Grid */}
        <section id="features" className="py-32 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20 md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">Supercharge Your Learning</h2>
              <p className="text-gray-500 text-lg">Everything you need to master new subjects, all in one place. No distractions, just pure focus.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
              {[
                {
                  icon: MessageSquare,
                  title: "AI Socratic Tutor",
                  desc: "Don't just get answers. Learn how to think through problems with our AI tutor that guides you step-by-step."
                },
                {
                  icon: BookOpen,
                  title: "Smart Quizzes",
                  desc: "Test your knowledge with adaptive quizzes that identify your weak points and help you improve."
                },
                {
                  icon: Download,
                  title: "Curated Resources",
                  desc: "Download mind maps, cheat sheets, and question banks tailored to your courses."
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works - Typographic */}
        <section id="how-it-works" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 sticky top-32">How It Works</h2>
            </div>
            
            <div className="space-y-24">
              {[
                { step: "01", title: "Choose a Course", desc: "Browse our catalog of expert-crafted courses across various subjects." },
                { step: "02", title: "Learn & Interact", desc: "Watch lessons, read materials, and chat with the AI tutor when stuck." },
                { step: "03", title: "Test & Master", desc: "Take smart quizzes and review downloaded resources to solidify knowledge." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-12 border-l border-gray-200"
                >
                  <span className="absolute -left-4 top-0 bg-white text-gray-400 font-mono text-sm py-1">
                    {item.step}
                  </span>
                  <h3 className="text-2xl font-medium mb-4">{item.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-medium tracking-tight">
            <BrainCircuit className="w-5 h-5" />
            <span>Lumina</span>
          </div>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Lumina Learning. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
