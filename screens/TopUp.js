import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import { Header, Icon } from "react-native-elements";


const width = Dimensions.get("window").width
export class TopUp extends Component {

    tapHere() {
        console.log("pressed tap")
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#F8FFFF' }}>
                <Header
                    containerStyle={styles.header}
                    leftComponent={
                        <Icon
                            name='angle-left'
                            type='font-awesome'
                            onPress={() => this.props.navigation.navigate("Dashboard")}
                        />}
                    centerComponent={{ text: "Top Up", style: { fontFamily: "Raleway-Bold", color: "#a4a4a4", fontWeight: "bold", fontSize: 18 } }}
                />

                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontFamily: "Raleway-SemiBold", color: "#a4a4a4", width: width - 50, fontSize: 16, textAlign: "center", marginTop: 15 }}>
                        Enter the amount you want to fund your therapy box account with
                    </Text>

                    <TextInput
                        placeholder="Amount"
                        keyboardType="numeric"
                        placeholderTextColor="#a4a4a4"
                        style={{ height: 50, width: 200, marginTop: 50, borderBottomColor: '#a4a4a4', color: "#a4a4a4", borderBottomWidth: 2, fontFamily: "Raleway-Bold", fontSize: 20 }} />
                </View>

                <View style={{ flex: 3, alignItems: "center", marginTop: 50 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate("Register")}
                    >
                        <Text style={styles.textButton}>Proceed</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default TopUp

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F8FFFF',
        justifyContent: 'space-around',
        borderBottomColor: '#F8FFFF',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#FFAC4A",
        padding: 10,
        width: width / 2,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
    textButton: {
        color: "white",
        fontFamily: "Raleway-Bold",
        fontSize: 18
    }
})