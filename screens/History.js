import React, { Component } from 'react'
import { Modal, AsyncStorage, RefreshControl, Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Header, Icon, PricingCard, ButtonGroup, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { getMyTransaction } from "../actions/auth";
import Loader from "../components/Loader";
import dayjs from 'dayjs'
import BottomSheet from "../components/BottomSheet"
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')


const width = Dimensions.get("window").width

export class History extends Component {

    state = {
        selectedIndex: 0,
        refresh: false,
        list: [],
        selectedTransaction: {},
        initialSnap: false,
        modalVisible: false
    }

    componentDidMount = async () => {
        const walletId = await AsyncStorage.getItem("walletId");
        await this.props.getMyTransaction(walletId);
        if (this.props.data) {
            return this.setState({
                list: this.props.data.data
            })
        } else {
            Alert.alert("Ooopps!", this.props.errorMsg.data.message)
        }
    }

    setModalVisible = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
        console.log("selectedIndex", selectedIndex);
    }

    onRefresh = async () => {
        await this.setState({ refreshing: true });
        await this.componentDidMount()
        await this.setState({ refreshing: false });
    }
    handleClick = async (e, item) => {
        await this.setState({
            selectedTransaction: item,
            modalVisible: true
        })
    }


    render() {
        const buttons = ['All', 'Successful', 'Pending']
        const { selectedIndex, refresh, selectedTransaction, modalVisible } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: '#F8FFFF' }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <TouchableOpacity style={{ left: SCREEN_WIDTH - 100 }} onPress={this.setModalVisible}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>

                        <View style={{ alignItems: "center" }}>
                            <Text style={{ color: "#FFAC4A", fontFamily: "Raleway-Bold", fontSize: 24 }}>Transaction</Text>
                            <PricingCard
                                color="#2b2424"
                                containerStyle={{ width: SCREEN_WIDTH - 50, borderRadius: 10 }}
                                title={selectedTransaction.description}
                                price={`N${parseInt(selectedTransaction.amount).toFixed(2)}`}
                                info={[selectedTransaction.type, selectedTransaction.status, selectedTransaction.reference]}
                                titleStyle={{ fontFamily: "Raleway-Bold" }}
                                button={{ title: dayjs(selectedTransaction.createdAt).format("dddd, MMMM D YYYY, h:mm:ss a") }}
                            />

                        </View>
                    </View>
                </Modal>
                <Header
                    containerStyle={styles.header}
                    centerComponent={{ text: "Transactions", style: { fontFamily: "Raleway-Bold", color: "#a4a4a4", fontWeight: "bold", fontSize: 18 } }}
                />
                <View style={{ alignItems: "center" }}>
                    <ButtonGroup
                        onPress={(selectedIndex) => this.updateIndex(selectedIndex)}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{ height: 30, backgroundColor: "#F3F3F3", borderRadius: 10, width: width - 50 }}
                        textStyle={{ color: "#a4a4a4", fontFamily: "Raleway-Regular" }}
                        selectedButtonStyle={{ backgroundColor: "#A6E7A4" }}
                    // selectedTextStyle={{ color: "#a4a4a4" }}
                    />
                </View>
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refresh} onRefresh={this.onRefresh} />}
                >
                    {this.props.loading ? <Loader /> :
                        this.state.list.map((l, i) => (
                            <ListItem
                                key={i}
                                onPress={((e) => this.handleClick(e, l))}
                                containerStyle={{ backgroundColor: "#F8FFFF" }}
                                leftAvatar={{ source: require("../assets/icons/transactions.png") }}
                                title={l.description}
                                titleStyle={{ fontFamily: "Raleway-Bold", color: "#a4a4a4" }}
                                subtitle={dayjs(l.createdAt).format("dddd, MMMM D YYYY, h:mm:ss a")}
                                subtitleStyle={{ fontFamily: "Raleway-Regular", color: "#a4a4a4" }}
                                bottomDivider
                                rightTitle={l.status}
                                rightTitleStyle={{ fontFamily: "Raleway-Regular", fontSize: 12, color: l.status == "COMPLETED" ? "#8CC38B" : "#C38B8B" }}
                            />
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getMyTransaction: data => dispatch(getMyTransaction(data))
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
)(History);

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F8FFFF',
        justifyContent: 'space-around',
        borderBottomColor: '#F8FFFF',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#0FBA0C",
        padding: 10,
        width: width - 50,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15,
        position: "absolute", bottom: 0
    },
    textButton: {
        color: "white",
        fontFamily: "Raleway-Bold",
        fontSize: 14
    },
    priceText: {
        color: "black",
        fontFamily: "Raleway-Bold",
        marginTop: 10,
        fontSize: 18
    },
    valueText: {
        color: "#0FBA0C",
        fontFamily: "Raleway-Bold",
        fontSize: 22
    },
    DateButton: {
        alignItems: "center",
        backgroundColor: "#FFAC4A",
        padding: 10,
        width: width,
        paddingTop: 15,
        paddingBottom: 15,
    },
    centeredView: {
        marginTop: 100
    },
})