import React, { Component } from 'react'
import { AsyncStorage, Text, View, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, Platform, Alert, ActivityIndicator } from 'react-native'
import { Header } from 'react-native-elements';
import { connect } from "react-redux";
import { checkForUser } from "../actions/auth";
import NetInfo from "@react-native-community/netinfo";


const width = Dimensions.get("window").width
export class Landing extends Component {

    state = {
        mobile: "",
        errorMsg: "",
        error: false
    }

    componentDidMount = async () => {
        const token = await AsyncStorage.getItem("token");
        const mobile = await AsyncStorage.getItem("mobile");
        if (token) {
            await this.props.navigation.navigate("Login", {
                mobile: mobile
            });
        }
    }

    handleSubmit = async () => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                console.log("Network connected")
            }
            else {
                Alert.alert("Ooopss", "Looks like you are offline");
            }
        });
        const { mobile } = this.state;
        await this.props.checkForUser({ mobile });

        if (this.props.error) {
            this.setState({
                error: true,
                errorMsg: this.props.errorMsg.data.message
            })

        }
        else if (this.props.data.code === 201) {
            await this.props.navigation.navigate("OTPValidation", {
                mobile: this.state.mobile
            });
        }
        else if (this.props.data.code === 200) {
            await this.props.navigation.navigate("Login", {
                mobile: this.state.mobile
            });
        }
    };


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#F8FFFF' }}>
                <Header
                    containerStyle={styles.header}
                    centerComponent={{ text: 'TherapyBox', style: { color: '#e1e1e1', fontSize: 16, fontFamily: "Raleway-Bold" } }}
                />
                <View style={{ alignItems: "center" }}>
                    <Image source={require("../assets/boxImage.png")} style={styles.image} />
                    <Text style={{ fontFamily: "Raleway-SemiBold", fontSize: 18, marginTop: 30, fontStyle: "normal", fontWeight: "600", color: "#a4a4a4" }}>Hey Friend,</Text>
                    <Text style={{ fontFamily: "Raleway-SemiBold", fontSize: 18, marginTop: 12, fontStyle: "normal", fontWeight: "600", color: "#a4a4a4", lineHeight: 19 }}>In a few steps,</Text>
                    <Text style={{ fontFamily: "Raleway-SemiBold", fontSize: 18, marginTop: 5, fontStyle: "normal", fontWeight: "600", color: "#a4a4a4", lineHeight: 19 }}>you can have your therapy brought</Text>
                    <Text style={{ fontFamily: "Raleway-SemiBold", fontSize: 18, marginTop: 5, fontStyle: "normal", fontWeight: "600", color: "#a4a4a4", lineHeight: 19 }}>right to you.</Text>
                </View>

                <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
                    <View style={{ width: width / 2, height: 60, alignItems: "center" }}>
                        <Text style={{ position: "absolute", fontFamily: "Raleway-SemiBold", marginLeft: 10, marginTop: 15, fontStyle: "normal", color: "#a4a4a4" }}>Country</Text>
                        <Image source={require("../assets/naijaFlag.png")} style={styles.naijaImage} />
                    </View>
                    <View style={{ width: width / 2.5, height: 60 }}>
                        <TextInput
                            placeholder="Phone Number"
                            keyboardType="phone-pad"
                            returnKeyType="done"
                            placeholderTextColor="#a4a4a4"
                            onChangeText={text => {
                                this.setState({ mobile: text })
                            }}
                            style={{ height: 40, borderBottomColor: '#a4a4a4', color: "#a4a4a4", borderBottomWidth: 1, marginTop: 20, marginRight: 10, fontFamily: "Raleway-Regular" }} />
                    </View>

                </View>

                <View style={{ flex: 1.6, alignItems: "center" }}>
                    <TouchableOpacity
                        disabled={this.state.mobile.length != 11}
                        style={styles.button}
                        onPress={this.handleSubmit}
                    >
                        {!this.props.loading ? <Text style={styles.textButton}>Continue</Text> : <ActivityIndicator size="small" color="#fff" />}

                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    checkForUser: data => dispatch(checkForUser(data))
});

const mapStateToProps = state => ({
    loading: state.auth.loading,
    data: state.auth.data,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    errorMsg: state.auth.errorMsg
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Landing);

const styles = StyleSheet.create({
    // container: {

    // },
    header: {
        backgroundColor: '#F8FFFF',
        justifyContent: 'space-around',
        borderBottomColor: '#F8FFFF',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 110,
        opacity: 0.1
    },
    naijaImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        width: 30,
        height: 20
    },
    button: {
        alignItems: "center",
        backgroundColor: "#FFAC4A",
        padding: 10,
        width: width - 50,
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