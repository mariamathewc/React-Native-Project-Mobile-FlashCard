import React, { Fragment } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DeckList from "./DeckList";
import Deck from "./Deck";
import Quiz from "./Quiz";
import NewCard from "./NewCard";

const Stack = createStackNavigator();

/*
 * This class stacks components into a Stack. It helps to transition between screens and manage navigation history
 */ 
export default class StackNavigator extends React.Component {

    render() {

        return (
            <Fragment>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={DeckList}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="Deck"
                        component={Deck}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="NewCard"
                        component={NewCard}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="Quiz"
                        component={Quiz}
                        options={{ headerShown: false }}
                    />
                  
                </Stack.Navigator>
            </Fragment>
        );
    }
}

