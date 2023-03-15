import {Alert, Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../config/styles";
import {useContext} from "react";
import {AppContext} from "../config/context";

export const PlantCard = ({plant}) => {

    const { updatePlant } = useContext(AppContext);
    const myDate = new Date(plant.lastWatered.split('/').reverse().join('-'));
    myDate.setDate(myDate.getDate() + +plant.watering);

    const water = () => {
        Alert.alert('Confirmation', 'Did you really water the plant?', [
            {
                text: 'No',
                onPress: () => alert("Please water the plant!"),
                style: 'cancel',
            },
            {text: 'Yes', onPress: () => updatePlant(plant)},
        ]);
    }


    return (
        <View style={styles.plantCardContainer}>
            <Text style={styles.plantCardText}>
                Name: "{plant.name}" {'\n'}
                Species: {plant.species} {'\n'}
                Date added: {'\n'}
                {plant.added} {'\n'}
                Watering every {plant.watering} days {'\n'}
                Last time watered: {'\n'}
                {plant.lastWatered}
            </Text>
            <Image style={styles.plantCardImage} source={require('../assets/images/logo2.png')}/>
            {(myDate.getDate() <= new Date().getDate()) && (
                <TouchableOpacity onPress={water}>
                    <Text style={styles.waterAlert}>
                        Please water me!
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    )
}