import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as api from '../services/api'

export const useUnicornStore = defineStore('unicorn', () => {
  // State
  const unicorns = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(1)
  const itemsPerPage = ref(5)
  const sortField = ref(null) 
  const sortOrder = ref('asc') 

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
    
    const result = await api.getUnicorns()
    
    if (result.error) {
      error.value = result.error
      loading.value = false
      return
    }
    
    
    unicorns.value = Array.isArray(result.data) ? result.data : []
    loading.value = false
  }

  async function addUnicorn(unicornData) {
    loading.value = true
    error.value = null
    
    const result = await api.createUnicorn(unicornData)
    
    if (result.error) {
      error.value = result.error
      loading.value = false
      return false
    }
    
    await fetchUnicorns() 
    loading.value = false
    return true
  }

  async function editUnicorn(id, unicornData) {
    loading.value = true
    error.value = null
    
    const result = await api.updateUnicorn(id, unicornData)
    
    if (result.error) {
      error.value = result.error
      loading.value = false
      return false
    }
    
    await fetchUnicorns()
    loading.value = false
    return true
  }

  async function removeUnicorn(id) {
    loading.value = true
    error.value = null
    
    const result = await api.deleteUnicorn(id)
    
    if (result.error) {
      error.value = result.error
      loading.value = false
      return false
    }
    
    await fetchUnicorns() 
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
    unicorns,
    loading,
    error,
    currentPage,
    itemsPerPage,
    sortField,
    sortOrder,
    sortedUnicorns,
    paginatedUnicorns,
    totalPages,
    fetchUnicorns,
    addUnicorn,
    editUnicorn,
    removeUnicorn,
    setSort,
    setPage
  }
})


