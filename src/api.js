import axios from "axios";

const API_URL = "http://tsycy.ru/api"; 

export const loginUser = async (email, password) => {
  try {
  const response = await axios.post(`${API_URL}/login/`, {
      email,
      password
    });

    return response.data; 
  } catch (error) {
    console.error("Ошибка при входе:", error.response?.data || error.message);
    throw error;
  }
};

export const sendCode = async (firstName, lastName, middleName, email) => {
  try {
    const response = await fetch(`${API_URL}/send-code/`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, middle_name: middleName, email }),
    });

    const data = await response.json(); // Разбираем JSON-ответ сервера
    return data; // Теперь возвращаем данные, а не просто response.ok
  } catch (error) {
    console.error("Ошибка отправки кода:", error);
    return { success: false, message: "Ошибка сети хуй" };
  }
};

export const registerUser = async (email, code, password) => {
  try {
    const response = await axios.post(`${API_URL}/verify-code/`, {
      email,
      code,
      password
    });

    return response.data; // Возвращаем JSON-ответ
  } catch (error) {
    console.error("Ошибка регистрации:", error.response?.data || error.message);
    throw error;
  }
};

