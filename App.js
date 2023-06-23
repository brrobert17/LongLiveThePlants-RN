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
import {addDoc, doc, setDoc, deleteDoc} from "firebase/firestore";
import {auth, db, plantsRefNoConverter, storage} from "./config/firebase";
import {RegisterScreen} from "./screens/RegisterScreen";
import {PlantOnTheMap} from "./screens/PlantOnTheMap";
import {ShowPlantOnTheMap} from "./screens/ShowPlantOnTheMap";
import {deleteObject, ref} from "firebase/storage";
import {useAuthState} from "react-firebase-hooks/auth";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {

    const newPlant = {
        name: "",
        species: "",
        added: new Date,
        watering: "",
        lastWatered: new Date,
        img: "",
        latitude: "",
        longitude: ""
    }

    const [plant, setPlant] = useState(newPlant);
    const [user] = useAuthState(auth);
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
            if (!plant.id) {
                console.log("saving new")
                const upToDatePlant = {
                    ...plant, img: url ? url : "", user: user.email
                };
                console.log("saving... " + upToDatePlant);
                const docRef = await addDoc(plantsRefNoConverter, upToDatePlant);
                console.log("doc written with ID: ", docRef.id);
                setPlant(newPlant);
            } else {
                const docRef = await doc(db, "plants", plant.id);
                if (url && plant.img !== url) {
                    console.log("saving existing, img update")
                    const upToDatePlant = {
                        ...plant, img: url
                    };
                    setDoc(docRef, upToDatePlant).then(() => {
                        console.log("updated", upToDatePlant);
                    })
                    if (plant.img) {
                        const storageRef = ref(storage, plant.img);
                        deleteObject(storageRef).then(() => {
                            console.log("success deleting image");
                        });
                    }
                    setPlant(newPlant);
                } else {
                    console.log("saving existing:",plant.user)
                    setDoc(docRef, plant).then(() => {
                        console.log("updated", plant);
                    })
                    setPlant(newPlant);
                }

            }

        } catch (e) {
            console.error("error in saving: ", e)
        }
    };

    const updatePlant = async (plantToUpdate) => {
        const c2 = {
            ...plantToUpdate,
            lastWatered: new Date(),
            added: new Date(plantToUpdate.added),
        }
        const docRef = await doc(db, "plants", plantToUpdate.id);
        await setDoc(docRef, c2).then(() => {
            console.log("updated", c2);
        }).catch(error => {
            console.error(error);
        });
    }
    const updatePlantLocation = async (plantToUpdate, coordinates) => {
        const {latitude, longitude} = coordinates;
        const docRef = await doc(db, "plants", plantToUpdate.id);
        await setDoc(docRef, {...plantToUpdate, latitude: latitude, longitude: longitude}).then(() => {
            console.log("updated", {...plantToUpdate, latitude: latitude, longitude: longitude});
        }).catch(error => {
            console.error(error);
        });
    }

    const deletePlant = async (plant) => {
        const docRef = await doc(db, "plants", plant.id);
        deleteDoc(docRef).then(() => console.log("deleted plant: ", plant.id)).catch((e) => console.log(e))
        const storageRef = ref(storage, plant.img);
        deleteObject(storageRef).then(() => {
            console.log("success deleting image");
        }).catch((error) => {
            console.log("error deleting image" + error);
        });
    }

    return (
        <AppContext.Provider value={{plant, setPlant, savePlant, updatePlant, updatePlantLocation, deletePlant}}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"Welcome"}
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
                                              onPress={() => {
                                                  setPlant(newPlant);
                                                  navigation.navigate('SinglePlant')
                                              }}
                                          >
                                              <ImageBackground source={require('./assets/images/headerAddButton.png')}
                                                               style={{height: 35, width: 35}}/>
                                          </TouchableOpacity>
                                      )
                                  })}/>
                    <Stack.Screen name={"Login"} component={LoginScreen}/>
                    <Stack.Screen name={"Register"} component={RegisterScreen}/>
                    <Stack.Screen name={"SinglePlant"} component={SinglePlantScreen}/>
                    <Stack.Screen name={"PlantOnTheMap"} component={PlantOnTheMap}/>
                    <Stack.Screen name={"ShowPlantOnTheMap"} component={ShowPlantOnTheMap}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    );
}


