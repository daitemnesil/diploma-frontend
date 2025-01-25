import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Импортируем React Router

import './App.css';
import Home from './Home'; // Импортируем компонент Home
import AuthPage from './AuthPage'; // Страница авторизации
import RegPage from './RegPage'; // Страница регистрации
import StartPage from './StartPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Маршруты приложения */}
        <Route path="/" element={<Home />} /> {/* Главная страница */}
        <Route path="/auth" element={<AuthPage />} /> {/* Страница авторизации */}
        <Route path="/reg" element={<RegPage />} /> {/* Страница регистрации */}
        <Route path="/start" element={<StartPage />} /> {/* Стартовый */}
        {/* Редирект на главную, если пользователь попал на несуществующий путь */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;




