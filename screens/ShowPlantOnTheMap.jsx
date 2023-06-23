import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {useContext, useEffect, useState} from "react";
import * as Location from 'expo-location';
import {Text} from 'react-native'
import {AppContext} from "../config/context";

export const ShowPlantOnTheMap = () => {

    const {plant} = useContext(AppContext);

    const [hasLocationPermissions, setLocationPermission] = useState(false);
    const [locationResult, setLocation] = useState(null);
    const [isMapReady, setMapReady] = useState(false);



    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestBackgroundPermissionsAsync();
            if (status !== 'granted') {

            } else {
                setLocationPermission(true);
            }
            let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            setLocation({ latitude, longitude });

        };

        getLocation();
    }, []);

    const handleMapReady = () => {
        setMapReady(true);
    };


    if (hasLocationPermissions === false) {
        return <Text>Location permissions are not granted.</Text>;
    }

    const coordinatesDoc = {
        latitude: 55.70960197923538,
        longitude: 12.530555315315723
    }

    if(plant.latitude && plant.longitude) {
        coordinatesDoc.latitude = plant.latitude;
        coordinatesDoc.longitude = plant.longitude;
    }


    return (
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                region={{
                    latitude: coordinatesDoc.latitude,
                    longitude: coordinatesDoc.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                onMapReady={handleMapReady}
                showsUserLocation={true}
            >
                {plant.latitude && (
                    <Marker
                        coordinate={coordinatesDoc}
                    />
                )
                }
            </MapView>

    );
};





