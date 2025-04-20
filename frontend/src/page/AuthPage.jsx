import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [serverErrors, setServerErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setServerErrors(null);
    setSuccessMessage("");
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setServerErrors(result.errors);
        } else if (result.error) {
          setServerErrors({ general: result.error });
        } else {
          setServerErrors({ general: "Ошибка регистрации" });
        }
      } else {
        setSuccessMessage(result.message || "Регистрация прошла успешно!");
        navigate("/home", { state: { login: data.login } });
        reset();
      }
    } catch (e) {
      setServerErrors({ general: "Ошибка сети, попробуйте позже." });
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label>Имя:</label>
        <input type="text" {...register("firstName")} />
        <p style={{ color: "red" }}>{serverErrors?.firstName}</p>
      </div>

      <div>
        <label>Фамилия:</label>
        <input type="text" {...register("lastName")} />
        <p style={{ color: "red" }}>{serverErrors?.lastName}</p>
      </div>

      <div>
        <label>Email:</label>
        <input type="email" {...register("email")} />
        <p style={{ color: "red" }}>{serverErrors?.email}</p>
      </div>

      <div>
        <label>Логин:</label>
        <input type="text" {...register("login")} />
        <p style={{ color: "red" }}>{serverErrors?.login}</p>
      </div>

      <div>
        <label>Пароль:</label>
        <input type="password" {...register("password")} />
        <p style={{ color: "red" }}>{serverErrors?.password}</p>
      </div>

      <div>
        <label>Подтверждение пароля:</label>
        <input type="password" {...register("confirmPassword")} />
        <p style={{ color: "red" }}>{serverErrors?.confirmPassword}</p>
      </div>

      <div>
        <label>
          <input type="checkbox" {...register("rulesAccepted")} />
          Принимаю правила...
        </label>
        <p style={{ color: "red" }}>{serverErrors?.rulesAccepted}</p>
      </div>

      <div>
        <label>Возраст:</label>
        <select {...register("age")}>
          <option value="">-- Выберите --</option>
          <option value="yes">Мне 18 лет</option>
          <option value="no">Нет 18 лет</option>
        </select>
        <p style={{ color: "red" }}>{serverErrors?.age}</p>
      </div>

      <div>
        Пол:
        <label>
          <input type="radio" value="male" {...register("gender")} />
          Мужской
        </label>
        <label>
          <input type="radio" value="female" {...register("gender")} />
          Женский
        </label>
        <p style={{ color: "red" }}>{serverErrors?.gender}</p>
      </div>

      {serverErrors?.general && (
        <p style={{ color: "red" }}>{serverErrors.general}</p>
      )}

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <button type="submit">Отправить</button>
    </form>
  );
};

export default AuthPage;
