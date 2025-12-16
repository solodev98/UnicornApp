<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    
    <!-- Main Content -->
    <div class="flex-1 lg:ml-64 w-full">
      <!-- Header -->
      <header class="bg-white shadow-sm sticky top-0 z-30">
        <div class="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex justify-between items-center">
          <!-- Mobile Menu Button -->
          <button
            @click="sidebarOpen = true"
            class="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Open menu"
          >
            <MenuIcon :size="24" />
          </button>
          
          <h1 class="font-bold text-xl sm:text-2xl lg:text-[32px] color: #4d5959 ml-2 lg:ml-0">Welcome John Doe</h1>
          <button
            @click="showForm = true; editingUnicorn = null"
            class="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-6 py-2 rounded-md transition-colors flex items-center gap-2 text-sm sm:text-base"
          >
            <PlusIcon :size="20" class="w-4 h-4 sm:w-5 sm:h-5" stroke="white" />
            <span class="hidden sm:inline">Create Unicorn</span>
            <span class="sm:hidden">Create</span>
          </button>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="p-4 sm:p-6 lg:p-8">
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

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmation
      :show="showDeleteConfirmation"
      :unicorn-name="deletingUnicorn?.name || ''"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />

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
import DeleteConfirmation from './components/DeleteConfirmation.vue'
import MenuIcon from './components/icons/MenuIcon.vue'
import PlusIcon from './components/icons/PlusIcon.vue'

const store = useUnicornStore()
const { toast, showToast, hideToast } = useToast()
const showForm = ref(false)
const editingUnicorn = ref(null)
const sidebarOpen = ref(false)
const showDeleteConfirmation = ref(false)
const deletingUnicorn = ref(null)

onMounted(() => {
  store.fetchUnicorns()
})

function handleEdit(unicorn) {
  editingUnicorn.value = unicorn
  showForm.value = true
}

function handleDelete(unicorn) {
  deletingUnicorn.value = unicorn
  showDeleteConfirmation.value = true
}

async function confirmDelete() {
  if (deletingUnicorn.value) {
    const unicornName = deletingUnicorn.value.name
    const success = await store.removeUnicorn(deletingUnicorn.value._id)
    if (success) {
      showToast('error', 'Unicorn deleted', `"${unicornName}" deleted from the database`)
    }
    cancelDelete()
  }
}

function cancelDelete() {
  showDeleteConfirmation.value = false
  deletingUnicorn.value = null
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
