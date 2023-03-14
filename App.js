import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AppContext} from "./config/context";
import {NavigationContainer} from "@react-navigation/native";
import {WelcomeScreen} from "./screens/WelcomeScreen";
import {useCallback, useState} from "react";
import {LoginScreen} from "./screens/LoginScreen";
import {useFonts, Amaranth_400Regular, Amaranth_700Bold_Italic} from '@expo-google-fonts/amaranth';
import * as SplashScreen from 'expo-splash-screen';
import {PlantsScreen} from "./screens/PlantsScreen";
import {styles} from "./config/styles";
import {Button, ImageBackground, TouchableOpacity} from "react-native";
import {SinglePlantScreen} from "./screens/SinglePlantScreen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {

    const [plant, setPlant] = useState({
        name: "",
        species: "",
        added: new Date,
        watering: 0,
        lastWatered: new Date,
    });

    let [fontsLoaded] = useFonts({
        Amaranth_400Regular,
        Amaranth_700Bold_Italic
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
    return (
        <AppContext.Provider value={{plant, setPlant}}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"Plants"}
                                 onLayout={onLayoutRootView()}
                                 screenOptions={{
                                     headerStyle: {
                                         backgroundColor: "#EBEDDC"
                                     },
                                     headerTintColor: "#215A3D",
                                     headerTitleStyle: {
                                         fontFamily: 'Amaranth_700Bold_Italic',
                                     },
                                     contentStyle: styles.screenContainer
                                 }}>
                    <Stack.Screen name={"Welcome"} component={WelcomeScreen}/>
                    <Stack.Screen name={"Plants"} component={PlantsScreen}
                                  options={({navigation}) => ({
                                      headerRight: () => (
                                          <TouchableOpacity
                                              onPress={() => navigation.navigate('SinglePlant')}
                                          >
                                              <ImageBackground source={require('./assets/images/headerAddButton.png')}
                                                               style={{height: 35, width: 35}}/>
                                          </TouchableOpacity>
                                      )
                                  })}/>
                    <Stack.Screen name={"Login"} component={LoginScreen}/>
                    <Stack.Screen name={"SinglePlant"} component={SinglePlantScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    );
}


