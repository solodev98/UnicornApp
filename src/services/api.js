import axios from 'axios'

// Get unique ID from environment variable
const fullUrl = import.meta.env.VITE_API_BASE_URL || 'https://crudcrud.com/api/YOUR_UNIQUE_ID_HERE'
const uniqueId = fullUrl.includes('/api/') ? fullUrl.split('/api/')[1] : 'YOUR_UNIQUE_ID_HERE'

const API_BASE_URL = `/api/${uniqueId}`

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  responseType: 'json'
})

//get function
export async function getUnicorns() {
  try {
    const response = await api.get('/unicorns')
    const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
    return { data: Array.isArray(data) ? data : [], error: null }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch unicorns'
    return { data: null, error: errorMessage }
  }
}


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

//create function
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


//update function 
export async function updateUnicorn(id, unicorn) {
  try {
    const response = await api.put(`/unicorns/${id}`, unicorn)
    
    if (!response.data || response.data === '') {
      return { data: { ...unicorn, _id: id }, error: null }
    }
    
    const data = typeof response.data === 'string' 
      ? (response.data.trim() ? JSON.parse(response.data) : null)
      : response.data
    
    return { data: data || { ...unicorn, _id: id }, error: null }
  } catch (error) {
    if (error.message.includes('JSON') && error.response?.status >= 200 && error.response?.status < 300) {
      return { data: { ...unicorn, _id: id }, error: null }
    }
    
    const errorMessage = error.response?.data?.message || error.message || 'Failed to update unicorn'
    return { data: null, error: errorMessage }
  }
}

//delete function
export async function deleteUnicorn(id) {
  try {
    await api.delete(`/unicorns/${id}`)
    return { data: true, error: null }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to delete unicorn'
    return { data: null, error: errorMessage }
  }
}


