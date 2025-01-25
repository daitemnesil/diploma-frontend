import React from 'react';
import './Home.css'; // Подключим стили
import { useNavigate } from 'react-router-dom'; // Хук для навигации

const Home = () => {
  const navigate = useNavigate(); // Хук для перехода на другую страницу

  const handleAuthClick = () => {
    navigate('/auth');
   // Переход на страницу авторизации
  };

  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="white">шу</span><span className="pink">meet</span>
        </div>
        <button className="login-button" onClick={handleAuthClick}>Войти</button>
      </header>

      {/* Заголовок */}
      <div className="title-with-image">
        <div className="text-container">
          <h1 className="main-title-home">Нет ничего важнее<br/>защиты. Особенно<br/>от дипфейков.</h1>
        </div>
        <img className="title-image" src="/homeimg.png" alt="Image" />
      </div>


      {/* Главный функционал */}
      <div className="main-func">
        <div className="func-container">
          <div className="meet">
            <img className="meet-image" src="/meet1.png" alt="Image" />
            <h2 className="meet-title">Создание встреч</h2>
            <p className="meet-text">Устраивай созвоны и присылай ссылку<br/>на подключение к встрече нужным людям.<br/>Когда и откуда - решать тебе.</p>
          </div>

          <div className="deep">
            <img className="deep-image" src="/deep1.png" alt="Image" />
            <h2 className="deep-title">Защита от дипфейков</h2>
            <p className="deep-text">Проводи встречи только с реальными<br/>собеседниками. Наша система сообщит,<br/>если перед тобой окажется дипфейк</p>
          </div>
      
          <div className="sec">
            <img className="sec-image" src="/sec1.png" alt="Image" />
            <h2 className="sec-title">Безопасность</h2>
            <p className="sec-text">Не беспокойся о сохранности данных<br/>и конфиденциальности разговоров.<br/>Все под нашей надежной защитой.</p>
          </div>
          
      </div>
      </div>


    </div>
  );
};

export default Home;
