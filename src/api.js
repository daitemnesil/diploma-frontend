import axios from "axios";

const API_URL = "http://tsycy.ru"; 
// const API_URL = "https://echo.free.beeceptor.com";

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

