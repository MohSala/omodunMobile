import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

const Header = () => {
    return (
        <View style={{
            alignItems: "center",
            backgroundColor: "#E49A42",
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 10,
        }}>
            <Text style={{ fontSize: 16, color: "white", fontFamily: "Raleway-Regular" }}>Balance</Text>
            <Text style={{ fontSize: 16, color: "white", fontFamily: "Raleway-Bold" }}>₦1,300,000.00</Text>
            <Image source={require("../assets/icons/eyeCon.png")} style={styles.cardImage} />

        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    cardImage: {
        width: 20,
        height: 20
    }
})
