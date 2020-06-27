import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
//import { clearLocalNotification, setLocalNotification } from "../utils/helpers";
import {  black, purple } from "../utils/colors";
import ScoreBoard from "./ScoreBoard";

/*
 * This component is used to displays quiz to users
 */
class Quiz extends Component {

    state = {
        currentQuestion: 0,
        totalScore: 0,
        displayAnswer: false,
        quizOver: false
    };



 /*
  * The function  accepts a parameter "ans". If "ans" is true, we increment totalScore & currentQuestion by 1.
  * If "ans" is false,  we increment currentQuestion by 1.
  * if "currentQuestion + 1 === totalQuestions", we mark quizOver as "true", which then displays the results
  */
    onSubmitAnswer = (ans) => {
        const { currentQuestion, totalScore, quizOver } = this.state
        const { totalQuestions } = this.props

        if (ans === true) {
            if (currentQuestion + 1 < totalQuestions ) {
                this.setState(() => ({
                    currentQuestion: currentQuestion + 1,
                    totalScore: totalScore+1,
                }))
            }
            else {
                this.setState(() => ({
                    quizOver: true,
                    totalScore: totalScore + 1,
                }))
            }
        }
        if (ans === false) {
            if (currentQuestion + 1 < totalQuestions ) {
                this.setState(() => ({
                    currentQuestion: currentQuestion + 1,
                    
                }))
            }
            else {
                this.setState(() => ({
                    quizOver: true,
                }))
            }
        }


    }

    /*
     * This function reset the state of quiz so that user can play again
     */ 
    handleReset() {
        this.setState({
            currentQuestion: 0,
            totalScore: 0,
            displayAnswer: false,
            quizOver: false
        });
    }

    /*
     * This function toggles question and answer
     */
    handleToggle() {
        const { displayAnswer } = this.state
        this.setState(() => ({
            displayAnswer: !displayAnswer,
        }))
    }
/*
 * The below code is commented out as ios throws warning "Ability to schedule an automatically repeated notification is deprecated on iOS and will be removed in the next SDK release."
 */ 
/*   componentDidMount() {
       
        clearLocalNotification()
            .then(setLocalNotification)
    }*/
  

    render() {

        const {  totalQuestions, questions, navigation } = this.props;
        const { currentQuestion, displayAnswer, quizOver, totalScore } = this.state;
        
        /*
         * This function navigates the user back to Deck 
         */ 
        const backBtn = (
            <TouchableOpacity  onPress={() => navigation.goBack()} style={styles.backBtns} >
                <Text style={styles.back}>Back to Deck</Text>
            </TouchableOpacity>
        );

    /*
     * This function navigates the user back to ScoreBoard
     */
        const results = (
            <View style={styles.questionFormat}>
                <ScoreBoard totalScore={totalScore} totalQuestions={totalQuestions} />
            </View>
        );

        
        if (totalQuestions === 0) {
            return (
                <View style={styles.container}>
                    
                    <View style={styles.quesView}>
                        <View  style={[styles.questionContainer, { justifyContent: "center" }]}  >
                            <Text style={{ fontSize: 30, textAlign: "center", padding: 20 }}>
                                Come back after adding cards to deck 
                            </Text>
                        </View>
                        {backBtn}
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.container}>

                <View style={styles.quesView}>
                    <View style={styles.questionContainer}>

                        <Text style={styles.questionNumber}>
                            {currentQuestion + 1}/{totalQuestions}
                        </Text>

                        {quizOver ?
                            results
                            : displayAnswer ? (<Text style={styles.cardToggle}>{questions[currentQuestion].answer}</Text>)
                                : (<Text style={styles.cardToggle}>{questions[currentQuestion].question}</Text>)
                        }
                    </View>

                    <View style={{ flex: 1, }}>
                        {!quizOver ?
                            (<TouchableOpacity onPress={() => this.handleToggle()}>
                                <Text style={styles.checkFormat}>Show Answer</Text>
                            </TouchableOpacity>
                            )
                            : null
                        }
                    </View>

                    {!quizOver ?
                        (<View style={styles.btnGroupContainer}>

                            <TouchableOpacity style={styles.btnContainer} onPress={() => this.onSubmitAnswer(true)}    >
                                <Text style={[{ color: "white" }, { fontSize: 24 }]} >CORRECT</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnContainer} onPress={() => this.onSubmitAnswer(false)}    >
                                <Text style={[{ color: "white" }, { fontSize: 24 }, ]} >INCORRECT</Text>
                            </TouchableOpacity>

                        </View>
                        )
                        : (<View>
                            <TouchableOpacity style={{ alignSelf: "center", marginBottom: 18 }} onPress={() => this.handleReset()}  >
                                <Text style={styles.back}>Restart quiz</Text>
                            </TouchableOpacity>
                            {backBtn}
                        </View>
                        )
                    }
                </View>
            </View>
        );
    }
}

function mapStateToProps(decks, { route }) {
    const deck = decks[route.params.title];
    const totalQuestions = deck.questions.length;

    return {
        deck,
        totalQuestions,
        questions: deck.questions
    };
}


export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
    container: { margin: 20, flex: 1, justifyContent: "flex-start" },
    questionContainer: {
        height: 300,
        width: "90%",
        backgroundColor: '#6d74a8',
        borderColor: black,
        borderBottomWidth: 2,
        borderRadius:20,
        borderTopWidth: 2,
        alignSelf: "center",
        paddingTop: 10,
        paddingBottom: 20,
        marginTop: 20,
        alignItems: "center"
    },
    quesView: {
        flex: 1,
        justifyContent: "space-between" 
    },
    cardToggle: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 90,
        paddingLeft: 10,
        fontSize:24,

    },

    questionNumber: {
        alignSelf: "flex-end",
        padding: 5,
        marginBottom: 5,
        color: purple,
        fontWeight: "900"
    },
    questionFormat: {
        flex: 1,
        marginBottom: 20,
        backgroundColor: "#F5F5F5",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    checkFormat: {
        fontWeight: "900",
        fontSize:18,
        color: purple,
        marginTop: 50,
        justifyContent: "center",
        marginLeft: 100,
        paddingLeft: 40
        
    },
    btnGroupContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-end",
        
    },
    btnContainer: {
        flex: 1,
        textAlign: "center",
        borderColor: purple,
        borderWidth: 2,
        margin: 5,
        height: 45,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2b3054"
    },
    backBtns: {
        alignSelf: "center",
        justifyContent: "flex-end",
        height: 200,
        
    },
   
    back: {
        color: purple,
        fontWeight: "900",
        fontSize: 25
    }
});