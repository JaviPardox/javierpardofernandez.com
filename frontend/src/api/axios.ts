import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development';
const baseURL = isDevelopment 
  ? (process.env.REACT_APP_API_URL || 'http://localhost:8000')
  : '';

const api = axios.create({
  baseURL,
});

// Add a response interceptor to handle image URLs due to relative calls not routing properly by the srcSet property of the browser in development mode
api.interceptors.response.use(response => {
  if (isDevelopment && response.config.url?.includes('/images') && response.config.url?.endsWith('/urls')) {
    const data = response.data;
    
    if (data && data.urls && typeof data.urls === 'object') {
      const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      
      Object.keys(data.urls).forEach(key => {
        if (data.urls[key].startsWith('/')) {
          data.urls[key] = `${backendUrl}${data.urls[key]}`;
        }
      });
    }
  }
  
  return response;
});

export default api; 