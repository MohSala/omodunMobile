import React, { Component } from 'react'
import { Text, View, AsyncStorage, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
export class Settings extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        await AsyncStorage.clear();
                        await this.props.navigation.navigate("Landing")
                    }}
                >
                    <Text style={styles.textButton}>LOGOUT</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Settings

const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
        justifyContent: 'space-around',
        borderBottomColor: '#FFAC4A',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#FFAC4A",
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
        color: "#fff"
    }
})