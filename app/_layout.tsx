import Styles from "./styles"
import { Stack } from "expo-router/stack"
import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, SafeAreaView } from "@gluestack-ui/themed"

export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, title: '로그인' }} />
        <Stack.Screen name="authcode" options={{ title: '인증코드 입력' }}/>
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
}
