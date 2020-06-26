import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Header, Icon } from "react-native-elements";
import Loader from "../components/Loader";
import { connect } from "react-redux";
import { verifyUserOtp } from "../actions/auth";
import NetInfo from "@react-native-community/netinfo";

const width = Dimensions.get("window").width
export class OTPValidation extends Component {

    state = {
        otp: ''
    }

    handleSubmit = async () => {
        const { navigation } = this.props;
        const mobile = navigation.getParam('mobile', 'none');
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                console.log("Network connected")
            }
            else {
                Alert.alert("Ooopss", "Looks like you are offline");
            }
        });
        const { otp } = this.state;
        await this.props.verifyUserOtp({ otp, mobile });
        if (this.props.error) {
            Alert.alert("Ooopps!", this.props.errorMsg.data.message)
        }
        else {
            await navigation.navigate("Register", {
                mobile: mobile
            })
        }
    }

    tapHere() {
        console.log("pressed tap")
    }
    render() {
        const { navigation, loading } = this.props;
        const mobile = navigation.getParam('mobile', 'none');
        return (
            <View style={{ flex: 1, backgroundColor: '#F8FFFF' }}>
                {loading && <Loader />}
                <Header
                    containerStyle={styles.header}
                    leftComponent={
                        <Icon
                            name='angle-left'
                            type='font-awesome'
                            onPress={() => this.props.navigation.navigate("Landing")}
                        />}
                    centerComponent={{ text: "Account Validation", style: { fontFamily: "Raleway-Bold", color: "#a4a4a4", fontWeight: "bold", fontSize: 18 } }}
                />

                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontFamily: "Raleway-SemiBold", color: "#a4a4a4", width: width - 50, fontSize: 16, textAlign: "center", marginTop: 15 }}>
                        Enter the 5 digit authentication code
    sent to <Text style={{ fontFamily: "Raleway-SemiBold", color: "#E5B275" }}>{mobile}</Text> via sms
                    </Text>

                    <TextInput
                        placeholder="OTP"
                        keyboardType="default"
                        placeholderTextColor="#a4a4a4"
                        onChangeText={text => {
                            this.setState({ otp: text })
                        }}
                        style={{ textAlign: "center", height: 50, width: 100, marginTop: 50, borderBottomColor: '#a4a4a4', color: "#a4a4a4", borderBottomWidth: 1, fontFamily: "Raleway-Regular", fontSize: 15, letterSpacing: 2 }} />
                </View>

                <View style={{ flex: 3, alignItems: "center", marginTop: 40 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleSubmit}
                    >
                        <Text style={styles.textButton}>Continue</Text>
                    </TouchableOpacity>
                    <Text style={{ fontFamily: "Raleway-SemiBold", color: "#a4a4a4", fontSize: 16, textAlign: "center", marginTop: 15 }}>Didn’t get code? <Text onPress={this.tapHere} style={{ fontFamily: "Raleway-SemiBold", color: "#E5B275" }}>Tap Here</Text></Text>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    verifyUserOtp: data => dispatch(verifyUserOtp(data))
});

const mapStateToProps = state => ({
    loading: state.auth.loading,
    data: state.auth.data,
    error: state.auth.error,
    errorMsg: state.auth.errorMsg
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OTPValidation);

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F8FFFF',
        justifyContent: 'space-around',
        borderBottomColor: '#F8FFFF',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#E5B275",
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