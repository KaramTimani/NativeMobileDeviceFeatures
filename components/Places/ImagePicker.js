import { View, StyleSheet, Button, Alert, Image, Text } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutLinedButton from "../../UI/OutLinedButton";

function ImagePicker({onTakeImage}) {
    const [pickedImage, setPickedImage] = useState();
    const [useCameraPermissionInformation, requestPermission] = useCameraPermissions();

    async function verifyPermissions() {
        if (useCameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (useCameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permission",
                "You need to grant camera permissions to use this app.");
            return false;
        }
        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,

        });
        setPickedImage(image.uri);
        onTakeImage(image.uri);
    }
    let imagePreview = <Text>No image taken yet.</Text>

    if (pickedImage) {
        imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />

    }
    return (
        <View>

            <View style={styles.imagePreview}>{imagePreview}</View>
            <OutLinedButton onPress={takeImageHandler} name="camera">Take Image</OutLinedButton>
        </View>
    );
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 6,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 6
    }
})