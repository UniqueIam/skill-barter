import { Calendar, MapPin, Star, User2Icon } from "lucide-react";
import React from "react";

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

const ProfessionalCard = ({
  filteredProfessionals,
  onRequest,
}: {
  filteredProfessionals: Professional[];
  onRequest: (user: Professional) => void;
}) => {
  const SkillTag: React.FC<{ skill: string; type: "offered" | "wanted" }> = ({
    skill,
    type,
  }) => (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        type === "offered"
          ? "bg-teal-500/10 text-teal-500 border border-teal-500/50"
          : "bg-gray-600/10 text-gray-400 border border-gray-500/50"
      }`}
    >
      {skill}
    </span>
  );

  const renderStars = (rating: number, maxRating: number) => (
    <div className="flex items-center gap-1">
      {[...Array(maxRating)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating) ? "text-yellow-500/70" : "text-gray-400/70"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredProfessionals.map((professional) => (
        <div
          key={professional.id}
          className="bg-gray-900 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
                <User2Icon className="text-gray-400 h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {professional.name}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{professional.location}</span>
                  <Calendar className="w-4 h-4 ml-2" />
                  <span className="text-sm">
                    {professional.available ? "Available" : "Busy"}
                  </span>
                </div>
              </div>
            </div>
            {renderStars(professional.rating, professional.maxRating)}
          </div>

          <div className="mb-4">
            <h4 className="text-gray-300 font-semibold mb-2">
              Skills Offered:
            </h4>
            <div className="flex flex-wrap gap-2">
              {professional.skillsOffered.map((skill) => (
                <SkillTag key={skill} skill={skill} type="offered" />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-gray-300 font-semibold mb-2">Skills Wanted:</h4>
            <div className="flex flex-wrap gap-2">
              {professional.skillsWanted.map((skill) => (
                <SkillTag key={skill} skill={skill} type="wanted" />
              ))}
            </div>
          </div>

          <button
            onClick={() => onRequest(professional)}
            className="w-full bg-teal-500 hover:bg-teal-700 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Request Swap
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProfessionalCard;
