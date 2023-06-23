import {Button, Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../config/styles";

export const WelcomeScreen = ({navigation}) => {
    //setTimeout(() => navigation.navigate("Login"), 3000);
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/images/logo2.png")}/>
            <Text style={styles.text}>Long Live The Plants</Text>
            <View style={{width: 300}}>
                <View style={{height: 15}}/>
                <Button onPress={()=> navigation.navigate('Login')} title={"LOGIN"} color={"#009657"}/>
                <View style={{height: 15}}/>
                <Button onPress={()=> navigation.navigate('Register')} title={"REGISTER"} color={"#009657"}/>
            </View>

            {/*<TouchableOpacity style={styles.touchableOpacity} onPress={()=> navigation.navigate("Login")}>*/}
            {/*    <Text>Login</Text>*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity style={styles.touchableOpacity} onPress={()=> navigation.navigate("Register")}>*/}
            {/*    <Text>Register</Text>*/}
            {/*</TouchableOpacity>*/}
        </View>
    )
}