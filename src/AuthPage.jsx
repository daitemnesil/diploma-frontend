import React, { useState } from 'react';
import './AuthPage.css';
import { useNavigate } from 'react-router-dom'; 
import { loginUser } from './api'; // Импортируем API-запрос

const AuthPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const data = await loginUser(login, password); // Отправляем запрос к API
      console.log("Успешный вход:", data);

      // // Сохраняем токен в localStorage (если API возвращает токен)
      // if (data.token) {
      //   localStorage.setItem('token', data.token);
      // }

      navigate('/start'); // Перенаправляем пользователя
    } catch (err) {
      setError("Ошибка входа: проверьте логин и пароль");
    }
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
    <div className="Authen">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <p className="home-link" onClick={goToHome}>
            <span className="white">шу</span><span className="pink">meet</span>
          </p>
        </div>
      </header>
    
      <div className="auth-container">
          <form className="auth-form">
            <div className="login-cont">
              <label htmlFor="login">Логин</label>
              <input
                type="text"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Введите логин" 
                required
              />
            </div>
            <div className="password-cont">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль" 
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="auth-buttons">
              <button type="button" onClick={handleLogin}>Войти</button>
            </div>
            <div className="reg">
              <p className="or">или</p>
              <p className="reg-link" onClick={goToRegister}>Регистрация</p>
            </div>
          </form>
      </div>
    </div>
  );
};

export default AuthPage;
