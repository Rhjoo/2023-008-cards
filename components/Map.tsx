import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Polygon } from "react-native-maps";

const Map = () => {
	const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
	const [delta, setDelta] = useState([180, 360]);
	const [permission, setPermission] = useState(true);
	const [address, setAddress] = useState<any>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getPermission = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.log("PERMISSION NOT GRANTED!");
				setPermission(false);
				return;
			}
			getLocation();
		};
		getPermission();
	}, []);

	const getLocation = async () => {
		setLoading(true);

		let position = await Location.getCurrentPositionAsync({});

		setLocation({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		});

		const locationGeocodedAddress = await Location.reverseGeocodeAsync({
			longitude: position.coords.longitude,
			latitude: position.coords.latitude,
		});

		setAddress(locationGeocodedAddress);
		setDelta([0.01, 0.01]);
		setLoading(false);
	};

	return (
		<>
			<MapView
				style={styles.map}
				showsUserLocation={true}
				region={{
					latitude: location.latitude,
					longitude: location.longitude,
					latitudeDelta: delta[0],
					longitudeDelta: delta[1],
				}}
			></MapView>
		</>
	);
};

const styles = StyleSheet.create({
	map: {
		width: "100%",
		// height: "90%",
		flex: 95,
	},
});

export default Map;
