import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSpring,
	withTiming,
} from "react-native-reanimated";

const SIZE = 100.0;

const handleRotation = (progress: Animated.SharedValue<number>) => {
	"worklet"; // javascript function that can run on the UI thread
	return `${progress.value * 2 * Math.PI}rad`; // just add 'worklet' above return
};

const Card = () => {
	const progress = useSharedValue(1);
	const scale = useSharedValue(2);

	const reanimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: progress.value,
			borderRadius: (progress.value * SIZE) / 2, // goes from circle (borderRadius 50) to just rounded corner (borderRadius 25)
			transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
		};
	}, []);

	useEffect(() => {
		progress.value = withRepeat(withSpring(0.5), -1, true); // progress goes from 1 to 0.5
		scale.value = withRepeat(withSpring(1), -1, true); // -1 means repeat forever
	}, []);

	return (
		<Animated.View
			style={[
				// use [ ] to combine styles
				{ height: SIZE, width: SIZE, backgroundColor: "blue" },
				reanimatedStyle,
				styles.card,
			]}
		>
			<Text>Card</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	card: {
		zIndex: 1,
		flex: 5,
		borderWidth: 1,
		borderColor: "red",
		// justifySelf: "flex-end",
		// alignSelf: "flex-end",
		position: "absolute",
		width: "100%",
		bottom: 100,
		backgroundColor: "white",
	},
});

export default Card;
