<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content -->
    <div class="flex-1 lg:ml-64">
      <!-- Header -->
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="px-8 py-6 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">Welcome John Doe</h1>
          <button
            @click="showForm = true; editingUnicorn = null"
            class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-colors flex items-center gap-2"
          >
            <span>🦄</span>
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
