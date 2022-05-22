import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  query,
  where
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

let projectCollection = [];

chrome.runtime.onInstalled.addListener(async () => {
  let userEmail = localStorage.getItem("email")
  const q = query(collection(db, "members"), where("email", "==", userEmail));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    projectCollection = doc.data().accessible_projects

  });
  const projects = query(collection(db, "project"), where("status", "!=", "available"));
  const projectSnapshot = await getDocs(projects);
  projectSnapshot.forEach((doc) => {
    for (var i = 0; i < projectCollection.length; i++) {
      if (projectCollection[i] == doc.data().project_name) {
        projectCollection.splice(i, 1);
        i--;
      }
    }
    console.log(projectCollection)
  });
  let contextItems = [];
  contextItems.push({ id: 'create', title: 'Save as a New Project' });
  contextItems.push({ id: 'route', title: 'Go To Rapid Note App' });

  projectCollection.forEach((doc) => {
    let obj = { id: doc, title: "Save to " + doc }
    contextItems.push(obj);
    obj = {}
  });
  console.log(contextItems)

  for (let i in contextItems) {
    if (contextItems[i].title == 'Save as a New Project') {
      chrome.contextMenus.create({
        "id": contextItems[i].id,
        "title": contextItems[i].title,
        "type": "normal",
        "contexts": ["selection"],
      })
    }
    else if (contextItems[i].title == 'Go To Rapid Note App') {
      chrome.contextMenus.create({
        "id": contextItems[i].id,
        "title": contextItems[i].title,
        "type": "normal",
        "contexts": ["selection"],
      })
    }
    else {
      chrome.contextMenus.create({
        "id": contextItems[i].id,
        "title": contextItems[i].title,
        "type": "normal",
        "contexts": ["selection"],
      })

      const q = collection(db, "project", contextItems[i].id, "subCollection");
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc !== null) {
            chrome.contextMenus.create({
              title: "Save to " + doc.id,
              parentId: contextItems[i].id,
              id: doc.id,
              contexts: ["selection"]
            });
          }
        });
      });

      chrome.contextMenus.create({
        "id": contextItems[i].id + "CreateSub",
        "title": 'Save as a New Sub Folder',
        "parentId": contextItems[i].id,
        "type": "normal",
        "contexts": ["selection"],
      })
      chrome.contextMenus.create({
        "id": contextItems[i].id + "sub",
        "parentId": contextItems[i].id,
        "title": contextItems[i].title,
        "type": "normal",
        "contexts": ["selection"],
      })
    }
  }

  chrome.contextMenus.onClicked.addListener(async readData => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, async tabs => {
      let pageUrl = tabs[0].url;
      // use `url` here inside the callback because it's asynchronous!

      if (readData.menuItemId === "create") {

        let message = 'Please enter a Project Name'
        let result = window.prompt(message);

        try {
          let note = { data: readData.selectionText, data_url: pageUrl }

          const projectRef = doc(db, "project", result)
          const docRef = await setDoc(projectRef, {
            project_name: result,
            status: "available"
          });
          await updateDoc(projectRef, {
            Notes: arrayUnion(note)
          })
          let userEmail = localStorage.getItem("email");
          const userRef = doc(db, "members", userEmail);
          await updateDoc(userRef, {
            accessible_projects: arrayUnion(result),
            co_projects: arrayUnion(result)
          });

          if (docRef !== null)
            window.open('http://localhost:8080/')

          console.log("Written document: ", docRef);
        } catch (e) {
          console.error("Error adding document: ", e);
        }


      }
      else if (readData.menuItemId.includes("CreateSub")) {
        let message = 'Please enter a Project Name'
        let result = window.prompt(message);

        try {
          let note = { data: readData.selectionText, data_url: pageUrl }

          const projectRef = doc(db, "project", readData.parentMenuItemId, "subCollection", result)
          const docRef = await setDoc(projectRef, {
            project_name: result
          });
          await updateDoc(projectRef, {
            Notes: arrayUnion(note)
          })

          if (docRef !== null)
            window.open('http://localhost:8080/')

          console.log("Written document: ", docRef);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
      else if (readData.menuItemId === "route") {
        window.open('http://localhost:8080/')
      }
      else {
        console.log(readData.selectionText)
        console.log(pageUrl)

        let note = { data: readData.selectionText, data_url: pageUrl }
        if (readData.menuItemId.includes("sub")) {
          const projectRef = doc(db, "project", readData.parentMenuItemId)
          await updateDoc(projectRef, {
            Notes: arrayUnion(note)
          })
        }
        else {
          const projectRef = doc(db, "project", readData.parentMenuItemId, "subCollection", readData.menuItemId)
          await updateDoc(projectRef, {
            Notes: arrayUnion(note)
          })

        }
      }
    });
  }) // contextMenus.onClicked
}) // chrome.runtime.onInstalled

