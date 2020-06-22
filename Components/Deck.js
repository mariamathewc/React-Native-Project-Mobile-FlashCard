import React, { Component } from "react";
import { View, Text, TouchableOpacity,  StyleSheet, Animated } from "react-native";
import { connect } from "react-redux";
import { purple,   white,  } from "../utils/colors";


/*
 * This component display deck details
 */ 
class Deck extends Component {

    state = {
        bounceValue: new Animated.Value(1),
    };

    /*
     * This component routes user to NewCard component
     */
    handleAddCards = () => {
        const { route } = this.props;
        const { title } = route.params;
        this.props.navigation.navigate(
            "NewCard", {
            title: title
        }
        )
    }

/*
 * This component routes user to Quiz component
 */
    handleQuiz = () => {
        const {  route } = this.props;
        const { title } = route.params;
        this.props.navigation.navigate(
            "Quiz", {
                    title: title
                     }
        )
    
    }

    render() {
        const {  route, decks } = this.props;
        const {  bounceValue } = this.state;

        const { title } = route.params;

        Animated.sequence([
            Animated.timing(bounceValue, { duration: 1000, toValue: 2.00 }),
            Animated.spring(bounceValue, { toValue: 1, friction: 5 })
        ]).start()

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>

                    <View style={styles.deckCard}>
                        <Animated.Text style={[styles.deckName, { transform: [{ scale: bounceValue }] }]}>
                       
                            {title}
                            
                        </Animated.Text>
                        <Text >{decks[title].questions.length} cards</Text>
                    </View>
                    
                    <View style={styles.btnGroupContainer}>

                        <TouchableOpacity style={styles.btn} onPress={() => this.handleAddCards()} >
                            <View style={[{ marginBottom: 30 }, styles.btnContainer]}>
                                <Text style={styles.btnText}>Add Card </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn} onPress={() => this.handleQuiz()}  >
                            <View style={[{ marginTop: 30 }, styles.btnContainer]}>
                                <Text style={styles.btnText}>Quiz</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        justifyContent: "space-between"
    },
    btn: {
      
        flexDirection: "row",
        alignItems: "center",
        
    },
    btnGroupContainer: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: '10%',
        paddingRight: '20%',
        width: '100%',
        paddingTop: '10%',
        alignItems: "center"
    },
    deckCard: {
        alignItems: "center",
        backgroundColor: '#6d74a8',
        color: "white",
        borderRadius: Platform.OS === "ios" ? 50 : 10,
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
    btnContainer: {
        flex: 1,
        textAlign: "center",
        backgroundColor: purple,
        marginLeft: 20,
        padding: 10,
        borderRadius: 7,
        alignItems: "center"
    },
    btnText: {
        color: white,
        fontSize: 20
    }
});

function mapStateToProps(decks) {

    return {
        decks,

    };
}

export default connect(mapStateToProps)(Deck);