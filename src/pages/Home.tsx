import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <Blog />
      <Certificates />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;