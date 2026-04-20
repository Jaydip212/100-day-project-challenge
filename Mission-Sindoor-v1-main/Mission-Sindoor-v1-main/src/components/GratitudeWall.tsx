
import React, { useState } from 'react';
import { MessageSquareHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const GratitudeWall = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  
  // Sample messages for demonstration
  const [messages, setMessages] = useState([
    { id: 1, name: "Arjun Sharma", message: "Proud of our soldiers! Your courage and dedication inspire us all. Jai Hind! 🇮🇳", time: "2 hours ago" },
    { id: 2, name: "Priya Patel", message: "Thank you for keeping us safe. The operation's precision shows India's strength and resolve.", time: "4 hours ago" },
    { id: 3, name: "Raj Kumar", message: "Operation Sindoor demonstrates our nation's capability to respond effectively to threats. Saluting our forces!", time: "6 hours ago" },
    { id: 4, name: "Ananya Singh", message: "My deepest gratitude to the brave men and women who put their lives on the line for our safety. We're forever indebted.", time: "7 hours ago" },
    { id: 5, name: "Vikram Mehta", message: "The strategic brilliance behind this operation makes every Indian proud. Great job by intelligence and armed forces!", time: "9 hours ago" }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        name,
        message,
        time: "Just now"
      };
      setMessages([newMessage, ...messages]);
      setName('');
      setMessage('');
      toast({
        title: "Thank you for your message!",
        description: "Your gratitude has been added to our wall.",
      });
    }
  };

  return (
    <section id="gratitude" className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex items-center mb-12">
          <MessageSquareHeart className="h-8 w-8 mr-3 text-saffron" />
          <h2 className="section-heading">Gratitude Wall</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="section-subheading">Share Your Message</h3>
            <p className="text-gray-700 mb-6">
              Express your gratitude and support for the brave personnel involved in Operation Sindoor. 
              Your messages will be displayed on our gratitude wall.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message of gratitude..."
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="bg-navy hover:bg-navy/90">
                Submit Your Gratitude
              </Button>
            </form>
          </div>
          
          <div>
            <h3 className="section-subheading">Messages of Support</h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {messages.map((msg) => (
                <Card key={msg.id} className="bg-white">
                  <CardContent className="pt-6">
                    <p className="text-gray-700 italic">"{msg.message}"</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="font-medium">{msg.name}</span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GratitudeWall;
