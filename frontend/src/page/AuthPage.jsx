import React, { useState } from "react";

const AuthPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.text();
      alert(data);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Регистрация</h2>
        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm mb-2"
            htmlFor="username"
          >
            Имя пользователя
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm mb-2"
            htmlFor="password"
          >
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
