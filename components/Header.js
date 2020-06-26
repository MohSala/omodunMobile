import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, AsyncStorage, Alert } from 'react-native'
import { connect } from "react-redux";
import { getWalletBalance } from "../actions/auth";

export class Header extends React.Component {
    state = {
        showBalance: false,
        balance: 0
    }

    // componentDidMount = async () => {
    //     const mobile = await AsyncStorage.getItem("mobile");
    //     await this.props.getWalletBalance(mobile);
    //     if (this.props.data) {
    //         return this.setState({
    //             balance: this.props.data.data.availableBalance
    //         })
    //     }
    //     else {
    //         Alert.alert("Ooopps!", this.props.errorMsg.data.message)
    //     }

    // }

    viewBalance = () => {
        return this.setState({
            showBalance: !this.state.showBalance
        })
    }
    render() {
        const { showBalance, balance } = this.state
        return (
            <TouchableOpacity onPress={this.viewBalance}>
                <View style={{
                    alignItems: "center",
                    backgroundColor: "#E5B275",
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderRadius: 10,
                }}

                >
                    <Text style={{ fontSize: 16, color: "white", fontFamily: "Raleway-SemiBold" }}>Balance</Text>
                    <Text style={{ fontSize: 16, color: "white", fontFamily: "Raleway-Bold" }}>{showBalance ? `₦${(this.props.balance / 100).toFixed(2)}` : "* * * * * * * *"}</Text>
                    <Image source={showBalance ? require("../assets/icons/eyeCon.png") : require("../assets/icons/closeEye.png")} style={styles.cardImage} />

                </View>
            </TouchableOpacity>
        )
    }

}

const mapDispatchToProps = dispatch => ({
    getWalletBalance: data => dispatch(getWalletBalance(data))
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
)(Header);

const styles = StyleSheet.create({
    cardImage: {
        width: 20,
        height: 20
    }
})
