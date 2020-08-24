//@ts-nocheck

import React, { Component } from "react";
import {
  AsyncStorage,
  Modal,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Header, Icon, Card, ListItem, Badge, } from "react-native-elements";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { getWalletBalance, getFewTransaction } from "../actions/auth";
import Loader from "../components/Loader";
import NumericInput from 'react-native-numeric-input'

import { Root, Toast } from 'native-base';


const bgcolors = [
  "#82D3A3", "#24A6D9", "#595BD9", "#8022D9", "#5FDCD4", "#D85963", "#D88559"
]

const cardDetails = [
  {
    id: 1,
    name: "Fresh Fish",
    price: 5000,
    quantity: 1
  },
  {
    id: 2,
    name: "Snails",
    price: 5000.00,
    quantity: 1
  },
  {
    id: 3,
    name: "Green Pepper",
    price: 300.00,
    quantity: 1
  },
  {
    id: 4,
    name: "Green Pepper",
    price: 300.00,
    quantity: 1
  }
]

let cartProducts = [];

export class Dashboard extends Component {
  state = {
    modalVisible: false,
    balance: 0,
    transactions: [],
    addedNumber: 0,
    email: "",
    mobile: ""
  };

  componentDidMount = async () => {
    const mobile = await AsyncStorage.getItem("mobile")
    const email = await AsyncStorage.getItem("email")
    return this.setState({
      email, mobile
    })
  }

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  addToCart = async (e, data) => {
    Toast.show({
      text: 'Product Added To Cart!',
      buttonText: 'Okay'
    })
    await this.setState({
      addedNumber: this.state.addedNumber + 1
    })
    if (cartProducts.includes(data)) {
      data.quantity += 1
      return cartProducts.push(data)
    }
    else {
      return cartProducts.push(data)
    }

  }

  render() {
    const { navigation } = this.props
    const { modalVisible, mobile, email } = this.state
    return (
      <Root>
        <ScrollView style={{ backgroundColor: "#F8FFFF" }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            style={{ flex: 1 }}
          >
            <View style={styles.centeredView}>
              <TouchableOpacity
                style={{ left: SCREEN_WIDTH - 50 }}
                onPress={this.setModalVisible}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>

              {/* <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{
                  fontFamily: "Raleway-Bold",
                  marginTop: 10,
                  textAlign: "left",
                  color: "#a4a4a4",
                  fontSize: 18
                }}>Fill Your Delivery Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="What's Your Delivery Address?"
                  underlineColorAndroid="transparent"
                  keyboardType="default"
                  autoCorrect={false}
                  onChangeText={text => {
                    this.setState({ fullName: text })
                  }}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    await AsyncStorage.clear();
                    await this.props.navigation.navigate("Landing");
                  }}
                >
                  <Text style={styles.textButton}>LOGOUT</Text>
                </TouchableOpacity>
              </View> */}
              <Card containerStyle={{ borderRadius: 10, shadowRadius: 5, marginBottom: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                  <Image source={require("../assets/icons/avatarIcon.png")} />
                  <View>
                    <Text style={{ fontFamily: "Raleway-Regular", color: "#a4a4a4", fontSize: 18 }}>
                      {mobile}
                    </Text>
                    <Text style={{ fontFamily: "Raleway-Bold", color: "#a4a4a4", fontSize: 18 }}>
                      {email}
                    </Text>
                  </View>
                </View>
              </Card>
              <ListItem
                title="Set Delivery Address"
                titleStyle={{ color: "#a4a4a4", fontFamily: "Raleway-SemiBold" }}
                leftAvatar={{
                  source: require("../assets/icons/crossRoad.png"),
                  title: "Avatar"
                }}
                chevron
                onPress={
                  () => {
                    this.props.navigation.navigate("SetDeliveryAddress")
                    this.setModalVisible()
                  }
                }
              />
              <ListItem
                title="Logout"
                titleStyle={{ color: "#a4a4a4", fontFamily: "Raleway-SemiBold" }}
                leftAvatar={{
                  source: require("../assets/icons/closeEye.png"),
                  title: "Avatar"
                }}
                chevron
                onPress={async () => {
                  await AsyncStorage.clear();
                  await this.props.navigation.navigate("Login");
                }}
              />
            </View>
          </Modal>

          <Header
            containerStyle={styles.header}
            leftComponent={
              <TouchableOpacity
                onPress={
                  this.setModalVisible}>
                <Image
                  source={require("../assets/icons/avatarIcon.png")}
                  style={{ width: 40, height: 40 }}

                />
              </TouchableOpacity>
            }
            centerComponent={{ text: "Products", style: { fontFamily: "Raleway-Bold", color: "#a4a4a4", fontWeight: "bold", fontSize: 18 } }}
            rightComponent={
              <TouchableOpacity style onPress={() => navigation.navigate("Cart", {
                cartProducts: [...new Set(cartProducts)]
              })}>
                <Image
                  source={require("../assets/icons/cartIcon.png")}
                  style={{ width: 40, height: 40 }}

                />
                <Badge
                  value={this.state.addedNumber}
                  status="success"
                  containerStyle={{ position: 'absolute', top: -1, right: -1 }}
                />
              </TouchableOpacity>
            }
          />

          <View
            style={{
              marginTop: 15,
              flexWrap: "wrap",
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            {
              cardDetails.length > 0 ?
                cardDetails.map((item, i) => (

                  <Card key={i}
                    containerStyle={{
                      backgroundColor: bgcolors[Math.floor(Math.random() * bgcolors.length)],
                      borderColor: "transparent",
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                      height: SCREEN_HEIGHT / 3.5,
                      width: SCREEN_WIDTH / 2.5,
                      shadowColor: 'rgba(0, 0, 0, 0.14)',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,


                    }}
                  >
                    <Image
                      source={require("../assets/farmerImage.png")}
                      style={styles.productImage}
                    />
                    <Text
                      style={{
                        fontFamily: "Raleway-Bold",
                        color: "#fff",
                        fontSize: 13,
                        textAlign: "center",
                        marginTop: 5
                      }}
                    >
                      {item.name}
                    </Text>
                    <View style={{ alignItems: "stretch", justifyContent: "space-between", marginTop: 10 }}>
                      <Text style={styles.priceSubtitle}>
                        ₦{item.price.toFixed(2).toLocaleString()}
                      </Text>
                      <TouchableOpacity
                        onPress={(e) => {
                          // e.preventDefault()
                          this.addToCart(e, item)
                        }}
                      >
                        <AntDesign
                          style={{ alignSelf: "center", marginTop: 5 }}
                          name="pluscircle"
                          color="#fff" size={26} />
                      </TouchableOpacity>
                    </View>
                  </Card>

                ))
                :
                null
            }

          </View>
        </ScrollView >
      </Root>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getWalletBalance: (data) => dispatch(getWalletBalance(data)),
  getFewTransaction: (data) => dispatch(getFewTransaction(data)),
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  data: state.auth.data,
  error: state.auth.error,
  transactions: state.auth.transactions,
  errorMsg: state.auth.errorMsg,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "transparent",
    justifyContent: "space-around",
    borderBottomColor: "#F8FFFF",
  },
  priceSubtitle: {
    fontFamily: "Raleway-Bold",
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
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
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  cardImage: {
    width: 20,
    height: 20,
    shadowColor: 'rgba(0, 0, 0, 0.14)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  productImage: {
    borderRadius: 10,
    width: SCREEN_WIDTH / 4,
    height: SCREEN_HEIGHT / 9,
    alignSelf: "center",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
  },
  emptyBox: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  textButton: {
    color: "#fff",
    padding: 10
  },
  centeredView: {
    marginTop: 50,
  },
  button: {
    backgroundColor: "#82D3A3",
    marginTop: 10,
    borderRadius: 5,
    padding: 7,
    alignItems: "center",
    // width: width - 100
  },
  logoutButton: {
    // alignItems: "center",
    backgroundColor: "#0FBA0C",
    padding: 10,
    width: SCREEN_WIDTH - 50,
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
    position: "absolute",
    bottom: 100
  }
});
