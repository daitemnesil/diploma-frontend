import React, { useState } from 'react';
import './AuthPage.css';
import { useNavigate } from 'react-router-dom'; // Хук для навигации

const AuthPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Хук для перехода на другую страницу

  const goToLogin = () => {
    // Логика для обработки входа (например, валидация, отправка данных на сервер и т.д.)
    navigate('/start');
  };

  const goToRegister = () => {
    // Переход на страницу регистрации
    navigate('/reg');
  };

  const goToHome = () => {
    // Переход на страницу регистрации
    navigate('/');
  };

  return (
    <><div className="home">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <p className="home-link" onClick={goToHome}>
            <span className="white">шу</span><span className="pink">meet</span>
          </p>
        </div>
      </header>
    </div>
    <div className="auth-container">
        <form className="auth-form">
          <div className="login-cont">
            <label htmlFor="login">Логин</label>
            <input
              type="text"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Введите логин" />
          </div>
          <div className="password-cont">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль" />
          </div>
          <div className="auth-buttons">
            <button type="button" onClick={goToLogin}>Войти</button>
          </div>
          <div className="reg">
            <p className="or">или</p>
            <p className="reg-link" onClick={goToRegister}>Регистрация</p>
          </div>
        </form>
      </div>
      </>
  );
};

export default AuthPage;
