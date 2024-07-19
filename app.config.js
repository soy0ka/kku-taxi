export default {
  expo: {
    name: 'kku-taxi',
    scheme: 'kkutaxi',
    slug: 'kku-taxi',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    notification: {
      icon: './assets/images/icon.png',
      color: '#000000',
    },
    ios: {
      buildNumber: '1',
      supportsTablet: true,
      bundleIdentifier: 'com.onde.kkutaxi',
      googleServicesFile:
        process.env.IOS_GOOGLE_SERVICES_FILE || './GoogleService-Info.plist',
    },
    android: {
      versionCode: 1,
      package: 'com.onde.kkutaxi',
      googleServicesFile:
        process.env.ANDROID_GOOGLE_SERVICES_FILE || './google-services.json',
      permissions: [],
      adaptiveIcon: {
        foregroundImage: './assets/images/icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: ['expo-router', 'expo-font'],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: '260ef7f5-24f3-49b6-93ad-5632be016ff2',
      },
    },
    runtimeVersion: '1.0.0',
    updates: {
      url: 'https://u.expo.dev/260ef7f5-24f3-49b6-93ad-5632be016ff2',
    },
  },
}
