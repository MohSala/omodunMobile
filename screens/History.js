import React, { Component } from 'react'
import { AsyncStorage, RefreshControl, Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Header, Icon, Card, ButtonGroup, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { getMyTransaction } from "../actions/auth";
import Loader from "../components/Loader";
import dayjs from 'dayjs'

const width = Dimensions.get("window").width
// const list = [
//     {
//         name: 'Body Massage',
//         subtitle: '2020-12-12 21:29:30',
//         status: "Successful"
//     },
//     {
//         name: 'Mani/Pedi',
//         subtitle: '2020-12-12 21:29:30',
//         status: "Failed"
//     }
// ]
export class History extends Component {

    state = {
        selectedIndex: 0,
        refresh: false,
        list: []
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

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
        console.log("selectedIndex", selectedIndex);
    }

    onRefresh = async () => {
        await this.setState({ refreshing: true });
        await this.componentDidMount()
        await this.setState({ refreshing: false });
    }


    render() {
        const buttons = ['All', 'Successful', 'Pending']
        const { selectedIndex, refresh } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: '#F8FFFF' }}>
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
    }
})