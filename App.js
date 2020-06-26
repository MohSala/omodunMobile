import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AppLoading, Icon } from "expo";
import { Asset } from "expo-asset";
import AppNavigator from "./navigation/AppNavigtor"
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { configureStore } from "./store/index";

const store = configureStore();


export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
          <AppNavigator />
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      // Asset.loadAsync([require("./assets/images/Base/Logo.png")]),
      Font.loadAsync({
        "Raleway-Black": require("./assets/fonts/Raleway/Raleway-Black.ttf"),
        "Raleway-Regular": require("./assets/fonts/Raleway/Raleway-Regular.ttf"),
        "Raleway-SemiBold": require("./assets/fonts/Raleway/Raleway-SemiBold.ttf"),
        "Raleway-Bold": require("./assets/fonts/Raleway/Raleway-Bold.ttf"),
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
