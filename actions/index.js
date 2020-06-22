
export const GET_DECKS = "GET_DECKS";
export const SAVE_DECK = "SAVE_DECK";
export const SAVE_CARD = "SAVE_CARD";



/*
 *  Get decks from redux store
 */
export function receiveDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    };
}

/*
 *  Save decks to redux store in below format:
 *  [deck title]: {
 *                  deck title: deck title,
 *                  questions: []
 *                  }
 */
export function saveDeck(deck) {
    return {
        type: SAVE_DECK,
        deck
    };
}

/*
 *  Save card to its deck in  redux store by pulling the deck from redux store and pushing the card into questions array
 */
export function saveCard(title, card) {
    return {
        type: SAVE_CARD,
        title,
        card
    };
}




