import {AsyncStorage} from 'react-native';
import {Notifications, Permissions} from 'expo';

export const DECK_STORAGE_KEY = 'udaci-mobile-flashcards:deck';
export const NOTIFICATION_KEY = 'udaci-mobile-flashcards:notification';


// Data is organized in 
// Object of decks
// each deck consists of 1. deckId and and array of cards.
// each question has questiona and answer
let seedData = {
    India: {
        deckId: 'India',
        cards: [
            {
                question: 'What is The capital?',
                answer: 'New Delhi',
            },
            {
                question: 'Largest City?',
                answer: 'Mumbai',
            }
        ]
    },

    USA: {
        deckId: 'USA',
        cards: [
            {
                question: 'What is The capital?',
                answer: 'Washington DC',
            },
            {
                question: 'Largest City?',
                answer: 'New York',
            }
        ]
    }
};

export function getDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            if (!results) {
                AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(seedData));
                return seedData;
            } else {
                return JSON.parse(results);
            }
        });
}

export function addNewDeck(deck) {
    //console.log('--deck--' + deck);
    //console.log('--deck.stringify--' + JSON.stringify(deck));

    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck));
}

export function addCardToDeck(card, deckId) {
    //console.log('----' + card);
    //console.log('----' + card.question);
    //console.log('----' + card.answer);
    //console.log('----' + deckId);
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            let decks = JSON.parse(results);

            decks[deckId].cards.push(card);

            AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
                [deckId]: {
                    deckId: deckId,
                    cards: decks[deckId].cards
                }
            }));
        });
}

export function clearLocalNotifications() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync());
}

export function createNotification() {
    return {
        title: 'Review your flashcards!',
        body: "👋 Don't forget to review flashcards and take quiz!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(data => JSON.parse(data))
        .then((data) => {
            if (data == null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(20);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            );

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    });
            }
        })
}