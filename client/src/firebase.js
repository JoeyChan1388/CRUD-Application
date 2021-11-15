import firebase from 'firebase/app';
import 'firebase/auth';

// Important firebase stuff for initializing authenication API
const app = firebase.initializeApp({
	apiKey: 'AIzaSyDSdY28sUETBbVwtAziS5fKd1wst7X5bDQ',
	authDomain: 'hot-rides-auto-expo.firebaseapp.com',
	projectId: 'hot-rides-auto-expo',
	storageBucket: 'hot-rides-auto-expo.appspot.com',
	messagingSenderId: '587459315008',
	appId: '1:587459315008:web:e03a6ae9d53866f483e6a5'
});

// Export to be used in different components
export const auth = app.auth();
export default app;
