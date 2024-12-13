import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const _layout = () => {
	return (
		<SafeAreaProvider>
			<StatusBar translucent />
			<RootNavigation />
		</SafeAreaProvider>
	)
}

const RootNavigation = React.memo(() => {
	return (
		<Stack initialRouteName="(tabs)">
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="auth" options={{ headerShown: false }} />
		</Stack>
	)
})
export default _layout
