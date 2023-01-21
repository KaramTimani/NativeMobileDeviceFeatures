import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';
import IconButton from "./UI/IconButton";
import {Colors} from "./constants/colors";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer >
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 }

        }}>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}

            options={({ navigation }) => ({
              headerRight: ({ tintColor }) => (<IconButton
                icon="add"
                color={tintColor} size={24}
                onPress={() => navigation.navigate("AddPlace")}
              />
              ),
              title: "Your Favorite Places",
              headerTitleAlign: "center"
            })}
          />
          <Stack.Screen name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a new Place",
              headerTitleAlign: "center"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
