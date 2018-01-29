const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


firebase.initializeApp({
  apiKey: 'AIzaSyD4sWjCPjgzwNnDYpoyUSHOPV7aHeb-0ME',
  // authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: 'jobrefer-cec74'
});

export default firebase.firestore();