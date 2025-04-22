import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Worker {
  id: number;
  name: string;
  profession: string;
  location: string;
  rating: number;
  phone: string;
  email: string;
  reviews: Review[];
}

const defaultWorkers = [
  { 
    id: 1, 
    name: 'Rajesh Kumar', 
    profession: 'Plumber', 
    location: 'Koregaon Park, Pune', 
    rating: 4.8, 
    phone: '98765-43210', 
    email: 'rajesh@example.com',
    reviews: [
      { id: 1, userName: 'Ananya Sharma', rating: 5, comment: 'Excellent work, fixed my sink in no time!', date: '2023-05-15' },
      { id: 2, userName: 'Vikram Singh', rating: 4.5, comment: 'Very professional and reasonably priced.', date: '2023-04-22' }
    ]
  },
  { 
    id: 2, 
    name: 'Priya Patel', 
    profession: 'Electrician', 
    location: 'Kothrud, Pune', 
    rating: 4.9, 
    phone: '87654-32109', 
    email: 'priya@example.com',
    reviews: [
      { id: 1, userName: 'Arjun Mehta', rating: 5, comment: 'Fantastic work rewiring my home office.', date: '2023-06-10' },
      { id: 2, userName: 'Deepika Reddy', rating: 4.8, comment: 'Very knowledgeable and efficient.', date: '2023-05-28' }
    ]
  },
  { 
    id: 3, 
    name: 'Suresh Iyer', 
    profession: 'Carpenter', 
    location: 'Aundh, Pune', 
    rating: 4.7, 
    phone: '76543-21098', 
    email: 'suresh@example.com',
    reviews: [
      { id: 1, userName: 'Ravi Verma', rating: 4.5, comment: 'Built a beautiful custom bookshelf for my living room.', date: '2023-04-15' }
    ]
  },
  { 
    id: 4, 
    name: 'Meera Gupta', 
    profession: 'Painter', 
    location: 'Viman Nagar, Pune', 
    rating: 4.5, 
    phone: '65432-10987', 
    email: 'meera@example.com',
    reviews: [
      { id: 1, userName: 'Karthik Nair', rating: 4.5, comment: 'Great attention to detail and clean work.', date: '2023-03-20' },
      { id: 2, userName: 'Nisha Joshi', rating: 4.5, comment: 'Very pleased with the quality of work.', date: '2023-02-18' }
    ]
  },
  { 
    id: 5, 
    name: 'Amit Sharma', 
    profession: 'HVAC Technician', 
    location: 'Kalyani Nagar, Pune', 
    rating: 4.6, 
    phone: '54321-09876', 
    email: 'amit@example.com',
    reviews: [
      { id: 1, userName: 'Sanjay Kapoor', rating: 4.8, comment: 'Fixed my AC during a heatwave, lifesaver!', date: '2023-07-02' },
      { id: 2, userName: 'Pooja Malhotra', rating: 4.3, comment: 'Good service but arrived a bit late.', date: '2023-06-15' }
    ]
  },
  { 
    id: 6, 
    name: 'Kavita Desai', 
    profession: 'Landscaper', 
    location: 'Baner, Pune', 
    rating: 4.8, 
    phone: '43210-98765', 
    email: 'kavita@example.com',
    reviews: [
      { id: 1, userName: 'Rahul Khanna', rating: 5, comment: 'Transformed my garden into something beautiful!', date: '2023-05-10' },
      { id: 2, userName: 'Aisha Choudhary', rating: 4.6, comment: 'Great design ideas and implementation.', date: '2023-04-25' }
    ]
  }
];

export const useWorkers = () => {
  const { toast } = useToast();
  const [workers, setWorkers] = useState<Worker[]>(() => {
    const savedWorkers = localStorage.getItem('workers');
    return savedWorkers ? JSON.parse(savedWorkers) : defaultWorkers;
  });
  
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>(workers);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    localStorage.setItem('workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    let results = workers;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(worker => 
        worker.name.toLowerCase().includes(term) || 
        worker.profession.toLowerCase().includes(term)
      );
    }
    
    if (location) {
      const locationTerm = location.toLowerCase();
      results = results.filter(worker => 
        worker.location.toLowerCase().includes(locationTerm)
      );
    }
    
    setFilteredWorkers(results);
  }, [searchTerm, location, workers]);

  const handleDeleteWorker = (id: number) => {
    setWorkers(workers.filter(worker => worker.id !== id));
    toast({
      title: "Worker Removed",
      description: "The worker has been removed from the directory.",
    });
  };

  const handleAddReview = (workerId: number, review: Omit<Review, 'id' | 'date'>) => {
    const updatedWorkers = workers.map(worker => {
      if (worker.id === workerId) {
        const allRatings = [...worker.reviews.map(r => r.rating), review.rating];
        const avgRating = allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length;
        
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
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Location Found",
            description: "Using your current location to find nearby workers.",
          });
          setLocation("Current Location");
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter it manually.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support geolocation services.",
        variant: "destructive"
      });
    }
  };

  const handleSearch = () => {
    const results = workers;
    setFilteredWorkers(
      workers.filter(worker => {
        const nameMatch = searchTerm ? 
          worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          worker.profession.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        
        const locationMatch = location ? 
          worker.location.toLowerCase().includes(location.toLowerCase()) : true;
        
        return nameMatch && locationMatch;
      })
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocation('');
  };

  const addWorker = (worker: Worker) => {
    setWorkers(prevWorkers => [...prevWorkers, worker]);
  };

  return {
    workers,
    filteredWorkers,
    searchTerm,
    setSearchTerm,
    location,
    setLocation,
    handleDeleteWorker,
    handleAddReview,
    getCurrentLocation,
    handleSearch,
    clearFilters,
    addWorker
  };
};
