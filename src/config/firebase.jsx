import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCWn7NohCaJT8cSc0BjBBKgxtKGO45hRsk",
  authDomain: "iot-project-49e41.firebaseapp.com",
  databaseURL: "https://iot-project-49e41.firebaseio.com",
  projectId: "iot-project-49e41",
  storageBucket: "iot-project-49e41.appspot.com",
  messagingSenderId: "517725428759"
};
export default (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app());
