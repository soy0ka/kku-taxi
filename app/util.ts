import Axios from 'axios'
import * as Application from 'expo-application'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import md5 from 'md5'
import { Platform } from 'react-native'
import { tokenManager } from '../utils/localStorage'

export const api = Axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})

export const Profile = (identifinder: string | number | undefined) => {
  if (!identifinder)
    return `https://www.gravatar.com/avatar/${md5(
      String(Math.random())
    )}?d=identicon&s=200`
  const hash = md5(String(identifinder))
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
    'X-App-Version': Constants.expoConfig?.version || '0.0.0',
  }
}

export const fetcher = async (url: string) => {
  try {
    const headers = await getHeaders()
    const { data } = await api.get(url, { headers })
    return data?.body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data
  }
}

export const poster = async (url: string, data: object) => {
  try {
    const headers = await getHeaders()
    const response = await api.post(url, data, { headers })
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data
  }
}
