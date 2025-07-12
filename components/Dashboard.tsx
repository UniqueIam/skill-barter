"use client";

import React, { useState } from "react";
import {
  Check,
  X,
  User,
  Calendar,
  MessageCircle,
  MapPin,
  Star,
  User2Icon,
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
}

interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
  isPublic: boolean;
  createdAt: string;
  profilePhoto?: string | null;
  location?: string | null;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  availabilities: any[];
  ratings: any[];
}

interface SwapRequest {
  id: string;
  user: UserProfile;
  requestedAt: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  requestType: "skill_exchange" | "mentorship";
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "accepted" | "rejected"
  >("all");

  const [requests, setRequests] = useState<SwapRequest[]>([
    {
      id: "1",
      user: {
        id: "cmczw251l0000qzoszvv0noek",
        username: "vivek tiwari",
        email: "vivektiwari234@gmail.com",
        role: "USER",
        isPublic: true,
        createdAt: "2025-07-12T06:52:41.865Z",
        profilePhoto: null,
        location: "San Francisco, CA",
        skillsOffered: [
          { id: "cmczyhy6z0000qzvo2swtf70k", name: "ReactJS" },
          { id: "cmczymi6i0003qzvodwbihr4d", name: "PHP" },
          { id: "cmczyu3dg0000qzy8mrrzktt5", name: "C" },
          { id: "cmczyu6jp0003qzy8ry39hrar", name: "JAVA" },
          { id: "cmczyu8a60006qzy8w4n28dsb", name: "GOLANG" },
        ],
        skillsWanted: [{ id: "cmd00o6ya0000qzzgrzwpf95f", name: "Telugu" }],
        availabilities: [],
        ratings: [],
      },
      requestedAt: "2025-07-11T14:30:00.000Z",
      message:
        "Hi! I'd love to learn Telugu from you. I can teach you ReactJS, PHP, C, JAVA, or GOLANG in return. I have experience in full-stack development and would be happy to help you with any of these technologies.",
      status: "pending",
      requestType: "skill_exchange",
    },
    {
      id: "2",
      user: {
        id: "cmczw251l0000qzoszvv0noek2",
        username: "designerMike",
        email: "mike@design.com",
        role: "USER",
        isPublic: true,
        createdAt: "2025-06-15T10:20:30.000Z",
        profilePhoto: null,
        location: "New York, NY",
        skillsOffered: [
          { id: "skill1", name: "UI/UX Design" },
          { id: "skill2", name: "Figma" },
          { id: "skill3", name: "Adobe Creative Suite" },
        ],
        skillsWanted: [
          { id: "skill4", name: "Node.js" },
          { id: "skill5", name: "MongoDB" },
        ],
        availabilities: [],
        ratings: [],
      },
      requestedAt: "2025-07-10T09:15:00.000Z",
      message:
        "I'm a UX designer looking to expand into backend development. I can help you with design principles, Figma, and Adobe Creative Suite in exchange for Node.js and MongoDB mentoring.",
      status: "accepted",
      requestType: "skill_exchange",
    },
    {
      id: "3",
      user: {
        id: "cmczw251l0000qzoszvv0noek3",
        username: "devopsAlex",
        email: "alex@devops.com",
        role: "USER",
        isPublic: true,
        createdAt: "2025-05-20T16:45:00.000Z",
        profilePhoto: null,
        location: "Austin, TX",
        skillsOffered: [
          { id: "skill6", name: "DevOps" },
          { id: "skill7", name: "AWS" },
          { id: "skill8", name: "Docker" },
          { id: "skill9", name: "Kubernetes" },
        ],
        skillsWanted: [
          { id: "skill10", name: "React Native" },
          { id: "skill11", name: "Swift" },
        ],
        availabilities: [],
        ratings: [],
      },
      requestedAt: "2025-07-09T11:20:00.000Z",
      message:
        "Experienced DevOps engineer wanting to learn mobile development. I can teach you AWS, Docker, Kubernetes, and CI/CD pipelines in exchange for React Native and Swift guidance.",
      status: "pending",
      requestType: "skill_exchange",
    },
  ]);

  const handleAcceptRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? { ...request, status: "accepted" as const }
          : request
      )
    );
  };

  const handleDeclineRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? { ...request, status: "rejected" as const }
          : request
      )
    );
  };

  const getFilteredRequests = () => {
    if (activeTab === "all") return requests;
    return requests.filter((request) => request.status === activeTab);
  };

  const getTabCounts = () => {
    return {
      all: requests.length,
      pending: requests.filter((r) => r.status === "pending").length,
      accepted: requests.filter((r) => r.status === "accepted").length,
      rejected: requests.filter((r) => r.status === "rejected").length,
    };
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)} days ago`;
    } else if (diffInHours < 24 * 30) {
      return `${Math.floor(diffInHours / (24 * 7))} weeks ago`;
    } else if (diffInHours < 24 * 365) {
      return `${Math.floor(diffInHours / (24 * 30))} months ago`;
    } else {
      return `over ${Math.floor(diffInHours / (24 * 365))} year${
        Math.floor(diffInHours / (24 * 365)) > 1 ? "s" : ""
      } ago`;
    }
  };

  const tabCounts = getTabCounts();
  const filteredRequests = getFilteredRequests();

  const TabButton = ({
    tab,
    label,
    count,
    isActive,
  }: {
    tab: typeof activeTab;
    label: string;
    count: number;
    isActive: boolean;
  }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
        isActive
          ? "bg-teal-500 text-white"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
    >
      {label}
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          isActive ? "bg-teal-600" : "bg-gray-600"
        }`}
      >
        {count}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 pt-28 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-400 mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Manage your incoming skill swap requests and collaborations.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <div className="flex gap-4 flex-wrap">
            <TabButton
              tab="all"
              label="All"
              count={tabCounts.all}
              isActive={activeTab === "all"}
            />
            <TabButton
              tab="pending"
              label="Pending"
              count={tabCounts.pending}
              isActive={activeTab === "pending"}
            />
            <TabButton
              tab="accepted"
              label="Accepted"
              count={tabCounts.accepted}
              isActive={activeTab === "accepted"}
            />
            <TabButton
              tab="rejected"
              label="Rejected"
              count={tabCounts.rejected}
              isActive={activeTab === "rejected"}
            />
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-gray-900 rounded-lg p-8 text-center">
              <MessageCircle className="mx-auto mb-4 text-gray-500" size={48} />
              <p className="text-gray-400">
                No {activeTab === "all" ? "" : activeTab} requests found.
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-full border border-teal-300/30 flex items-center justify-center">
                      {request.user.profilePhoto ? (
                        <img
                          src={request.user.profilePhoto}
                          alt={request.user.username}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="">
                          <User2Icon className="text-gray-400 h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        @{request.user.username}
                      </h3>
                      <div className="flex items-center gap-3 text-gray-400 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatTimeAgo(request.requestedAt)}
                        </div>
                        {request.user.location && (
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            {request.user.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.status === "pending"
                        ? "bg-teal-500 text-white"
                        : request.status === "accepted"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </div>
                </div>

                {/* Skills Exchange */}
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      They're offering:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {request.user.skillsOffered.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 bg-teal-500/10 text-teal-500 border border-teal-500/50 rounded-full text-sm"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      They want to learn:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {request.user.skillsWanted.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 bg-gray-600/10 text-gray-400 border border-gray-500/50 rounded-full text-sm"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>
                      Member since{" "}
                      {new Date(request.user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">
                    Message:
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {request.message}
                  </p>
                </div>

                {/* Action Buttons */}
                {request.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      className="flex-1 bg-teal-500 hover:bg-teal-600 hover:cursor-pointer text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Check size={18} />
                      Accept Request
                    </button>
                    <button
                      onClick={() => handleDeclineRequest(request.id)}
                      className="flex-1 border border-red-600 hover:bg-red-700 hover:cursor-pointer text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <X size={18} />
                      Decline
                    </button>
                  </div>
                )}

                {request.status === "accepted" && (
                  <div className="text-center py-2 text-green-400 font-medium">
                    ✓ Request Accepted - Contact details shared
                  </div>
                )}

                {request.status === "rejected" && (
                  <div className="text-center py-2 text-red-400 font-medium">
                    ✗ Request Declined
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// todo=  later fix this for now keep dummy data

// export default Dashboard;
// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Check,
//   X,
//   Calendar,
//   MessageCircle,
//   MapPin,
//   User2Icon,
// } from "lucide-react";
// import axios from "axios";

// interface Skill {
//   id: string;
//   name: string;
// }

// interface UserProfile {
//   id: string;
//   username: string;
//   email: string;
//   role: string;
//   isPublic: boolean;
//   createdAt: string;
//   profilePhoto?: string | null;
//   location?: string | null;
//   skillsOffered: Skill[];
//   skillsWanted: Skill[];
//   availabilities: any[];
//   ratings: any[];
// }

// interface SwapRequest {
//   id: string;
//   user: UserProfile;
//   requestedAt: string;
//   message: string;
//   status: "pending" | "accepted" | "rejected";
//   requestType: "skill_exchange" | "mentorship";
// }

// export const Dashboard = () => {
//   const [requests, setRequests] = useState<SwapRequest[]>([]);
//   const [activeTab, setActiveTab] = useState<
//     "all" | "pending" | "accepted" | "rejected"
//   >("all");
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await axios.get("/api/swap/incoming");
//         setRequests(res.data.swapRequests);
//       } catch (err) {
//         console.error("Failed to fetch swap requests:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleAcceptRequest = (id: string) => {
//     setRequests((prev) =>
//       prev.map((req) => (req.id === id ? { ...req, status: "accepted" } : req))
//     );
//   };

//   const handleDeclineRequest = (id: string) => {
//     setRequests((prev) =>
//       prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req))
//     );
//   };

//   const filteredRequests =
//     activeTab === "all"
//       ? requests
//       : requests.filter((req) => req.status === activeTab);

//   const tabCounts = {
//     all: requests.length,
//     pending: requests.filter((r) => r.status === "pending").length,
//     accepted: requests.filter((r) => r.status === "accepted").length,
//     rejected: requests.filter((r) => r.status === "rejected").length,
//   };

//   const formatTimeAgo = (dateString: string) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diff = now.getTime() - date.getTime();
//     const hours = Math.floor(diff / (1000 * 60 * 60));

//     if (hours < 24) return `${hours} hours ago`;
//     const days = Math.floor(hours / 24);
//     if (days < 7) return `${days} days ago`;
//     const weeks = Math.floor(days / 7);
//     if (weeks < 4) return `${weeks} weeks ago`;
//     const months = Math.floor(days / 30);
//     return `${months} months ago`;
//   };

//   const TabButton = ({
//     tab,
//     label,
//     count,
//     isActive,
//   }: {
//     tab: typeof activeTab;
//     label: string;
//     count: number;
//     isActive: boolean;
//   }) => (
//     <button
//       onClick={() => setActiveTab(tab)}
//       className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
//         isActive
//           ? "bg-teal-500 text-white"
//           : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//       }`}
//     >
//       {label}
//       <span
//         className={`px-2 py-1 rounded-full text-xs ${
//           isActive ? "bg-teal-600" : "bg-gray-600"
//         }`}
//       >
//         {count}
//       </span>
//     </button>
//   );

//   return (
//     <div className="min-h-screen bg-gray-950 text-white px-6 pt-28 pb-20">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-teal-400 mb-2">Dashboard</h1>
//           <p className="text-gray-400">
//             Manage your incoming skill swap requests and collaborations.
//           </p>
//         </div>

//         <div className="bg-gray-900 rounded-lg p-4 mb-6">
//           <div className="flex gap-4 flex-wrap">
//             {(["all", "pending", "accepted", "rejected"] as const).map(
//               (tab) => (
//                 <TabButton
//                   key={tab}
//                   tab={tab}
//                   label={tab[0].toUpperCase() + tab.slice(1)}
//                   count={tabCounts[tab]}
//                   isActive={activeTab === tab}
//                 />
//               )
//             )}
//           </div>
//         </div>

//         {loading ? (
//           <div className="text-center text-gray-400">Loading requests...</div>
//         ) : filteredRequests.length === 0 ? (
//           <div className="bg-gray-900 rounded-lg p-8 text-center">
//             <MessageCircle className="mx-auto mb-4 text-gray-500" size={48} />
//             <p className="text-gray-400">No {activeTab} requests found.</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {filteredRequests.map((req) => (
//               <div key={req.id} className="bg-gray-900 rounded-lg p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-700">
//                       {req.user.profilePhoto ? (
//                         <img
//                           src={req.user.profilePhoto}
//                           alt="profile"
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <User2Icon className="text-gray-400 h-6 w-6" />
//                       )}
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-lg">
//                         @{req.user.username}
//                       </h3>
//                       <div className="flex items-center gap-3 text-sm text-gray-400">
//                         <div className="flex items-center gap-1">
//                           <Calendar size={14} />
//                           {formatTimeAgo(req.requestedAt)}
//                         </div>
//                         {req.user.location && (
//                           <div className="flex items-center gap-1">
//                             <MapPin size={14} />
//                             {req.user.location}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div
//                     className={`px-3 py-1 rounded-full text-xs font-medium ${
//                       req.status === "pending"
//                         ? "bg-teal-500 text-white"
//                         : req.status === "accepted"
//                         ? "bg-green-500 text-white"
//                         : "bg-red-500 text-white"
//                     }`}
//                   >
//                     {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6 mb-4">
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-400 mb-2">
//                       They're offering:
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {req.user.skillsOffered.map((s) => (
//                         <span
//                           key={s.id}
//                           className="px-3 py-1 bg-teal-500/10 text-teal-500 border border-teal-500/50 rounded-full text-sm"
//                         >
//                           {s.name}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-400 mb-2">
//                       They want to learn:
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {req.user.skillsWanted.map((s) => (
//                         <span
//                           key={s.id}
//                           className="px-3 py-1 bg-gray-600/10 text-gray-400 border border-gray-500/50 rounded-full text-sm"
//                         >
//                           {s.name}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mb-6">
//                   <h4 className="text-sm font-medium text-gray-400 mb-2">
//                     Message:
//                   </h4>
//                   <p className="text-gray-300 leading-relaxed">{req.message}</p>
//                 </div>

//                 {req.status === "pending" && (
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => handleAcceptRequest(req.id)}
//                       className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
//                     >
//                       <Check size={18} />
//                       Accept
//                     </button>
//                     <button
//                       onClick={() => handleDeclineRequest(req.id)}
//                       className="flex-1 border border-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
//                     >
//                       <X size={18} />
//                       Decline
//                     </button>
//                   </div>
//                 )}

//                 {req.status === "accepted" && (
//                   <div className="text-center py-2 text-green-400 font-medium">
//                     ✓ Request Accepted - Contact details shared
//                   </div>
//                 )}
//                 {req.status === "rejected" && (
//                   <div className="text-center py-2 text-red-400 font-medium">
//                     ✗ Request Declined
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
