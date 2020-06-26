import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import { Header, Icon } from "react-native-elements";
import Loader from "../components/Loader";
import { connect } from "react-redux";
import { loginWithNumber } from "../actions/auth";
import NetInfo from "@react-native-community/netinfo";

const width = Dimensions.get("window").width

export class Login extends Component {

    state = {
        password: "",
        errorMsg: "",
        error: false,
        show: false
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
        const { password } = this.state;
        const { navigation } = this.props;
        let mobile = navigation.getParam('mobile', 'none');
        await this.props.loginWithNumber({ mobile, password });
        if (this.props.error) {
            Alert.alert("Ooopps!", this.props.errorMsg.data.message)
        }
        else {
            await navigation.navigate("Dashboard");
        }

    };


    render() {
        const { navigation, loading } = this.props;
        const { show } = this.state;
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
                    centerComponent={{ text: 'TherapyBox', style: { color: '#e1e1e1', fontSize: 16, fontFamily: "Raleway-Bold" } }}
                />

                <View style={{ alignItems: "center" }}>
                    <Image source={require("../assets/boxImage.png")} style={styles.image} />
                    <Text style={{ fontFamily: "Raleway-SemiBold", fontSize: 18, marginTop: 12, fontStyle: "normal", fontWeight: "600", color: "#a4a4a4", lineHeight: 19 }}>Welcome Back!</Text>
                    <Text style={{ fontFamily: "Raleway-SemiBold", color: "#a4a4a4", width: width - 50, fontSize: 16, textAlign: "center", marginTop: 15 }}>
                        Enter the password for
                    </Text>
                    <Text style={{ fontFamily: "Raleway-SemiBold", color: "#E5B275", textAlign: "center", fontSize: 16, }}>{mobile}</Text>

                    <TextInput
                        placeholder="Password"
                        keyboardType="default"
                        secureTextEntry={show ? false : true}
                        placeholderTextColor="#a4a4a4"
                        onChangeText={text => {
                            this.setState({ password: text })
                        }}
                        style={{ height: 50, width: width - 50, marginTop: 20, borderBottomColor: '#a4a4a4', color: "#a4a4a4", borderBottomWidth: 1, fontFamily: "Raleway-Regular", fontSize: 15 }} />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: width / 1.9 }}>
                        <Text onPress={() => this.setState({ show: !show })} style={{ fontFamily: "Raleway-Regular", color: "#E5B275", textAlign: "center", fontSize: 16, marginTop: 20 }}>{show ? 'Hide' : 'Show'} Password</Text>
                    </View>
                </View>

                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleSubmit}
                    >
                        {!this.props.loading ? <Text style={styles.textButton}>Continue</Text> : <ActivityIndicator size="small" color="#fff" />}

                    </TouchableOpacity>
                    <Text style={{ fontFamily: "Raleway-Regular", color: "#E5B275", textAlign: "center", fontSize: 16, marginTop: 20 }}>Forgot Password?</Text>
                    <Text style={{ fontFamily: "Raleway-Regular", color: "#E5B275", textAlign: "center", fontSize: 16, marginTop: 20 }}>Switch Account</Text>

                </View>


            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    loginWithNumber: data => dispatch(loginWithNumber(data))
});

const mapStateToProps = state => ({
    loading: state.auth.loading,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    errorMsg: state.auth.errorMsg
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

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
        marginTop: 20,
        width: width - 50,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
    textButton: {
        color: "white",
        fontFamily: "Raleway-Bold",
        fontSize: 18
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 110,
        opacity: 0.1
    }
})
