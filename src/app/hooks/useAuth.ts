import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebase'

const useAuth = () => {
    const [user,setLocalUer] = useState<Any | null>(null)
    
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user : any) => {
          if(user){
            console.log('there is a user')
            setLocalUer(user)
          }else{
            console.log('no user')
          }
      })  

      return () => unsubscribe()
    },[])
    
    return user
}

export default useAuth
