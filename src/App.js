import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Channel from './Channel';
import { firebase, db } from './firebase';

function App() {
  const user = useAuth()

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Channel />
    </div>
  ) : (
      <Login />
    );
}

function Login() {
  const [authError, setAuthError] = useState(null);

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      await firebase.auth().signInWithPopup(provider)
    } catch (error) {
      setAuthError(error)
    }
  };

  return (
    <div className="Login">
      <h1>Chat!</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
      {authError && (
        <div>
          <p>Sorry, there was a problem</p>
          <p><i>{authError.message}</i></p>
          <p>Please try again.</p>
        </div>
      )}
    </div>
  )
}

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        let { displayName, uid, photoUrl, email } = firebaseUser;
        photoUrl = photoUrl||"https://placekitten.com/64/64"
        const user = {
          displayName,
          uid,
          photoUrl,
          email
        }
        setUser(user);
        db
          .collection("users")
          .doc(user.uid)
          .set(user, { merge: true })
      } else {
        setUser(null)
      }
    })
  }, [])
  return user
}

export default App;
