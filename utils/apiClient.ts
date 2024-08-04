import { ApiBase } from '@/types/api'
import { tokenManager } from '@/utils/localStorage'
import Axios from 'axios'
import * as Application from 'expo-application'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import { Platform } from 'react-native'

export const api = Axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})

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

export const fetcher = async (url: string): Promise<ApiBase> => {
  try {
    const headers = await getHeaders()
    const { data } = await api.get(url, { headers })
    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data
  }
}

export const poster = async (
  url: string,
  payload: object
): Promise<ApiBase> => {
  try {
    const headers = await getHeaders()
    const { data } = await api.post(url, payload, { headers })
    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data
  }
}
