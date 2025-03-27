
import React from 'react';
import WorkerCard from './WorkerCard';
import { Button } from "@/components/ui/button";

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

interface WorkerListProps {
  workers: Worker[];
  onDeleteWorker: (id: number) => void;
  onOpenReviews: (worker: Worker) => void;
  onContactWorker: (worker: Worker) => void;
  onClearFilters: () => void;
}

const WorkerList = ({ 
  workers, 
  onDeleteWorker, 
  onOpenReviews, 
  onContactWorker,
  onClearFilters 
}: WorkerListProps) => {
  return (
    <>
      {workers.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workers.map(worker => (
            <WorkerCard 
              key={worker.id} 
              worker={worker} 
              onDelete={onDeleteWorker}
              onOpenReviews={onOpenReviews}
              onContact={onContactWorker}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No workers found matching your criteria</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </>
  );
};

export default WorkerList;
