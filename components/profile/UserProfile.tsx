"use client";
import React, { useState } from "react";
import {
  Edit,
  MapPin,
  Eye,
  User,
  Star,
  X,
  Save,
  Plus,
  Trash2,
} from "lucide-react";

interface ProfileData {
  fullName: string;
  location: string;
  bio: string;
  availability: "Available" | "Busy" | "Away";
  profileVisibility: "Public" | "Private";
  skillsICanOffer: string[];
  skillsIWantToLearn: string[];
  rating: number;
  profileImage: string;
}

const ProfileComponent: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Gaurav Tiwari",
    location: "New Delhi, IN",
    bio: "Frontend developer passionate about creating great user experiences. Always learning new technologies.",
    availability: "Available",
    profileVisibility: "Public",
    skillsICanOffer: [
      "React",
      "TypeScript",
      "Frontend Development",
      "Blockchain Development",
    ],
    skillsIWantToLearn: ["Python", "DevOps", "AWS"],
    rating: 4.7,
    profileImage: "/api/placeholder/80/80",
  });

  const [formData, setFormData] = useState<ProfileData>(profileData);
  const [newSkillOffer, setNewSkillOffer] = useState("");
  const [newSkillLearn, setNewSkillLearn] = useState("");

  const handleEditClick = () => {
    setFormData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  const addSkillOffer = () => {
    if (newSkillOffer.trim()) {
      setFormData((prev) => ({
        ...prev,
        skillsICanOffer: [...prev.skillsICanOffer, newSkillOffer.trim()],
      }));
      setNewSkillOffer("");
    }
  };

  const addSkillLearn = () => {
    if (newSkillLearn.trim()) {
      setFormData((prev) => ({
        ...prev,
        skillsIWantToLearn: [...prev.skillsIWantToLearn, newSkillLearn.trim()],
      }));
      setNewSkillLearn("");
    }
  };

  const removeSkillOffer = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skillsICanOffer: prev.skillsICanOffer.filter((_, i) => i !== index),
    }));
  };

  const removeSkillLearn = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skillsIWantToLearn: prev.skillsIWantToLearn.filter((_, i) => i !== index),
    }));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : star === Math.ceil(rating) && rating % 1 !== 0
                ? "fill-yellow-400/50 text-yellow-400"
                : "text-gray-600"
            }`}
          />
        ))}
        <span className="text-gray-400 text-sm ml-1">({rating})</span>
      </div>
    );
  };

  const ProfileView = () => (
    <div className="bg-slate-800 rounded-lg p-8 max-w-4xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={profileData.profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-slate-700"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-800"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {profileData.fullName}
            </h1>
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{profileData.location}</span>
            </div>
            {renderStars(profileData.rating)}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Eye className="w-4 h-4" />
            <span className="text-sm">{profileData.profileVisibility}</span>
          </div>
          <button
            onClick={handleEditClick}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-3">Full Name</h3>
          <p className="text-gray-300 mb-6">{profileData.fullName}</p>

          <h3 className="text-white font-semibold mb-3">Bio</h3>
          <p className="text-gray-300 mb-6">{profileData.bio}</p>

          <h3 className="text-white font-semibold mb-3">Skills I Can Offer</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {profileData.skillsICanOffer.map((skill, index) => (
              <span
                key={index}
                className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm border border-cyan-500/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Location</h3>
          <p className="text-gray-300 mb-6">{profileData.location}</p>

          <h3 className="text-white font-semibold mb-3">Availability</h3>
          <div className="flex items-center gap-2 mb-6">
            <div
              className={`w-3 h-3 rounded-full ${
                profileData.availability === "Available"
                  ? "bg-green-500"
                  : profileData.availability === "Busy"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            ></div>
            <span className="text-gray-300">{profileData.availability}</span>
          </div>

          <h3 className="text-white font-semibold mb-3">Profile Visibility</h3>
          <div className="flex items-center gap-2 mb-6">
            <Eye className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300">
              {profileData.profileVisibility}
            </span>
          </div>

          <h3 className="text-white font-semibold mb-3">
            Skills I Want to Learn
          </h3>
          <div className="flex flex-wrap gap-2">
            {profileData.skillsIWantToLearn.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const EditForm = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-white font-semibold mb-2">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, bio: e.target.value }))
            }
            rows={3}
            className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-white font-semibold mb-2">
              Availability
            </label>
            <select
              value={formData.availability}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  availability: e.target.value as "Available" | "Busy" | "Away",
                }))
              }
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none"
            >
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
              <option value="Away">Away</option>
            </select>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">
              Profile Visibility
            </label>
            <select
              value={formData.profileVisibility}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  profileVisibility: e.target.value as "Public" | "Private",
                }))
              }
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-white font-semibold mb-2">
            Skills I Can Offer
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newSkillOffer}
              onChange={(e) => setNewSkillOffer(e.target.value)}
              placeholder="Add a skill..."
              className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none"
              onKeyPress={(e) => e.key === "Enter" && addSkillOffer()}
            />
            <button
              onClick={addSkillOffer}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skillsICanOffer.map((skill, index) => (
              <span
                key={index}
                className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm border border-cyan-500/30 flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => removeSkillOffer(index)}
                  className="text-cyan-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-white font-semibold mb-2">
            Skills I Want to Learn
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newSkillLearn}
              onChange={(e) => setNewSkillLearn(e.target.value)}
              placeholder="Add a skill..."
              className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none"
              onKeyPress={(e) => e.key === "Enter" && addSkillLearn()}
            />
            <button
              onClick={addSkillLearn}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skillsIWantToLearn.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-600 flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => removeSkillLearn(index)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={handleCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4  mt-[10vh]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">
            Your Profile
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your professional information and skill preferences.
          </p>
        </div>

        <ProfileView />

        {isEditing && <EditForm />}
      </div>
    </div>
  );
};

export default ProfileComponent;
