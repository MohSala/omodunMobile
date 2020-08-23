import React from "react";
import { View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { HistoryScreen } from "./index";
import Dashboard from "../screens/Dashboard"
import Cart from "../screens/Cart"


const HomeStack = createStackNavigator(
    {
        Dashboard,
        Cart
    },
    {
        defaultNavigationOptions: {
            headerShown: false
        }
    }
);



const TabNavigator = createBottomTabNavigator(
    {
        Dashboard: {
            screen: HomeStack,
            navigationOptions: {
                tabBarIcon: () => <FontAwesome5 name="home" size={24} color="#CDCCCE" />
            }
        },
        History: {
            screen: HistoryScreen,
            navigationOptions: {
                tabBarIcon: () => <FontAwesome5 name="clock" size={24} color="#CDCCCE" />
            }
        }
    },
    {
        tabBarOptions: {
            showLabel: false
        }
    }
);

export default createAppContainer(TabNavigator);
