import Axios from 'axios'
import md5 from 'md5'
import { Platform } from 'react-native'
import * as Device from 'expo-device'
import * as Application from 'expo-application'
import { tokenManager } from '../utils/localStorage'

export const api = Axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})

export const Profile = (identifinder: string) => {
  if (!identifinder) return `https://www.gravatar.com/avatar/${md5(Math.random())}?d=identicon&s=200`
  const hash = md5(identifinder)
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=200`
}

export const getDeviceId = async () => {
  if (Platform.OS === 'android') {
    const deviceId = await Application.getAndroidId()
    return deviceId
  } else {
    const deviceId = await Application.getIosIdForVendorAsync()
    return deviceId
  }
}

const getHeaders = async () => {
  const Authorization = await tokenManager.getToken()
  const deviceId = await getDeviceId()
  return {
    Authorization: `Bearer ${Authorization}`,
    'X-Device-id': deviceId,
    'X-Platform': Platform.OS,
    'X-Device': await Device.deviceName,
  }
}

export const fetcher = async (url: string) => {
  try {
    const headers = await getHeaders()
    const { data } = await api.get(url, { headers })
    return data?.body
  } catch (error: any) {
    return error.response?.data
  }
}

export const poster = async (url: string, data: object) => {
  try {
    const headers = await getHeaders()
    const response = await api.post(url, data, { headers })
    return response.data
  } catch (error: any) {
    return error.response?.data
  }
}