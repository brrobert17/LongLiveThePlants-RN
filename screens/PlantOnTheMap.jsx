import {Button, Text, TouchableOpacity, View} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {useContext, useEffect, useState} from "react";
import * as Location from 'expo-location';
import {styles} from "../config/styles";
import {AppContext} from "../config/context";

export const PlantOnTheMap = ({navigation}) => {
    const {updatePlantLocation, plant, setPlant} = useContext(AppContext);
    const [locationResult, setLocation] = useState(null);
    const [mapRegion, setRegion] = useState(null);
    const [hasLocationPermissions, setLocationPermission] = useState(false);
    const [isMapReady, setMapReady] = useState(false);

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestBackgroundPermissionsAsync();
            if (status !== 'granted') {
                setLocation('Permission to access location was denied');
            } else {
                setLocationPermission(true);
            }

            let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            setLocation({ latitude, longitude });

            setRegion({ latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
        };

        getLocation();
    }, []);

    const handleMapReady = () => {
        setMapReady(true);
    };

    const handleRegionChange = (region) => {
        if (isMapReady) {
            setRegion(region);
        }
    };

    const handleMarkerPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setLocation(coordinate);
    };

    const handleSaveLocation = () => {
        console.log("Marker coordinates:", locationResult);
        setPlant({...plant, latitude: locationResult.latitude, longitude: locationResult.longitude});
        navigation.navigate('SinglePlant');
    }

    if (locationResult === null) {
        return <Text>Finding your current location...</Text>;
    }

    if (hasLocationPermissions === false) {
        return <Text>Location permissions are not granted.</Text>;
    }

    if (mapRegion === null) {
        return <Text>Map region doesn't exist.</Text>;
    }

    return (
        <>
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                region={mapRegion}
                onRegionChangeComplete={handleRegionChange}
                onMapReady={handleMapReady}
                showsUserLocation={true}
                onPress={handleMarkerPress}
            >
                {locationResult && (
                    <Marker
                        coordinate={locationResult}
                    />
                )}
            </MapView>
            <View style={{height: 10}}/>
            <Button onPress={handleSaveLocation} title={"Save Location"} color={"#009657"}/>
            <View style={{height: 10}}/>
        </>

    );
};





