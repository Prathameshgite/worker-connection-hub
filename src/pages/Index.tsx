import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WorkerReviews } from "@/components/WorkerReviews";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [workers, setWorkers] = useState([
    {
      id: 1, 
      name: 'Rajesh Kumar', 
      profession: 'Plumber', 
      location: 'Koregaon Park, Pune', 
      rating: 4.8, 
      phone: '98765-43210', 
      email: 'rajesh@example.com',
      reviews: [
        { reviewer: 'Ananya', rating: 5, comment: 'Excellent service, fixed my leaking sink quickly!' },
        { reviewer: 'Vikram', rating: 4.5, comment: 'Very professional and punctual.' }
      ]
    },
    {
      id: 2,
      name: 'Priya Sharma',
      profession: 'Electrician',
      location: 'Aundh, Pune',
      rating: 4.5,
      phone: '99221-12345',
      email: 'priya@example.com',
      reviews: [
        { reviewer: 'Amit', rating: 4, comment: 'Good work, but slightly delayed.' },
        { reviewer: 'Sneha', rating: 5, comment: 'Excellent electrical work, very efficient.' }
      ]
    },
    {
      id: 3,
      name: 'Suresh Menon',
      profession: 'Carpenter',
      location: 'Baner, Pune',
      rating: 4.2,
      phone: '98230-56789',
      email: 'suresh@example.com',
      reviews: [
        { reviewer: 'Divya', rating: 3.5, comment: 'Average work, could be better.' },
        { reviewer: 'Kiran', rating: 4.5, comment: 'Good carpentry skills, reasonable pricing.' }
      ]
    },
    {
      id: 4,
      name: 'Anita Joshi',
      profession: 'Painter',
      location: 'Shivaji Nagar, Pune',
      rating: 4.9,
      phone: '97654-00123',
      email: 'anita@example.com',
      reviews: [
        { reviewer: ' Rohan', rating: 5, comment: 'Fantastic painting job, very clean and professional.' },
        { reviewer: 'Meera', rating: 4.8, comment: 'Excellent attention to detail.' }
      ]
    },
    {
      id: 5,
      name: 'Deepak Patel',
      profession: 'Mechanic',
      location: 'Pimpri-Chinchwad, Pune',
      rating: 4.6,
      phone: '99700-67890',
      email: 'deepak@example.com',
      reviews: [
        { reviewer: ' Sameer', rating: 4.5, comment: 'Good mechanic, fixed my car quickly.' },
        { reviewer: 'Neha', rating: 4.7, comment: 'Reliable and trustworthy mechanic.' }
      ]
    }
  ]);

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Service Providers in Pune</h1>
        <Link to="/workflow">
          <Button variant="outline" className="mb-4 md:mb-0">
            View Project Workflow
          </Button>
        </Link>
      </div>
      
      <div className="mb-6">
        <Label htmlFor="search" className="block text-sm font-medium text-gray-700">
          Search by name, profession, or location:
        </Label>
        <Input
          type="text"
          id="search"
          placeholder="Enter search term..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map(worker => (
          <Card key={worker.id}>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">{worker.name}</h2>
              <p className="text-gray-600">{worker.profession}</p>
              <p className="text-gray-600">{worker.location}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500 mr-1">Rating:</span>
                <span>{worker.rating}</span>
              </div>
              <div className="mt-4">
                <WorkerReviews reviews={worker.reviews} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
