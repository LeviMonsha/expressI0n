import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    if (name === "rememberMe") {
      setLoginFormData({ ...loginFormData, rememberMe: e.target.checked });
    } else {
      setLoginFormData({ ...loginFormData, [name]: value });
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerFormData),
      });
      const data = await response.text();
      setMessage(data);
      navigate("/home");
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });
      const data = await response.text();
      setMessage(data);
      navigate("/home");
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-10 mt-20 bg-white rounded-lg shadow-md">
      <div className="flex flex-wrap justify-center gap-10">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-5">Регистрация</h2>
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-5">
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
                value={registerFormData.username}
                onChange={handleRegisterChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-5">
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
                value={registerFormData.password}
                onChange={handleRegisterChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-5">
              <label
                className="block text-gray-600 text-sm mb-2"
                htmlFor="confirmPassword"
              >
                Подтвердите пароль
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={registerFormData.confirmPassword}
                onChange={handleRegisterChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-5">Вход</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-5">
              <label
                className="block text-gray-600 text-sm mb-2"
                htmlFor="login-username"
              >
                Имя пользователя
              </label>
              <input
                id="login-username"
                name="username"
                type="text"
                value={loginFormData.username}
                onChange={handleLoginChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-5">
              <label
                className="block text-gray-600 text-sm mb-2"
                htmlFor="login-password"
              >
                Пароль
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                value={loginFormData.password}
                onChange={handleLoginChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex items-center mb-5">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={loginFormData.rememberMe}
                onChange={handleLoginChange}
              />
              <label className="ml-2" htmlFor="remember-me">
                Запомнить меня
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
      {message && (
        <p className="text-lg text-red-600 text-center mt-5">{message}</p>
      )}
    </div>
  );
};

export default AuthPage;
