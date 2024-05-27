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