import axios from 'axios'

// Extract unique ID from environment variable
const fullUrl = import.meta.env.VITE_API_BASE_URL || 'https://crudcrud.com/api/YOUR_UNIQUE_ID_HERE'
const uniqueId = fullUrl.includes('/api/') ? fullUrl.split('/api/')[1] : 'YOUR_UNIQUE_ID_HERE'

// Use proxy in development to avoid CORS issues, direct URL in production
// The proxy will forward /api/* requests to https://crudcrud.com/api/*
const API_BASE_URL = import.meta.env.DEV
  ? `/api/${uniqueId}`
  : fullUrl

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  // Axios automatically parses JSON responses, but we ensure it's explicit
  responseType: 'json'
})

/**
 * Get all unicorns
 * @returns {Promise} Axios response
 */
export async function getUnicorns() {
  try {
    const response = await api.get('/unicorns')
    // Ensure response is parsed as JSON (Axios does this automatically, but verify)
    const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
    return { data: Array.isArray(data) ? data : [], error: null }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch unicorns'
    return { data: null, error: errorMessage }
  }
}

/**
 * Get a single unicorn by ID
 * @param {string} id - Unicorn ID
 * @returns {Promise} Axios response
 */
export async function getUnicorn(id) {
  try {
    const response = await api.get(`/unicorns/${id}`)
    const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
    return { data: data, error: null }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch unicorn'
    return { data: null, error: errorMessage }
  }
}

/**
 * Create a new unicorn
 * @param {Object} unicorn - Unicorn data
 * @returns {Promise} Axios response
 */
export async function createUnicorn(unicorn) {
  try {
    const response = await api.post('/unicorns', unicorn)
    const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
    return { data: data, error: null }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to create unicorn'
    return { data: null, error: errorMessage }
  }
}

/**
 * Update an existing unicorn
 * @param {string} id - Unicorn ID
 * @param {Object} unicorn - Updated unicorn data
 * @returns {Promise} Axios response
 */
export async function updateUnicorn(id, unicorn) {
  try {
    const response = await api.put(`/unicorns/${id}`, unicorn)
    const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
    return { data: data, error: null }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to update unicorn'
    return { data: null, error: errorMessage }
  }
}

/**
 * Delete a unicorn
 * @param {string} id - Unicorn ID
 * @returns {Promise} Axios response
 */
export async function deleteUnicorn(id) {
  try {
    await api.delete(`/unicorns/${id}`)
    return { data: true, error: null }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to delete unicorn'
    return { data: null, error: errorMessage }
  }
}


