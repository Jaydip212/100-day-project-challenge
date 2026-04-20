
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const MissionContext = () => {
  return (
    <section id="mission" className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex items-center mb-12">
          <Clock className="h-8 w-8 mr-3 text-navy" />
          <h2 className="section-heading">Mission Context & Success</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="section-subheading">The Pahalgam Attack</h3>
            <p className="text-gray-700 mb-6">
              On April 22, terrorists carried out a deadly attack in Pahalgam, targeting innocent civilians and security personnel. 
              The attack resulted in significant casualties and demonstrated a clear threat to national security and peace in the region.
            </p>
            
            <h3 className="section-subheading">Strategic Response</h3>
            <p className="text-gray-700 mb-6">
              In response, Indian defense forces formulated Operation Sindoor: a precisely planned counterterrorism operation 
              designed to neutralize threats while minimizing collateral damage. The operation was authorized at the highest levels 
              of government after careful consideration of intelligence reports and strategic objectives.
            </p>
            
            <div className="p-4 bg-orange-50 border-l-4 border-saffron rounded">
              <p className="text-sm text-gray-700">
                "Operation Sindoor represents India's commitment to protect its citizens and sovereignty through 
                strategic precision and unwavering resolve. This operation stands as a warning to those who threaten our peace."
              </p>
              <p className="text-sm font-medium mt-2">— Defense Ministry Statement</p>
            </div>
          </div>
          
          <div>
            <h3 className="section-subheading">Mission Success Metrics</h3>
            
            <div className="space-y-6">
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <h4 className="font-medium text-lg mb-2">High-Value Targets Neutralized</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Primary targets</span>
                    <span className="font-semibold text-navy">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 mt-2 rounded-full">
                    <div className="bg-saffron h-full rounded-full" style={{width: "100%"}}></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <h4 className="font-medium text-lg mb-2">Critical Infrastructure Impacted</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Command Centers</p>
                      <p className="font-semibold text-xl">4</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Training Camps</p>
                      <p className="font-semibold text-xl">3</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Supply Depots</p>
                      <p className="font-semibold text-xl">6</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Communication Hubs</p>
                      <p className="font-semibold text-xl">5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <h4 className="font-medium text-lg mb-2">Operation Efficiency</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mission Timeframe</span>
                        <span>96% on schedule</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full">
                        <div className="bg-indian-green h-full rounded-full" style={{width: "96%"}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Resource Utilization</span>
                        <span>92% efficiency</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full">
                        <div className="bg-indian-green h-full rounded-full" style={{width: "92%"}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Precision Accuracy</span>
                        <span>98% accuracy</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full">
                        <div className="bg-indian-green h-full rounded-full" style={{width: "98%"}}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionContext;
