import admin from "firebase-admin";

import serviceAccount from "../../creds.json";

import { getFirestore } from "firebase-admin/firestore";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

export default db;
