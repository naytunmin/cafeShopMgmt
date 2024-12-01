import { API_BASE_URL } from '../utils/ApiConfig';
const defaultHeaders = { 'Content-Type': 'application/json' };

const constructUrl = (endpoint, params = {}) => {
  const fullUrl = new URL(`${API_BASE_URL}${endpoint}`);
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params);
    fullUrl.search = searchParams.toString();
  }
  return fullUrl;
};

const baseFetch = async (fullUrl, options) => {
  try {
    const response = await fetch(fullUrl, options);
    const result = await response.json();
    if (response.ok && result.success !== false) {
      return { success: true, data: result };
    } else {
      console.error('Error:', result.message || 'Unknown error');
      return { success: false, message: result.message || 'Unknown error' };
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return { success: false, message: error.message };
  }
};

export const getData = async (endpoint, params = {}, headers = {}) => {
  const fullUrl = constructUrl(endpoint, params);
  return baseFetch(fullUrl, {
    method: 'GET',
    headers: { ...defaultHeaders, ...headers },
  });
};

export const postData = async (endpoint, body = {}, headers = {}) => {
  const fullUrl = constructUrl(endpoint);
  return baseFetch(fullUrl, {
    method: 'POST',
    headers: { ...defaultHeaders, ...headers },
    body: JSON.stringify(body),
  });
};

export const putData = async (endpoint, body = {}, headers = {}) => {
  const fullUrl = constructUrl(endpoint);
  return baseFetch(fullUrl, {
    method: 'PUT',
    headers: { ...defaultHeaders, ...headers },
    body: JSON.stringify(body),
  });
};

export const deleteData = async (endpoint, params = {}, headers = {}) => {
  const fullUrl = constructUrl(endpoint, params);
  return baseFetch(fullUrl, {
    method: 'PUT',
    headers: { ...defaultHeaders, ...headers },
  });
};
