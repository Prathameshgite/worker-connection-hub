
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star, X } from "lucide-react";

interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

interface WorkerReviewsProps {
  reviews: Review[];
}

export const WorkerReviews: React.FC<WorkerReviewsProps> = ({ reviews }) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-2">
      <h3 className="text-sm font-medium mb-2">Reviews:</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-500 text-sm">No reviews yet</p>
      ) : (
        <div className="space-y-2">
          {reviews.map((review, index) => (
            <div key={index} className="border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{review.reviewer}</span>
                <div className="flex items-center">
                  {renderStars(review.rating)}
                  <span className="ml-1 text-sm">{review.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
