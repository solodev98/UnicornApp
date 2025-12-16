<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content -->
    <div class="flex-1 lg:ml-64">
      <!-- Header -->
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="px-8 py-6 flex justify-between items-center">
          <h1 class="font-bold" style="font-size: 32px; color: #4d5959;">Welcome John Doe</h1>
          <button
            @click="showForm = true; editingUnicorn = null"
            class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-colors flex items-center gap-2"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.4808 8.16346C18.3889 8.16346 19.125 7.42731 19.125 6.51923C19.125 5.61115 18.3889 4.875 17.4808 4.875C16.5727 4.875 15.8365 5.61115 15.8365 6.51923M17.4808 8.16346C16.5727 8.16346 15.8365 7.42731 15.8365 6.51923M17.4808 8.16346V15.8365M15.8365 6.51923H8.16346M15.8365 17.4808C15.8365 18.3889 16.5727 19.125 17.4808 19.125C18.3889 19.125 19.125 18.3889 19.125 17.4808C19.125 16.5727 18.3889 15.8365 17.4808 15.8365M15.8365 17.4808C15.8365 16.5727 16.5727 15.8365 17.4808 15.8365M15.8365 17.4808H8.16346M8.16346 6.51923C8.16346 7.42731 7.42731 8.16346 6.51923 8.16346M8.16346 6.51923C8.16346 5.61115 7.42731 4.875 6.51923 4.875C5.61115 4.875 4.875 5.61115 4.875 6.51923C4.875 7.42731 5.61115 8.16346 6.51923 8.16346M6.51923 8.16346V15.8365M8.16346 17.4808C8.16346 18.3889 7.42731 19.125 6.51923 19.125C5.61115 19.125 4.875 18.3889 4.875 17.4808C4.875 16.5727 5.61115 15.8365 6.51923 15.8365M8.16346 17.4808C8.16346 16.5727 7.42731 15.8365 6.51923 15.8365" stroke="white" stroke-linecap="round"/>
            </svg>
            <span>Create Unicorn</span>
          </button>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="p-8">
        <SortControls />
        <UnicornList
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </main>
    </div>

    <!-- Modal for Form -->
    <Modal :show="showForm" @close="handleFormCancel">
      <UnicornForm
        :unicorn="editingUnicorn"
        @success="handleFormSuccess"
        @cancel="handleFormCancel"
      />
    </Modal>

    <!-- Toast Notification -->
    <Toast
      v-if="toast"
      :show="toast.show"
      :type="toast.type"
      :title="toast.title"
      :message="toast.message"
      @close="hideToast"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUnicornStore } from './stores/unicornStore'
import { useToast } from './composables/useToast'
import Sidebar from './components/Sidebar.vue'
import UnicornForm from './components/UnicornForm.vue'
import UnicornList from './components/UnicornList.vue'
import SortControls from './components/SortControls.vue'
import Modal from './components/Modal.vue'
import Toast from './components/Toast.vue'

const store = useUnicornStore()
const { toast, showToast, hideToast } = useToast()
const showForm = ref(false)
const editingUnicorn = ref(null)

onMounted(() => {
  store.fetchUnicorns()
})

function handleEdit(unicorn) {
  editingUnicorn.value = unicorn
  showForm.value = true
}

async function handleDelete(unicorn) {
  const unicornName = unicorn.name
  if (confirm('Are you sure you want to delete this unicorn?')) {
    const success = await store.removeUnicorn(unicorn._id)
    if (success) {
      showToast('error', 'Unicorn deleted', `"${unicornName}" deleted from the database`)
    }
  }
}

function handleFormSuccess(unicornData) {
  const isEditing = !!editingUnicorn.value
  const unicornName = unicornData?.name || editingUnicorn.value?.name || 'Unicorn'
  
  showForm.value = false
  
  if (isEditing) {
    showToast('success', 'Unicorn updated', `"${unicornName}" updated successfully`)
  } else {
    showToast('success', 'Unicorn created', `"${unicornName}" added to the database`)
  }
  
  editingUnicorn.value = null
}

function handleFormCancel() {
  showForm.value = false
  editingUnicorn.value = null
}
</script>
