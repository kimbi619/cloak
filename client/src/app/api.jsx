import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic request handler
const apiRequest = async (method, url, data = null, customHeaders = {}) => {
  try {
    const config = {
      method,
      url,
      headers: { ...customHeaders },
    };

    if (data) {
      if (customHeaders['Content-Type'] === 'application/x-www-form-urlencoded') {
        const formData = new URLSearchParams();
        for (const key in data) {
          formData.append(key, data[key]);
        }
        config.data = formData;
      } else {
        config.data = data;
      }
    }

    const response = await apiClient(config);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error.response?.data || error.message || 'An error occurred',
      status: error.response?.status
    };
  }
};

export const keycloakAuth = async (username, password) => {
  const payload = {
    client_id: 'backend-service',
    client_secret: 'oOcJKYNrVVVnYo8C3ugOrwcoofAC1hBx',
    grant_type: 'password',
    username,
    password
  };
  
  return apiRequest(
    'post',
    '/realms/kloack/protocol/openid-connect/token',
    payload,
    { 'Content-Type': 'application/x-www-form-urlencoded' }
  );
};

export const get = (url, customHeaders = {}) => apiRequest('get', url, null, customHeaders);
export const post = (url, data, customHeaders = {}) => apiRequest('post', url, data, customHeaders);
export const put = (url, data, customHeaders = {}) => apiRequest('put', url, data, customHeaders);
export const del = (url, customHeaders = {}) => apiRequest('delete', url, null, customHeaders);