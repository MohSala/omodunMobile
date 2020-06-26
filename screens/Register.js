import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { Header, Icon } from "react-native-elements";
import Loader from "../components/Loader";
import { connect } from "react-redux";
import { createAccount } from "../actions/auth";
import NetInfo from "@react-native-community/netinfo";

const width = Dimensions.get("window").width
export class Register extends Component {

    state = {
        password: "",
        confirmPassword: "",
        warning: true
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
        const { password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            Alert.alert("Ooops!", "Passwords do not match")
        }
        else {
            const { navigation } = this.props;
            let mobile = navigation.getParam('mobile', 'none');
            await this.props.createAccount({ mobile, password })
            if (this.props.error) {
                Alert.alert("Oooppss!", this.props.errorMsg.data.message)
            }
            else {
                await navigation.navigate("AddEmail", {
                    mobile: mobile
                });
            }
        }

    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#F8FFFF' }}>
                <Header
                    containerStyle={styles.header}
                    leftComponent={
                        <Icon
                            name='angle-left'
                            type='font-awesome'
                            onPress={() => this.props.navigation.navigate("OTPValidation")}
                        />}
                    centerComponent={{ text: "Create Password", style: { fontFamily: "Raleway-Bold", color: "#a4a4a4", fontWeight: "bold", fontSize: 18 } }}
                />

                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontFamily: "Raleway-SemiBold", color: "#a4a4a4", width: width - 50, fontSize: 16, textAlign: "center", marginTop: 15 }}>
                        Create a password for your TherapyBox account.
                     </Text>

                    <TextInput
                        placeholder="Password"
                        keyboardType="default"
                        secureTextEntry
                        placeholderTextColor="#a4a4a4"
                        onChangeText={text => {
                            this.setState({ password: text })
                        }}
                        style={{ height: 50, width: width - 50, marginTop: 50, borderBottomColor: '#a4a4a4', color: "#a4a4a4", borderBottomWidth: 1, fontFamily: "Raleway-Regular", fontSize: 15 }} />
                    {this.state.warning && <Text style={{ color: "#a4a4a4" }}>Password should be at least 8 characters</Text>}
                    <TextInput
                        placeholder="Confirm Password"
                        keyboardType="default"
                        secureTextEntry
                        placeholderTextColor="#a4a4a4"
                        onChangeText={text => {
                            this.setState({ confirmPassword: text })
                        }}
                        style={{ height: 50, width: width - 50, marginTop: 50, borderBottomColor: '#a4a4a4', color: "#a4a4a4", borderBottomWidth: 1, fontFamily: "Raleway-Regular", fontSize: 15 }} />

                    <TouchableOpacity
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
    createAccount: data => dispatch(createAccount(data))
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
)(Register);

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
        marginTop: 60,
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
