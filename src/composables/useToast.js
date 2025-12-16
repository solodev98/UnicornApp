import { ref } from 'vue'

const toast = ref(null)

export function useToast() {
  const showToast = (type, title, message, duration = 3000) => {
    toast.value = {
      show: true,
      type,
      title,
      message
    }

    setTimeout(() => {
      if (toast.value) {
        toast.value.show = false
        setTimeout(() => {
          toast.value = null
        }, 300)
      }
    }, duration)
  }

  const hideToast = () => {
    if (toast.value) {
      toast.value.show = false
      setTimeout(() => {
        toast.value = null
      }, 300)
    }
  }

  return {
    toast,
    showToast,
    hideToast
  }
}

