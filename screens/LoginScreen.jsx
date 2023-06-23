import {Button, Dimensions, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "../config/styles";
import {auth} from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useState} from "react";

export const LoginScreen = ({navigation}) => {

    const [user] = useAuthState(auth);
    const [userCredentials, setUserCredentials] = useState({email: "", password: ""});
    if (user) {
        setTimeout(()=>navigation.navigate("Plants"), 100);
    }
    const logInWithEmail = () => {
        signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password);
        console.log("user credentials: " + userCredentials.email);
    }
    return (
        <View style={styles.container}>
            <View style={{width: Dimensions.get("window").width/1.5}}>
            <TextInput placeholder={"email"}
                       style={styles.textInputSc}
                       onChangeText={(e) => setUserCredentials({...userCredentials, email: e})}>
            </TextInput>
            </View>
            <View style={{width: Dimensions.get("window").width/1.5}}>
            <TextInput placeholder={"password"}
                       style={styles.textInputSc}
                       secureTextEntry={true}
                       onChangeText={(e) => setUserCredentials({...userCredentials, password: e})}>
            </TextInput>
            </View>
            <View style={{height: 5}}/>
            <View style={{width: Dimensions.get("window").width/1.5}}>
                <Button onPress={logInWithEmail} title={"LOGIN"} color={"#009657"}/>
            </View>
        </View>

    )
}