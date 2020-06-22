import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { black, purple } from "../utils/colors";

/*
 * This component displays the score result
 */ 
export default class ScoreBoard extends React.Component {
    render() {
        const { totalScore, totalQuestions } = this.props;
        const result = (totalScore/totalQuestions) * 100;
        return (
            <View style={styles.container}>
                <Text style={styles.textPart1}>You scored</Text>
                <Text style={styles.textPart2}> {result} % </Text>
                <Text style={styles.textPart1}>in this test</Text>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    textPart2: {
        color: purple,
        fontSize: 40,
        fontWeight: "900"
    },
    textPart1: {
        fontWeight: "900",
        fontSize: 20,
        color: black
    }
});