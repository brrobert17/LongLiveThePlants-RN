import {Button, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useContext, useState} from "react";
import {AppContext} from "../config/context";
import {styles} from "../config/styles";
import RNDateTimePicker from "@react-native-community/datetimepicker";


export const SinglePlantScreen = ({navigation}) => {
    const {plant, setPlant} = useContext(AppContext);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        setShow(false);
        setDate(selectedDate);
        setPlant({...plant, added: selectedDate})
    };

    const showDatepicker = () => {
        setShow(!show);
    };

    return (
        <View style={{margin: 10}}>
            <Text style={styles.label}>Name:</Text>
            <TextInput style={styles.textInput} onChangeText={(text => setPlant({...plant, name: text}))}/>
            <Text style={styles.label}>Species:</Text>
            <TextInput style={styles.textInput} onChangeText={(text => setPlant({...plant, species: text}))}/>
            <Text style={styles.label}>Watering (days):</Text>
            <TextInput style={styles.textInput} keyboardType={'numeric'}
                       onChangeText={(text => setPlant({...plant, watering: text}))}/>
            <Text style={styles.label}>Last time watered:</Text>
            <TouchableOpacity onPress={showDatepicker}>
                <Text style={styles.textInput}>
                    {date.toLocaleDateString()}
                </Text>
            </TouchableOpacity>
            {show && (
                <RNDateTimePicker value={date} onDateChange={onChange} />
            )}


            {/*<Pressable onPress={showDatePicker}>*/}
            {/*    <TextInput style={styles.textInput} onChangeText={(text => setPlant({...plant, name: text}))}/>*/}
            {/*</Pressable>*/}
            {/*<TextInput>*/}
            {/*    Species:*/}
            {/*</TextInput>*/}
            {/*<TextInput>*/}
            {/*    Watering (days):*/}
            {/*</TextInput>*/}
            {/*<TextInput>*/}
            {/*    Last time watered:*/}
            {/*</TextInput>*/}
            <Button title={"save"} onPress={() =>
            {
                setPlant({...plant, added: date})
                console.log(plant)
            }}/>

        </View>
    )
}