import React, { useState } from "react";
import "./ProfilePage.css";
import { useNavigate } from 'react-router-dom'; 

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    firstName: "Иван",
    lastName: "Александрович",
    middleName: "Иванович",
    email: "ivan.ivanov@example.com",
    birthDate: "1990-01-01",
    workplace: "Google",
    photo: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Флаг режима редактирования
  const [tempData, setTempData] = useState({ ...userData }); // Временные данные для отмены изменений

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempData((prevData) => ({
          ...prevData,
          photo: reader.result, // Сохраняем фото как base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // Включить режим редактирования
  };

  const handleCancel = () => {
    setTempData({ ...userData }); // Восстановить данные
    setIsEditing(false); // Выйти из режима редактирования
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUserData({ ...tempData }); // Сохранить изменения
    setIsEditing(false); // Выйти из режима редактирования
    alert("Изменения сохранены!");
  };

  const getInitials = () => {
    const { firstName, lastName } = userData;
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };
  
  const navigate = useNavigate();
  const goToStart = () => {
    navigate("/start"); // Здесь "/start" — путь к нужной странице
  };
  
  return (
    <div className="Profile">
      {/* Header */}
      <header className="header">
          <div className="logo">
            <p className="start-link" onClick={goToStart}>
              <span className="white">шу</span><span className="pink">meet</span>
            </p>
          </div>
      </header>

      <div className="user-profile">
        <h1>Профиль пользователя</h1>
        <form onSubmit={handleSave}>

          {/* Фото профиля или инициалы */}
          <div className="form-group1 photo-section">
            <label htmlFor="photo">Фото профиля:</label>
            {isEditing ? (
             <input type="file" id="photo" onChange={handlePhotoChange} />
            ) : userData.photo ? (
              <img src={userData.photo} alt="Profile" className="profile-photo" />
            ) : (
              <div className="initials-box">{getInitials()}</div>
            )}
          </div>

          {/* ФИО */}
          <div className="form-group">
            <label htmlFor="lastName">Фамилия:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={isEditing ? tempData.lastName : userData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label htmlFor="firstName">Имя:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={isEditing ? tempData.firstName : userData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label htmlFor="middleName">Отчество:</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={isEditing ? tempData.middleName : userData.middleName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Почта */}
          <div className="form-group">
            <label htmlFor="email">Почта:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={isEditing ? tempData.email : userData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Дата рождения */}
          <div className="form-group">
            <label htmlFor="birthDate">Дата рождения:</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={isEditing ? tempData.birthDate : userData.birthDate}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Место работы */}
          <div className="form-group">
            <label htmlFor="workplace">Место работы:</label>
            <input
              type="text"
              id="workplace"
              name="workplace"
              value={isEditing ? tempData.workplace : userData.workplace}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Управление кнопками */}
          {!isEditing ? (
            
              <button type="button" className="edit-button" onClick={handleEdit}>
                Изменить
              </button>
            
            ) : (
            <div className="button-group">
              <button type="submit" className="save-button">
                Сохранить изменения
              </button>
              <button type="button" className="cancel-button" onClick={handleCancel}>
                Отменить изменения
              </button>
            </div>
          )}
       </form>
      </div>
    </div>
  );
};

export default ProfilePage;
