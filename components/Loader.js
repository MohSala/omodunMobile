import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

const Loader = () => {
    return (
        <View style={styles.overlay}>
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        </View>
    )
}

export default Loader;

const styles = StyleSheet.create({
    overlay: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        zIndex: 5,
        elevation: 5
    },
    loaderContainer: {
        height: 80,
        width: 80,
        backgroundColor: '#E5B275',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 12,
        position: 'absolute',
        top: '35%',
    }
})