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
import {addDoc, doc, setDoc} from "firebase/firestore";
import {db, plantsRefNoConverter} from "./config/firebase";
import {RegisterScreen} from "./screens/RegisterScreen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {

    const newPlant = {
        name: "",
        species: "",
        added: new Date,
        watering: "",
        lastWatered: new Date,
        img: ""
    }

    const [plant, setPlant] = useState(newPlant);

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

    const savePlant = async (url) => {
        try {
            const upToDatePlant = {
                ...plant, img: url ? url : ""};
            console.log("saving... "+upToDatePlant);
            const docRef = await addDoc(plantsRefNoConverter, upToDatePlant);
            console.log("doc written with ID: ", docRef.id);
            setPlant(newPlant);
        } catch (e) {
            console.error("error adding doc: ", e)
        }
    };

    const updatePlant = async (plantToUpdate) => {
        const c2 ={
            lastWatered: new Date(),
            added: new Date(plantToUpdate.added.split('/').reverse().join('-')),
            watering: plantToUpdate.watering,
            name: plantToUpdate.name,
            species: plantToUpdate.species,
            img: plantToUpdate.img
        }
        const docRef = await doc(db, "plants", plantToUpdate.id);
        await setDoc(docRef, c2).then(()=> {
            console.log("updated", c2);
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <AppContext.Provider value={{plant, setPlant, savePlant, updatePlant}}>
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
                    <Stack.Screen name={"Register"} component={RegisterScreen}/>
                    <Stack.Screen name={"SinglePlant"} component={SinglePlantScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    );
}


