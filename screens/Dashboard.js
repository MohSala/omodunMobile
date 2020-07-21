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
  ScrollView,
} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Header, Icon, Card, ListItem } from "react-native-elements";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import HeaderComponent from "../components/Header";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { getWalletBalance, getFewTransaction } from "../actions/auth";
import Loader from "../components/Loader";

export class Dashboard extends Component {
  state = {
    modalVisible: false,
    balance: 0,
    transactions: [],
  };

  componentDidMount = async () => {
    const mobile = await AsyncStorage.getItem("mobile");
    const walletId = await AsyncStorage.getItem("walletId");
    await this.props.getWalletBalance(mobile);
    await this.props.getFewTransaction(walletId);
    if (this.props.data) {
      console.log("datating", this.props.transactions.data);
      return this.setState({
        balance: this.props.data.data.availableBalance,
        transactions: this.props.transactions.data,
      });
    } else {
      Alert.alert("Ooopps!", this.props.errorMsg.data.message);
    }
  };

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  render() {
    const { modalVisible } = this.state;
    return (
      <ScrollView style={{ backgroundColor: "#F8FFFF" }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <TouchableOpacity
              style={{ left: SCREEN_WIDTH - 100 }}
              onPress={this.setModalVisible}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  await AsyncStorage.clear();
                  await this.props.navigation.navigate("Landing");
                }}
              >
                <Text style={styles.textButton}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Header
          containerStyle={styles.header}
          leftComponent={<Icon
            name="user-circle-o"
            type="font-awesome"
            color="#E5B275"
            onPress={() => {
              this.setModalVisible();
            }}
          />}
          centerComponent={<HeaderComponent balance={this.state.balance} />}
          rightComponent={<Icon
            name="bell-o"
            type="font-awesome"
            color="#E5B275"
            onPress={() => {
              this.setModalVisible();
            }}
          />}
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#E5B275",
              padding: 10,
              borderRadius: 10,
            }}
            onPress={this.componentDidMount}
          >
            <FontAwesome5 name="sync" color="white" />
          </TouchableOpacity>
        </View>

        <Card containerStyle={{ borderRadius: 10, shadowRadius: 25 }}>
          <Text
            style={{
              fontFamily: "Raleway-SemiBold",
              fontSize: 18,
              fontStyle: "normal",
              color: "#000",
            }}
          >
            Quick Actions
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("BookMassage");
              }}
            >
              <Card
                containerStyle={{ borderColor: "#E5B275", borderRadius: 10 }}
              >
                <Image
                  source={require("../assets/icons/footIcon.png")}
                  style={styles.cardImage}
                />
                <Text
                  style={{
                    fontFamily: "Raleway-Bold",
                    color: "black",
                    fontSize: 10,
                    fontStyle: "normal",
                    textAlign: "left",
                  }}
                >
                  Book Massage
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("BookMani");
              }}
            >
              <Card
                containerStyle={{ borderColor: "#E5B275", borderRadius: 10 }}
              >
                <Image
                  source={require("../assets/icons/pediIcon.png")}
                  style={styles.cardImage}
                />
                <Text
                  style={{
                    fontFamily: "Raleway-Bold",
                    color: "black",
                    fontSize: 10,
                    fontStyle: "normal",
                    textAlign: "left",
                  }}
                >
                  Book Mani/Pedi
                </Text>
              </Card>
            </TouchableOpacity>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("BookHairDay");
              }}
            >
              <Card
                containerStyle={{ borderColor: "#E5B275", borderRadius: 10 }}
              >
                <Image
                  source={require("../assets/icons/hairDayicon.png")}
                  style={styles.cardImage}
                />
                <Text
                  style={{
                    fontFamily: "Raleway-Bold",
                    color: "black",
                    fontSize: 10,
                    fontStyle: "normal",
                    textAlign: "left",
                  }}
                >
                  Book Hair-Day
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("TopUp");
              }}
            >
              <Card
                containerStyle={{ borderColor: "#E5B275", borderRadius: 10 }}
              >
                <Image
                  source={require("../assets/icons/breadIcon.png")}
                  style={styles.cardImage}
                />
                <Text
                  style={{
                    fontFamily: "Raleway-Bold",
                    color: "black",
                    fontSize: 10,
                    fontStyle: "normal",
                    textAlign: "left",
                  }}
                >
                  Top-Up Account
                </Text>
              </Card>
            </TouchableOpacity>
          </View>
        </Card>

        <Card containerStyle={{ borderRadius: 10 }}>
          <Text
            style={{
              fontFamily: "Raleway-SemiBold",
              fontSize: 18,
              fontStyle: "normal",
              color: "#000",
              lineHeight: 19,
            }}
          >
            Latest Activities
          </Text>
          <View>
            {this.state.transactions.length == 0
              ? <View
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                {this.props.loading && <Loader />}
                <Image
                  source={require("../assets/icons/emptyBox.png")}
                  style={styles.emptyBox}
                />
                <Text
                  style={{
                    fontFamily: "Raleway-Regular",
                    fontSize: 18,
                    fontStyle: "normal",
                    color: "#A4A4A4",
                    textAlign: "center",
                    marginTop: 10,
                  }}
                >
                  Nothing Yet! Top Up your account and get taken care of!
                </Text>
              </View>
              : this.state.transactions.map((l, i) => (
                <ListItem
                  key={i}
                  // onPress={((e) => this.handleClick(e, l))}
                  leftAvatar={{
                    source: require("../assets/icons/transactions.png"),
                  }}
                  title={l.description}
                  titleStyle={{ fontFamily: "Raleway-Bold", color: "#a4a4a4" }}
                  subtitle={dayjs(l.createdAt).format("dddd, MMMM D")}
                  subtitleStyle={{
                    fontFamily: "Raleway-Regular",
                    color: "#a4a4a4",
                  }}
                  bottomDivider
                  rightTitle={`₦${(l.amount).toFixed(2)}`}
                  rightTitleStyle={{
                    fontFamily: "Raleway-Bold",
                    fontSize: 14,
                    color: l.status == "COMPLETED" ? "#8CC38B" : "#C38B8B",
                  }}
                />
              ))}
          </View>
        </Card>
      </ScrollView>
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
  button: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 20,
    width: SCREEN_WIDTH - 50,
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  cardImage: {
    width: 20,
    height: 20,
  },
  emptyBox: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  textButton: {
    color: "#000",
  },
  centeredView: {
    marginTop: 100,
  },
});
