import { useCallback, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput } from "react-native";
import { Place } from '../../models/place';
import { Colors } from "../../constants/colors";
import RButton from "../../UI/RButton";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";


function PlaceForm({ onCreatePlace }) {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);

    }
    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri);

    }
    const pickedLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, []);
    
    function savePlaceHandler() {
        const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
        onCreatePlace(placeData);
    }
    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput onChangeText={changeTitleHandler} value={enteredTitle} style={styles.input} />
            </View>
            <ImagePicker onTakeImage={takeImageHandler} />
            <LocationPicker onPickLocation={pickedLocationHandler} />
            <RButton onPress={savePlaceHandler}>Add Place</RButton>
        </ScrollView>
    );
}


export default PlaceForm;
const styles = StyleSheet.create({

    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.primary500,

    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 18,
        backgroundColor: Colors.primary100,
        borderRadius: 6,
        color: Colors.gray700

    }
})