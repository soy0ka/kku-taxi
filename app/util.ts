import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import {
//   initializeAppCheck,
//   getToken,
//   ReCaptchaV3Provider,
// } from 'firebase/app-check'
// import { app } from '~/service/firebase'
// import { getCookie } from 'react-use-cookie'

// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider('6LcPWBEkAAAAAGvMehTfPWRw4-yqyAJ9mNg28xRp'),
// })

export const setToken = async (token: string) => {
  await AsyncStorage.setItem('@TOKEN', token)
}

export const removeToken = async () => {
  await AsyncStorage.removeItem('@TOKEN')
}

export const getToken = async () => {
  return await AsyncStorage.getItem('@TOKEN')
}

export const api = Axios.create({
  baseURL: 'http://localhost:3000',
})

export const fetcher = async (url: string) => {
  const Authorization = await AsyncStorage.getItem('@TOKEN')
  // const appCheckTokenResponse = await getToken(
  //   appCheck,
  //   /* forceRefresh= */ false
  // )
  try {
    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${Authorization}`,
      //   'X-Firebase-AppCheck': appCheckTokenResponse.token,
      },
    })

    return data.body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data
  }
}

export const poster = async (url: string, data: object) => {
  const Authorization = await AsyncStorage.getItem('@TOKEN')
  // const appCheckTokenResponse = await getToken(
  //   appCheck,
  //   /* forceRefresh= */ true
  // )
  try {
    const response = await api.post(url, data, {
      headers: {
        Authorization: `Bearer ${Authorization}`,
      //   'X-Firebase-AppCheck': appCheckTokenResponse.token,
      },
    })

    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

// export const apiUrl = (path: string) =>
//   `${import.meta.env.VITE_API_BASE}${path}`
