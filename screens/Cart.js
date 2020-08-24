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

import { Header, Icon, Card, ListItem, Badge, Divider } from "react-native-elements";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export class Cart extends Component {

    state = {
        cartProducts: [],
        modalVisible: false,
        totalPrice: 0
    }

    setModalVisible = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    };

    componentDidMount = async () => {
        const cartProducts = this.props.navigation.getParam('cartProducts', 'none');
        await this.setState({
            cartProducts
        })
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
        const { modalVisible, cartProducts } = this.state
        return (
            <ScrollView style={{ backgroundColor: "#F8FFFF" }}>
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
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                            <TouchableOpacity style={[styles.button, { width: SCREEN_WIDTH / 3, backgroundColor: "#CE5454" }]} onPress={this.setModalVisible}>
                                <Text style={{ color: "white", fontSize: 18, fontFamily: "Raleway-Bold" }}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { width: SCREEN_WIDTH / 3 }]}
                                onPress={() => {
                                    this.setModalVisible()
                                    this.props.navigation.navigate("PaymentSuccess")
                                }}>
                                <Text style={{ color: "white", fontSize: 18, fontFamily: "Raleway-Bold" }}>PAY</Text>
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
                    <TouchableOpacity style={styles.button} onPress={this.setModalVisible}>
                        <Text style={{ color: "white", fontSize: 18, fontFamily: "Raleway-Bold" }}>CONFIRM</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        )
    }
}

export default Cart

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
        marginTop: 50,
    },
})