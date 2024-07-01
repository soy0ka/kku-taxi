import 'dotenv/config'
import * as Updates from 'expo-updates'
config({ path: path.resolve(process.cwd(), `.env.${Updates.channel}`) })

console.log('Channel:', Updates.channel)
const Config = {
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_WS_URL: process.env.EXPO_PUBLIC_WS_URL,
  EXPO_FIREBASE_API_KEY: process.env.EXPO_FIREBASE_API_KEY,
  EXPO_FIREBASE_AUTH_DOMAIN: process.env.EXPO_FIREBASE_AUTH_DOMAIN,
  EXPO_FIREBASE_PROJECT_ID: process.env.EXPO_FIREBASE_PROJECT_ID,
  EXPO_FIREBASE_STORAGE_BUCKET: process.env.EXPO_FIREBASE_STORAGE_BUCKET,
  EXPO_FIREBASE_MESSAGING_SENDER_ID:
    process.env.EXPO_FIREBASE_MESSAGING_SENDER_ID,
  EXPO_FIREBASE_APP_ID: process.env.EXPO_FIREBASE_APP_ID,
  EXPO_FIREBASE_MEASUREMENT_ID: process.env.EXPO_FIREBASE_MEASUREMENT_ID,
  enableHiddenFeatures: true,
  EXPO_APPLE_API_KEY_KEY_ID: process.env.EXPO_APPLE_API_KEY_KEY_ID,
  EXPO_APPLE_API_KEY_ISSUER_ID: process.env.EXPO_APPLE_API_KEY_ISSUER_ID,
  EXPO_APPLE_API_KEY_PATH: process.env.EXPO_APPLE_API_KEY_PATH,
  EXPO_APPLE_TEAM_ID: process.env.EXPO_APPLE_TEAM_ID,
  EXPO_APPLE_ID: process.env.EXPO_APPLE_ID,
}

if (Updates.channel === 'production' || Updates.channel === 'preview') {
  Config.enableHiddenFeatures = false
}

export default Config
