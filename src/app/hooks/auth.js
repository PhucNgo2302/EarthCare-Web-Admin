import { auth,googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup,signOut} from "firebase/auth";
import { useState } from "react";


export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    const signIn = async()=> {
        await createUserWithEmailAndPassword(auth, email, password)
    }
    const signInWithGoogle = async()=> {
        await signInWithPopup(auth, googleProvider)
    }

    const signOut = async()=> {
        await signOut(auth)
    }
}