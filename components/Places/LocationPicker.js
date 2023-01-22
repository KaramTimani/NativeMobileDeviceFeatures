
import { View, StyleSheet, Alert, Image, Text } from "react-native";
import OutLinedButton from "../../UI/OutLinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from '../../util/location';
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";

function LocationPicker({ onPickLocation }) {

    const [pickedLocation, setPickedLocation] = useState('');
    const isFocused = useIsFocused();

    const navigation = useNavigation();
    const route = useRoute();

    const [locationPermissionInFormation, requestPermission] = useForegroundPermissions();


    useEffect(() => {
        if (isFocused && route.params) {

            setPickedLocation({
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            });
        }
    }, [route, isFocused]);

    useEffect(() => {
        async function handleLocation() {
            if (pickedLocation) {
                const address = await getAddress(
                    pickedLocation.lat,
                    pickedLocation.lng
                );
                onPickLocation({ ...pickedLocation, address: address });
            }
        }
        handleLocation();
    }, [pickedLocation, onPickLocation]);


    async function verifyPermissions() {
        if (locationPermissionInFormation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (locationPermissionInFormation.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permission",
                "You need to grant location permissions to use this app.");
            return false;
        }
        return true;

    }
    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    }
    function pickOnMapHandler() {
        navigation.navigate("Map");
    }
    let locationPreview = <Text>No location picked yet.</Text>

    if (pickedLocation) {
        locationPreview = (<Image
            style={styles.image}
            source={{
                uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
            }} />);
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutLinedButton icon="location" onPress={getLocationHandler}>Locate User</OutLinedButton>
                <OutLinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutLinedButton>
            </View>

        </View>
    );
}
export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 6,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
    }
})