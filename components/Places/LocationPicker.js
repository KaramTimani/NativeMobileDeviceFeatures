
import { View, StyleSheet } from "react-native";
import OutLinedButton from "../../UI/OutLinedButton";
import {Colors} from "../../constants/colors";

function LocationPicker() {
    function getLocationHandler() {

    }
    function pickOnMapHandler() {

    }

    return (
        <View>
            <View style={styles.mapPreview}></View>
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
    }
})