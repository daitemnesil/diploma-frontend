import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useNavigate } from 'react-router-dom';
import { updateUserData, getUserData } from "./api"; 

const ProfilePage = () => {
  // const [userData, setUserData] = useState({
  //   firstName: "Иван",
  //   lastName: "Александрович",
  //   middleName: "Иванович",
  //   email: "ivan.ivanov@example.com",
  //   birthDate: "1990-01-01",
  //   workplace: "Google",
  //   photo: "",
  // });
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Флаг режима редактирования
  // Временные данные для отмены изменений
  // const [tempData, setTempData] = useState({ ...userData }); 
  const [tempData, setTempData] = useState(null);
  const [password, setPassword] = useState(""); // Поле пароля
  const [isPasswordEntered, setIsPasswordEntered] = useState(false); // Флаг ввода пароля

  // Загружаем данные пользователя
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await getUserData(); 
        console.log(data)
        setUserData(data);
        setTempData(data);
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
        // navigate("/login");
      }
    };
    loadUserData();
  }, [navigate]);

  if (!userData) return <div>Загрузка...</div>;

  // Обработчик изменения данных
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Изменение фото
  // const handlePhotoChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => setTempData((prev) => ({ ...prev, photo: reader.result }));
  //     reader.readAsDataURL(file);
  //   }
  // };

  // Редактирование и отмена
  const handleEdit = () => {
    setIsEditing(true); // Включить режим редактирования
  };
  const handleCancel = () => {
    setTempData(userData); // Восстановить данные
    setPassword(""); // Очистить пароль при отмене
    setIsPasswordEntered(false);
    setIsEditing(false); // Выйти из режима редактирования
  };

  // Сохранение данных
  const handleSave = async (e) => {
    e.preventDefault();
    if (!isPasswordEntered) {
      alert("Введите пароль для подтверждения изменений.");
      return;
    }
    try {
      const updatedUser = { ...tempData, password };
      await updateUserData({ updatedUser, password });
      setUserData(updatedUser); // Сохранить изменения
      setIsEditing(false); // Выйти из режима редактирования
      setPassword(""); // Очистить поле пароля после сохранения
      setIsPasswordEntered(false);
      alert("Изменения сохранены!");
    } catch (error) {
      alert("Ошибка обновления профиля!");
    }
  };

  const getInitials = () => `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  //   setIsPasswordEntered(e.target.value.trim().length > 0);
  // };

  // const getInitials = () => {
  //   const { firstName, lastName } = userData;
  //   return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  // };
  
 
  const goToStart = () => {
    navigate("/start"); 
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
          {/* <div className="form-group1 photo-section">
            <label htmlFor="photo">Фото профиля:</label>
            {isEditing ? (
             <input type="file" id="photo" onChange={handlePhotoChange} />
            ) : userData.photo ? (
              <img src={userData.photo} alt="Profile" className="profile-photo" />
            ) : (
              <div className="initials-box">{getInitials()}</div>
            )}
          </div> */}

          {/* ФИО */}
          <div className="form-group">
            <label htmlFor="lastName">Фамилия:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={tempData.lastName}
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
              value={tempData.firstName}
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
              value={tempData.middleName}
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
              value={tempData.email}
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
              value={tempData.birthDate}
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
              value={tempData.workplace}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Поле для ввода пароля */}
          {isEditing && (
            <div className="form-group">
              <label htmlFor="password">Введите пароль для сохранения:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                required
              />
            </div>
          )}

          {/* Управление кнопками */}
          {!isEditing ? (
            <button type="button" className="edit-button" onClick={handleEdit}>
              Изменить
            </button>
          ) : (
            <div className="button-group">
              <button 
              type="submit" 
              className={`save-button ${isPasswordEntered ? "active" : "disabled"}`}
              disabled={!isPasswordEntered}
              >
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
