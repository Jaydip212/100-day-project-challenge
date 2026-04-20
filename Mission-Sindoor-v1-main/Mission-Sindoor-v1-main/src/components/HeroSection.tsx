
import React from 'react';
import { Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-20"></div>
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex mb-4 items-center justify-center p-2 bg-orange-50 border border-orange-100 rounded-full">
            <Award className="h-5 w-5 mr-2 text-saffron" />
            <span className="text-sm font-medium text-gray-800">A Salute to India's Precision Strike</span>
          </div>
          <h1 className="font-playfair font-bold text-4xl md:text-6xl leading-tight mb-6 text-navy animate-fade-in">
            Mission Sindoor: Precision, Courage, Justice
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Honoring the bravery and strategic excellence of India's Armed Forces in response to the Pahalgam terror attack
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button className="bg-saffron hover:bg-saffron/90 text-white">
              Watch Mission Briefing
            </Button>
            <Button variant="outline" className="border-navy text-navy hover:bg-navy/5">
              Learn About Operation
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-saffron via-white to-indian-green"></div>
    </section>
  );
};

export default HeroSection;
