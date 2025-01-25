import React, { useState } from 'react';
import './StartPage.css';
import { useNavigate } from 'react-router-dom'; 

const StartPage = () => {
  const [code, setCode] = useState(''); // Для хранения введенного кода
  const navigate = useNavigate();

  const handleProf = () => {
    navigate('/');
  };

  // Обработка кнопки перехода на SetMeet
  const NewMeet = () => {
    navigate('/set-meet'); // Переход на страницу SetMeet
  };

  // Обработка кнопки "Присоединиться"
  const JoinMeet = () => {
    if (code.trim() !== '') {
      navigate(`/meet/${code}`); // Переход на страницу Meet с кодом
    } else {
      alert('Введите код для присоединения');
    }
  };

  const Planned = () => {
    navigate('/'); 
  };
  
  const HistoryMeet = () => {
    navigate('/');
  };


  const [currentSlide, setCurrentSlide] = useState(0);

// Данные для каждого слайда (картинка + текст)
  const slides = [
    {
      image: "/new-meet-img.png", // путь к первой картинке
      title: "Ссылка на приглашение",
      description: "Нажмите Новая встреча, чтобы получить ссылку и отправить ее тем, кого хотите пригласить."
    },
    {
      image: "/plan-img.png", // путь ко второй картинке
      title: "Запланированные встречи",
      description: "Нажмите Запланированные, чтобы увидеть какие встречи ожидают вас в будущем."
    },
    {
      image: "/hist-img.png", // путь к третьей картинке
      title: "История встреч",
      description: "Нажмите История, чтобы вспомнить какие встречи и когда у вас были в прошлом."
    }
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length); // Переход к следующему слайду
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); // Переход к предыдущему слайду
  };


  return (
    <div className="start">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="white">шу</span><span className="pink">meet</span>
        </div>
        <button className="profile-button" onClick={handleProf}>Профиль</button>
      </header>

      {/* Заголовок */}
      <div className="title-start">
        <h1 className="main-title">Безопасные<br/>видеоконференции</h1>
        <h2 className="less-title">шуmeet обеспечивает безопасность<br/>и защиту от дипфейков.</h2>
      </div>
      
      <div className="func-cont">
        <button className="new-meet-button" onClick={NewMeet}>Новая встреча</button>
        <div className="join-container">
          <input
            type="text"
            className="join-input"
            placeholder="Введите код"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="join-button" onClick={JoinMeet}>Присоединиться</button>
        </div>
      </div>
      <div className="func-cont2">
        <button className="plan-button" onClick={Planned}>Запланированные</button>
        <button className="hist-button" onClick={HistoryMeet}>История встреч</button>
      </div>

      <div className="carousel">
        <div className="carousel-container">
          <button className="arrow arrow-left" onClick={handlePrev}>
            &lsaquo; {/* Символ стрелки влево */}
          </button>
          <div className="carousel-slide">
            <img
              className="carousel-image"
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
            />
            <div className="carousel-text">
              <h2>{slides[currentSlide].title}</h2>
              <p>{slides[currentSlide].description}</p>
            </div>
          </div>
          <button className="arrow arrow-right" onClick={handleNext}>
            &rsaquo; {/* Символ стрелки вправо */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
