### Increments
Implements [distributed counters](https://firebase.google.com/docs/firestore/solutions/counters) (eg. likes, views) across a group of shards in a collection.

*First* configure firebase and create a firestore instance...
```
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

```

*Next* increment the counter on that collection
```
const firebaseUtil = require('fire-ace-of-base');
firebaseUtil.increment(db,'collection-name');
```

*Optional* define the # of shards (default is 20)
```
var shardCount = 100;
const firebaseUtil = require('fire-ace-of-base');
firebaseUtil.increment(db,'collection-name',shardCount);
```

---

## Logs
> For logging an array of events across shard cluster.

*First* configure firebase and create a firestore instance...
```
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

```

*Next* log an event to a session inside the sessions collection
```
const firebaseUtil = require('fire-ace-of-base');
var json = {} // any json data you want to append to the 'events' array for the session.
firebaseUtil.log(db,'sessions','session-unique-id',json);
```

*Optional* define the # of shards (default is 5)
```
var shardCount = 100;
const firebaseUtil = require('fire-ace-of-base');
firebaseUtil.log(db,'sessions','session-unique-id',shardCount);
```