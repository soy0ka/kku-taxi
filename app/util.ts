import Axios from 'axios'
import Device from 'expo-device'
import { Platform } from 'react-native'
import Application from 'expo-application'
import { tokenManager } from '../utils/localStorage'

export const api = Axios.create({
  baseURL: 'http://192.168.0.2:3000'
})

const getDeviceId = async () => {
  if (Platform.OS === 'android') {
    const deviceId = await Application?.getAndroidId()
    return deviceId
  } else {
    const deviceId = await Application?.getIosIdForVendorAsync()
    return deviceId
  }
}

export const fetcher = async (url: string) => {
  const Authorization = await tokenManager.getToken()
  const deviceId = await getDeviceId()
  // const appCheckTokenResponse = await getToken(
  //   appCheck,
  //   /* forceRefresh= */ false
  // )
  try {
    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${Authorization}`,
        'X-Device-id': deviceId,
        'X-Platform': Platform.OS,
        'X-Device': await Device.deviceName,
        // 'X-Firebase-AppCheck': appCheckTokenResponse.token,
      },
    })

    return data?.body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data
  }
}

export const poster = async (url: string, data: object) => {
  const Authorization =  await tokenManager.getToken()
  const deviceId = await getDeviceId()
  // const appCheckTokenResponse = await getToken(
  //   appCheck,
  //   /* forceRefresh= */ true
  // )
  try {
    const response = await api.post(url, data, {
      headers: {
        Authorization: `Bearer ${Authorization}`,
        'X-Device-ID': deviceId,
        'X-Platform': Platform.OS,
        'X-Device': await Device.deviceName,
        // 'X-Firebase-AppCheck': appCheckTokenResponse.token,
      },
    })

    return response.data
  } catch (error: any) {
    return error.response?.data
  }
}

// export const apiUrl = (path: string) =>
//   `${import.meta.env.VITE_API_BASE}${path}`

