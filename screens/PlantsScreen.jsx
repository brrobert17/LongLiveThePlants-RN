import {Button, Dimensions, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {PlantCard} from "../components/PlantCard";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {auth, plantsRef} from "../config/firebase";
import {query, orderBy, where} from "firebase/firestore";
import {styles} from "../config/styles";
import {useAuthState} from "react-firebase-hooks/auth";

export const PlantsScreen = ({navigation}) => {

    const [user] = useAuthState(auth);
    console.log("email:",user.email)

    const queryToOrder = query(plantsRef,
        where("user", "==", user.email));
    const [value] = useCollectionData(queryToOrder);
    const orderedValue = value && value.sort((a, b) => a.added - b.added);
    const toSinglePlantScreen = () => {
        navigation.navigate('SinglePlant')
    }
    return (
        <View>
            {auth.currentUser && (
                <>
                    <View style={{height: 5}}/>
                    <View style={{width: Dimensions.get("window").width}}>
                        <Button onPress={() => {
                            auth.signOut();
                            navigation.navigate("Welcome");
                        }} title={"LOGOUT"} color={"#009657"}/>
                    </View>
                </>
            )}
            {value ?
                (<FlatList data={orderedValue}
                           numColumns={2}
                           renderItem={({item}) => <PlantCard plant={item} openSingle={toSinglePlantScreen}/>}/>)
                : (<Text>Nope</Text>)}
        </View>
    )
}