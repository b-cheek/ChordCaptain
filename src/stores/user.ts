import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  // State variable
  // Using the useLocalStorage composable provided by VueUse in order to persist state during page reloads
  const userID = ref(useLocalStorage('userID', ''))

  // Actions
  function clear() {
    userID.value = ''
  }

  return { userID, clear }
})
