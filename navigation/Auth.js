import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Landing from "../screens/Landing";
import Login from "../screens/Login";
import Register from "../screens/Register";
import OTPValidation from "../screens/OTPValidation"
import BookMassage from "../screens/BookMassage"
import AddEmail from "../screens/AddEmail"

export default createStackNavigator(
    {
        Landing,
        OTPValidation,
        Login,
        Register,
        BookMassage,
        AddEmail
    },
    {
        defaultNavigationOptions: {
            headerShown: false
        }
    }
);
