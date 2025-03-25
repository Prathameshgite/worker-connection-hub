
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { WorkerReviews } from "@/components/WorkerReviews";
import { Star, StarHalf } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [workers, setWorkers] = useState([
    { 
      id: 1, 
      name: 'John Smith', 
      profession: 'Plumber', 
      location: 'New York', 
      rating: 4.8, 
      phone: '555-123-4567', 
      email: 'john@example.com',
      reviews: [
        { id: 1, userName: 'Alice Johnson', rating: 5, comment: 'Excellent work, fixed my sink in no time!', date: '2023-05-15' },
        { id: 2, userName: 'Bob Williams', rating: 4.5, comment: 'Very professional and reasonably priced.', date: '2023-04-22' }
      ]
    },
    { 
      id: 2, 
      name: 'Maria Garcia', 
      profession: 'Electrician', 
      location: 'Chicago', 
      rating: 4.9, 
      phone: '555-234-5678', 
      email: 'maria@example.com',
      reviews: [
        { id: 1, userName: 'Chris Evans', rating: 5, comment: 'Fantastic work rewiring my home office.', date: '2023-06-10' },
        { id: 2, userName: 'Diana Prince', rating: 4.8, comment: 'Very knowledgeable and efficient.', date: '2023-05-28' }
      ]
    },
    { 
      id: 3, 
      name: 'David Lee', 
      profession: 'Carpenter', 
      location: 'Los Angeles', 
      rating: 4.7, 
      phone: '555-345-6789', 
      email: 'david@example.com',
      reviews: [
        { id: 1, userName: 'Frank Castle', rating: 4.5, comment: 'Built a beautiful custom bookshelf for my living room.', date: '2023-04-15' }
      ]
    },
    { 
      id: 4, 
      name: 'Sarah Johnson', 
      profession: 'Painter', 
      location: 'Houston', 
      rating: 4.5, 
      phone: '555-456-7890', 
      email: 'sarah@example.com',
      reviews: [
        { id: 1, userName: 'George Banks', rating: 4.5, comment: 'Great attention to detail and clean work.', date: '2023-03-20' },
        { id: 2, userName: 'Hannah Montana', rating: 4.5, comment: 'Very pleased with the quality of work.', date: '2023-02-18' }
      ]
    },
    { 
      id: 5, 
      name: 'Michael Brown', 
      profession: 'HVAC Technician', 
      location: 'Phoenix', 
      rating: 4.6, 
      phone: '555-567-8901', 
      email: 'michael@example.com',
      reviews: [
        { id: 1, userName: 'Ian Malcolm', rating: 4.8, comment: 'Fixed my AC during a heatwave, lifesaver!', date: '2023-07-02' },
        { id: 2, userName: 'Julia Roberts', rating: 4.3, comment: 'Good service but arrived a bit late.', date: '2023-06-15' }
      ]
    },
    { 
      id: 6, 
      name: 'Emily Wilson', 
      profession: 'Landscaper', 
      location: 'Philadelphia', 
      rating: 4.8, 
      phone: '555-678-9012', 
      email: 'emily@example.com',
      reviews: [
        { id: 1, userName: 'Kevin Hart', rating: 5, comment: 'Transformed my backyard into something from a magazine!', date: '2023-05-10' },
        { id: 2, userName: 'Liam Neeson', rating: 4.6, comment: 'Great design ideas and implementation.', date: '2023-04-25' }
      ]
    }
  ]);
  
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [newWorker, setNewWorker] = useState({
    name: '',
    profession: '',
    location: '',
    phone: '',
    email: '',
    rating: 4.0,
    reviews: []
  });

  // Initialize filtered workers on component mount
  useEffect(() => {
    setFilteredWorkers(workers);
  }, [workers]);

  // Handle search and filter
  useEffect(() => {
    let results = workers;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(worker => 
        worker.name.toLowerCase().includes(term) || 
        worker.profession.toLowerCase().includes(term)
      );
    }
    
    // Filter by location
    if (selectedLocation !== 'All') {
      results = results.filter(worker => worker.location === selectedLocation);
    }
    
    setFilteredWorkers(results);
  }, [searchTerm, selectedLocation, workers]);

  // Handle input changes for new worker form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorker({ ...newWorker, [name]: value });
  };

  // Add a new worker
  const handleAddWorker = (e) => {
    e.preventDefault();
    const newId = workers.length > 0 ? Math.max(...workers.map(w => w.id)) + 1 : 1;
    const workerToAdd = { 
      ...newWorker, 
      id: newId, 
      rating: parseFloat(newWorker.rating.toString()) || 4.0,
      reviews: []
    };
    
    setWorkers([...workers, workerToAdd]);
    toast({
      title: "Worker Added",
      description: `${newWorker.name} has been added to the directory.`,
    });
    
    // Reset form
    setNewWorker({
      name: '',
      profession: '',
      location: '',
      phone: '',
      email: '',
      rating: 4.0,
      reviews: []
    });
    setShowAddForm(false);
  };

  // Delete a worker
  const handleDeleteWorker = (id) => {
    setWorkers(workers.filter(worker => worker.id !== id));
    toast({
      title: "Worker Removed",
      description: "The worker has been removed from the directory.",
    });
  };

  // Handle adding a new review
  const handleAddReview = (workerId, review) => {
    const updatedWorkers = workers.map(worker => {
      if (worker.id === workerId) {
        // Calculate new average rating
        const allRatings = [...worker.reviews.map(r => r.rating), review.rating];
        const avgRating = allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length;
        
        // Add the new review with a unique ID
        const newReview = {
          ...review,
          id: worker.reviews.length > 0 ? Math.max(...worker.reviews.map(r => r.id)) + 1 : 1,
          date: new Date().toISOString().slice(0, 10)
        };
        
        return {
          ...worker,
          reviews: [...worker.reviews, newReview],
          rating: parseFloat(avgRating.toFixed(1))
        };
      }
      return worker;
    });
    
    setWorkers(updatedWorkers);
    toast({
      title: "Review Added",
      description: "Your review has been submitted. Thank you for your feedback!",
    });
    setShowReviews(false);
    setSelectedWorker(null);
  };

  // Open reviews modal
  const openReviews = (worker) => {
    setSelectedWorker(worker);
    setShowReviews(true);
  };

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalf key={i} className="h-4 w-4 text-yellow-400 fill-current" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    
    return <div className="flex items-center">{stars} <span className="ml-1 text-gray-600">({rating})</span></div>;
  };

  // Get all unique locations for filter dropdown
  const locations = ['All', ...new Set(workers.map(worker => worker.location))];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Worker Connection Hub</h1>
          <p className="mt-1 text-sm text-gray-600">Find skilled professionals for your projects</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="col-span-1 sm:col-span-2">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
                <input
                  type="text"
                  id="search"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search by name or profession..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <select
                  id="location"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {filteredWorkers.length} workers
              </div>
              <Button 
                variant="default"
                onClick={() => setShowAddForm(true)}
              >
                Add New Worker
              </Button>
            </div>
          </div>
        </div>

        {/* Add Worker Form */}
        {showAddForm && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Worker</h2>
              <form onSubmit={handleAddWorker}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newWorker.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="profession" className="block text-sm font-medium text-gray-700">Profession</label>
                    <input
                      type="text"
                      id="profession"
                      name="profession"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newWorker.profession}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newWorker.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newWorker.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newWorker.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                    <input
                      type="number"
                      id="rating"
                      name="rating"
                      min="1"
                      max="5"
                      step="0.1"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newWorker.rating}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Add Worker
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Workers Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWorkers.map(worker => (
            <Card key={worker.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="flex justify-between">
                    <h2 className="text-lg font-medium text-gray-900">{worker.name}</h2>
                    <button
                      onClick={() => handleDeleteWorker(worker.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Delete worker"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-sm text-blue-600 font-medium">{worker.profession}</p>
                  <div className="mt-1 flex justify-between items-center">
                    {renderStars(worker.rating)}
                    <button 
                      onClick={() => openReviews(worker)}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      Reviews ({worker.reviews.length})
                    </button>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50">
                  <div className="grid grid-cols-1 gap-1">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="ml-2 text-sm text-gray-600">{worker.location}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="ml-2 text-sm text-gray-600">{worker.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="ml-2 text-sm text-gray-600">{worker.email}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button
                      variant="outline"
                      className="flex-1 text-sm"
                      onClick={() => {
                        toast({
                          title: "Contact Sent",
                          description: `Your request has been sent to ${worker.name}`,
                        });
                      }}
                    >
                      Contact
                    </Button>
                    <Button
                      variant="default"
                      className="flex-1 text-sm"
                      onClick={() => openReviews(worker)}
                    >
                      Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredWorkers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No workers found matching your criteria</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Reviews Modal */}
        {showReviews && selectedWorker && (
          <WorkerReviews 
            worker={selectedWorker}
            onClose={() => {
              setShowReviews(false);
              setSelectedWorker(null);
            }}
            onAddReview={(review) => handleAddReview(selectedWorker.id, review)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2023 Worker Connection Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
