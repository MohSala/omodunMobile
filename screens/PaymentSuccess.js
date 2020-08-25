import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'

const width = Dimensions.get("window").width

export class PaymentSuccess extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={{ width: 100, height: 100, alignSelf: "center", marginTop: 40 }} source={require("../assets/omodun1.png")} />
                <View style={{ flex: 1, alignItems: "center", }}>
                    <Image style={{ width: 250, height: 250 }} source={require("../assets/icons/rocket.png")} />
                    <Text
                        style={{
                            textAlign: "center",
                            marginTop: 30,
                            fontFamily: "Raleway-Bold",
                            fontSize: 20,
                            color: "#A4A4A5",
                            width: 300,
                            lineHeight: 30
                        }}>
                        Alright! Your order is on its way to you! We would contact you soon to know your availability to receive your order!</Text>
                </View>

                <View style={{ justifyContent: "flex-end", alignItems: "center", marginBottom: 50 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.props.navigation.navigate('Dashboard')
                        }}
                    >
                        <Text style={styles.textButton}>GO TO DASHBOARD</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default PaymentSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FFFF',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#82D3A3",
        padding: 10,
        width: width - 50,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15,
        position: "absolute", bottom: 0
    },
    textButton: {
        color: "white",
        fontFamily: "Raleway-Bold",
        fontSize: 14
    },

})