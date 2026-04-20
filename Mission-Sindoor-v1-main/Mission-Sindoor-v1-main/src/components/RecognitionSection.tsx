
import React from 'react';
import { Medal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const RecognitionSection = () => {
  const honorees = [
    {
      category: "Armed Forces",
      description: "For exceptional courage, strategic planning, and flawless execution of Operation Sindoor.",
      icon: "🪖"
    },
    {
      category: "Intelligence Agencies",
      description: "For critical intelligence gathering and analysis that enabled precise targeting.",
      icon: "🔍"
    },
    {
      category: "Leadership",
      description: "For decisive decision-making and unwavering resolve in defending national security.",
      icon: "⭐"
    },
    {
      category: "Support Personnel",
      description: "For providing crucial logistical and technical support throughout the operation.",
      icon: "🛠️"
    }
  ];

  return (
    <section id="recognition" className="py-16 bg-white">
      <div className="container">
        <div className="flex items-center mb-12">
          <Medal className="h-8 w-8 mr-3 text-saffron" />
          <h2 className="section-heading">Recognition & Honor</h2>
        </div>
        
        <p className="text-lg text-gray-700 max-w-3xl mb-12">
          Operation Sindoor stands as a testament to India's strategic capabilities and unwavering resolve. 
          We honor those whose bravery, expertise, and commitment made this precision response possible.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {honorees.map((honoree, index) => (
            <Card key={index} className="border-t-4 border-t-saffron hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">{honoree.icon}</div>
                <h3 className="font-playfair font-semibold text-xl mb-2">{honoree.category}</h3>
                <p className="text-gray-600">{honoree.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 p-6 bg-gray-50 border border-gray-100 rounded-lg">
          <h3 className="font-playfair font-semibold text-xl mb-4 text-navy">Special Commendations</h3>
          <p className="text-gray-700">
            The operation resulted in numerous commendations and honors for the involved personnel. 
            Military officials have announced that special medals will be awarded to key operatives 
            who demonstrated exceptional valor during the mission.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecognitionSection;
