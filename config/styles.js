import {Dimensions, StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#EBEDDC",
    },
    screenContainer: {
        backgroundColor: "#EBEDDC",
    },
    plantCardContainer: {
        margin: 13.5,
        alignItems: "center",
        width: Dimensions.get("window").width / 2.3,
        height: Dimensions.get("window").height / 3,
        borderRadius: 10,
        backgroundColor: '#215A3D',

    },
    plantCardText: {
        marginTop: 10,
        fontFamily: 'Amaranth_400Regular',
        fontSize: 15,
        color: '#EBEDDC',
        lineHeight: 22
    },
    plantCardImage: {
        marginTop: 6,
        height: 75,
        width: 65,
        resizeMode: 'contain',
    },
    text: {
        fontFamily: 'Amaranth_700Bold_Italic',
        fontSize: 25,
        color: '#215A3D',
        letterSpacing: 5
    },
    label: {
        fontFamily: 'Amaranth_700Bold_Italic',
        fontSize: 15,
        color: '#215A3D',
    },
    textInput: {
        fontFamily: 'Amaranth_700Bold_Italic',
        fontSize: 25,
        color: '#215A3D',
        letterSpacing: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        margin: 1,
        marginBottom: 10,
        padding: 2,
        borderColor: '#215A3D'
    },
    textInputSc: {
        fontFamily: 'Amaranth_700Bold_Italic',
        fontSize: 25,
        color: '#215A3D',
        letterSpacing: 3,
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 5,
        margin: 1,
        marginBottom: 10,
        padding: 2,
        borderColor: '#215A3D'
    },
    waterAlert: {
        fontFamily: 'Amaranth_400Regular',
        padding: 2,
        marginTop: 7,
        borderRadius: 5,
        backgroundColor: '#dddf63',
        letterSpacing: 4
    },

    headerButton: {
        height: 20,
        width: 20,
        backgroundColor: '#215A3D'
    },
    touchableOpacity: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        width: Dimensions.get('window').width,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderWidth: 4,
        borderRadius: 6,
        borderStyle: 'solid',
        borderColor: '#009657'

    },
    logo: {
        height: 150,
        resizeMode: 'contain',
        marginBottom: 15
    },
    imagePreview:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignItems:'center',
        backgroundColor: "#b01179"
    },
    image:{
        marginTop: 10,
        alignSelf: 'center',
        width: Dimensions.get('window').width,
        height: 240,
        resizeMode: 'contain'

    },
    myButton: {
        backgroundColor: "#009657",
        marginBottom: 15
    }


});
