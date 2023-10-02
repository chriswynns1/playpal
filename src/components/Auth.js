import { auth } from "../firebase-config"; // Import your Firebase authentication instance

export function checkUserAuthentication() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe(); // Unsubscribe to the observer to avoid memory leaks
      console.log("user auth status: ", user); // log auth status
      resolve(user); // Resolve with the user object if authenticated, or null if not
    }, (error) => {
      reject(error); // Reject with an error if there's an issue
    });
  });
}
