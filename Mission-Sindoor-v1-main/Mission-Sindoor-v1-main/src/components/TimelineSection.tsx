
import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const TimelineSection = () => {
  const timelineEvents = [
    {
      date: "April 22, 2023",
      time: "14:30 IST",
      title: "Pahalgam Terror Attack",
      description: "Terrorists target civilians and security personnel in Pahalgam, resulting in casualties and prompting national security concerns.",
      category: "Incident"
    },
    {
      date: "April 23, 2023",
      time: "09:00 IST",
      title: "Emergency Security Meeting",
      description: "Top security officials gather to assess the situation and formulate a proportionate response strategy.",
      category: "Planning"
    },
    {
      date: "April 24-27, 2023",
      time: "Classified",
      title: "Intelligence Gathering & Analysis",
      description: "Intelligence agencies work around the clock to identify perpetrators and their locations through multi-source intelligence.",
      category: "Intelligence"
    },
    {
      date: "April 28, 2023",
      time: "20:15 IST",
      title: "Operation Approval",
      description: "After reviewing all intelligence and strategic options, leadership approves Operation Sindoor with defined parameters.",
      category: "Decision"
    },
    {
      date: "April 30, 2023",
      time: "01:30 IST",
      title: "Operation Sindoor Execution",
      description: "Precision strikes carried out on identified terrorist infrastructure with minimal collateral impact.",
      category: "Execution"
    },
    {
      date: "April 30, 2023",
      time: "06:45 IST",
      title: "Mission Completion Confirmed",
      description: "All operational objectives achieved with high success rate. Forces return safely to base.",
      category: "Success"
    },
    {
      date: "May 1, 2023",
      time: "11:00 IST",
      title: "Official Announcement",
      description: "Defense Ministry confirms successful operation, sharing limited details while emphasizing national security.",
      category: "Communication"
    }
  ];

  const getCategoryColor = (category) => {
    switch(category) {
      case "Incident": return "bg-red-100 text-red-800";
      case "Planning": return "bg-blue-100 text-blue-800";
      case "Intelligence": return "bg-purple-100 text-purple-800";
      case "Decision": return "bg-amber-100 text-amber-800";
      case "Execution": return "bg-saffron/10 text-saffron";
      case "Success": return "bg-indian-green/10 text-indian-green";
      case "Communication": return "bg-navy/10 text-navy";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="timeline" className="py-16 bg-white">
      <div className="container">
        <div className="flex items-center mb-12">
          <Calendar className="h-8 w-8 mr-3 text-navy" />
          <h2 className="section-heading">Timeline of Events</h2>
        </div>
        
        <p className="text-lg text-gray-700 max-w-3xl mb-12">
          Follow the chronological progression from the initial Pahalgam attack to the successful execution of Operation Sindoor.
        </p>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-200"></div>
          
          {/* Timeline events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative">
                {/* Date bubble */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-4 w-8 h-8 rounded-full border-4 border-white bg-navy z-10 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                
                {/* Content */}
                <div className={`md:w-1/2 ml-12 md:ml-0 p-5 rounded-lg bg-white border border-gray-100 shadow-sm ${index % 2 === 0 ? 'md:pr-12 md:text-right md:mr-auto' : 'md:pl-12 md:ml-auto'}`}>
                  <div className="flex items-center mb-2 md:justify-start gap-1.5">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{event.time} | {event.date}</span>
                  </div>
                  <h3 className="font-playfair font-semibold text-xl mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-3">{event.description}</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
