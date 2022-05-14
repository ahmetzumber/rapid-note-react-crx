import React from 'react'
import { useState } from 'react';
import { 
  Middle,
  Button,
  Input,
  Label,
  WrapperDiv,
  TitleDiv,
  HeadDiv
} from './Styled.js'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { initializeApp } from 'firebase/app';
import { getFirestore, 
  collection, 
  getDocs,
  getDoc,
  doc, 
  setDoc
} from "firebase/firestore"
import { 
  getAuth,
  signInWithPopup,
  GoogleAuthProvider
 } from "firebase/auth"; 

const firebaseConfig = {
    apiKey: "AIzaSyCAAnIWGjZ4eczEqvmcxlOEb1ZvZAIVwUY",
    authDomain: "note-application-bbacc.firebaseapp.com",
    databaseURL: "https://note-application-bbacc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "note-application-bbacc",
    storageBucket: "note-application-bbacc.appspot.com",
    messagingSenderId: "813349799108",
    appId: "1:813349799108:web:bc44d2552bd63a7faeb591",
    measurementId: "G-71ETHEM64C"
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

const App = () => {

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [isLoginSuccesfull, setIsLoginSuccesfull] = useState(false);

  const addUser = async (userName, userMail) => {
    await setDoc(doc(db, "members", userName), {
      username: userName,
      email: userMail,
    });
    console.log("ekledim");
  }

  const signIn = e => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        const docRef = doc(db, "members", user.email);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          await addUser(user.email,user.displayName);
        }
        setIsLoginSuccesfull(true)
        window.alert('Succesfull login !!')
        window.location.replace("/user")
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const routeCreateAccount = () => {
    window.open(
      "https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp"
    );
  }


  return (
    <div style={{ width:350, height: 300, fontFamily:'Capriola' }}>
        {isLoginSuccesfull?
          <Middle>
            <Box sx={{ display: 'flex' }} style={{ placeContent: 'center', position: 'relative' }}>
              <CircularProgress color="secondary"/>
            </Box>
            <br/><br/>
            <div style={{ display: 'flex', placeContent: 'center', fontSize: 14, color: '#220B57' }}>
              Succesfully login..
            </div><br/>
            <div style={{ fontSize: 14, color: '#220B57' }}>
              Your service working at background !!
            </div>
          </Middle>
          :
          <div>
            <div>
            <HeadDiv>
                <TitleDiv>Rapid Note</TitleDiv>
            </HeadDiv>
            </div>
            <WrapperDiv>
              <Button id="signIn" onClick={e => signIn(e)}>Log in with Google</Button>
              <Label>Don't you have an account?</Label>
              <Button id="signIn" onClick={() => routeCreateAccount()}>Create a Google Account</Button>
            </WrapperDiv>
          </div>
        }
        
    </div>
  )
}

export default App
