import AsyncStorage from '@react-native-async-storage/async-storage'

const setToken = async (token: string) => {
  await AsyncStorage.setItem('@TOKEN', token)
}

const removeToken = async () => {
  await AsyncStorage.removeItem('@TOKEN')
}

const getToken = async () => {
  return await AsyncStorage.getItem('@TOKEN')
}

export const tokenManager = {
  setToken,
  removeToken,
  getToken,
}

const setUser = async (user: object) => {
  await AsyncStorage.setItem('@USER', JSON.stringify(user))
}

const removeUser = async () => {
  await AsyncStorage.removeItem('@USER')
}

const getUser = async () => {
  const user = await AsyncStorage.getItem('@USER')
  return JSON.parse(user || '{}')
}

export const userManager = {
  setUser,
  removeUser,
  getUser,
}

const setPushToken = async (pushToken: string) => {
  await AsyncStorage.setItem('@PUSH_TOKEN', pushToken)
}

const removePushToken = async () => {
  await AsyncStorage.removeItem('@PUSH_TOKEN')
}

const getPushToken = async () => {
  return await AsyncStorage.getItem('@PUSH_TOKEN')
}

export const pushTokenManager = {
  setPushToken,
  removePushToken,
  getPushToken,
}
