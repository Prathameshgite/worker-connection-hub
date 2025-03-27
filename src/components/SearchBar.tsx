
import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  location: string;
  setLocation: (location: string) => void;
  getCurrentLocation: () => void;
  filteredWorkersCount: number;
  handleSearch: () => void;
}

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  location,
  setLocation,
  getCurrentLocation,
  filteredWorkersCount,
  handleSearch
}: SearchBarProps) => {
  return (
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
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                id="location"
                className="flex-grow block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button 
                type="button"
                onClick={getCurrentLocation}
                className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 sm:text-sm"
              >
                <MapPin className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {filteredWorkersCount} workers
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="default"
              onClick={handleSearch}
            >
              <Search className="mr-2 h-4 w-4" />
              Find
            </Button>
            <Link to="/add-worker">
              <Button variant="outline">
                Add New Worker
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
