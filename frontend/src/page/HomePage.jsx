import React from "react";
import { useLocation, Navigate } from "react-router-dom";

function HomePage() {
  const location = useLocation();
  const login = location.state?.login;

  if (!login) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="container mx-auto p-10 mt-10">
      <div className="max-w-5xl mx-auto p-10 mt-20 bg-white rounded-lg shadow-md">
        <p className="text-lg text-gray-600 text-center mb-10 flex justify-center">
          <img
            src={`${process.env.PUBLIC_URL}/wave_hand.gif`}
            alt="wave hand"
            className="w-6 h-6 mr-2"
          />
          Привет, {login}!
        </p>
      </div>
    </main>
  );
}

export default HomePage;
