// Base URL for the backend API
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
export const API_URL = `${API_BASE}/api`;

/**
 * A wrapper around the native fetch API that automatically adds
 * necessary headers (like Content-Type) and ensures credentials (cookies)
 * are included in every request for better-auth.
 * 
 * @param {string} endpoint - The API endpoint starting with / (e.g. /rooms)
 * @param {RequestInit} options - Standard fetch options
 * @returns {Promise<Response>}
 */
export async function fetchApi(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  // Setup default options
  const defaultOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Bypass-Tunnel-Reminder': 'true', // Important to bypass Localtunnel warning page
      ...options.headers,
    },
    // Crucial for better-auth session cookies to be sent across origins
    credentials: 'include',
  };

  // If body is an object and Content-Type is JSON, stringify it
  if (
    defaultOptions.body && 
    typeof defaultOptions.body === 'object' && 
    !(defaultOptions.body instanceof FormData) &&
    defaultOptions.headers['Content-Type'] === 'application/json'
  ) {
    defaultOptions.body = JSON.stringify(defaultOptions.body);
  }

  // If using FormData (e.g. image uploads), let the browser set the Content-Type
  if (defaultOptions.body instanceof FormData) {
    delete defaultOptions.headers['Content-Type'];
  }

  return fetch(url, defaultOptions);
}
