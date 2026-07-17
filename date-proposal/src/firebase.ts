import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  type Timestamp,
  type Firestore
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  type FirebaseStorage
} from "firebase/storage";
import type { PhotoItem } from "./types/photo";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const missingConfig = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

export const firebaseConfigured = missingConfig.length === 0;

if (!firebaseConfigured) {
  console.warn(
    `Firebase config missing: ${missingConfig.join(", ")}. Create a .env file from .env.example with your Firebase values.`
  );
}

const app: FirebaseApp | null = firebaseConfigured
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const db: Firestore | null = app ? getFirestore(app) : null;
export const storage: FirebaseStorage | null = app ? getStorage(app) : null;

export async function uploadPhotoFile(
  file: File,
  imageId: string,
  onProgress: (percent: number) => void
): Promise<string> {
  if (!storage) {
    throw new Error("Firebase Storage is not configured. Create a .env file from .env.example.");
  }

  const storageRef = ref(storage, `gallery/${imageId}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        onProgress(percent);
      },
      (error) => reject(error),
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}

interface PhotoPayload {
  imageUrl: string;
  caption: string;
  uploadedBy: string;
}

export async function savePhotoMetadata(payload: PhotoPayload) {
  if (!db) {
    throw new Error("Firestore is not configured. Create a .env file from .env.example.");
  }

  const photosRef = collection(db, "photos");
  await addDoc(photosRef, {
    ...payload,
    createdAt: serverTimestamp()
  });
}

export function subscribePhotoGallery(callback: (photos: PhotoItem[]) => void) {
  if (!db) {
    callback([]);
    return () => undefined;
  }

  const photosRef = collection(db, "photos");
  const photosQuery = query(photosRef, orderBy("createdAt", "desc"));
  return onSnapshot(photosQuery, (snapshot) => {
    const items: PhotoItem[] = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          imageUrl: data.imageUrl as string,
          caption: data.caption as string,
          uploadedBy: data.uploadedBy as string,
          createdAt: (data.createdAt as Timestamp) || serverTimestamp()
        };
      })
      .filter((item) => !!item.imageUrl);
    callback(items);
  });
}
