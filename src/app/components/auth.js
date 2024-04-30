"use client"
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

    return(
        <div>
            <input onChange={e => setEmail(e.target.value)} placeholder="E-mail"/>
            <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"/>
            <button onClick={signIn}>Sign in</button>
            <button onClick={signInWithGoogle}>Sign in with google</button>
            <button onClick={signOut}>Logout</button>
        </div>
    )
}

