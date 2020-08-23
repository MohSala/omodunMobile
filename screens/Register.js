import React, { Component } from 'react'
import { View, Dimensions, StyleSheet, Alert, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from "react-redux";
import { createAccount } from "../actions/auth";

const { width, height } = Dimensions.get("window")
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        backgroundColor: "#F4FFFE"
    },
    slider: {
        height: height * 0.49,
        borderBottomEndRadius: 50,
        backgroundColor: "#BFEAF5"
    },
    footer: {
        flex: 1,
    },
    footerContent: {
        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius: 80
    },
    footerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24

    },
    title: {
        fontSize: 80,
        fontFamily: "Raleway-Bold",
        color: "white",
        textAlign: "center",
        lineHeight: 80
    },
    titleContainer: {
        // backgroundColor: "red",
        height: 100,
        justifyContent: "center",
    },
    underlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
    },
    picture: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined
    },
    subtitle: {
        fontFamily: "Raleway-Regular",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#A9A9A9",
        textAlign: "center"
    },
    description: {
        fontFamily: "Raleway-SemiBold",
        fontSize: 16,
        color: "#A9a9a9",
        textAlign: "center",
        lineHeight: 25,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 40
    },
    button: {
        backgroundColor: "#82D3A3",
        borderRadius: 15,
        padding: 15,
        alignItems: "center",
        width: width - 50
    },

    input: {
        width: width - 100,
        padding: 20,
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        color: 'black',
        marginBottom: 10
    },
    signUpText: {
        color: "#82D3A3",
    }

})

export class Register extends Component {

    state = {
        fullName: "",
        email: "",
        password: "",
        mobile: ""
    }

    handleSubmit = async () => {
        const { fullName, email, mobile, password } = this.state;
        if (!fullName || !email || !mobile || !password) {
            Alert.alert("Ooops!", "Please Fill in All Required Fields")
        }
        else {
            const { navigation } = this.props;
            await this.props.createAccount({ fullName, email, mobile, password })
            if (this.props.error) {
                Alert.alert("Oooppss!", this.props.errorMsg.data.message)
            }
            else {
                await navigation.navigate("OTPValidation", {
                    mobile
                });
            }
        }

    };

    render() {
        const transform = [
            { translateY: (height - 300) / 3 },
            { translateX: width / 2 - 50 },
            { rotate: "90deg" }
        ]
        const { navigation } = this.props;
        return (
            <ScrollView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}>
                <View style={styles.slider}>
                    {/* <Image source={picture} style={styles.picture} /> */}
                    <View style={[styles.titleContainer, { transform }]}>
                        <Text style={{
                            fontSize: 65,
                            fontFamily: "Raleway-Bold",
                            color: "white",
                            textAlign: "center",
                            lineHeight: 80,
                        }}>REGISTER</Text>
                    </View>
                </View>

                <View style={styles.footerContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="What's Your Name?"
                        underlineColorAndroid="transparent"
                        keyboardType="default"
                        autoCorrect={false}
                        onChangeText={text => {
                            this.setState({ fullName: text })
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        underlineColorAndroid="transparent"
                        keyboardType="email-address"
                        autoCorrect={false}
                        onChangeText={text => {
                            this.setState({ email: text })
                        }}

                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                        onChangeText={text => {
                            this.setState({ mobile: text })
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        underlineColorAndroid="transparent"
                        secureTextEntry
                        onChangeText={text => {
                            this.setState({ password: text })
                        }}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                        {!this.props.loading ?
                            <Text style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 18
                            }}>GET STARTED</Text> :
                            <ActivityIndicator size="small" color="#fff" />}
                    </TouchableOpacity>
                    <Text style={styles.description}>Already have an account?<Text style={styles.signUpText} onPress={() => navigation.navigate("Login")}>Sign In</Text></Text>
                </View>

            </ScrollView>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    createAccount: data => dispatch(createAccount(data))
});

const mapStateToProps = state => ({
    loading: state.auth.loading,
    created: state.auth.created,
    data: state.auth.data,
    error: state.auth.error,
    errorMsg: state.auth.errorMsg
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

