import {Text, TextInput, TouchableOpacity, View} from "react-native";
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
            <TouchableOpacity style={styles.touchableOpacity} onPress={logInWithEmail}>
                <Text>Log In</Text>
            </TouchableOpacity>
        </View>

    )
}