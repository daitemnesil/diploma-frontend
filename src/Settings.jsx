import React, { useState, useEffect } from "react";
import './Settings.css';


const Settings = () => {
  // Состояния для разных элементов формы
  const [conferenceName, setConferenceName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [meetingCode, setMeetingCode] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [invitees, setInvitees] = useState("");

  // Генерация ссылки для конференции и кода (можно заменить на реальную логику)
  useEffect(() => {
    if (conferenceName) {
      const generatedLink = `https://meetapp.com/${conferenceName}`;
      setShareLink(generatedLink);
      setMeetingCode(Math.random().toString(36).substr(2, 6).toUpperCase()); // Генерация случайного кода
    }
  }, [conferenceName]); // Этот эффект будет срабатывать при изменении conferenceName

  const handleConferenceNameChange = (e) => setConferenceName(e.target.value);
  const handleIsPrivateChange = (e) => setIsPrivate(e.target.checked);
  const handleIsScheduledChange = (e) => setIsScheduled(e.target.checked);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);
  const handleInviteesChange = (e) => setInvitees(e.target.value);

  const handleSubmit = () => {
    // Логика для отправки данных (например, API-запрос)
    console.log({
      conferenceName,
      isPrivate,
      shareLink,
      meetingCode,
      isScheduled,
      date,
      time,
      invitees
    });
  };

  // Функции для копирования ссылки и кода в буфер обмена
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Скопировано в буфер обмена!"); // Сообщение пользователю
      },
      (err) => {
        console.error("Не удалось скопировать: ", err);
      }
    );
  };

  return (
    <div className="conference-settings">
      <h1>Настройки конференции</h1>
      <div className="form-group-set">
        <label>Название:</label>
        <input
          type="text"
          value={conferenceName}
          onChange={handleConferenceNameChange}
          placeholder="Введите название конференции"
        />
      </div>

      <div className="form-group-set">
        <label>Приватная конференция:</label>
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={handleIsPrivateChange}
        />
      </div>

      <div className="form-group-set">
        <label>Ссылка для доступа:</label>
        <div className="link-copy">
          <p>{shareLink}</p>
          <button onClick={() => copyToClipboard(shareLink)}>
            <img src="/test.png" alt="Копировать" />
          </button>
        </div>
      </div>

      <div className="form-group-set">
        <label>Код конференции:</label>
        <div className="link-copy">
          <p>{meetingCode}</p>
          <button onClick={() => copyToClipboard(shareLink)}>
            <img src="/test.png" alt="Копировать" />
          </button>
        </div>
      </div>

      <div className="form-group-set">
        <label>Запланировать конференцию:</label>
        <input
          type="checkbox"
          checked={isScheduled}
          onChange={handleIsScheduledChange}
        />
      </div>

      {isScheduled && (
        <div>
          <div className="plan-group">
            <div className="form-group-set">
              <label>Дата:</label>
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
              />
            </div>

            <div className="form-group-set">
              <label>Время:</label>
              <input
                type="time"
                value={time}
                onChange={handleTimeChange}
              />
            </div>
          </div>

          <div className="form-group-set">
            <label>Пригласить:</label>
            <input
              type="text"
              value={invitees}
              onChange={handleInviteesChange}
              placeholder="Введите логины участников"
            />
          </div>
          <div className="button-group-set">
            <button onClick={handleSubmit}>Запланировать</button>
          </div>
        </div>
      )}

      {!isScheduled && <div className="button-group-set"><button onClick={handleSubmit}>Создать</button></div>}
    </div>
  );
};

export default Settings;
