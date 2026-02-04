export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUsername = () => {
  return localStorage.getItem('username');
};

export const setAuth = (token, username) => {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};