
import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const UpdatesSection = () => {
  const updates = [
    {
      id: 1,
      title: "Military Officials Confirm All Operation Objectives Met",
      source: "Defense Ministry Brief",
      time: "2 hours ago",
      category: "Official Update"
    },
    {
      id: 2,
      title: "International Security Experts Praise Operation Precision",
      source: "Global Security Forum",
      time: "6 hours ago",
      category: "Expert Analysis"
    },
    {
      id: 3,
      title: "UN Security Council Discusses Regional Stability",
      source: "United Nations Press",
      time: "12 hours ago",
      category: "International"
    },
    {
      id: 4,
      title: "Special Medals to be Awarded to Operation Personnel",
      source: "Armed Forces Bulletin",
      time: "1 day ago",
      category: "Recognition"
    }
  ];

  const getCategoryClass = (category) => {
    switch(category) {
      case "Official Update": return "bg-navy/10 text-navy";
      case "Expert Analysis": return "bg-purple-100 text-purple-800";
      case "International": return "bg-blue-100 text-blue-800";
      case "Recognition": return "bg-saffron/10 text-saffron";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="container">
        <div className="flex items-center mb-8">
          <Clock className="h-6 w-6 mr-2 text-navy" />
          <h2 className="font-playfair font-bold text-2xl text-navy">Real-Time Updates</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {updates.map((update) => (
            <Card key={update.id} className="bg-white hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryClass(update.category)}`}>
                  {update.category}
                </span>
                <h3 className="font-medium text-gray-900 mb-2">{update.title}</h3>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{update.source}</span>
                  <span>{update.time}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpdatesSection;
