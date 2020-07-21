import React from 'react'
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'

const width = Dimensions.get("window").width

export default class Example extends React.Component {
    state = {
        initial: false
    }

    sendCloseState = async () => {
        await this.setState({
            initial: false
        })
    }

    checkFromProp = async () => {
        if (this.props.initialSnap === true) {
            await this.setState({
                initial: true
            })
        }
        else {
            await this.setState({
                initial: false
            })
        }
    }

    renderInner = () => (
        <View style={styles.panel}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: "Raleway-SemiBold", fontSize: 20, color: "#000", textAlign: "center", textDecorationLine: "underline" }}>Transaction</Text>
                <Text style={{ fontFamily: "Raleway-SemiBold", fontSize: 20, marginTop: 7, color: "#a4a4a4" }}>Date:{this.props.selectedTransaction.updatedAt}</Text>
                <Text style={{ textAlign: "left", fontFamily: "Raleway-SemiBold", fontSize: 24, marginTop: 10, color: "#a4a4a4" }}>Details</Text>
                <Text style={{ marginTop: 15, padding: 5, color: "#a4a4a4", fontSize: 18, fontFamily: "Raleway-SemiBold", }}>
                    Amount: <Text style={{ color: "#000" }}>N500.00</Text>
                </Text>
                <Text style={{ padding: 5, color: "#a4a4a4", fontSize: 18, fontFamily: "Raleway-SemiBold", }}>
                    Method: <Text style={{ color: "#000" }}>CARD</Text>
                </Text>
                <Text style={{ padding: 5, color: "#a4a4a4", fontSize: 18, fontFamily: "Raleway-SemiBold", }}>
                    Status: <Text style={{ color: "green" }}>COMPLETED</Text>
                </Text>
                <Text style={{ padding: 5, color: "#a4a4a4", fontSize: 18, fontFamily: "Raleway-SemiBold", }}>
                    ReferenceID: <Text>dfiuenciedne</Text>
                </Text>
            </View>
        </View>
    )

    renderHeader = () => <View style={styles.header} />

    fall = new Animated.Value(1)

    render() {
        const { initialSnap } = this.props
        return (
            <View style={styles.container}>
                <BottomSheet
                    snapPoints={[this.state.initial === false ? 0 : 450, 0]}
                    renderContent={this.renderInner}
                    renderHeader={this.renderHeader}
                    initialSnap={1}
                    callbackNode={this.fall}
                    enabledInnerScrolling={false}
                    onOpenStart={this.checkFromProp}
                    onCloseEnd={this.sendCloseState}
                />
                <TouchableWithoutFeedback style={{ backgroundColor: "#000" }}>
                    <Animated.View
                        style={{
                            alignItems: 'center',
                            opacity: Animated.add(0.1, Animated.multiply(this.fall, 0.9)),
                        }}
                    >
                    </Animated.View>
                </TouchableWithoutFeedback>

            </View>
        )
    }
}

const IMAGE_SIZE = 200

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FFFF',
    },
    box: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
    },
    panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#E49A42",
        padding: 10,
        width: width - 50,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15,
        position: "absolute", bottom: 0
    },
    textButton: {
        color: "white",
        // fontFamily: "Raleway-Bold",
        fontSize: 14
    },
    panel: {
        height: 600,
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.4,
    },
    header: {
        width: '100%',
        height: 50,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#292929',
        alignItems: 'center',
        marginVertical: 10,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    photo: {
        width: '100%',
        height: 225,
        marginTop: 30,
    },
    map: {
        height: '100%',
        width: '100%',
    },
})