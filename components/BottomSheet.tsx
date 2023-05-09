import { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BottomSheet = ({ name }: any) => {
	const translateY = useSharedValue(0);
	const context = useSharedValue({ y: 0 });

	const gesture = Gesture.Pan()
		.onStart(() => {
			context.value = { y: translateY.value };
		})
		.onUpdate((event) => {
			translateY.value = event.translationY + context.value.y;
			translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT / 2);
		});

	useEffect(() => {
		translateY.value = withTiming(-SCREEN_HEIGHT / 2);
		console.log(name);
	}, []);

	const rBottomSheetStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translateY.value }],
		};
	});

	return (
		<GestureDetector gesture={gesture}>
			<Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
				<Text style={styles.text}>BottomSheet</Text>
			</Animated.View>
		</GestureDetector>
	);
};

export default BottomSheet;

const styles = StyleSheet.create({
	bottomSheetContainer: {
		height: SCREEN_HEIGHT / 2,
		width: "100%",
		backgroundColor: "yellow",
		position: "absolute",
		top: SCREEN_HEIGHT,
		borderRadius: 25,
	},
	text: {
		alignSelf: "center",
		marginVertical: 15,
	},
});
