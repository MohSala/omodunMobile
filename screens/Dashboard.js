import React, { Component } from 'react'
import {
    AsyncStorage, Text,
    View,
    Dimensions, StyleSheet, ImageBackground, Image, SafeAreaView, ScrollView, Button
} from 'react-native'
import { Header, Icon, Card } from "react-native-elements";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
import image from "../assets/splashScreen.png"
import HeaderComponent from "../components/Header"
import { TouchableOpacity } from 'react-native-gesture-handler';

export class Dashboard extends Component {
    render() {
        return (
            // <SafeAreaView style={{
            //     flex: 1
            // }}>
            <ScrollView style={{ backgroundColor: "#FFAC4A" }}>
                {/* <ImageBackground source={image} style={styles.image}> */}
                <Header
                    containerStyle={styles.header}
                    leftComponent={
                        <Icon
                            name='user-circle-o'
                            type='font-awesome'
                            color="white"
                            // size="30"
                            onPress={() => this.props.navigation.navigate("Landing")}
                        />}
                    centerComponent={<HeaderComponent />}
                    rightComponent={
                        <Icon
                            name='bell-o'
                            type='font-awesome'
                            color="white"
                            // size="30"
                            onPress={() => this.props.navigation.navigate("Landing")}
                        />
                    }
                />

                <Card containerStyle={{ borderRadius: 10, shadowRadius: 25 }}>
                    <Text style={{ fontFamily: "Raleway-SemiBold", fontSize: 18, fontStyle: "normal", color: "#000" }}>Quick Actions</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('BookMassage')
                        }}>
                            <Card containerStyle={{ borderColor: "#FFAC4A", borderRadius: 10 }}>
                                <Image source={require("../assets/icons/footIcon.png")} style={styles.cardImage} />
                                <Text style={{ fontFamily: "Raleway-Regular", color: 'black', fontSize: 10, fontStyle: "normal", textAlign: "left" }}>Book Massage</Text>

                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('BookMani')
                        }}>
                            <Card containerStyle={{ borderColor: "#FFAC4A", borderRadius: 10 }}>
                                <Image source={require("../assets/icons/pediIcon.png")} style={styles.cardImage} />
                                <Text style={{ fontFamily: "Raleway-Regular", color: 'black', fontSize: 10, fontStyle: "normal", textAlign: "left" }}>Book Mani/Pedi</Text>
                            </Card>
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('BookHairDay')
                        }}>
                            <Card containerStyle={{ borderColor: "#FFAC4A", borderRadius: 10 }}>
                                <Image source={require("../assets/icons/hairDayicon.png")} style={styles.cardImage} />
                                <Text style={{ fontFamily: "Raleway-Regular", color: 'black', fontSize: 10, fontStyle: "normal", textAlign: "left" }}>Book Hair-Day</Text>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('TopUp')
                        }}>
                            <Card containerStyle={{ borderColor: "#FFAC4A", borderRadius: 10 }}>
                                <Image source={require("../assets/icons/breadIcon.png")} style={styles.cardImage} />
                                <Text style={{ fontFamily: "Raleway-Regular", color: 'black', fontSize: 10, fontStyle: "normal", textAlign: "left" }}>Top-Up Account</Text>
                            </Card>
                        </TouchableOpacity>
                    </View>
                </Card>

                <Card containerStyle={{ borderRadius: 10 }}>
                    <Text style={{ fontFamily: "Raleway-SemiBold", fontSize: 18, fontStyle: "normal", fontWeight: "600", color: "#000", lineHeight: 19 }}>Latest Activities</Text>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontFamily: "Raleway-Regular", fontSize: 18, fontStyle: "normal", fontWeight: "600", color: "#000", lineHeight: 19 }}>Nothing Yet!</Text>

                    </View>
                </Card>
                {/* </ImageBackground> */}

            </ScrollView>
            // </SafeAreaView>
        )
    }
}

export default Dashboard

const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
        justifyContent: 'space-around',
        borderBottomColor: '#FFAC4A',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        marginTop: 20,
        width: SCREEN_WIDTH - 50,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        // justifyContent: "center"
    },
    cardImage: {
        width: 20,
        height: 20
    },
    textButton: {
        color: "#000"
    }
})