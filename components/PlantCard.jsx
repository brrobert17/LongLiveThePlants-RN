import {Alert, Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../config/styles";
import {useContext} from "react";
import {AppContext} from "../config/context";

export const PlantCard = ({plant, openSingle}) => {

    const {updatePlant, setPlant} = useContext(AppContext);

    const myDate = new Date(plant.lastWatered);
    myDate.setDate(myDate.getDate() + +plant.watering);

    const handlePress = () => {
        console.log("plantof PlantCard", plant );
        setPlant(plant);
        openSingle();
    }
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

    let imgSrc = plant.img === "" ? require('../assets/images/logo2.png') : {uri: plant.img};


    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.plantCardContainer}>
                <Text style={styles.plantCardText}>
                    Name: "{plant.name}" {'\n'}
                    Species: {plant.species} {'\n'}
                    Date added: {'\n'}
                    {plant.added.toLocaleDateString()} {'\n'}
                    Watering every {plant.watering} days {'\n'}
                    Last time watered: {'\n'}
                    {plant.lastWatered.toLocaleDateString()}
                </Text>
                <Image style={styles.plantCardImage}
                       source={imgSrc}/>
                {(myDate <= new Date()) && (
                    <TouchableOpacity onPress={water}>
                        <Text style={styles.waterAlert}>
                            Please water me!
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>

    )
}