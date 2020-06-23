import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import { Header, Icon, Card } from "react-native-elements";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const width = Dimensions.get("window").width
export class BookMassage extends Component {

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
                    centerComponent={{ text: "Book Massage", style: { fontFamily: "Raleway-Bold", color: "#a4a4a4", fontWeight: "bold", fontSize: 18 } }}
                />

                <Card containerStyle={{ borderRadius: 10, shadowRadius: 25, marginBottom: 20 }}>
                    <Text style={{ textAlign: "center", fontFamily: "Raleway-Bold", textDecorationLine: "underline" }}>NURU</Text>
                    <Text style={{ textAlign: "center", color: "#A4A4A4", fontSize: 14, fontFamily: "Raleway-Regular", lineHeight: 20, marginTop: 10 }}>The Nuru massage is a special massage
used to control stress and relaxation
with a happy ending</Text>
                </Card>

                <DropDownPicker
                    placeholder="Select Type of Massage"
                    items={[
                        { label: 'Nuru', value: 'uk' },
                        { label: 'Full Body', value: 'france' },
                    ]}
                    itemStyle={{ alignItems: 'center', padding: 20 }}
                    labelStyle={{
                        fontSize: 16,
                        fontFamily: "Raleway-Bold",
                        textAlign: 'center',
                        color: '#fff'
                    }}
                    showArrow={false}
                    defaultValue={this.state.country}
                    containerStyle={{ height: 60 }}
                    style={{ backgroundColor: '#FFAC4A', width: width, borderRadius: 0 }}
                    dropDownStyle={{ backgroundColor: '#FFAC4A' }}
                    onChangeItem={item => this.setState({
                        country: item.value
                    })}
                />

                <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
                    <TouchableOpacity
                        style={styles.DateButton}
                        onPress={this.showDatePicker}
                    >
                        <Text style={styles.textButton}>{!this.state.pickedDate ? 'SELECT DATE' : this.state.pickedDate.toString()}</Text>
                    </TouchableOpacity>

                    <Text style={{ textAlign: "left", fontSize: 10, fontFamily: "Raleway-Regular", color: "#A4A4A4" }}>*N.B: All our massages are performed with vetted and trusted sensual oils
and candles to achieve maximum effect and last for 50 minutes.</Text>

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

export default BookMassage

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