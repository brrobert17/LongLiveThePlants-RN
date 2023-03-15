import {FlatList, ImageBackground, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {PlantCard} from "../components/PlantCard";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {plantsRef} from "../config/firebase";
import { query, orderBy } from "firebase/firestore";

export const PlantsScreen = ({navigation}) => {

    const queryToOrder = query(plantsRef, orderBy("added", "desc"));
    const [value] = useCollectionData(queryToOrder);
    return(
        <View>
            {value?
                (<FlatList data={value}
                              numColumns={2}

                              renderItem={({item}) => <PlantCard plant={item}/>}/>)
            : (<Text>Nope</Text>)}
        </View>
    )
}