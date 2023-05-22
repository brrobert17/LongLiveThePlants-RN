import {Button, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../config/context";
import {styles} from "../config/styles";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import {storage} from "../config/firebase";
import {deleteObject, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {giveCurrentDateTime} from "../assets/utils";

export const SinglePlantScreen = ({navigation}) => {
    const {plant, setPlant, savePlant} = useContext(AppContext);
    const dateNow = new Date();
    const [dateType, setDateType] = useState('')
    const [show, setShow] = useState(false);
    //image
    const [url, setUrl] = useState();
    const [image, setImage] = useState([]);
    const [imagePath, setImagePath] = useState();

    // const updateImageDownloadUrl = (downloadUrl) => {
    //     setPlant((prevPlant)=> {
    //         return {...prevPlant, img: downloadUrl};
    //     })
    // };
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
                    setUrl(res)
                    console.log(res)
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

    const deleteImage = () => {

        const storageRef = ref(storage, "");
        deleteObject(storageRef).then(() => {
            console.log("success deleting");
        }).catch((error) => {
            console.log("error deleting" + error);
        });
    }
    let imagePreview;
    if (imagePath) {
        imagePreview = <Image style={styles.image} source={{uri: imagePath}}/>;
    } else {
        imagePreview = <Image style={styles.image} source={{uri: url}}/>;
    }

    return (
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
            <Button title={"save"} onPress={async () => {
                if (plant.name === '' || plant.watering === 0) {
                    alert("please fill out NAME and WATERING fields")
                } else {
                    if(imagePath) {
                        const downloadUrl = await uploadImage();
                        savePlant(downloadUrl);
                    }
                    else {savePlant();}
                    navigation.navigate('Plants');
                }
            }}/>
            <TouchableOpacity style={styles.touchableOpacity} onPress={getImage}>
                <Text>Choose image</Text>
            </TouchableOpacity>
            <View style={{height: 30, width: 10}}>
                {imagePreview}
            </View>
        </View>
    )
}