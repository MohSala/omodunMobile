import React from 'react'
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert, Clipboard } from 'react-native'
import { Header } from "react-native-elements";
import BottomSheet from 'reanimated-bottom-sheet'
const width = Dimensions.get("window").width

export default class Example extends React.Component {

    state = {
        mobile: "",
        subtype: "",
        name: "",
        type: ""
    }

    componentDidMount = async () => {
        const { navigation } = this.props;
        const mobile = navigation.getParam('mobile', 'none');
        const subtype = navigation.getParam('subtype', 'none');
        const name = navigation.getParam('name', 'none');
        const type = navigation.getParam('type', 'none');
        await this.setState({
            mobile: mobile,
            subtype: subtype,
            name: name,
            type: type
        })
    }

    copyToClipboard = async () => {
        Clipboard.setString(`234${this.state.mobile}`)
        Alert.alert("Copied", "Phone Number Copied")
    }

    fetchCopiedText = async () => {
        const text = await Clipboard.getString()
        console.log("text", text)
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    containerStyle={styles.header}
                    centerComponent={{ text: 'ALRIGHT!!', style: { color: '#e1e1e1', fontSize: 16, fontFamily: "Raleway-Bold" } }}
                />
                <View style={{ flexDirection: "row", }}>
                    <Image source={require("../assets/icons/beachFront.png")} style={{
                        marginLeft: 20,
                        width: 60,
                        height: 60,

                    }} />
                    <View style={{ flexDirection: "column", paddingLeft: 10 }}>
                        <Text style={{ color: "#A4A4A4", fontFamily: "Raleway-Regular", fontSize: 14 }}>You Opted For</Text>
                        <Text style={{ color: "#A4A4A4", fontFamily: "Raleway-SemiBold", fontSize: 17 }}>{this.state.type}</Text>
                        <Text style={{ color: "#A4A4A4", fontFamily: "Raleway-Bold", fontSize: 18 }}>{this.state.subtype}</Text>
                    </View>
                </View>

                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 60 }}>
                    <Image source={require("../assets/icons/monk.png")} style={{
                        width: 100,
                        height: 100,
                    }} />
                    <Text style={{ color: "#A4A4A4", fontSize: 24, fontFamily: "Raleway-Regular", marginTop: 15 }}>Your Caretaker is:</Text>
                    <Text style={{ color: "#A4A4A4", fontFamily: "Raleway-Bold", fontSize: 24 }} numberOfLines={2}>{this.state.name}</Text>
                    <Text style={{ color: "#A4A4A4", fontFamily: "Raleway-Regular", fontSize: 24 }}>4.5<Image source={require("../assets/icons/starICon.png")} style={{
                        width: 25,
                        height: 25,
                    }} /></Text>
                </View>

                <View style={{ marginTop: 30, padding: 15 }}>
                    <Text style={{ color: "#A4A4A4", fontSize: 24, marginTop: 15, textDecorationLine: "underline", fontFamily: "Raleway-SemiBold", }}>Phone</Text>
                    <Text style={{ color: "#A4A4A4", fontSize: 24, marginTop: 5, fontFamily: "Raleway-Bold", }} onPress={this.copyToClipboard}>{`+234${this.state.mobile}`}</Text>
                    <Text style={{ color: "#A4A4A4", fontSize: 24, marginTop: 5, fontFamily: "Raleway-Regular", }} numberOfLines={3}>
                        Your caretaker would be in contact with you to confirm your availability!
          </Text>
                </View>

                <View style={{ flex: 1, marginBottom: 20, justifyContent: "flex-end" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: "#C38B8B" }]}
                            onPress={() => {
                                this.props.navigation.navigate('Dashboard')
                            }}
                        >
                            <Text style={styles.textButton}>CANCEL</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: "#0D8D0B" }]}
                            onPress={() => this.props.navigation.navigate("Dashboard")}
                        >
                            <Text style={styles.textButton}>DONE</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View >
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FFFF',
    },
    header: {
        backgroundColor: '#F8FFFF',
        justifyContent: 'space-around',
        borderBottomColor: '#F8FFFF',
    },
    button: {
        backgroundColor: "#E49A42",
        padding: 10,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15,
        width: width - 230,
        bottom: 0
    },
    textButton: {
        color: "white",
        textAlign: "center",
        fontSize: 14,
        fontFamily: "Raleway-Bold"
    },

})