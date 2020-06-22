import { AsyncStorage } from "react-native";
const LOCAL_STORAGE_KEY = "MobileFlashCard:decks";

/*
 *  Get decks from Async Storage 
 */ 
export function fetchDecks() {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
            return resolve(JSON.parse(results));
        } catch (e) {
            return reject(e);
        }
    });
}


/*
 *  Save decks to Async Storage in below format:
 *  [deck title]: {
 *                  deck title: deck title,
 *                  questions: []
 *                  }
 */
export function saveDeckTitle(title) {
    return new Promise(async (resolve, reject) => {
        try {
            await AsyncStorage.mergeItem(LOCAL_STORAGE_KEY, JSON.stringify({
                [title]: {
                    title: title,
                    questions: []
                }
            })
            )
            return resolve(true);
        } catch (e) {
            return reject(e);
        }
    });
}



/*
 *  Save card to its deck in  Async Storage  by pulling the deck from async storage and pushing the card into questions array
 */
export function addCardToDeck(title, newQuestion) {
    return new Promise(async (resolve, reject) => {
        try {
            await AsyncStorage.getItem(LOCAL_STORAGE_KEY)
                .then((results) => {
                    const data = JSON.parse(results);

                    Object.keys(data).map(titleKey => {
                        if (titleKey === title) {
                            data[titleKey].questions.push(newQuestion);
                        }
                    });
                    AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
                });
            return resolve(true);

        } catch (e) {
            return reject(e);
        }
    });
}










