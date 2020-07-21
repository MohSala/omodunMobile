import React, { Component } from 'react'
import { Alert, Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'
import { Header, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { creditTransaction } from "../actions/auth";
import PaystackWebView from 'react-native-paystack-webview';
import Loader from "../components/Loader";


const width = Dimensions.get("window").width
export class TopUp extends Component {
    state = {
        amount: 0,
        mobile: "",
        email: "",
        walletId: ""
    }

    componentDidMount = async () => {
        const email = await AsyncStorage.getItem("email")
        const mobile = await AsyncStorage.getItem("mobile");
        const walletId = await AsyncStorage.getItem("walletId");
        return this.setState({
            mobile: mobile,
            email: email,
            walletId: walletId
        })
    }

    render() {
        const { walletId, mobile, amount } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: '#F8FFFF' }}>
                {this.props.loading && <Loader />}
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
                        onChangeText={text => {
                            this.setState({ amount: text })
                        }}
                        placeholderTextColor="#a4a4a4"
                        style={{ height: 50, width: 200, marginTop: 50, borderBottomColor: '#a4a4a4', color: "#a4a4a4", borderBottomWidth: 2, fontFamily: "Raleway-Bold", fontSize: 20 }} />
                </View>

                <View style={{ flex: 3, alignItems: "center", marginTop: 50 }}>
                    <PaystackWebView
                        buttonText="Top Up"
                        showPayButton={true}
                        paystackKey="pk_test_4237164a02b8612098dfcaf92b49c28a54c702f1"
                        paystackSecretKey="sk_test_eb9e09d14a9494cc41966f0dfb0313cd373f06cc"
                        amount={this.state.amount}
                        billingEmail={this.state.email}
                        billingMobile={this.state.mobile}
                        ActivityIndicatorColor="green"
                        SafeAreaViewContainer={{ marginTop: 1 }}
                        SafeAreaViewContainerModal={{ marginTop: 1 }}
                        btnStyles={{ backgroundColor: "#E5B275", borderRadius: 10, padding: 10, width: width - 100 }}
                        textStyles={{ color: "white", alignSelf: "center", fontSize: 16, fontFamily: "Raleway-Bold" }}
                        onCancel={(e) => {
                            console.log("error", e)
                        }}
                        onSuccess={async (ref) => {
                            const reference = ref.data.trxref;
                            await this.props.creditTransaction({ description: "wallet TopUp", walletId, mobile, amount, reference })
                            if (this.props.data) {
                                await this.props.navigation.navigate("TopUpSuccess")
                            }
                            else {
                                Alert.alert("Ooops", this.props.errorMsg.data.message)
                            }
                        }}
                        autoStart={false}
                    />
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    creditTransaction: data => dispatch(creditTransaction(data))
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
)(TopUp);

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