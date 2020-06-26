import React from "react";
import { View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { HistoryScreen, SettingsScreen } from "./index";
import BookMassage from "../screens/BookMassage"
import BookHairDay from "../screens/BookHairDay"
import BookMani from "../screens/BookMani"
import Dashboard from "../screens/Dashboard"
import TopUp from "../screens/TopUp"
import TopUpSuccess from "../screens/TopUpSuccess"

const HomeStack = createStackNavigator(
    {
        Dashboard,
        BookMassage,
        BookMani,
        BookHairDay,
        TopUp,
        TopUpSuccess
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
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                tabBarIcon: () => <FontAwesome5 name="cogs" size={24} color="#CDCCCE" />
            }
        },



    },
    {
        tabBarOptions: {
            showLabel: false
        }
    }
);

export default createAppContainer(TabNavigator);
