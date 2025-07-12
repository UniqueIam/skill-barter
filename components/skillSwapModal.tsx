"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface SkillSwapModalProps {
  user: {
    name: string;
    skillsOffered: string[];
    skillsWanted: string[];
  };
  mySkills: string[];
  onClose: () => void;
}

const SkillSwapModal: React.FC<SkillSwapModalProps> = ({
  user,
  mySkills,
  onClose,
}) => {
  const [offeredSkill, setOfferedSkill] = useState("");
  const [wantedSkill, setWantedSkill] = useState("");

  const handleSubmit = () => {
    if (!offeredSkill || !wantedSkill) {
      alert("Please select both skills.");
      return;
    }
    alert(
      `Request sent to ${user.name} to exchange "${offeredSkill}" for "${wantedSkill}"`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-white">
          Send Skill Swap Request
        </h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">
            Skill you offer
          </label>
          <select
            value={offeredSkill}
            onChange={(e) => setOfferedSkill(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
          >
            <option value="">Select skill</option>
            {mySkills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-1">
            Skill you want
          </label>
          <select
            value={wantedSkill}
            onChange={(e) => setWantedSkill(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
          >
            <option value="">Select skill</option>
            {user.skillsOffered.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded"
        >
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default SkillSwapModal;
