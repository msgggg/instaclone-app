import React, { useCallback, useEffect, useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  useEffect(() => {
    async function prepare() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          isLoggedInVar(true);
          tokenVar(token);
        }
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(Ionicons.font);
        await Asset.loadAsync([require("./assets/logo.png")]);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (!loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return null;
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer onReady={onLayoutRootView}>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}

//https://docs.expo.dev/versions/latest/sdk/splash-screen/#splashscreenpreventautohideasync
//https://github.com/j3y3h0/nomadcoffee-app/commit/ed0c3818d3710ba59a3f42b847b3c8b28b45d8e2#diff-9b5b5955d0e684e7904f3fc143e07aaa11b7e7c3b36d10985c4aff2554940cbf