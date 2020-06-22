import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, Alert, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { connect } from "react-redux";
import { saveDeckTitle } from "../utils/api";
import { saveDeck } from "../actions";
import {  white, purple } from "../utils/colors";

/* 
 * This component allows user to create a new deck
 */ 
class NewDeck extends Component {


    state = {
        title: ""
    };

    /*
     *  Update deck name
     */ 
    onChangeHandler = (value) => {
        this.setState({
            title: value
        });
    };

    /*
     * Throws alert if deck name is empty or if it already exists
     * else deck name is saved in local storage and redux store and then navigated to deck component
     */ 
    submitHandler = () => {
        const { navigation, dispatch, arr } = this.props;
        const { title } = this.state;

        if (title.trim() === "") {
            Alert.alert('Warning', 'Deck Title is required')
            return
        }

        else if (arr.includes(title)) {
            Alert.alert('Warning', 'Deck Title exists')
            return
        }

        else  {
            dispatch(saveDeck(title)); 
            saveDeckTitle(title);
            this.setState({
                title: ""
                
            });
            
            navigation.navigate("Deck", { title: title });
        }   
    };

    render() {
        const { title, } = this.state;

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}  >

                    <View style={styles.heading}> 
                        <Text style={styles.headingContent}>    Enter your Deck name   </Text>  
                    </View>

                    <View style={styles.deckBody}>
                        <TextInput
                            value={title}
                            style={styles.inputBox}
                            placeholder={"Deck name"}
                            onChangeText={value => this.onChangeHandler(value)}
                        />
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity  onPress={() => this.submitHandler()}  style={   Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
                            <Text style={{ color: white, fontSize: 20 }}>      Submit          </Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: .5,
        alignItems: "center",
        justifyContent: "flex-end",
        margin: 20
    },
    heading: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: '#6d74a8',
        borderRadius: Platform.OS === "ios" ? 30 : 2,
        padding: 30,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10, 
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: "rgba(0,0,0,0.24)",

        width: "100%"
    },
    headingContent: {
        fontSize: 30,
        textAlign: "center",
        marginBottom: 15
    },
    deckBody: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 60,
        marginTop:10,
        flex: 1,
        width: "100%"
    },
    inputBox: {
        borderBottomWidth: 2,
        borderBottomColor: purple,
        paddingBottom: 10,
        width: "70%",
        fontSize: 20
    },
    btnContainer: {
        width: "60%",
        paddingTop: 30,
        justifyContent: "flex-end"
    },
    iosSubmitBtn: {
        backgroundColor: '#07157a',
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: "100%",
        alignItems: "center"
    },
    androidSubmitBtn: {
        backgroundColor: '#07157a',
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45
    }
});

function mapStateToProps(decks) {
    const arr = Object.keys(decks);
    return {
        arr
    };
}


export default connect(mapStateToProps)(NewDeck);