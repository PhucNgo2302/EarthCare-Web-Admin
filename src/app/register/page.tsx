    "use client"
    import React, { useState } from 'react';
    import { IoArrowBack } from 'react-icons/io5';
    import Link from 'next/link';
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
    import { auth } from '../config/firebase';
    import { useRouter } from 'next/navigation'; // Import useRouter từ next/router
    import { addDoc, collection, getFirestore } from 'firebase/firestore';

    const Register = () => {
        const router = useRouter(); // Khởi tạo useRouter
        const [loading,setLoading] = useState<boolean>(false);

        const handleSignIn = (e: React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault()
            let email = e.currentTarget.email.value;
            let password = e.currentTarget.password.value;
            setLoading(true);
    
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            setLoading(false);
    
            })
            .catch((error) => {
            console.log(error)
            setLoading(false);
            });
    
        }
        const handleSignUp = () =>{
        let email = document.getElementsByName("email")[0] as HTMLInputElement;
        let password = document.getElementsByName("password")[0] as HTMLInputElement;
        setLoading(true);

        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async(userCredential) => {
            const user = userCredential.user
            const nameInput = document.getElementsByName("name")[0] as HTMLInputElement;
            const name = nameInput.value;
            const db = getFirestore();
            await addDoc(collection(db, "users"), {
                name: name,
                email: user.email,
                avatar: "none", // Thêm avatar của người dùng vào đây nếu có
                role: "0" // 0 là admin 1 là user
            });

            console.log(user)
            setLoading(false);
            // Redirect tới trang dashboard sau khi đăng ký thành công
            router.push('/dashboard');
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
            setLoading(false);
        });

        }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <h1 className="font-bold text-center text-2xl mb-5">Register</h1>
            <div className="bg-white shadow rounded-lg">
            <div className="px-5 py-7">
                <form onSubmit={handleSignIn}>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Name</label>
                <input type="text" name="name" required className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                <input type="email" name="email" required className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                <input type="password" name="password" required className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                <button
                    type="submit"
                    onClick={handleSignUp}
                    className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                    <span className="inline-block mr-2">Register</span>
                    <IoArrowBack className="inline-block w-4 h-4" />
                </button>
                </form>
                <p className="text-center mt-2 text-sm text-gray-600">Already have an account? <Link href="/dashboard"><span className="text-blue-500">Login</span></Link></p>
                <p>{loading ? "Signing in..." : ""}</p>
            </div>
            </div>
        </div>
        </div>
    )
    }

    export default Register;
