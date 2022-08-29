import React from "react";
import { Settings } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import LogIn from "../screens/LogIn";
import CreateAccount from "../screens/CreateAccount";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                presentation: "card",
                headerBackTitleVisible: false,
                headerTitleAlign: "center",
                animation: "slide_from_right",
                headerShown: false,
                headerTintColor: "purple",
            }}
        >
            <Stack.Screen
                name="Welcome"
                options={{
                    headerShown: false,
                }}
                component={Welcome}
            />
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen
                name="CreateAccount"
                component={CreateAccount}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerTransparent: true,
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: "black" },
                }}
            />
        </Stack.Navigator>
    );
}

// import { createNativeStackNavigator } from "@react-navigation/native-stack";