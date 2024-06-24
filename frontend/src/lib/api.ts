import { AUTH_CONSTANTS } from '@/constants/store/auth'
import axios from 'axios'
import Cookies from 'js-cookie'

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use((request) => {
  const cookies = Cookies.get()
  const hasAuthorizationToken = AUTH_CONSTANTS.AUTH_PROPERTY_NAME in cookies

  if (!hasAuthorizationToken) {
    return request
  }

  const authToken = cookies[AUTH_CONSTANTS.AUTH_PROPERTY_NAME]
  request.headers.Authorization = `Bearer ${authToken}`
  return request
})
