import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Map from "./components/Map";
import Card from "./components/Card";
import BottomSheet from "./components/BottomSheet";

export default function App() {
	const name = "Ryan";
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<StatusBar style="auto" />
				<Map />
				{/* <Card /> */}
				<BottomSheet name={name} />
			</SafeAreaView>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
	},
});
