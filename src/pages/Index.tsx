
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { WorkerReviews } from "@/components/WorkerReviews";
import PageLayout from "@/components/PageLayout";
import SearchBar from "@/components/SearchBar";
import WorkerList from "@/components/WorkerList";
import { useWorkers, Worker } from "@/hooks/useWorkers";

const Index = () => {
  const { toast } = useToast();
  const {
    filteredWorkers,
    searchTerm,
    setSearchTerm,
    location,
    setLocation,
    handleDeleteWorker,
    handleAddReview,
    getCurrentLocation,
    handleSearch,
    clearFilters
  } = useWorkers();
  
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [showReviews, setShowReviews] = useState(false);

  // Force a re-render when the component mounts
  useEffect(() => {
    console.log("Index page mounted, workers count:", filteredWorkers.length);
  }, []);

  const openReviews = (worker: Worker) => {
    setSelectedWorker(worker);
    setShowReviews(true);
  };

  const handleContactWorker = (worker: Worker) => {
    toast({
      title: "Contact Sent",
      description: `Your request has been sent to ${worker.name}`,
    });
  };

  return (
    <PageLayout 
      title="Smart Services" 
      subtitle="Find skilled professionals for your projects"
    >
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        location={location}
        setLocation={setLocation}
        getCurrentLocation={getCurrentLocation}
        filteredWorkersCount={filteredWorkers.length}
        handleSearch={handleSearch}
      />

      <WorkerList 
        workers={filteredWorkers}
        onDeleteWorker={handleDeleteWorker}
        onOpenReviews={openReviews}
        onContactWorker={handleContactWorker}
        onClearFilters={clearFilters}
      />

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
    </PageLayout>
  );
};

export default Index;
