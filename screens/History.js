import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Header, Icon, Card, ButtonGroup, ListItem } from "react-native-elements";

const width = Dimensions.get("window").width
const list = [
    {
        name: 'Body Massage',
        subtitle: '2020-12-12 21:29:30',
        status: "Successful"
    },
    {
        name: 'Mani/Pedi',
        subtitle: '2020-12-12 21:29:30',
        status: "Failed"
    }
]
export class History extends Component {

    state = {
        selectedIndex: 0
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
        console.log("selectedIndex", selectedIndex);
    }


    render() {
        const buttons = ['All', 'Successful', 'Pending']
        const { selectedIndex } = this.state
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
                <ScrollView>
                    {
                        list.map((l, i) => (
                            <ListItem
                                key={i}
                                containerStyle={{ backgroundColor: "#F8FFFF" }}
                                leftAvatar={{ source: require("../assets/icons/crossRoad.png") }}
                                title={l.name}
                                titleStyle={{ fontFamily: "Raleway-Regular", color: "#a4a4a4" }}
                                subtitle={l.subtitle}
                                subtitleStyle={{ fontFamily: "Raleway-Regular", color: "#a4a4a4" }}
                                bottomDivider
                                rightTitle={l.status}
                                rightTitleStyle={{ fontFamily: "Raleway-Regular", color: l.status == "Successful" ? "#8CC38B" : "#C38B8B" }}
                            />
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}

export default History

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