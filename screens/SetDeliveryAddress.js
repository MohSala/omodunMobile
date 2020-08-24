import React, { Component } from "react";
import {
    AsyncStorage,
    ActivityIndicator,
    Alert,
    Text,
    View,
    Dimensions,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { Header } from "react-native-elements";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { connect } from "react-redux";
import { addDeliveryAddress } from "../actions/auth";
import { Root, Toast } from 'native-base';

export class SetDeliveryAddress extends Component {
    state = {
        address: "",
        currentAddress: ""
    }

    componentDidMount = () => {

    }

    handlesubmit = async () => {
        const { address } = this.state;
        const mobile = await AsyncStorage.getItem("mobile");
        const { addDeliveryAddress } = this.props;
        await addDeliveryAddress({ address, mobile });
        if (this.props.error) {
            Alert.alert("Ooopps!", this.props.errorMsg.data.message)
        }
        else {
            Toast.show({
                text: 'Delivery Address Saved Successfully!',
                buttonText: 'Okay',
                type: "success"
            })
        }
    }



    render() {
        return (
            <Root>
                <View style={{ backgroundColor: "#F8FFFF", flex: 1 }}>
                    <Header
                        containerStyle={styles.header}
                        centerComponent={{ text: "Address", style: { fontFamily: "Raleway-Bold", color: "#a4a4a4", fontWeight: "bold", fontSize: 18 } }}

                    />
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Text style={{
                            fontFamily: "Raleway-Bold",
                            marginTop: 20,
                            textAlign: "center",
                            color: "#a4a4a4",
                            fontSize: 18
                        }}>Where Do You Want Us To Deliver Your Products?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="What's Your Address?"
                            underlineColorAndroid="transparent"
                            keyboardType="default"
                            autoCorrect={false}
                            onChangeText={text => {
                                this.setState({ address: text })
                            }}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handlesubmit}
                        >
                            {!this.props.loading ?
                                <Text style={styles.textButton}>SAVE</Text>
                                :
                                <ActivityIndicator size="small" color="#fff" />
                            }
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={{
                            fontFamily: "Raleway-Bold",
                            marginTop: 20,
                            textAlign: "left",
                            color: "#a4a4a4",
                            fontSize: 18,
                            padding: 20
                        }}>Current Home Address:</Text>
                        <Text style={{
                            fontFamily: "Raleway-SemiBold",
                            textAlign: "center",
                            color: "#a4a4a4",
                            fontSize: 18,
                        }}>Road #house J1, Victoria Garden city</Text>
                    </View>
                </View>
            </Root>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addDeliveryAddress: data => dispatch(addDeliveryAddress(data))
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
)(SetDeliveryAddress);

const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
        justifyContent: "space-around",
        borderBottomColor: "#F8FFFF",
    },
    input: {
        width: SCREEN_WIDTH - 50,
        marginTop: 10,
        padding: 20,
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        color: 'black',
        alignItems: "center"
    },
    textButton: {
        color: "#fff",
        padding: 10,
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Raleway-Bold",
        width: SCREEN_WIDTH - 150
    },
    button: {
        backgroundColor: "#82D3A3",
        marginTop: 10,
        borderRadius: 5,
        padding: 7,
        alignItems: "center",
    }
});