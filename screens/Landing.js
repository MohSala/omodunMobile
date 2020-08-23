import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native'

const { width, height } = Dimensions.get("window")

const Onboarding = ({ navigation }) => {
    useEffect(() => {
        async function fetData() {
            const token = await AsyncStorage.getItem("token");
            const mobile = await AsyncStorage.getItem("mobile");
            if (token) {
                await navigation.navigate("Login", {
                    mobile: mobile
                });
            }
        }
        fetData();
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../assets/farmerImage.png")} style={styles.headerImage} />
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.subtitle}>Let's Farm Fresh Together!</Text>
                <Text style={styles.description}>
                    Omodun Farms has the best farm freshed produce you can find in the market, ranging from vegetables to fruits and livestock!
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.navigate("Register")
                }}>
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, fontFamily: "Raleway-Bold" }}>GET STARTED</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Onboarding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4FFFE"
    },
    button: {
        backgroundColor: "#82D3A3",
        borderRadius: 15,
        padding: 15,
        alignItems: "center",
        width: width - 100,
        marginBottom: 80
    },
    imageContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-start",
    },
    headerImage: {
        height: height / 2
    },
    bottomContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    subtitle: {
        fontSize: 24,
        fontWeight: "bold",
        textDecorationLine: "underline",
        color: "#A9A9A9",
        textAlign: "center",
        fontFamily: "Raleway-Bold"
    },
    description: {
        color: "#A9A9A9",
        marginBottom: 40,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "500",
        lineHeight: 25,
        padding: 20,
        fontFamily: "Raleway-SemiBold"
    }
})
