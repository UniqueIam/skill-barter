"use client";

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-6">
          You don’t have permission to access this page.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
