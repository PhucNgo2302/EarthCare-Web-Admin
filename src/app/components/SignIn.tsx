import React, { useState } from 'react';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth,db } from '../config/firebase';
import { collection, getFirestore }  from 'firebase/firestore'


const SignIn = () => {
    const [loading,setLoading] = useState<boolean>(false);

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      let email = e.currentTarget.email.value;
      let password = e.currentTarget.password.value;
      setLoading(true);

      signInWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        const user = userCredential.user;
        // Truy vấn Firestore để lấy thông tin về người dùng
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            if (userData.role === 0) {
                // Nếu vai trò là 0 (admin), cho phép đăng nhập
                console.log("User is admin. Logging in...");
            } else {
                // Nếu không, hiển thị thông báo lỗi
                console.log("You are not an admin. Access denied.");
            }
        } else {
            // Nếu không tìm thấy thông tin người dùng, hiển thị thông báo lỗi
            console.log("User data not found. Access denied.");
        }

        setLoading(false);

      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
      });

    }


  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">Your Logo</h1>
          <div className="bg-white shadow rounded-lg">
            <div className="px-5 py-7">
              <form onSubmit={handleSignIn}>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                <input type="email" name="email" required className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                <input type="password" name="password" required className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                <button
                  type="submit"
                  className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Login</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <p className="text-center mt-2 text-sm text-gray-600">Don't have an account? <Link href="/register" className='text-cyan-500'>Register</Link></p>
                <p>{loading ? "Signing in..." : ""}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;

