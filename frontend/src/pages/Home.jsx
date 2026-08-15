import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ComplaintStats from '../components/ComplaintStats';
import VillageServices from '../components/VillageServices';
import NewsAndEmergency from '../components/NewsAndEmergency';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased">
      <Navbar />
      <Hero />
      <ComplaintStats />
      <VillageServices />
      <NewsAndEmergency />
      <Footer />
    </div>
  );
};

export default Home;