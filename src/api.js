import axios from "axios";
import { createCookie, data } from "react-router-dom";
import Cookies from 'js-cookie';

const API_URL = "http://tsycy.ru"; 
// const API_URL = "https://echo.free.beeceptor.com";

// Логин
export const loginUser = async (email, password) => {
  try {
  // const response = await axios.post(`${API_URL}/login/`, { // TODO: переделать на fetch
  //     email,
  //     password
  //   });

  const response = await await fetch(`${API_URL}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "email": email, "password": password}),
    });

    const data = await response.json()
    
    console.log(data)
    // Сохраняем токен в sessionStorage
    const token = data.access_token;
  
    
    if (token) {
      // sessionStorage.setItem("access_token", token);
      // sessionStorage.setItem("access_token", response.data.access);
      Cookies.set("access_token", token);
      
      
      console.log("Токен сохранен:", token); // Добавьте этот лог для отладки
    }
 
    return response.data; 
  } catch (error) {
    console.error("Ошибка при входе:", error.response?.data || error.message);
    throw error;
  }
};

// Получение данных пользователя
export const getUserData = async () => {
  try {
    // var token = localStorage.getItem('access_token');
    const response = await fetch('http://tsycy.ru/user-details/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get("access_token")}`,
        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5NzM2NTc2LCJpYXQiOjE3Mzk3MzU2NzYsImp0aSI6Ijc4YzlkNjdhNGRmZjQyMGM4MjIxNGMwODQ0ZjA1Y2QyIiwidXNlcl9pZCI6NX0.OBS8PTCz6y-l8e7pUw_ELM4eRaVef62-GelzQJThodE'
      }
    })
    var token = Cookies.get("access_token")
    Cookies.set("test", "test")
    console.log("Извлеченный токен:",  Cookies.get("access_token")); // Добавьте этот лог для отладки
    console.log("refresh_token:",  Cookies.get("refresh_token")); // Добавьте этот лог для отладки
    // console.log("data:",  response.json()); 
    const data = await response.json() 

    // Cookies.get("access_token")  
    // const response = await axios.get(`${API_URL}/user-details/`,  { withCredentials: true });
    return data;
  } catch (error) {
    console.error("Ошибка получения профиля:", error);
    throw error;
  }
};

// Обновление данных пользователя
export const updateUserData = async (updatedData) => {
  try {
    const token = localStorage.getItem("access_token");
    fetch('http://tsycy.ru/user-details/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    const response = await axios.patch(`${API_URL}/update-user/`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка обновления профиля:", error);
    throw error;
  }
};

// Отправка кода на email
export const sendCode = async (firstName, lastName, middleName, email) => {
  try {
    const response = await fetch(`${API_URL}/send-code/`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "first_name": firstName, "last_name": lastName, "middle_name": middleName, "email": email }),
    });

    const data = await response.json(); // Разбираем JSON-ответ сервера
    console.log("Status: ", response.status)
    // return response.status;
    // Если успешно, возвращаем статус - success: true
    if (response.status >= 200 && response.status < 300) {
      return { success: true, message: data.status }
    }

    // Иначе возвращаем статус - success: false
    return { success: false, message: data.email }
    
    // return data; // Теперь возвращаем данные, а не просто response.ok
  } catch (error) {
    console.error("Ошибка отправки кода:", error);
    return { success: false, message: "Ошибка сети хуй" };
  }
};

// Регистрация пользователя
export const registerUser = async (email, code, password) => {
  try {
    const response = await fetch(`${API_URL}/verify-code/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "email": email, "code": code, "password": password }),
    });

    const data = await response.json(); // Разбираем JSON-ответ сервера
    console.log("Status: ", response.status)
    if (response.status >= 200 && response.status < 300) {
      return { success: true, message: data.status }
    }
    return { success: false, message: data.email }
    // return response.data; 
  } catch (error) {
    console.error("Ошибка регистрации hui:", error.response?.data || error.message);
    throw error;
  }
};


