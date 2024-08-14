import { firebase } from '@react-native-firebase/app-check'
import { getApps, initializeApp } from 'firebase/app'

// Firebase 설정
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Firebase 초기화 (이미 초기화된 경우 방지)
if (getApps().length === 0) {
  initializeApp(firebaseConfig)
}

const appCheckProvider = firebase
  .appCheck()
  .newReactNativeFirebaseAppCheckProvider()

appCheckProvider.configure({
  android: {
    // eslint-disable-next-line no-undef
    provider: __DEV__ ? 'debug' : 'playIntegrity',
    debugToken: process.env.EXPO_PUBLIC_FIREBASE_APPCHECK_ANDROID
  },
  apple: {
    // eslint-disable-next-line no-undef
    provider: __DEV__ ? 'debug' : 'appAttestWithDeviceCheckFallback',
    debugToken: process.env.EXPO_PUBLIC_FIREBASE_APPCHECK_IOS
  }
})

firebase.appCheck().initializeAppCheck({
  provider: appCheckProvider,
  isTokenAutoRefreshEnabled: true
})
