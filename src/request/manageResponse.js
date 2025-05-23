import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export function manageResponse(response, options = {}) {
  const {
    method = 'GET',
    successToast = true,
    errorToast = true,
  } = options

  // 💡 Skip toast for GET
  if (method.toUpperCase() === 'GET') return

  // 💡 Ensure response is a plain object
  if (!response || typeof response !== 'object' || Array.isArray(response)) {
    if (errorToast) toast.error('Invalid response')
    console.error('Invalid or missing response:', response)
    return
  }

  const status = response.status || 'unknown'
  let message = response.message || 'Something went wrong.'

  // 💡 Handle object messages (prevent [object Object])
  if (typeof message === 'object') {
    try {
      message = JSON.stringify(message)
    } catch {
      message = 'Invalid message format.'
    }
  }

  if (status === 'success' && successToast) {
    toast.success(message)
  } else if (status === 'error' && errorToast) {
    toast.error(message)
  } else {
    toast.info(message)
  }
}
