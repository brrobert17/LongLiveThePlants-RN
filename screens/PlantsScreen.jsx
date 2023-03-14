import {FlatList, ImageBackground, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {PlantCard} from "../components/PlantCard";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {plantsRef} from "../config/firebase";

export const PlantsScreen = ({navigation}) => {

    const [value] = useCollectionData(plantsRef);
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