

import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

function RButton({ onPress, children }) {
    return (
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]}  onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </Pressable >
    );
}

export default RButton;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: Colors.primary800,
        elevation: 2,
        borderRadius: 6,
    },
    pressed: {
        opacity: 0.7
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.primary50,
    }
})