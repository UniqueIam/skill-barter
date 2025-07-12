"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  AlertTriangle,
  MessageSquare,
  Download,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Send,
  Calendar,
  Activity,
  TrendingUp,
  Settings,
  Bell,
  FileText,
  BarChart3,
  Clock,
  UserCheck,
  UserX,
  Mail,
  Shield,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: "active" | "suspended" | "banned";
  skillsCount: number;
  swapsCount: number;
  reportCount: number;
}

interface SkillDescription {
  id: string;
  userId: string;
  userName: string;
  skill: string;
  description: string;
  dateSubmitted: string;
  status: "pending" | "approved" | "rejected";
  flagReason?: string;
}

interface SwapRequest {
  id: string;
  requesterName: string;
  providerName: string;
  requestedSkill: string;
  offeredSkill: string;
  status: "pending" | "accepted" | "completed" | "cancelled";
  dateCreated: string;
  dateUpdated: string;
}

interface PlatformMessage {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "update" | "maintenance";
  dateCreated: string;
  isActive: boolean;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data - replace with actual API calls
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      joinDate: "2024-01-15",
      status: "active",
      skillsCount: 5,
      swapsCount: 12,
      reportCount: 0,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      joinDate: "2024-02-20",
      status: "active",
      skillsCount: 3,
      swapsCount: 8,
      reportCount: 1,
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      joinDate: "2024-03-10",
      status: "suspended",
      skillsCount: 2,
      swapsCount: 3,
      reportCount: 3,
    },
  ]);

  const [skillDescriptions, setSkillDescriptions] = useState<
    SkillDescription[]
  >([
    {
      id: "1",
      userId: "1",
      userName: "John Doe",
      skill: "React Development",
      description:
        "Expert in React with 5+ years of experience building scalable web applications.",
      dateSubmitted: "2024-07-10",
      status: "pending",
    },
    {
      id: "2",
      userId: "2",
      userName: "Jane Smith",
      skill: "Graphic Design",
      description:
        "Professional graphic designer specializing in brand identity and digital marketing materials.",
      dateSubmitted: "2024-07-09",
      status: "approved",
    },
    {
      id: "3",
      userId: "3",
      userName: "Bob Johnson",
      skill: "SEO Marketing",
      description:
        "Click here for amazing SEO secrets! Visit my website now!!!",
      dateSubmitted: "2024-07-08",
      status: "pending",
      flagReason: "Potential spam content",
    },
  ]);

  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([
    {
      id: "1",
      requesterName: "Alice Cooper",
      providerName: "John Doe",
      requestedSkill: "React Development",
      offeredSkill: "Python Programming",
      status: "pending",
      dateCreated: "2024-07-11",
      dateUpdated: "2024-07-11",
    },
    {
      id: "2",
      requesterName: "Mike Wilson",
      providerName: "Jane Smith",
      requestedSkill: "Graphic Design",
      offeredSkill: "Web Development",
      status: "accepted",
      dateCreated: "2024-07-10",
      dateUpdated: "2024-07-10",
    },
    {
      id: "3",
      requesterName: "Sarah Davis",
      providerName: "Bob Johnson",
      requestedSkill: "SEO Marketing",
      offeredSkill: "Content Writing",
      status: "cancelled",
      dateCreated: "2024-07-09",
      dateUpdated: "2024-07-09",
    },
  ]);

  const [messages, setMessages] = useState<PlatformMessage[]>([
    {
      id: "1",
      title: "Platform Maintenance",
      message:
        "Scheduled maintenance on July 15th from 2:00 AM to 4:00 AM EST.",
      type: "maintenance",
      dateCreated: "2024-07-12",
      isActive: true,
    },
    {
      id: "2",
      title: "New Feature: Video Calls",
      message:
        "We've added video calling functionality to enhance your skill sharing experience.",
      type: "update",
      dateCreated: "2024-07-10",
      isActive: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState({
    title: "",
    message: "",
    type: "info" as "info" | "warning" | "update" | "maintenance",
  });

  const handleBanUser = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "banned" } : user
      )
    );
  };

  const handleUnbanUser = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "active" } : user
      )
    );
  };

  const handleApproveSkill = (skillId: string) => {
    setSkillDescriptions(
      skillDescriptions.map((skill) =>
        skill.id === skillId ? { ...skill, status: "approved" } : skill
      )
    );
  };

  const handleRejectSkill = (skillId: string) => {
    setSkillDescriptions(
      skillDescriptions.map((skill) =>
        skill.id === skillId ? { ...skill, status: "rejected" } : skill
      )
    );
  };

  const handleSendMessage = () => {
    if (newMessage.title && newMessage.message) {
      const message: PlatformMessage = {
        id: Date.now().toString(),
        ...newMessage,
        dateCreated: new Date().toISOString().split("T")[0],
        isActive: true,
      };
      setMessages([message, ...messages]);
      setNewMessage({ title: "", message: "", type: "info" });
    }
  };

  const handleDownloadReport = (reportType: string) => {
    // Simulate file download
    const data = {
      userActivity: users,
      swapStats: swapRequests,
      skillDescriptions: skillDescriptions,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${reportType}-report-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "approved":
      case "accepted":
      case "completed":
        return "text-green-400 bg-green-400/20";
      case "pending":
        return "text-yellow-400 bg-yellow-400/20";
      case "suspended":
      case "rejected":
      case "cancelled":
        return "text-orange-400 bg-orange-400/20";
      case "banned":
        return "text-red-400 bg-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  const StatsCard = ({
    title,
    value,
    icon: Icon,
    color,
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
  }) => (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <Icon className={"w-8 h-8 ${color}"} />
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={users.length}
          icon={Users}
          color="text-blue-400"
        />
        <StatsCard
          title="Active Swaps"
          value={
            swapRequests.filter(
              (s) => s.status === "pending" || s.status === "accepted"
            ).length
          }
          icon={Activity}
          color="text-green-400"
        />
        <StatsCard
          title="Pending Reviews"
          value={skillDescriptions.filter((s) => s.status === "pending").length}
          icon={Clock}
          color="text-yellow-400"
        />
        <StatsCard
          title="Banned Users"
          value={users.filter((u) => u.status === "banned").length}
          icon={Shield}
          color="text-red-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {swapRequests.slice(0, 5).map((swap) => (
              <div
                key={swap.id}
                className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
              >
                <div>
                  <p className="text-white font-medium">
                    {swap.requesterName} → {swap.providerName}
                  </p>
                  <p className="text-gray-400 text-sm">{swap.requestedSkill}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    swap.status
                  )}`}
                >
                  {swap.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4">
            Flagged Content
          </h3>
          <div className="space-y-3">
            {skillDescriptions
              .filter((s) => s.status === "pending")
              .map((skill) => (
                <div key={skill.id} className="p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">{skill.skill}</p>
                    <span className="text-orange-400 text-xs">
                      {skill.flagReason || "Pending Review"}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{skill.userName}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="banned">Banned</option>
        </select>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-white font-medium">
                  User
                </th>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Skills
                </th>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Swaps
                </th>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Reports
                </th>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(
                  (user) =>
                    (filterStatus === "all" || user.status === filterStatus) &&
                    (user.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                      user.email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
                )
                .map((user) => (
                  <tr key={user.id} className="border-t border-slate-700">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.joinDate}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {user.skillsCount}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {user.swapsCount}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {user.reportCount}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {user.status === "banned" ? (
                          <button
                            onClick={() => handleUnbanUser(user.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBanUser(user.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSkillReview = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-white font-medium">
                  User
                </th>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Skill
                </th>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {skillDescriptions.map((skill) => (
                <tr key={skill.id} className="border-t border-slate-700">
                  <td className="px-6 py-4 text-white">{skill.userName}</td>
                  <td className="px-6 py-4 text-white font-medium">
                    {skill.skill}
                  </td>
                  <td className="px-6 py-4 text-gray-300 max-w-md">
                    <p className="truncate">{skill.description}</p>
                    {skill.flagReason && (
                      <p className="text-orange-400 text-xs mt-1">
                        ⚠ {skill.flagReason}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {skill.dateSubmitted}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        skill.status
                      )}`}
                    >
                      {skill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {skill.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveSkill(skill.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRejectSkill(skill.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSwapMonitoring = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">
            {swapRequests.filter((s) => s.status === "pending").length}
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
          <p className="text-gray-400 text-sm">Accepted</p>
          <p className="text-2xl font-bold text-green-400">
            {swapRequests.filter((s) => s.status === "accepted").length}
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
          <p className="text-gray-400 text-sm">Completed</p>
          <p className="text-2xl font-bold text-blue-400">
            {swapRequests.filter((s) => s.status === "completed").length}
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
          <p className="text-gray-400 text-sm">Cancelled</p>
          <p className="text-2xl font-bold text-red-400">
            {swapRequests.filter((s) => s.status === "cancelled").length}
          </p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Requester
                </th>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Skills Exchange
                </th>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-white font-medium">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {swapRequests.map((swap) => (
                <tr key={swap.id} className="border-t border-slate-700">
                  <td className="px-6 py-4 text-white">{swap.requesterName}</td>
                  <td className="px-6 py-4 text-white">{swap.providerName}</td>
                  <td className="px-6 py-4 text-gray-300">
                    <div className="text-sm">
                      <p>
                        <span className="text-blue-400">Wants:</span>{" "}
                        {swap.requestedSkill}
                      </p>
                      <p>
                        <span className="text-green-400">Offers:</span>{" "}
                        {swap.offeredSkill}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        swap.status
                      )}`}
                    >
                      {swap.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {swap.dateCreated}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {swap.dateUpdated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMessaging = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-semibold text-white mb-4">
          Send Platform-Wide Message
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">
              Message Type
            </label>
            <select
              value={newMessage.type}
              onChange={(e) =>
                setNewMessage({ ...newMessage, type: e.target.value as any })
              }
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="info">Information</option>
              <option value="warning">Warning</option>
              <option value="update">Feature Update</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Title</label>
            <input
              type="text"
              value={newMessage.title}
              onChange={(e) =>
                setNewMessage({ ...newMessage, title: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              placeholder="Enter message title..."
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Message</label>
            <textarea
              value={newMessage.message}
              onChange={(e) =>
                setNewMessage({ ...newMessage, message: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none resize-none"
              placeholder="Enter your message..."
            />
          </div>
          <button
            onClick={handleSendMessage}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-semibold text-white mb-4">
          Recent Messages
        </h3>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="p-4 bg-slate-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">{message.title}</h4>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      message.type === "info"
                        ? "bg-blue-400/20 text-blue-400"
                        : message.type === "warning"
                        ? "bg-yellow-400/20 text-yellow-400"
                        : message.type === "update"
                        ? "bg-green-400/20 text-green-400"
                        : "bg-orange-400/20 text-orange-400"
                    }`}
                  >
                    {message.type}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {message.dateCreated}
                  </span>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{message.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center gap-4 mb-4">
            <Users className="w-8 h-8 text-blue-400" />
            <div>
              <h3 className="text-white font-semibold">User Activity Report</h3>
              <p className="text-gray-400 text-sm">
                Complete user engagement data
              </p>
            </div>
          </div>
          <button
            onClick={() => handleDownloadReport("user-activity")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center gap-4 mb-4">
            <Activity className="w-8 h-8 text-green-400" />
            <div>
              <h3 className="text-white font-semibold">Swap Statistics</h3>
              <p className="text-gray-400 text-sm">
                Detailed swap performance metrics
              </p>
            </div>
          </div>
          <button
            onClick={() => handleDownloadReport("swap-stats")}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center gap-4 mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
            <div>
              <h3 className="text-white font-semibold">Feedback Logs</h3>
              <p className="text-gray-400 text-sm">
                User feedback and issue reports
              </p>
            </div>
          </div>
          <button
            onClick={() => handleDownloadReport("feedback-logs")}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-semibold text-white mb-4">
          Report Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{users.length}</p>
            <p className="text-gray-400 text-sm">Total Users</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {swapRequests.length}
            </p>
            <p className="text-gray-400 text-sm">Total Swaps</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {skillDescriptions.length}
            </p>
            <p className="text-gray-400 text-sm">Skill Descriptions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {users.filter((u) => u.reportCount > 0).length}
            </p>
            <p className="text-gray-400 text-sm">Users with Reports</p>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Users },
    { id: "skills", label: "Skill Review", icon: Shield },
    { id: "swaps", label: "Swap Monitoring", icon: Activity },
    { id: "messaging", label: "Messaging", icon: MessageSquare },
    { id: "reports", label: "Reports", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-28 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">
            Admin Dashboard
          </h1>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 mb-8">
          <div className="flex flex-wrap border-b border-slate-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-cyan-400 border-b-2 border-cyan-400 bg-slate-700"
                    : "text-gray-400 hover:text-white hover:bg-slate-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "overview" && renderOverview()}
            {activeTab === "users" && renderUserManagement()}
            {activeTab === "skills" && renderSkillReview()}
            {activeTab === "swaps" && renderSwapMonitoring()}
            {activeTab === "messaging" && renderMessaging()}
            {activeTab === "reports" && renderReports()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
