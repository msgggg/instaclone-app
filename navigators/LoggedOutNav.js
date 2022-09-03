import React from "react";
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
                headerBackTitleVisible: false,
                headerTintColor: "white",
                headerTitle: false,
                headerTransparent: true,
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
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
        </Stack.Navigator>
    );
}