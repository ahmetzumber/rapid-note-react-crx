console.log('content script')
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from "firebase/firestore"
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
let data;
initializeApp(firebaseConfig);
const db = getFirestore();
let paragraphs = document.getElementsByTagName('p');
let lists = document.getElementsByTagName('li');
onSnapshot(doc(db, "Search", "Note"), (doc) => {
    for (let elt of paragraphs) {
        for (let list of lists) {
            if (elt.textContent.includes(doc.data().Text)) {
                elt.style.backgroundColor = "yellow";
                elt.scrollIntoView();
            }
            else if(list.textContent.includes(doc.data().Text)){
                list.style.backgroundColor = "yellow";
                list.scrollIntoView();
            }
        }
    }

});
