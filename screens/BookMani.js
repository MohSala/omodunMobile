import React, { Component } from 'react'
import dayjs from "dayjs"
import { Alert, AsyncStorage, Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import { Header, Icon, Card } from "react-native-elements";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Loader from "../components/Loader";
import { connect } from "react-redux";
import { registerTask } from "../actions/auth";
import NetInfo from "@react-native-community/netinfo";

const width = Dimensions.get("window").width
export class BookMani extends Component {

    state = {
        subtype: '',
        type: 'nails',
        pickedDate: '',
        showPrice: false,
        price: 0,
        isDatePickerVisible: false,
        description: '',
    }


    showDatePicker = () => {
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

    handleSubmit = async () => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                console.log("Network connected")
            }
            else {
                Alert.alert("Ooopss", "Looks like you are offline");
            }
        });
        const { type, subtype, price, description, pickedDate } = this.state;
        const { navigation } = this.props;
        const mobile = await AsyncStorage.getItem("mobile");
        await this.props.registerTask({ task_type: type, task_subtype: subtype, price, scheduled_date: pickedDate, mobile, description });
        if (this.props.task) {
            await navigation.navigate("TaskCreation", {
                type: type,
                subtype: subtype,
                name: this.props.task.data.staff.fullName,
                mobile: this.props.task.data.staff.mobile
            });
        }
        else if (this.props.error) {
            Alert.alert("Ooopps!", this.props.errorMsg.data.message)
        }
    }
    render() {
        const { loading } = this.props
        return (
            <View style={{ flex: 1, backgroundColor: '#F8FFFF' }}>
                {loading && <Loader />}
                <Header
                    containerStyle={styles.header}
                    leftComponent={
                        <Icon
                            name='angle-left'
                            type='font-awesome'
                            onPress={() => this.props.navigation.navigate("Dashboard")}
                        />}
                    centerComponent={{ text: "Book Mani/Pedi", style: { fontFamily: "Raleway-Bold", color: "#a4a4a4", fontWeight: "bold", fontSize: 18 } }}
                />



                <DropDownPicker
                    placeholder="Select Type"
                    items={[
                        { label: 'Manicure', value: 'manicure', price: 5000 },
                        { label: 'Pedicure', value: 'pedicure', price: 5000 },
                        { label: 'Manicure & Pedicure', value: 'manicure/pedicure', price: 10000 },
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
                    style={{ backgroundColor: '#E5B275', width: width, borderRadius: 0 }}
                    dropDownStyle={{ backgroundColor: '#E5B275' }}
                    onChangeItem={item => this.setState({
                        subtype: item.value,
                        price: item.price
                    })}
                />

                <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
                    <TouchableOpacity
                        style={styles.DateButton}
                        onPress={this.showDatePicker}
                    >
                        <Text style={styles.textButton}>{!this.state.pickedDate ? 'SELECT DATE' : dayjs(this.state.pickedDate.toString()).format("dddd, MMMM D YYYY, h:mm:ss a")}</Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            textAlign: "left",
                            fontSize: 14,
                            fontFamily: "Raleway-Regular",
                            color: "#A4A4A4",
                        }}
                    >
                        *N.B: Please note appointments booked after 6PM would be shifted to an earlier date
          </Text>

                    <Text style={{ fontFamily: "Raleway-SemiBold", fontSize: 18, marginTop: 40, fontStyle: "normal", color: "#a4a4a4", textAlign: "left" }}>Any Requests(Optional)</Text>

                    <TextInput
                        keyboardType="default"
                        returnKeyType="done"
                        onChangeText={text => {
                            this.setState({ description: text })
                        }}
                        numberOfLines={4}
                        placeholderTextColor="#a4a4a4"
                        style={{
                            height: 100,
                            padding: 10,
                            width: width - 50,
                            marginTop: 20, borderColor: '#a4a4a4', color: "#a4a4a4", borderWidth: 3, borderRadius: 0, fontFamily: "Raleway-Regular", fontSize: 20
                        }} />
                    {
                        this.state.price > 0 &&
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Text style={styles.priceText}>PRICE</Text>
                            <Text style={styles.valueText}>N{this.state.price.toLocaleString()}.00</Text>
                        </View>
                    }

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
                        disabled={this.state.price === 0 || !this.state.pickedDate}
                        onPress={this.handleSubmit}
                    >
                        <Text style={styles.textButton}>CONFIRM</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    registerTask: data => dispatch(registerTask(data))
});

const mapStateToProps = state => ({
    loading: state.auth.loading,
    task: state.auth.task,
    error: state.auth.error,
    errorMsg: state.auth.errorMsg
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookMani);

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F8FFFF',
        justifyContent: 'space-around',
        borderBottomColor: '#F8FFFF',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#0D8D0B",
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
        color: "#0D8D0B",
        fontFamily: "Raleway-Bold",
        fontSize: 22
    },
    DateButton: {
        alignItems: "center",
        backgroundColor: "#E5B275",
        padding: 10,
        width: width,
        paddingTop: 15,
        paddingBottom: 15,
    }
})