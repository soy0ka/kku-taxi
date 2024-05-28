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

interface User {
  id: string
  name: string
}

const setUser = async (user: User) => {
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