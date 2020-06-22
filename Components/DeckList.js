import React, { Component } from "react";
import { View, ScrollView, Text, TouchableOpacity,  StyleSheet, } from "react-native";
import { connect } from "react-redux";
import { fetchDecks } from "../utils/api";
import { receiveDecks } from "../actions";
import { gray, purple, black } from "../utils/colors";


/*
 * This component displays all the created decks as a list inside scroll view
 */ 
class DeckList extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        fetchDecks().then(decks => dispatch(receiveDecks(decks)));

    }

   
    render() {
        const { navigation, arr, decks } = this.props;

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}> Welcome to Flashcard </Text>

                            {arr.length > 0 ? ( <Text style={{ color: black }}>DECKS</Text> ) : null }
           
                    </View>

                    {arr.length === 0 ? (
                            <View style={styles.imageContainer}>
                                <Text style={styles.message}>   Add Decks  </Text>
                            </View>
                        )

                    : (
                        <View style={styles.decksListContainer}>
                            {arr.map(title => {
                                return (
                                    <TouchableOpacity key={title} onPress={() => navigation.navigate("Deck", { title: title })}  >

                                        <View style={styles.deckCard}>
                                            <Text style={styles.deckName}>{title}</Text>
                                            <Text >{decks[title].questions.length} cards</Text>   
                                        </View>

                                    </TouchableOpacity>
                                );
                            })}
                        </View>)



                    }

                </View>
            </ScrollView>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    decksListContainer: {
        flex: 1,
        justifyContent: "space-between"
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: "center"
    },
    imageContainer: {
        flex: 1,
        justifyContent: "space-between"
    },
    deckCard: {
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: Platform.OS === "ios" ? 8 : 2,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: "rgba(0,0,0,0.24)",
        shadowOffset: {
            width: 0,
            height: 3
        },
        height: 150,
        justifyContent: "center"
    },
    deckName: {
        fontSize: 25,
        color: purple,
        fontWeight: "bold"
    },
 
    message: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: 30,
        marginTop: 40,
        color: gray,
        fontWeight: "800"
    },
    title: {
        fontSize: 30,
        fontWeight: "900",
        textAlign: "center",
        color: '#07157a',
        marginBottom: 15
    },
 
});

function mapStateToProps(decks) {
    const arr = Object.keys(decks);
    return {
        decks,
        arr
    };
}

export default connect(mapStateToProps)(DeckList);