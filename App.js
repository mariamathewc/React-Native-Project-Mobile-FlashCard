import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import StackNavigator from "./Components/StackNavigator";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import NewDeck from "./Components/NewDeck";
import {white, purple } from "./utils/colors";
import Constants from "expo-constants";
import { setLocalNotification } from "./utils/helpers";

/*
 * Display status bar
 */ 
function AppStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );
}

/*
 * Coose tab based on platform
 */ 
const Tab = Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()


export default class App extends React.Component {

    componentDidMount() {
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={createStore(reducer, middleware)}>
                <View style={{ flex: 1 }}>
                    <AppStatusBar backgroundColor={purple} barStyle="light-content" />
                    <NavigationContainer>

                        <Tab.Navigator
                            
                            screenOptions={({ route }) => ({
                                tabBarIcon: ({ color }) => {
                                    let iconName;
                                    if (route.name === 'Home') {
                                        iconName = 'ios-bookmarks'
                                    }

                                    else if (route.name === 'Add Deck') {
                                        iconName = 'plus-square';
                                    }

                                    if (route.name === 'Home') {
                                        return <Ionicons name={iconName} size={30} color={color} />;
                                    }
                                    else {
                                        return <FontAwesome name={iconName} size={30} color={color} />;
                                    } 
                                }
                            })}
                            tabBarOptions={{
                                activeTintColor: Platform.OS === "ios" ? purple : white,
                                style: {
                                    height: 56,
                                    backgroundColor: Platform.OS === "ios" ? white : purple,
                                    shadowColor: "rgba(0, 0, 0, 0.24)",
                                    shadowOffset: {
                                        width: 0,
                                        height: 3
                                    },
                                    shadowRadius: 6,
                                    shadowOpacity: 1
                                }
                            }}
                        >
                            <Tab.Screen name="Home" component={StackNavigator} />
                            <Tab.Screen name="Add Deck" component={NewDeck} />
                        </Tab.Navigator>
                    </NavigationContainer>
                </View>
            </Provider>
        );
    }
}


