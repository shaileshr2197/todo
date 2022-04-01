importScripts("https://www.gstatic.com/firebasejs/9.6.9/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.9/firebase-messaging-compat.js");
firebase.initializeApp({
    apiKey: "AIzaSyBkRhVE9cI1fx4zFVHEoWJFccuJbgi1MGo",
    authDomain: "todoapp-2345c.firebaseapp.com",
    projectId: "todoapp-2345c",
    storageBucket: "todoapp-2345c.appspot.com",
    messagingSenderId: "336484105663",
    appId: "1:336484105663:web:7cceb41132586b533ab50a",
    measurementId: "G-WK73XLV7YD"
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload)=>{
    console.log('Message received background. ', payload);
    // this.notification.displayNotification(payload.notification?.title,payload.notification)
})