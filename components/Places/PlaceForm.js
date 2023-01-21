import { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput } from "react-native";

import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
function PlaceForm() {
    const [enteredTitle, setEnteredTitle] = useState('');
    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);

    }
    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput onChangeText={changeTitleHandler} value={enteredTitle} style={styles.input} />
            </View>
            <ImagePicker />
            <LocationPicker/>
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
        borderRadius:6,
        color:Colors.gray700

    }
})