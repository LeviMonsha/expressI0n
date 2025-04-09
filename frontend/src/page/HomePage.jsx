import React, { useState, useEffect } from "react";

function HomePage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <main className="container mx-auto p-10 mt-10">
      <div className="max-w-5xl mx-auto p-10 mt-20 bg-white rounded-lg shadow-md">
        <p className="text-lg text-gray-600 text-center mb-10 flex justify-center">
          <img
            src={`${process.env.PUBLIC_URL}/wave_hand.gif`}
            alt="wave hand"
            className="w-6 h-6 mr-2"
          />
          Привет, {user.username}!
        </p>
      </div>
    </main>
  );
}

export default HomePage;
