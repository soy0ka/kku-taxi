import Styles from "./styles";
import { Stack } from "expo-router/stack";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider, SafeAreaView } from "@gluestack-ui/themed";

export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
}
