import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const RESERVATIONS_COLLECTION = "reservations";

export async function createReservationInFirebase(reservation) {
  const docRef = await addDoc(collection(db, RESERVATIONS_COLLECTION), {
    ...reservation,
    createdAt: new Date().toISOString(),
    status: reservation.status ?? "pending",
  });

  return {
    id: docRef.id,
    ...reservation,
  };
}

export async function getReservationsFromFirebase({ date } = {}) {
  let colRef = collection(db, RESERVATIONS_COLLECTION);

  if (date) {
    const q = query(colRef, where("date", "==", date));
    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  const snap = await getDocs(colRef);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

