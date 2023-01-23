import Map from "./screens/Map";
import IconButton from "./UI/IconButton";
import AddPlace from './screens/AddPlace';
import AppLoading from 'expo-app-loading';
import AllPlaces from './screens/AllPlaces';

import { init } from './util/database';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from "./constants/colors";
import { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaceDetails from "./screens/PlaceDetails";


const Stack = createNativeStackNavigator();
export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init().then(() => {
      setDbInitialized(true);
    }).catch(err => { console.log(err) });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }
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
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name='PlaceDetails' component={PlaceDetails} 
          options={{
            title:'Loading Place...'
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
