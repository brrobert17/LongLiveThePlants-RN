import {Button, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useContext, useState} from "react";
import {AppContext} from "../config/context";
import {styles} from "../config/styles";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {addDoc, collection, doc} from "firebase/firestore";
import {db, plantsRef, plantsRefNoConverter} from "../config/firebase";


export const SinglePlantScreen = ({navigation}) => {
    const {plant, setPlant, savePlant} = useContext(AppContext);
    const dateNow = new Date();
    const [dateType, setDateType] = useState('')
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        setShow(false);
        if (dateType === 'lastWatered') {
            setPlant({...plant, lastWatered: selectedDate})
        }
        if (dateType === 'added') {
            setPlant({...plant, added: selectedDate})
        }
    };

    const showDatepicker = (dateType) => {
        setDateType(dateType)
        setShow(true);
    };

    return (
        <View style={{margin: 10}}>
            <Text style={styles.label}>Name:</Text>
            <TextInput style={styles.textInput} defaultValue={plant.name} onChangeText={(text => setPlant({...plant, name: text}))}/>
            <Text style={styles.label}>Species:</Text>
            <TextInput style={styles.textInput} defaultValue={plant.species} onChangeText={(text => setPlant({...plant, species: text}))}/>
            <Text style={styles.label}>Watering (days):</Text>
            <TextInput style={styles.textInput} keyboardType={'numeric'}
                       defaultValue={plant.watering.toString()}
                       onChangeText={(text => setPlant({...plant, watering: +text}))}/>
            <Text style={styles.label}>Added:</Text>
            <TouchableOpacity onPress={()=>showDatepicker('added')}>
                <Text style={styles.textInput}>
                    {plant.added.toLocaleDateString()}
                </Text>
            </TouchableOpacity>
            <Text style={styles.label}>Last time watered:</Text>
            <TouchableOpacity onPress={()=>showDatepicker('lastWatered')}>
                <Text style={styles.textInput}>
                    {plant.lastWatered.toLocaleDateString()}
                </Text>
            </TouchableOpacity>
            {show && (
                <RNDateTimePicker value={dateNow} onChange={onChange}/>
            )}
            <Button title={"save"} onPress={() =>
            {
                if(plant.name ==='' || plant.watering===0) {
                    alert("please fill out NAME and WATERING fields")
                } else {
                    console.log(plant);
                    savePlant();
                    navigation.navigate('Plants');
                }
            }}/>
        </View>
    )
}