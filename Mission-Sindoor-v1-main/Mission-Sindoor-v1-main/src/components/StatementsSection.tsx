
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StatementsSection = () => {
  const officialStatements = [
    {
      author: "Defense Minister",
      content: "The successful execution of Operation Sindoor demonstrates India's resolve to protect its citizens and sovereignty. We will not tolerate any threat to our nation's security.",
      date: "May 1, 2023"
    },
    {
      author: "Army Chief",
      content: "Our forces have carried out this mission with exceptional professionalism and precision. This operation stands as a testament to the capabilities of our armed forces.",
      date: "May 1, 2023"
    },
    {
      author: "Foreign Ministry Spokesperson",
      content: "India remains committed to peace and stability in the region. However, we reserve the right to defend ourselves against any form of terrorism that threatens our people.",
      date: "May 2, 2023"
    }
  ];

  const diplomaticReactions = [
    {
      country: "United States",
      content: "We acknowledge India's right to defend its sovereignty and protect its citizens against terrorist threats.",
      official: "State Department Spokesperson"
    },
    {
      country: "United Kingdom",
      content: "We support counter-terrorism efforts that adhere to international law and minimize civilian casualties.",
      official: "Foreign Secretary"
    },
    {
      country: "Russia",
      content: "We stand with India in its fight against terrorism and recognize the precision with which this operation was conducted.",
      official: "Foreign Minister"
    }
  ];

  const publicTributes = [
    {
      name: "Veteran's Association",
      content: "We salute the bravery and professionalism shown by our armed forces. Operation Sindoor represents the highest standards of military excellence."
    },
    {
      name: "National Film Star",
      content: "Immensely proud of our forces for their courage and precision. Your sacrifice keeps us safe. Jai Hind! 🇮🇳"
    },
    {
      name: "Sports Icon",
      content: "The entire nation stands behind our brave forces. Your dedication and valor make every Indian proud. #OperationSindoor #ProudIndian"
    }
  ];

  return (
    <section id="statements" className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex items-center mb-12">
          <MessageSquare className="h-8 w-8 mr-3 text-navy" />
          <h2 className="section-heading">Official Statements & Reactions</h2>
        </div>
        
        <Tabs defaultValue="official" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="official">Official Statements</TabsTrigger>
            <TabsTrigger value="diplomatic">Global Reactions</TabsTrigger>
            <TabsTrigger value="public">Public Tributes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="official" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {officialStatements.map((statement, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="pt-6">
                    <blockquote className="text-gray-700 mb-4">"{statement.content}"</blockquote>
                    <div className="flex justify-between items-center">
                      <strong className="text-navy">{statement.author}</strong>
                      <span className="text-sm text-gray-500">{statement.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="diplomatic" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {diplomaticReactions.map((reaction, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <strong className="text-lg font-playfair text-navy">{reaction.country}</strong>
                    </div>
                    <blockquote className="text-gray-700 mb-4">"{reaction.content}"</blockquote>
                    <div className="text-sm text-gray-500">— {reaction.official}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="public" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {publicTributes.map((tribute, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="pt-6">
                    <blockquote className="text-gray-700 mb-4">"{tribute.content}"</blockquote>
                    <div className="font-medium text-navy">{tribute.name}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default StatementsSection;
