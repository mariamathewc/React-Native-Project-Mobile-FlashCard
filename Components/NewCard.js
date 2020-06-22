import React, { Component } from "react";
import {View, Text, StyleSheet, TextInput, Platform, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard,  KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import { saveCard } from "../actions";
import { addCardToDeck } from "../utils/api";
import { purple, white, gray } from "../utils/colors";


/*
 * This function allow users to add new card to deck
 */ 
class NewCard extends Component {

    state = {
        question: "",
        answer: "",  
    };

    /*
     * This function updates the state of question
     */ 
    handleUpdateQuestion = (value) => {
       
        this.setState({
            question: value

        });
    };

/*
 * This function updates the state of answer
 */
    handleUpdateAnswer = (value) => {

        this.setState({
            answer: value

        });
    };

/*
 *  This function allow user to make a valid entry in card. Alert is thrown when null value is inserted
 */ 
    handlerSubmit = () => {
        const { question, answer } = this.state;
        const { route, dispatch, } = this.props; 
        const { title } = route.params;

       
        if (question === "" || answer === "") {
            Alert.alert('Warning', 'Please enter Question and Answer')
            return
        }

        else  {
            
            const card = { question, answer };
            
            dispatch(saveCard(title, card));

            
            addCardToDeck(title, card);
            
            this.setState({
                answer: "",
                question: "",

            });
          
            this.props.navigation.goBack()
        }
    };

    /*
     * This function routes back to deck
     */ 
    handlerToDeck = () => {
        this.props.navigation.goBack()
    };

    render() {
        const { question, answer } = this.state;

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null} enabled    >

                    <Text style={styles.headerText}>Add new card </Text>
                    <Text style={{ color: gray, alignSelf: "flex-start", marginBottom: 50 }}  >
                        Enter card details below
                    </Text>

                    <View style={styles.formContainer}>

                        <TextInput
                            style={[styles.textInput, { marginBottom: 70 }]}
                            placeholder="Question"
                            value={question}
                            onChangeText={(value) =>  this.handleUpdateQuestion(value)  }
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Answer"
                            value={answer}
                            onChangeText={(value) => this.handleUpdateAnswer(value) }
                        />

                    </View>

                    <View style={styles.btnContainer}>
                        
                        <TouchableOpacity onPress={() => this.handlerSubmit()}  style={  Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn }  >
                            <Text style={styles.btnText}>Submit</Text>
                        </TouchableOpacity>

                        <View style={{ margin: 5 }} />
                        <TouchableOpacity onPress={() => this.handlerToDeck()} style={[ Platform.OS === "ios"  ? styles.iosSubmitBtn  : styles.androidSubmitBtn, { backgroundColor: gray }  ]} >
                            <Text style={[styles.btnText]}>Close</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        );
    }
}

function mapStateToProps(decks, { route }) {
    const deck = decks[route.params.title];
    const title = deck.title;
    
    return {
        deck,
        title,
    };
}
export default connect(mapStateToProps)(NewCard);

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "flex-end",
        margin: 20,
        marginTop: 50,
        flex: 1
    },
    btnText: {
        fontSize: 20,
        color: white,
        
        
    },
    headerText: {
        color: purple,
        fontSize: 30,
        fontWeight: "900",
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        marginBottom: 10
    },
    formContainer: { flex: 2, width: `100%`, justifyContent: "flex-start" },
    btnContainer: { flex: 0, width: `100%`, justifyContent: "flex-end" },
    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: purple,
        paddingBottom: 10,
        width: "100%",
        fontSize: 17
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: "100%",
        marginTop:"10%",
        alignItems: "center"
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        alignSelf: "flex-end"
    }
});