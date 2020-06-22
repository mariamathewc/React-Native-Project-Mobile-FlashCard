// helper functions for notification

import {  AsyncStorage } from 'react-native';
import { Notifications } from 'expo'
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "MobileFlashCard:notifications";

/*
 * Removes "NOTIFICATION_KEY" from asyncstorage and then cancel all scheduled notifications
 */ 
export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

/*
 * Create and returns an object that represents local notifications
 */ 
function createNotification() {
    return {
        title: 'Keep Learning!!!',
        body: "👋 don't forget to study!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: "high",
            vibrant: true,
            sticky: false
        }
    }
}

/*
 * If local notification is not set and if status is granted, first we cancel all notifications to avoid multiple notifications
 * We create a date object that represent tommorow 8:00pm and call schedule local notificaton async and pass createNotification()
 * and notification time details and store it in local storage
 */ 
export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === "granted") {
                            Notifications.cancelAllScheduledNotificationsAsync();

                        let tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate() )
                        tomorrow.setHours(0)
                        tomorrow.setMinutes(19)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )
                                

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                    }
                });
            }
        });
}