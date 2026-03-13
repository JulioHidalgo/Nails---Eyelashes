import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

// Usamos directamente la colección "products" de Firestore
const SERVICES_COLLECTION = "products";

export async function getServicesFromFirebase() {
  const snap = await getDocs(collection(db, SERVICES_COLLECTION));

  return snap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      category: data.category,
      price: data.price,
      image: data.image,
      description: data.description,
      duration: data.duration,
      isActive: data.isActive ?? true,
    };
  });
}

