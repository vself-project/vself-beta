import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { sha3_256 } from 'js-sha3';
// import 'firebase/storage';

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: String(process.env.FIREBASE_API_KEY),
  authDomain: String(process.env.FIREBASE_AUTH_DOMAIN),
  databaseURL: String(process.env.FIREBASE_DATABASE_URL),
  projectId: String(process.env.FIREBASE_PROJECT_ID),
  storageBucket: String(process.env.FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(process.env.FIREBASE_MESSAGING_SENDER_ID),
  appId: String(process.env.FIREBASE_APP_ID),
  measurementId: String(process.env.FIREBASE_MEASUREMENT_ID),
};

export const firebaseApp = initializeApp(firebaseConfig);
// export const storage = firebaseApp.storage();
// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);

export const uploadImageToFirebase = async (file: File): Promise<unknown> => {
  const arrayBuffer = await file.arrayBuffer();
  const hash = sha3_256(arrayBuffer);
  const fileExt = file.name.split('.').pop();
  const storageRef = ref(storage, `images/${hash}.${fileExt}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  return uploadTask.then(() => {
    return getDownloadURL(uploadTask.snapshot.ref);
  });
};
