import React, { useState } from 'react';
import './RegPage.css'; 
import { useNavigate } from 'react-router-dom'; 

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

   // Регулярное выражение для проверки формата почты
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{8,}$/; // Регулярное выражение для проверки пароля

  const navigate = useNavigate(); 
  const handleRegister = () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !middleName.trim() ||
      !email.trim() ||
      !code.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        'Пароль должен быть не менее 8 символов, содержать хотя бы 1 заглавную букву, 1 цифру и 1 специальный символ!'
      );
      return;
    }

    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    navigate('/auth');
  };
  
  const handleSendCode = () => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Код отправлен на вашу почту!');
    } else {
      alert('Введите корректный адрес электронной почты для отправки кода.');
    }
  };

  const goToHome = () => {
    // Переход на страницу регистрации
    navigate('/');
  };

  return (
    <div className="register">
         <div className="home">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <p className="home-link" onClick={goToHome}>
            <span className="white">шу</span><span className="pink">meet</span>
          </p>
        </div>
      </header>
         </div>

    <div className="reg-container">
      <form className="reg-form">
       {/* Поле для имени */}
        <div className="form-group">
          <label htmlFor="firstName">Имя</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Введите имя"
            required
          />
        </div>

        {/* Поле для фамилии */}
        <div className="form-group">
          <label htmlFor="lastName">Фамилия</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Введите фамилию"
            required
          />
        </div>

         {/* Поле для отчества */}
         <div className="form-group">
          <label htmlFor="middleName">Отчество</label>
          <input
            type="text"
            id="middleName"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            placeholder="Введите отчество"
          />
        </div>

        {/* Поле для почты */}
        <div className="form-group">
          <label htmlFor="email">Почта</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите почту"
            required
          />
        </div>

         {/* Поле для кода подтверждения */}
         <div className="form-group code-group">
         {/* <button type="button" className="send-code-btn" onClick={handleSendCode}>
            Отправить код
          </button> */}
          <p className="send-code-btn" onClick={handleSendCode}>Отправить код</p>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Введите код"
          />
        </div>

        {/* Поле для пароля */}
        <div className="form-group">
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

         {/* Поле для подтверждения пароля */}
         <div className="form-group">
          <label htmlFor="confirmPassword">Подтвердите пароль</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Повторите пароль"
            required
          />
        </div>
      </form>
      {/* Кнопка регистрации */}
      <button type="button1" className="register-btn" onClick={handleRegister}>
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
