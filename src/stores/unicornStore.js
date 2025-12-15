import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as api from '../services/api'

// Dummy data for design purposes
const DUMMY_DATA = [
  { _id: '1', name: 'Sparkle Angel', age: 3, colour: 'Blue' },
  { _id: '2', name: 'Sparkle Angel', age: 24, colour: 'Blue' },
  { _id: '3', name: 'Sparkle Angel', age: 60, colour: 'Blue' },
  { _id: '4', name: 'Sparkle Angel', age: 3, colour: 'Blue' },
  { _id: '5', name: 'Sparkle Angel', age: 12, colour: 'Blue' },
  { _id: '6', name: 'Rainbow Dash', age: 5, colour: 'Pink' },
  { _id: '7', name: 'Stardust', age: 20, colour: 'Purple' },
  { _id: '8', name: 'Moonbeam', age: 30, colour: 'Silver' },
  { _id: '9', name: 'Sunshine', age: 7, colour: 'Yellow' },
  { _id: '10', name: 'Thunder', age: 15, colour: 'Black' },
  { _id: '11', name: 'Crystal', age: 2, colour: 'White' },
  { _id: '12', name: 'Aurora', age: 28, colour: 'Green' }
]

// Set to true to use dummy data, false to use API
const USE_DUMMY_DATA = true

export const useUnicornStore = defineStore('unicorn', () => {
  // State
  const unicorns = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(1)
  const itemsPerPage = ref(5)
  const sortField = ref(null) // 'name' or 'age'
  const sortOrder = ref('asc') // 'asc' or 'desc'

  // Computed
  const sortedUnicorns = computed(() => {
    let sorted = [...unicorns.value]
    
    if (sortField.value === 'name') {
      sorted.sort((a, b) => {
        const nameA = a.name?.toLowerCase() || ''
        const nameB = b.name?.toLowerCase() || ''
        if (sortOrder.value === 'asc') {
          return nameA.localeCompare(nameB)
        } else {
          return nameB.localeCompare(nameA)
        }
      })
    } else if (sortField.value === 'age') {
      sorted.sort((a, b) => {
        const ageA = a.age || 0
        const ageB = b.age || 0
        if (sortOrder.value === 'asc') {
          return ageA - ageB
        } else {
          return ageB - ageA
        }
      })
    }
    
    return sorted
  })

  const paginatedUnicorns = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return sortedUnicorns.value.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(sortedUnicorns.value.length / itemsPerPage.value)
  })

  // Actions
  async function fetchUnicorns() {
    loading.value = true
    error.value = null
    
    if (USE_DUMMY_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      unicorns.value = [...DUMMY_DATA]
      loading.value = false
      return
    }
    
    const result = await api.getUnicorns()
    
    if (result.error) {
      error.value = result.error
      loading.value = false
      return
    }
    
    unicorns.value = result.data || []
    loading.value = false
  }

  async function addUnicorn(unicornData) {
    loading.value = true
    error.value = null
    
    if (USE_DUMMY_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      const newUnicorn = {
        _id: Date.now().toString(),
        ...unicornData
      }
      unicorns.value.push(newUnicorn)
      loading.value = false
      return true
    }
    
    const result = await api.createUnicorn(unicornData)
    
    if (result.error) {
      error.value = result.error
      loading.value = false
      return false
    }
    
    await fetchUnicorns() // Refresh list
    loading.value = false
    return true
  }

  async function editUnicorn(id, unicornData) {
    loading.value = true
    error.value = null
    
    if (USE_DUMMY_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      const index = unicorns.value.findIndex(u => u._id === id)
      if (index !== -1) {
        unicorns.value[index] = { ...unicorns.value[index], ...unicornData }
      }
      loading.value = false
      return true
    }
    
    const result = await api.updateUnicorn(id, unicornData)
    
    if (result.error) {
      error.value = result.error
      loading.value = false
      return false
    }
    
    await fetchUnicorns() // Refresh list
    loading.value = false
    return true
  }

  async function removeUnicorn(id) {
    loading.value = true
    error.value = null
    
    if (USE_DUMMY_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      unicorns.value = unicorns.value.filter(u => u._id !== id)
      loading.value = false
      return true
    }
    
    const result = await api.deleteUnicorn(id)
    
    if (result.error) {
      error.value = result.error
      loading.value = false
      return false
    }
    
    await fetchUnicorns() // Refresh list
    loading.value = false
    return true
  }

  function setSort(field) {
    if (field === null) {
      // Clear sort
      sortField.value = null
      sortOrder.value = 'asc'
    } else if (sortField.value === field) {
      // Toggle sort order if same field
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortField.value = field
      sortOrder.value = 'asc'
    }
  }

  function setPage(page) {
    currentPage.value = page
  }

  return {
    // State
    unicorns,
    loading,
    error,
    currentPage,
    itemsPerPage,
    sortField,
    sortOrder,
    // Computed
    sortedUnicorns,
    paginatedUnicorns,
    totalPages,
    // Actions
    fetchUnicorns,
    addUnicorn,
    editUnicorn,
    removeUnicorn,
    setSort,
    setPage
  }
})


