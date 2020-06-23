import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import { Header, Icon, Card } from "react-native-elements";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const width = Dimensions.get("window").width
export class BookHairDay extends Component {

    state = {
        country: '',
        pickedDate: '',
        isDatePickerVisible: false
    }

    showDatePicker = () => {
        console.log("picker ti pick")
        this.setState({
            isDatePickerVisible: true
        })
    }

    hideDatePicker = () => {
        this.setState({
            isDatePickerVisible: false
        })
    };

    handleConfirm = async (date) => {
        await this.setState({
            pickedDate: date
        })
        this.hideDatePicker();
    };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#F8FFFF' }}>
                <Header
                    containerStyle={styles.header}
                    leftComponent={
                        <Icon
                            name='angle-left'
                            type='font-awesome'
                            onPress={() => this.props.navigation.navigate("Dashboard")}
                        />}
                    centerComponent={{ text: "Book Hair-Day", style: { fontFamily: "Raleway-Bold", color: "#a4a4a4", fontWeight: "bold", fontSize: 18 } }}
                />

                <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
                    <TouchableOpacity
                        style={styles.DateButton}
                        onPress={this.showDatePicker}
                    >
                        <Text style={styles.textButton}>{!this.state.pickedDate ? 'SELECT DATE' : this.state.pickedDate.toString()}</Text>
                    </TouchableOpacity>

                    <Text style={{ fontFamily: "Raleway-SemiBold", fontSize: 18, marginTop: 40, fontStyle: "normal", color: "#a4a4a4", textAlign: "left" }}>Any Requests(Optional)</Text>

                    <TextInput
                        keyboardType="default"
                        multiline={true}
                        numberOfLines={4}
                        placeholderTextColor="#a4a4a4"
                        style={{
                            height: 100,
                            padding: 10,
                            width: width - 50,
                            marginTop: 20, borderColor: '#a4a4a4', color: "#a4a4a4", borderWidth: 0.5, borderRadius: 10, fontFamily: "Raleway-Regular", fontSize: 15
                        }} />

                    <Text style={styles.priceText}>PRICE</Text>
                    <Text style={styles.valueText}>N5,000,000.00</Text>
                </View>

                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="datetime"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />



                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", marginBottom: 10 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.props.navigation.navigate('Dashboard')
                        }}
                    >
                        <Text style={styles.textButton}>CONFIRM</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default BookHairDay

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