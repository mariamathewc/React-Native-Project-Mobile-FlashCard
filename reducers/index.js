import { GET_DECKS, SAVE_DECK, SAVE_CARD } from "../actions";



function flashcards(state = {}, action) {
    switch (action.type) {
        case GET_DECKS:
            return {
                ...state,
                    ...action.decks
            };
        case SAVE_DECK:
            return {
                ...state,
                    [action.deck]: {
                        title: action.deck,
                        questions: []
                    }
            };
        case SAVE_CARD:
            return {
                ...state,
                    [action.title]: {
                        ...state[action.title],
                            questions: state[action.title].questions.concat(action.card)
                    }
            };

        default:
            return state;
    }
}

export default flashcards;