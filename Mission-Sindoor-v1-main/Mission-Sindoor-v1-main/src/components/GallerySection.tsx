
import React from 'react';
import { Image } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const GallerySection = () => {
  // Using placeholder images for demonstration
  const photoGallery = [
    {
      id: 1,
      title: "Armed Forces Recognition Ceremony",
      description: "Military officials honoring personnel involved in Operation Sindoor",
      image: "https://images.indianexpress.com/2025/05/operation-sindoor-2.jpg?w=640"
    },
    {
      id: 2,
      title: "Public Support Rally",
      description: "Citizens gather to show support for the successful mission",
      image: "https://media.cnn.com/api/v1/images/stellar/prod/191229212421-02-india-citizenship-bill-1223.jpg?q=w_1576,c_fill"
    },
    {
      id: 3,
      title: "Candlelight Vigil",
      description: "Remembering the victims of the Pahalgam attack",
      image: "https://ichef.bbci.co.uk/news/1024/cpsprodpb/12851/production/_105675857_052370256-1.jpg.webp"
    },
    {
      id: 4,
      title: "Flag Hoisting Ceremony",
      description: "Patriotic ceremony following the announcement of mission success",
      image: "https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2014/03/07/Incoming/Pictures/1192383_Wallpaper2.jpg"
    },
    {
      id: 5,
      title: "Military Equipment Display",
      description: "Exhibition showcasing precision equipment capabilities",
      image: "https://images.hindustantimes.com/img/2023/01/03/550x309/India-s-defence-exports-reached-its-highest-level-_1672753183041.jpg"
    },
    {
      id: 6,
      title: "Strategic Command Center",
      description: "Authorized view of mission coordination facilities",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvygrnews.com%2Fwhats-trending%2Foperation-sindoor--how-india-executed-a-precision-strike-on-terror-camps-using-scalp--hammer-missiles-and-kamikaze-drones&psig=AOvVaw0FB0tPHQ22lPSPpsrlpIdZ&ust=1746789410685000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPCRgOrfk40DFQAAAAAdAAAAABAE"
    }
  ];

  const videoGallery = [
    {
      id: 1,
      title: "Operation Sindoor: Official Briefing",
      duration: "5:24",
      thumbnail: "https://images.unsplash.com/photo-1486693326701-1d27c9cb92f3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Defense Minister's Address to the Nation",
      duration: "7:12",
      thumbnail: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Public Reactions: One Week Later",
      duration: "3:45",
      thumbnail: "https://images.unsplash.com/photo-1488861859915-4b5a5e57649e?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const missionMaps = [
    {
      id: 1,
      title: "Before & After: Impact Assessment",
      description: "Satellite imagery showing precision strike results",
      image: "https://images.unsplash.com/photo-1523598455533-144bae6cf56e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Regional Context Map",
      description: "Strategic overview of the operation area",
      image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="container">
        <div className="flex items-center mb-12">
          <Image className="h-8 w-8 mr-3 text-navy" />
          <h2 className="section-heading">Multimedia Gallery</h2>
        </div>
        
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="maps">Maps & Visuals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="photos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photoGallery.map((photo) => (
                <div key={photo.id} className="group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer">
                  <img 
                    src={photo.image} 
                    alt={photo.title} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-medium">{photo.title}</h3>
                    <p className="text-gray-200 text-sm">{photo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videoGallery.map((video) => (
                <div key={video.id} className="group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-saffron flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play text-white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="maps" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {missionMaps.map((map) => (
                <div key={map.id} className="overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                  <img 
                    src={map.image} 
                    alt={map.title} 
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{map.title}</h3>
                    <p className="text-gray-600">{map.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default GallerySection;
