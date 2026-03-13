import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const ORDERS_COLLECTION = "orders";

export async function createOrderInFirebase(order) {
  const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
    ...order,
    createdAt: new Date().toISOString(),
  });

  return {
    id: docRef.id,
    ...order,
  };
}

