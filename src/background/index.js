import { initializeApp } from 'firebase/app';
import { getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore"
import { 
  getAuth
 } from "firebase/auth"; 


// Set the configuration for your app
// TODO: Replace with your project's config object
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



chrome.runtime.onInstalled.addListener(async () => {

  const projectCollection = await getDocs(collection(db, "project"));

  let contextItems = [];
  contextItems.push({ id: 'create', title: 'Save as a New Project'});

  projectCollection.forEach((doc) => {
    let obj = { id: doc.id, title: "Save to "+doc.id }
    contextItems.push(obj);
    obj = {}    
  });


  for (let i in contextItems){
    chrome.contextMenus.create({
      "id": contextItems[i].id,
      "title": contextItems[i].title,
      "type": "normal",
      "contexts": ["selection"],
    })
  }

  chrome.contextMenus.onClicked.addListener( async readData => {

      if (readData.menuItemId === "create") {

        let message = 'Please enter a Project Name'
	      let result = window.prompt(message);

        try {
          let note = { data: readData.selectionText, data_url: readData.pageUrl }

          const projectRef = doc(db, "project", result)
          const docRef = await setDoc(projectRef, {});
          await updateDoc(projectRef, {
            Notes: arrayUnion(note)
          })

          if (docRef !== null) 
            window.open('http://localhost:8081/')
          
          console.log("Written document: ", docRef);
        } catch (e) {
          console.error("Error adding document: ", e);
        }

               
      }
      else {
        console.log(readData.selectionText)
        console.log(readData.pageUrl)

        let note = { data: readData.selectionText, data_url: readData.pageUrl }

        const projectRef = doc(db, "project", readData.menuItemId)
        await updateDoc(projectRef, {
          Notes: arrayUnion(note)
        })

      }
  }) // contextMenus.onClicked
}) // chrome.runtime.onInstalled

