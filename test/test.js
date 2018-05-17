require('dotenv').config();

var firebase = require("firebase-admin");

firebase.initializeApp({
  credential: firebase.credential.cert({
  	"projectId":process.env.FIREBASE_PROJECT_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.FIREBASE_URL
});

var db = firebase.firestore();

var utils = require('../index.js');

var labels = ['red','blue','yellow','green','black','white'];

setInterval(function(){
	utils.increment(db,'dummy');

	var click = labels[(Math.floor(Math.random() * labels.length -1) + 1)];
	utils.log(db,'dummy-sessions','fake-session',{'title':click,'message':Date.now()});
},1000);