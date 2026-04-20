
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import RecognitionSection from '@/components/RecognitionSection';
import MissionContext from '@/components/MissionContext';
import TimelineSection from '@/components/TimelineSection';
import StatementsSection from '@/components/StatementsSection';
import GallerySection from '@/components/GallerySection';
import GratitudeWall from '@/components/GratitudeWall';
import UpdatesSection from '@/components/UpdatesSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <UpdatesSection />
        <MissionContext />
        <RecognitionSection />
        <TimelineSection />
        <StatementsSection />
        <GallerySection />
        <GratitudeWall />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
