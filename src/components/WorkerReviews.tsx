
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface Review {
  reviewer: string;
  rating: number;
  comment: string;
  date?: string;
}

interface WorkerReviewsProps {
  reviews: Review[];
}

export const WorkerReviews: React.FC<WorkerReviewsProps> = ({ reviews }) => {
  const [expandedReviews, setExpandedReviews] = useState(false);
  
  // Only show one review initially unless expanded
  const visibleReviews = expandedReviews ? reviews : reviews.slice(0, 1);
  
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500 text-sm mt-2">No reviews yet</p>;
  }

  return (
    <div className="mt-2">
      <h3 className="text-sm font-medium mb-2">Customer Reviews:</h3>
      
      <div className="space-y-2">
        {visibleReviews.map((review, index) => (
          <div key={index} className="bg-gray-50 p-2 rounded text-sm">
            <div className="flex justify-between">
              <span className="font-medium">{review.reviewer}</span>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">{review.rating}</span>
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
              </div>
            </div>
            <p className="text-gray-600 mt-1">{review.comment}</p>
          </div>
        ))}
      </div>
      
      {reviews.length > 1 && !expandedReviews && (
        <Button 
          variant="link" 
          size="sm" 
          className="mt-1 p-0 h-auto text-sm"
          onClick={() => setExpandedReviews(true)}
        >
          Show all {reviews.length} reviews
        </Button>
      )}
      
      {expandedReviews && (
        <Button 
          variant="link" 
          size="sm" 
          className="mt-1 p-0 h-auto text-sm"
          onClick={() => setExpandedReviews(false)}
        >
          Show less
        </Button>
      )}
    </div>
  );
};
