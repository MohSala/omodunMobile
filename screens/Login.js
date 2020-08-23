import React, { Component } from 'react'
import { View, Dimensions, StyleSheet, Alert, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'
import Loader from "../components/Loader";
import { connect } from "react-redux";
import { loginWithNumber } from "../actions/auth";

const { width, height } = Dimensions.get("window")
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        backgroundColor: "#F4FFFE"
    },
    slider: {
        height: height * 0.55,
        borderBottomStartRadius: 50,
        backgroundColor: "#FFE4D9"
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
        color: "#e5e5e5",
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
        width: width - 100
    },

    input: {
        width: width - 100,
        padding: 20,
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        color: '#424242',
        marginBottom: 20
    },
    signUpText: {
        color: "#82D3A3",
    }

})



export class Login extends Component {

    state = {
        mobile: "",
        password: "",
        storedMobile: ""
    }

    componentDidMount = async () => {
        const storedMobile = await AsyncStorage.getItem("mobile");
        return this.setState({
            storedMobile,
            mobile: storedMobile
        })
    }

    handlesubmit = async () => {
        const { mobile, password } = this.state;
        const { loginWithNumber, navigation } = this.props;
        await loginWithNumber({ mobile, password });
        if (this.props.error) {
            Alert.alert("Ooopps!", this.props.errorMsg.data.message)
        }
        else {
            await navigation.navigate("Dashboard");
        }
    }
    render() {
        const transform = [
            { translateY: (height - 400) / 2 },
            { translateX: -width / 2 + 50 },
            { rotate: "90deg" }
        ]
        const { loading, navigation } = this.props
        const { storedMobile, mobile } = this.state;
        return (
            <View style={styles.container}>
                {loading && <Loader />}
                <View style={styles.slider}>
                    {/* <Image source={picture} style={styles.picture} /> */}
                    <View style={[styles.titleContainer, { transform }]}>
                        <Text style={{
                            fontSize: 80,
                            fontFamily: "Raleway-Bold",
                            color: "white",
                            textAlign: "center",
                            lineHeight: 80,
                            fontWeight: "bold"
                        }}>LOGIN</Text>
                    </View>
                </View>

                <View style={styles.footerContainer}>
                    <Text style={styles.subtitle}>Welcome Back, Boss!</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        keyboardType="number-pad"
                        returnKeyType="done"
                        value={storedMobile !== null ? mobile : ""}

                        underlineColorAndroid="transparent"
                        onChangeText={text => {
                            this.setState({ mobile: text })
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        underlineColorAndroid="transparent"
                        onChangeText={text => {
                            this.setState({ password: text })
                        }}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.handlesubmit}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>LOGIN</Text>
                    </TouchableOpacity>
                    <Text style={styles.description}>Do not have an account?<Text style={styles.signUpText} onPress={() => navigation.navigate("Register")}>Sign Up Here</Text></Text>
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
