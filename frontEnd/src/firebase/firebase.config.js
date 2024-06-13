// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{ApiKey,AuthDomain,ProjectId,StorageBucket,MessagingSenderId,AppId } from'./config'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: ApiKey,
  authDomain: AuthDomain,
  projectId: ProjectId,
  storageBucket: StorageBucket,
  messagingSenderId: MessagingSenderId,
  appId: AppId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;