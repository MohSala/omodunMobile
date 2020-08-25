import React, { Component } from 'react'
import {
    AsyncStorage,
    Modal,
    Text,
    View,
    Dimensions,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { getDeliveryAddress, creditTransaction } from "../actions/auth";
import { connect } from "react-redux";
import { Header, Icon, Card, ListItem, Badge, Divider } from "react-native-elements";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import PaystackWebView from 'react-native-paystack-webview';
import Loader from "../components/Loader";

export class Cart extends Component {

    state = {
        cartProducts: [],
        modalVisible: false,
        totalPrice: 0,
        currentAddress: "",
        mobile: "",
        email: ""
    }

    setModalVisible = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    };

    componentDidMount = async () => {
        const cartProducts = this.props.navigation.getParam('cartProducts', 'none');
        await this.setState({
            cartProducts
        })
        const { getDeliveryAddress } = this.props;
        const mobile = await AsyncStorage.getItem("mobile");
        const email = await AsyncStorage.getItem("email");
        await getDeliveryAddress(mobile);
        if (this.props.error) {
            return this.setState({
                currentAddress: "Not Available"
            })
        }
        else {
            return this.setState(({
                currentAddress: this.props.data,
                mobile,
                email
            }))
        }
    }

    sumTotal = (array) => {
        return array.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity
            , 0)
    }

    removeItem = async (_, data) => {
        const items = this.state.cartProducts.filter(item => item.id !== data.id);
        await this.setState({
            cartProducts: items
        })
    }


    render() {
        const { modalVisible, cartProducts, currentAddress, mobile } = this.state
        const { loading } = this.props
        return (
            <ScrollView style={{ backgroundColor: "#F8FFFF" }}>
                {loading && <Loader />}
                <Header
                    containerStyle={styles.header}
                    leftComponent={
                        <Icon
                            name='angle-left'
                            type='font-awesome'
                            onPress={() => this.props.navigation.navigate("Dashboard")}
                        />
                    }
                    rightComponent={
                        <TouchableOpacity>
                            <Badge
                                value={cartProducts.length}
                                status="success"
                                containerStyle={{ padding: 10 }}
                                textStyle={{ fontSize: 13 }}
                            />
                        </TouchableOpacity>
                    }
                />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    style={{ flex: 1 }}
                >
                    <Header
                        containerStyle={styles.header}
                        centerComponent={{ text: "Confirm", style: { fontFamily: "Raleway-Bold", color: "#a4a4a4", fontWeight: "bold", fontSize: 18 } }}
                        rightComponent={
                            <TouchableOpacity
                                onPress={this.setModalVisible}
                            >
                                <AntDesign name="close" size={24} color="black" />
                            </TouchableOpacity>
                        }
                    />
                    <View style={styles.centeredView}>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={{
                                fontFamily: "Raleway-SemiBold",
                                color: "#000",
                                padding: 10,
                                fontSize: 26
                            }}>
                                Product Price:
                    </Text>
                            <Text style={{
                                fontFamily: "Raleway-Bold",
                                color: "#000",
                                fontSize: 30,
                                padding: 10,
                                textDecorationLine: "underline"
                            }}>
                                {`₦${this.sumTotal(cartProducts).toLocaleString()}.00`}
                            </Text>
                            <Text style={{
                                fontFamily: "Raleway-SemiBold",
                                color: "#000",
                                padding: 10,
                                fontSize: 26
                            }}>
                                Delivery Fee:
                    </Text>
                            <Text style={{
                                fontFamily: "Raleway-Bold",
                                color: "#000",
                                fontSize: 30,
                                padding: 10,
                                textDecorationLine: "underline"
                            }}>
                                ₦1,000
                    </Text>
                            <Text style={{
                                fontFamily: "Raleway-SemiBold",
                                color: "#000",
                                padding: 10,
                                fontSize: 26
                            }}>
                                Total Fee:
                    </Text>
                            <Text style={{
                                fontFamily: "Raleway-Bold",
                                color: "#000",
                                fontSize: 30,
                                padding: 10,
                                textDecorationLine: "underline"
                            }}>
                                {`₦${(this.sumTotal(cartProducts) + 1000).toLocaleString()}.00`}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                            {/* paystack web view */}

                            <PaystackWebView
                                buttonText="PAY"
                                showPayButton={true}
                                paystackKey="pk_test_4237164a02b8612098dfcaf92b49c28a54c702f1"
                                paystackSecretKey="sk_test_eb9e09d14a9494cc41966f0dfb0313cd373f06cc"
                                amount={(this.sumTotal(cartProducts) + 1000)}
                                billingEmail={this.state.email}
                                disabled={true}
                                billingMobile={this.state.mobile}
                                ActivityIndicatorColor="green"
                                SafeAreaViewContainer={{ marginTop: 1 }}
                                SafeAreaViewContainerModal={{ marginTop: 1 }}
                                btnStyles={[styles.button, { width: SCREEN_WIDTH / 3, backgroundColor: !currentAddress ? "#c2f2d6" : "#82D3A3", marginLeft: 10 }]}
                                textStyles={{ color: "white", alignSelf: "center", fontSize: 18, fontFamily: "Raleway-Bold" }}
                                onCancel={(e) => {
                                    console.log("error", e)
                                }}
                                onSuccess={async (ref) => {
                                    const reference = ref.data.trxref;
                                    await this.props.creditTransaction({
                                        description: `Payment for Farm Produce`,
                                        mobile, amount: (this.sumTotal(cartProducts) + 1000), reference
                                    })
                                    if (this.props.data) {
                                        await this.props.navigation.navigate("PaymentSuccess")
                                        this.setModalVisible()
                                    }
                                    else {
                                        Alert.alert("Ooops", this.props.errorMsg.data.message)
                                    }
                                }}
                                autoStart={false}
                            />

                            <TouchableOpacity style={[styles.button, { width: SCREEN_WIDTH / 3, backgroundColor: "#CE5454", marginRight: 10 }]} onPress={this.setModalVisible}>
                                <Text style={{ color: "white", fontSize: 18, fontFamily: "Raleway-Bold" }}>CANCEL</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text style={{
                                fontFamily: "Raleway-SemiBold",
                                marginTop: 5,
                                textAlign: "left",
                                color: "#a4a4a4",
                                fontSize: 14,
                                marginLeft: 5
                            }}>*All Our Payments are Secured By Paystack</Text>

                            <Text style={{
                                fontFamily: "Raleway-Bold",
                                marginTop: 10,
                                textAlign: "left",
                                color: "#a4a4a4",
                                fontSize: 18,
                                padding: 20
                            }}>Current Home Address:</Text>
                            <Text style={{
                                fontFamily: "Raleway-SemiBold",
                                width: SCREEN_WIDTH - 50,
                                alignSelf: "center",
                                textAlign: "center",
                                color: "#a4a4a4",
                                fontSize: 18,
                            }}>{!currentAddress ? "No Address Has Been Set, Please Set Your Delivery Address in the user menu before you can get products delivered to you!" : currentAddress}</Text>
                        </View>

                    </View>

                </Modal>
                <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "flex-start", padding: 30 }}>
                    <Text style={{ fontFamily: "Raleway-Bold", fontSize: 25 }}>My</Text>
                    <Text style={{ fontFamily: "Raleway-Regular", fontSize: 25 }}>Order</Text>
                </View>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    {cartProducts.length > 0 ?
                        cartProducts.map((l, i) => (
                            <ListItem
                                key={i}
                                leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
                                titleStyle={{ color: "#a4a4a4", fontFamily: "Raleway-SemiBold", fontSize: 16 }}
                                subtitleStyle={{ fontFamily: "Raleway-SemiBold", fontSize: 16 }}
                                title={l.name}
                                subtitle={`₦${l.price.toFixed(2).toString()}`}
                                containerStyle={{ width: SCREEN_WIDTH - 50, textAlign: "center", backgroundColor: "transparent" }}
                                rightSubtitle={`x${l.quantity}`}
                                rightIcon={
                                    <Icon
                                        name='trash-o'
                                        type='font-awesome'
                                        onPress={(e) => this.removeItem(e, l)}
                                    />
                                }
                            />
                        ))
                        : null
                    }
                </View>

                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "stretch", padding: 13, marginTop: 10 }}>
                    <Text style={{ fontFamily: "Raleway-SemiBold", fontSize: 25 }}>Total:</Text>
                    <Text style={{ fontFamily: "Raleway-SemiBold", fontSize: 25 }}>{`₦${this.sumTotal(cartProducts).toLocaleString()}.00`}</Text>
                </View>

                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", position: "relative", bottom: 0 }}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: cartProducts.length === 0 ? "#c2f2d6" : "#82D3A3" }]} disabled={cartProducts.length === 0 ? true : false} onPress={this.setModalVisible}>
                        <Text style={{ color: "white", fontSize: 18, fontFamily: "Raleway-Bold" }}>CONFIRM</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getDeliveryAddress: data => dispatch(getDeliveryAddress(data)),
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
)(Cart);

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        borderBottomColor: '#F8FFFF',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#82D3A3",
        padding: 10,
        marginTop: 60,
        width: SCREEN_WIDTH - 50,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
    textButton: {
        color: "white",
        fontFamily: "Raleway-Bold",
        fontSize: 18
    },
    centeredView: {
        marginTop: 30,
    },
})