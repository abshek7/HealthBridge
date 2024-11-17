import { addDoc, collection } from "firebase/firestore";
import firestoreDatabase from "../firebaseconfig";

export const AddDoctor = async (doctor) => {
  try {
    await addDoc(collection(firestoreDatabase, "doctors"), doctor);
    
    return {
      success: true,
      message: "Doctor added successfully, please wait for the admin to approve your request",
    };
  } catch (e) {
    return {
      success: false,
      message: e.message,
    };
  }
};
