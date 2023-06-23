import {Button, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../config/context";
import {styles} from "../config/styles";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import {auth, storage} from "../config/firebase";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {giveCurrentDateTime} from "../assets/utils";
import {ShowPlantOnTheMap} from "./ShowPlantOnTheMap";
import {Camera} from 'expo-camera';
import {useAuthState} from "react-firebase-hooks/auth";

export const SinglePlantScreen = ({navigation}) => {
    const {plant, setPlant, savePlant, deletePlant} = useContext(AppContext);
    const dateNow = new Date();
    const [dateType, setDateType] = useState('')
    const [show, setShow] = useState(false);
    //image
    const [url, setUrl] = useState();
    const [image, setImage] = useState([]);
    const [imagePath, setImagePath] = useState();
    const cameraRef = useRef(null);
    const [isImagePopupVisible, setImagePopupVisible] = useState(false);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [user] = useAuthState(auth);


    const openImagePicker = () => {
        setImagePopupVisible(true);
    };

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

    useEffect(() => {
        const func = async () => {
            if (plant.img !== "") {
                const reference = ref(storage, plant.img);
                await getDownloadURL(reference).then((res) => {
                    setUrl(res);
                });
            }
        }
        func();
    }, [])

    const getImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true
        });
        setImagePath(result.assets[0].uri)
        setImage(result);
        setImagePopupVisible(false);
    }

    const uploadImage = async () => {
        const dateTime = giveCurrentDateTime();
        const res = await fetch(imagePath);
        const blob = await res.blob();
        const imageStoragePath = `images/img${dateTime}`;
        const storageRef = ref(storage, imageStoragePath);
        const snapshot = await uploadBytes(storageRef, blob).catch((error) => {
            console.log("error uploading" + error);
        });
        const imgDownloadURl = await getDownloadURL(snapshot.ref);
        setPlant({...plant, img: imgDownloadURl});
        console.log("success uploading image: " + imgDownloadURl);
        return imgDownloadURl;
    };

    let imagePreview;
    if (imagePath) {
        imagePreview = <Image style={styles.image} source={{uri: imagePath}}/>;
    } else {
        imagePreview = <Image style={styles.image} source={{uri: url}}/>;
    }

    const handleCameraCapture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setImagePath(photo.uri);
            setImage(photo);
        }
        setImagePopupVisible(false);
    };


    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{margin: 10}}>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={styles.textInput} defaultValue={plant.name}
                           onChangeText={(text => setPlant({...plant, name: text}))}/>
                <Text style={styles.label}>Species:</Text>
                <TextInput style={styles.textInput} defaultValue={plant.species}
                           onChangeText={(text => setPlant({...plant, species: text}))}/>
                <Text style={styles.label}>Watering (days):</Text>
                <TextInput style={styles.textInput} keyboardType={'numeric'}
                           defaultValue={plant.watering.toString()}
                           onChangeText={(text => setPlant({...plant, watering: +text}))}/>
                <Text style={styles.label}>Added:</Text>
                <TouchableOpacity onPress={() => showDatepicker('added')}>
                    <Text style={styles.textInput}>
                        {plant.added.toLocaleDateString()}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.label}>Last time watered:</Text>
                <TouchableOpacity onPress={() => showDatepicker('lastWatered')}>
                    <Text style={styles.textInput}>
                        {plant.lastWatered.toLocaleDateString()}
                    </Text>
                </TouchableOpacity>
                {show && (
                    <RNDateTimePicker value={dateNow} onChange={onChange}/>
                )}

                <Button onPress={openImagePicker} title={"set image"} color={"#009657"}/>
                {plant.latitude && (
                    <>
                        <View style={{height: 10}}/>
                        <Button onPress={() => navigation.navigate('ShowPlantOnTheMap')} title={"Current Location"}
                                color={"#009657"}/>
                    </>
                )}
                <View style={{height: 10}}/>
                <Button onPress={() => navigation.navigate('PlantOnTheMap')} title={"Set Location"} color={"#009657"}/>
                <View style={{marginLeft: 10}}>
                    {imagePreview}
                </View>
                <View style={{height: 10}}/>
                <Button title={"save"} onPress={async () => {
                    if(!user) {
                        alert("please login again!");
                        setTimeout(()=> navigation.navigate("Login"), 1000);
                    }
                    if (plant.name === '' || plant.watering === 0) {
                        alert("please fill out NAME and WATERING fields")
                    } else {
                        if (imagePath) {
                            const downloadUrl = await uploadImage();
                            savePlant(downloadUrl);
                        } else {
                            savePlant();
                        }
                        navigation.navigate('Plants');
                    }
                }}/>
                {plant.id && (
                    <>
                        <View style={{height: 10}}/>
                        <Button onPress={() => {
                            deletePlant(plant);
                            setTimeout(() => navigation.navigate('Plants'), 1000)
                        }} title={"Delete"} color={"#c80110"}/>
                    </>
                )}
            </View>
            {isImagePopupVisible && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 10,
                            width: '90%',
                            alignItems: 'center',
                        }}
                    >
                        <Camera style={{height: 540, width: 360}} ref={cameraRef}/>
                        <View style={{height: 5}}/>
                        <Button onPress={handleCameraCapture} title={"Capture"} color={"#c80110"}/>
                        <View style={{height: 10}}/>
                        <Button onPress={getImage} title={"choose from gallery"} color={"#009657"}/>
                    </View>
                </View>
            )}
        </ScrollView>
    )
}