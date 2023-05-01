import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

export const version = '1.2.0';
export const navbarBreakPoint = 'xl'; // Vertical navbar breakpoint
export const topNavbarBreakpoint = 'lg';
export const settings = {
  isRTL: false,
  isDark: false,
  navbarPosition: 'vertical',
  showBurgerMenu: false, // controls showing vertical nav on mobile
  isNavbarVerticalCollapsed: false, // toggle vertical navbar collapse
};

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
const firebaseAppConfig = initializeApp(firebaseConfig);

export const firestoreAuth = getAuth(firebaseAppConfig)

export const OmnifoodServer = getFirestore(firebaseAppConfig)

export default { version, navbarBreakPoint, topNavbarBreakpoint, settings };
