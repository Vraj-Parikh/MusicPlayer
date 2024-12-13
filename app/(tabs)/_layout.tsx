import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { BlurView } from 'expo-blur'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import { defaultStyles } from '@/styles/default'
import { colors } from '@/constants/constant'
import { SafeAreaView } from 'react-native-safe-area-context'
const _layout = () => {
	return (
		<SafeAreaView style={defaultStyles.container}>
			<Tabs
				screenOptions={{
					tabBarStyle: style.tabContainer,
					tabBarActiveTintColor: colors.primary,
					tabBarInactiveTintColor: '#8f8e8f',
					headerShown: false,
					tabBarLabelStyle: {
						fontSize: 11,
						fontWeight: 500,
					},
					tabBarBackground: () => (
						<BlurView
							intensity={15}
							style={{
								...StyleSheet.absoluteFillObject,
								overflow: 'hidden',
								borderTopLeftRadius: 20,
								borderTopRightRadius: 20,
							}}
						/>
					),
				}}
			>
				<Tabs.Screen
					name="favorites"
					options={{
						tabBarLabel: 'Favorites',
						tabBarIcon: ({ color }) => <FontAwesome name="heart" size={20} color={color} />,
					}}
				/>
				<Tabs.Screen
					name="playlists"
					options={{
						tabBarLabel: 'Playlists',
						tabBarIcon: ({ color }) => (
							<MaterialIcons name="playlist-play" size={30} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="(songs)"
					options={{
						tabBarLabel: 'Songs',
						tabBarIcon: ({ color }) => <FontAwesome name="music" size={20} color={color} />,
					}}
				/>
				<Tabs.Screen
					name="artists"
					options={{
						tabBarLabel: 'Artists',
						tabBarIcon: ({ color }) => <FontAwesome name="group" size={20} color={color} />,
					}}
				/>
			</Tabs>
		</SafeAreaView>
	)
}

const style = StyleSheet.create({
	tabContainer: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		position: 'absolute',
		borderTopWidth: 0,
		height: 70,
		paddingTop: 8,
		// backgroundColor: colors.background,

		// paddingBottom: 20,
	},
})
export default _layout
