
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Worker {
  id: number;
  name: string;
  profession: string;
  location: string;
  rating: number;
  phone: string;
  email: string;
  reviews: Review[];
}

interface WorkerCardProps {
  worker: Worker;
  onDelete: (id: number) => void;
  onOpenReviews: (worker: Worker) => void;
  onContact: (worker: Worker) => void;
}

const WorkerCard = ({ worker, onDelete, onOpenReviews, onContact }: WorkerCardProps) => {
  const renderStars = (rating: number) => {
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

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <div className="flex justify-between">
            <h2 className="text-lg font-medium text-gray-900">{worker.name}</h2>
            <button
              onClick={() => onDelete(worker.id)}
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
              onClick={() => onOpenReviews(worker)}
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
              onClick={() => onContact(worker)}
            >
              Contact
            </Button>
            <Button
              variant="default"
              className="flex-1 text-sm"
              onClick={() => onOpenReviews(worker)}
            >
              Review
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkerCard;
