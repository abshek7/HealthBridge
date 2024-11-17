import firestoreDatabase from "../firebaseconfig";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import CryptoJS from "crypto-js";

export const createUser = async (payload) => {
  try {
 
    const qry = query(collection(firestoreDatabase, "users"), where("email", "==", payload.email));
    const querySnapshot = await getDocs(qry);

    if (querySnapshot.size > 0) {
      throw new Error("User already exists");
    }
    
    const secretKey = import.meta.env.VITE_CRYPTO_SECRET_KEY
    const hashedPassword = CryptoJS.AES.encrypt(payload.password,secretKey).toString();
    payload.password = hashedPassword;

     await addDoc(collection(firestoreDatabase, "users"), payload);

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred while creating the user",
    };
  }
};


export const loginUser = async (payload) => {
  try {
     const qry = query(collection(firestoreDatabase, "users"), where("email", "==", payload.email));
    const userSnapshots = await getDocs(qry);

     
    if (userSnapshots.size === 0) {
      throw new Error("User not found");
    }
 

    const user = userSnapshots.docs[0].data();
    const id = userSnapshots.docs[0].id;
    const secretKey = import.meta.env.VITE_CRYPTO_SECRET_KEY;
    const bytes = CryptoJS.AES.decrypt(user.password,  secretKey);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

   
    if (originalPassword !== payload.password) {
      throw new Error("Invalid password");
    }

     return {
      success: true,
      message: "User logged in successfully",
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred while logging in",
    };
  }
};