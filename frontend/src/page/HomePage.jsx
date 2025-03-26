import React from "react";

function HomePage({ user, title }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-gray-700">Hello, {user.username}!</p>
      </div>
    </div>
  );
}

export default HomePage;
