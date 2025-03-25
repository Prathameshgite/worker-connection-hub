
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star, X } from "lucide-react";

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
  reviews: Review[];
  [key: string]: any;
}

interface WorkerReviewsProps {
  worker: Worker;
  onClose: () => void;
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

export const WorkerReviews: React.FC<WorkerReviewsProps> = ({
  worker,
  onClose,
  onAddReview
}) => {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewerName, setReviewerName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewerName.trim()) {
      alert('Please enter your name');
      return;
    }
    
    onAddReview({
      userName: reviewerName,
      rating,
      comment
    });
    
    // Reset form
    setRating(5);
    setReviewerName('');
    setComment('');
    setShowForm(false);
  };

  const renderStarRating = (value: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-6 w-6 cursor-pointer ${
            i <= (hoveredRating || rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => setRating(i)}
        />
      );
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{worker.name} - Reviews</DialogTitle>
          <DialogDescription>
            {worker.profession} • {worker.reviews.length} {worker.reviews.length === 1 ? 'review' : 'reviews'}
          </DialogDescription>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        {!showForm ? (
          <div className="mt-2">
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => setShowForm(true)}
            >
              Write a Review
            </Button>
          </div>
        ) : (
          <Card className="my-4 border border-blue-100 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg">Write Your Review</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="reviewerName" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="reviewerName"
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  {renderStarRating(rating)}
                </div>
                
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review
                  </label>
                  <Textarea
                    id="comment"
                    placeholder="Share your experience with this worker..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Review
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        
        <div className="space-y-4 mt-4">
          {worker.reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to review!</p>
          ) : (
            worker.reviews.map((review) => (
              <Card key={review.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-medium">{review.userName}</CardTitle>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(review.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : i < review.rating 
                                  ? 'text-yellow-400 fill-current opacity-50' 
                                  : 'text-gray-300'
                            }`} 
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {review.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pb-4 pt-0">
                  <p className="text-gray-700">{review.comment}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
