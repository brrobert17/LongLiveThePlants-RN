import {Text, TextInput, TouchableOpacity, View} from "react-native";
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
        <View>
            <TextInput placeholder={"email"}
                       style={{fontSize: 25}}
                       onChangeText={(e) => setUserCredentials({...userCredentials, email: e})}>
            </TextInput>
            <TextInput placeholder={"password"}
                       style={{fontSize: 25}}
                       secureTextEntry={true}
                       onChangeText={(e) => setUserCredentials({...userCredentials, password: e})}>
            </TextInput>
            <TouchableOpacity style={styles.touchableOpacity} onPress={registerWithEmail}>
                <Text>Register</Text>
            </TouchableOpacity>
        </View>

    )
}