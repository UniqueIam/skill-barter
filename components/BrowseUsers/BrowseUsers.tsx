"use client";

import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import ProfessionalCard from "./ProfessionalCard";
import SkillSwapModal from "../skillSwapModal";
import { API_ROUTES } from "@/lib/routes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

const DiscoverProfessionals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Professional | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["get-all-users"],
    queryFn: async () => {
      const res = await axios.get<{ users: Omit<Professional, "maxRating">[] }>(
        API_ROUTES.USER.GETALL
      );
      return res.data.users.map((user) => ({
        ...user,
        maxRating: 5,
      }));
    },
  });

  const professionals: Professional[] = data || [];

  const locations = [
    ...new Set(professionals.map((p) => p.location || "Unknown")),
  ];

  const allSkills = Array.from(
    new Set(
      professionals.flatMap((p) => [...p.skillsOffered, ...p.skillsWanted])
    )
  );

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

    return matchesSearch && matchesSkill && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20">
      <div className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Discover <span className="text-teal-400">Talented Professionals</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Connect with skilled individuals ready to exchange knowledge and
          expertise.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <div className="relative">
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-teal-400 focus:outline-none text-white"
              >
                <option value="">Filter by skill</option>
                {allSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-teal-400 focus:outline-none text-white"
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
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <ProfessionalCard
          filteredProfessionals={filteredProfessionals}
          onRequest={(user) => {
            setSelectedUser(user);
            setShowModal(true);
          }}
        />

        {isLoading && (
          <p className="text-center text-gray-400 mt-10">
            Loading professionals...
          </p>
        )}

        {filteredProfessionals.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-4">
              No professionals found matching your criteria.
            </div>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedSkill("");
                setSelectedLocation("");
              }}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {showModal && selectedUser && (
        <SkillSwapModal
          user={{
            name: selectedUser.name,
            skillsOffered: selectedUser.skillsOffered,
            skillsWanted: selectedUser.skillsWanted,
          }}
          mySkills={["ReactJS", "Node.js", "TypeScript"]} // Replace with real user data
          onClose={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default DiscoverProfessionals;
