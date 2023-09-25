import axios from "axios";

class AxiosDefault {
  request;

  constructor() {
    this.request = axios.create({ baseURL: "https://desafio-iall.azurewebsites.net/api/" });
  }

  async get(url, config) {
    const token = await localStorage.getItem("token");
    const response = await this.request.get(url, {
      ...config,
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  async post(url, data, config) {
    try {
      const token = await localStorage.getItem("token");
      const response = await this.request.post(url, data, {
        ...config,
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }

    return null;
  }

  async put(url, data, config) {
    const token = await localStorage.getItem("token");
    const response = await this.request.put(url, data, {
      ...config,
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  async delete(url, config) {
    const token = await localStorage.getItem("token");
    const response = await this.request.delete(url, {
      ...config,
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
}

export default new AxiosDefault();
