import {Image, Text, View} from "react-native";
import {styles} from "../config/styles";

export const PlantCard = ({plant}) => {

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
        </View>
    )
}