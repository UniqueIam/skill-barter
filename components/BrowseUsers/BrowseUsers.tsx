"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Star,
  ChevronDown,
  User2Icon,
} from "lucide-react";
import ProfessionalCard from "./ProfessionalCard";

interface Professional {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  maxRating: number;
  available: boolean;
  skillsOffered: string[];
  skillsWanted: string[];
}

const professionalData: Professional[] = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "/api/placeholder/60/60",
    location: "San Francisco, CA",
    rating: 4.8,
    maxRating: 5,
    available: true,
    skillsOffered: ["React", "JavaScript", "Node.js"],
    skillsWanted: ["Python", "Machine Learning", "Data Science"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "/api/placeholder/60/60",
    location: "New York, NY",
    rating: 4.9,
    maxRating: 5,
    available: true,
    skillsOffered: ["Python", "Data Science", "Machine Learning"],
    skillsWanted: ["React", "Vue.js", "Frontend Development"],
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    avatar: "/api/placeholder/60/60",
    location: "Austin, TX",
    rating: 4.7,
    maxRating: 5,
    available: false,
    skillsOffered: ["Vue.js", "TypeScript", "GraphQL"],
    skillsWanted: ["AWS", "DevOps", "Docker"],
  },
  {
    id: "4",
    name: "Emily Wang",
    avatar: "/api/placeholder/60/60",
    location: "Seattle, WA",
    rating: 4.6,
    maxRating: 5,
    available: true,
    skillsOffered: ["AWS", "DevOps", "Docker"],
    skillsWanted: ["React", "TypeScript", "GraphQL"],
  },
];

const skills = [
  "React",
  "JavaScript",
  "Node.js",
  "Python",
  "Machine Learning",
  "Data Science",
  "Vue.js",
  "TypeScript",
  "GraphQL",
  "AWS",
  "DevOps",
  "Docker",
];

const locations = [
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Seattle, WA",
  "Los Angeles, CA",
  "Chicago, IL",
  "Boston, MA",
  "Remote",
];

const availabilityOptions = ["Available", "Busy", "Any"];

const DiscoverProfessionals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [professionals, setProfessionals] = useState(professionalData);

  // Filter professionals based on search criteria
  const filteredProfessionals = professionals.filter((professional) => {
    const matchesSearch =
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.skillsOffered.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      professional.skillsWanted.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesSkill =
      !selectedSkill ||
      professional.skillsOffered.includes(selectedSkill) ||
      professional.skillsWanted.includes(selectedSkill);

    const matchesLocation =
      !selectedLocation || professional.location === selectedLocation;

    const matchesAvailability =
      !selectedAvailability ||
      selectedAvailability === "Any" ||
      (selectedAvailability === "Available" && professional.available) ||
      (selectedAvailability === "Busy" && !professional.available);

    return (
      matchesSearch && matchesSkill && matchesLocation && matchesAvailability
    );
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20">
      {/* Header */}
      <div className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Discover <span className="text-teal-400">Talented Professionals</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Connect with skilled individuals ready to exchange knowledge and
          expertise.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-teal-400 focus:outline-none text-white placeholder-gray-400"
              />
            </div>

            {/* Skill Filter */}
            <div className="relative">
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-teal-400 focus:outline-none text-white appearance-none cursor-pointer"
              >
                <option value="">Filter by skill</option>
                {skills.map((skill) => (
                  <option
                    key={skill}
                    value={skill}
                    className="hover:bg-gray-900"
                  >
                    {skill}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Location Filter */}
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-teal-400 focus:outline-none text-white appearance-none cursor-pointer"
              >
                <option value="">Filter by location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Availability Filter */}
            <div className="relative">
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-teal-400 focus:outline-none text-white appearance-none cursor-pointer"
              >
                <option value="">Availability</option>
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Professional Cards */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <ProfessionalCard filteredProfessionals={filteredProfessionals} />

        {/* No Results Message */}
        {filteredProfessionals.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-4">
              No professionals found matching your criteria.
            </div>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedSkill("");
                setSelectedLocation("");
                setSelectedAvailability("");
              }}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverProfessionals;
