import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, ArrowLeft } from "lucide-react";
import { useWorkers } from "@/hooks/useWorkers";

const AddWorker = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addWorker } = useWorkers();
  const [newWorker, setNewWorker] = useState({
    name: '',
    profession: '',
    location: '',
    phone: '',
    email: '',
    rating: 4.0,
    reviews: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorker({ ...newWorker, [name]: value });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Location Found",
            description: "Using your current location for the worker profile.",
          });
          setNewWorker({ ...newWorker, location: "Current Location" });
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

  const handleAddWorker = (e) => {
    e.preventDefault();
    
    // Create a new worker with a unique ID
    const newId = Math.floor(Math.random() * 1000) + 1;
    const workerToAdd = { 
      ...newWorker, 
      id: newId, 
      rating: parseFloat(newWorker.rating.toString()) || 4.0,
      reviews: []
    };
    
    // Add the worker to the global state using the useWorkers hook
    addWorker(workerToAdd);
    
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
    
    // Navigate back to main page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Worker</h1>
              <p className="mt-1 text-sm text-gray-600">Add a skilled professional to the directory</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Worker Information</h2>
            <form onSubmit={handleAddWorker}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={newWorker.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="profession">Profession</Label>
                  <Input
                    id="profession"
                    name="profession"
                    required
                    value={newWorker.profession}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="flex">
                    <Input
                      id="location"
                      name="location"
                      required
                      value={newWorker.location}
                      onChange={handleInputChange}
                      className="rounded-r-none"
                    />
                    <Button 
                      type="button" 
                      onClick={getCurrentLocation}
                      variant="outline"
                      className="rounded-l-none border-l-0"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={newWorker.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={newWorker.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Initial Rating (1-5)</Label>
                  <Input
                    type="number"
                    id="rating"
                    name="rating"
                    min="1"
                    max="5"
                    step="0.1"
                    value={newWorker.rating}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
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
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 Smart Services. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AddWorker;
