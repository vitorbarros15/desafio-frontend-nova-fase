import axios from "axios";

async function makeLogin() {
  try {
    const response = await axios.post("https://desafio-iall.azurewebsites.net/api/login", {
      username: "vitor@teste.com",
      password: "vitor@17"
    });

    const { token } = response.data;
    localStorage.setItem("token", token);
  } catch (error) {
    console.error("Erro ao fazer login:", error);
  }
}

export default makeLogin;
