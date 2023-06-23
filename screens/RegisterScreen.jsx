import {Button, Dimensions, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "../config/styles";
import {auth} from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {useState} from "react";

export const RegisterScreen = ({navigation}) => {

    const [user] = useAuthState(auth);
    const [userCredentials, setUserCredentials] = useState({email: "", password: ""});
    if (user) {
        auth.signOut();
        setTimeout(() => navigation.navigate("Welcome"), 1000);
    }
    const registerWithEmail = () => {
        createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password
        ).then((userCredential) => {
            console.log("user credentials: " + userCredential.user.email);
        }).catch((error) => {
            console.log(error);
        });
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
                <Button onPress={registerWithEmail} title={"REGISTER"} color={"#009657"}/>
            </View>
        </View>

    )
}