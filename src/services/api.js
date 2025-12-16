import axios from 'axios'

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

export async function getUnicorns() {
  try {
    const response = await api.get('/unicorns')
    const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
    return { data: Array.isArray(data) ? data : [], error: null }
  } catch (error) {
    let errorMessage = 'Failed to fetch unicorns'
    
    if (error.response) {
      if (error.response.status === 400) {
        const responseData = error.response.data
        const responseText = typeof responseData === 'string' ? responseData : JSON.stringify(responseData)
        
        // Check if it's the request limit error
        if (responseText.includes('100') || responseText.includes('limit') || responseText.includes('quota')) {
          errorMessage = 'Request limit reached (100 requests). Please get a new unique ID from https://crudcrud.com/ and update your .env file, then restart the server.'
        } else {
          errorMessage = responseData?.message || responseData || 'Invalid request. Please check your input.'
        }
      } else if (error.response.status === 404) {
        errorMessage = 'API endpoint not found. Your unique ID may have expired. Please get a new one from https://crudcrud.com/ and update your .env file.'
      } else {
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`
      }
    } else if (error.message) {
      errorMessage = error.message
    }
    
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

export async function createUnicorn(unicorn) {
  try {
    const payload = {
      name: unicorn.name?.trim() || '',
      age: Number(unicorn.age) || 0,
      colour: unicorn.colour?.trim() || ''
    }
    
    if (!payload.name || payload.age < 0) {
      return { data: null, error: 'Name and age are required. Age must be a positive number.' }
    }
    
    const response = await api.post('/unicorns', payload)
    const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
    return { data: data, error: null }
  } catch (error) {
    let errorMessage = 'Failed to create unicorn'
    
    if (error.response) {
      if (error.response.status === 400) {
        const responseData = error.response.data
        const responseText = typeof responseData === 'string' ? responseData : JSON.stringify(responseData)
        
        if (responseText.includes('100') || responseText.includes('limit') || responseText.includes('quota')) {
          errorMessage = 'Request limit reached (100 requests). Please get a new unique ID from https://crudcrud.com/ and update your .env file, then restart the server.'
        } else {
          errorMessage = responseData?.message || responseData || 'Invalid data format. Please check your input.'
        }
      } else if (error.response.status === 404) {
        errorMessage = 'API endpoint not found. Your unique ID may have expired. Please get a new one from https://crudcrud.com/ and update your .env file.'
      } else {
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`
      }
    } else if (error.message) {
      errorMessage = error.message
    }
    
    return { data: null, error: errorMessage }
  }
}


export async function updateUnicorn(id, unicorn) {
  try {
    const payload = {
      name: unicorn.name?.trim() || '',
      age: Number(unicorn.age) || 0,
      colour: unicorn.colour?.trim() || ''
    }
    
    if (!payload.name || payload.age < 0) {
      return { data: null, error: 'Name and age are required. Age must be a positive number.' }
    }
    
    const response = await api.put(`/unicorns/${id}`, payload)
    
    if (!response.data || response.data === '') {
      return { data: { ...payload, _id: id }, error: null }
    }
    
    const data = typeof response.data === 'string' 
      ? (response.data.trim() ? JSON.parse(response.data) : null)
      : response.data
    
    return { data: data || { ...payload, _id: id }, error: null }
  } catch (error) {
    if (error.message.includes('JSON') && error.response?.status >= 200 && error.response?.status < 300) {
      return { data: { ...unicorn, _id: id }, error: null }
    }
    
    let errorMessage = 'Failed to update unicorn'
    
    if (error.response) {
      if (error.response.status === 400) {
        const responseData = error.response.data
        const responseText = typeof responseData === 'string' ? responseData : JSON.stringify(responseData)
        
        if (responseText.includes('100') || responseText.includes('limit') || responseText.includes('quota')) {
          errorMessage = 'Request limit reached (100 requests). Please get a new unique ID from https://crudcrud.com/ and update your .env file, then restart the server.'
        } else {
          errorMessage = responseData?.message || responseData || 'Invalid data format. Please check your input.'
        }
      } else if (error.response.status === 404) {
        errorMessage = 'Unicorn not found or API endpoint expired. Please get a new unique ID from https://crudcrud.com/ and update your .env file.'
      } else {
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`
      }
    } else if (error.message) {
      errorMessage = error.message
    }
    
    return { data: null, error: errorMessage }
  }
}

export async function deleteUnicorn(id) {
  try {
    await api.delete(`/unicorns/${id}`)
    return { data: true, error: null }
  } catch (error) {
    let errorMessage = 'Failed to delete unicorn'
    
    if (error.response) {
      if (error.response.status === 400) {
        const responseData = error.response.data
        const responseText = typeof responseData === 'string' ? responseData : JSON.stringify(responseData)
        
        // Check if it's the request limit error
        if (responseText.includes('100') || responseText.includes('limit') || responseText.includes('quota')) {
          errorMessage = 'Request limit reached (100 requests). Please get a new unique ID from https://crudcrud.com/ and update your .env file, then restart the server.'
        } else {
          errorMessage = responseData?.message || responseData || 'Invalid request.'
        }
      } else if (error.response.status === 404) {
        errorMessage = 'Unicorn not found or API endpoint expired. Please get a new unique ID from https://crudcrud.com/ and update your .env file.'
      } else {
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`
      }
    } else if (error.message) {
      errorMessage = error.message
    }
    
    return { data: null, error: errorMessage }
  }
}


