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
        marginTop: 10,
        height: 70,
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


});