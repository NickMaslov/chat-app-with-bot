import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/database'
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBTGVMrsqA7iFInq4WX2nHKCWhHn3Wyc2Y",
    authDomain: "chat-app-92ef5.firebaseapp.com",
    databaseURL: "https://chat-app-92ef5.firebaseio.com",
    projectId: "chat-app-92ef5",
    storageBucket: "chat-app-92ef5.appspot.com",
    messagingSenderId: "242275632827",
    appId: "1:242275632827:web:c57ed34d70b736e2"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const rtdb = firebase.database();

export function setupPresence(user){
    const isOfflineForRTDB ={ 
        state: 'offline', 
        lastChanged: firebase.database.ServerValue.TIMESTAMP
    }

    const isOnlineForRTDB ={ 
        state: 'online', 
        lastChanged: firebase.database.ServerValue.TIMESTAMP
    }

    const isOfflineForFirestore ={ 
        state: 'offline', 
        lastChanged: firebase.firestore.FieldValue.serverTimestamp()
    }

    const isOnlineForFirestore ={ 
        state: 'online', 
        lastChanged: firebase.firestore.FieldValue.serverTimestamp()
    }

    const rtdbRef = rtdb.ref(`/status/${user.uid}`)
    const userDoc = db.doc(`/users/${user.uid}`)

    rtdb.ref('.info/connected').on('value', async snapshot=>{
        if (snapshot.val() === false) {
            userDoc.update({
                status: isOfflineForFirestore
            })
            return;
        }

        await rtdbRef.onDisconnect().set(isOfflineForRTDB);
        rtdbRef.set(isOnlineForRTDB);
        userDoc.update({
            status: isOnlineForFirestore
        })
    })
}

export { db, firebase }