import React, { useState } from 'react';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredEmail = e.currentTarget.email.value;
    const enteredPassword = e.currentTarget.password.value;
    const userCollectionRef = collection(db, 'users');

    setLoading(true);

    // Kiểm tra xem người dùng có tồn tại không
    const q = query(userCollectionRef, where("email", "==", enteredEmail));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (doc) => {
        const userData = doc.data();
        if (userData.role == 0) {
          // Nếu người dùng tồn tại và có vai trò là 0 (admin), thực hiện đăng nhập
          try {
            await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
            console.log("User is admin. Logging in...");
            // Thực hiện chuyển hướng hoặc thực hiện các hành động sau khi đăng nhập thành công
          } catch (error) {
            console.log(error);
          }
        } else {
          // Nếu người dùng tồn tại nhưng không phải là admin, hiển thị thông báo lỗi
          console.log("You are not an admin. Access denied.");
          // Reset giá trị của email và password
          setEmail('');
          setPassword('');
        }
      });
    } else {
      // Nếu không tìm thấy thông tin người dùng, hiển thị thông báo lỗi
      console.log("User data not found. Access denied.");
      // Reset giá trị của email và password
      setEmail('');
      setPassword('');
    }

    setLoading(false);
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <img src="https://lh3.googleusercontent.com/fife/ALs6j_FVE9qaUembn0Ws9QUEUcORdWDa7kW0YvDTdMxGxS4IdFTmA36Ye4ix1dB-E1Atx3G0N24owN7UxEpwIBqJ7XtC4y0RzLeYYxjJi3o19D4nnx2Ib6xu-M6qKWaeelW8nYywp48MTDBf0jCEzZqVe-K7ZMHZ_-0muaVwOvU4TZkB1cH6NObKRTEhzSxyGhOZu5xeQgrgcWwmw9iXJLkg-aw77seI3mGwF34azUzCdagqjTmS0oM1kOFv2GOZPE602TPfzcimFut4fYUPC7Kz4Ro0CEXV49QmMXAICdvAGcgta_ZgtMtK9V4GGyNBmFcNVlZJ_amLUTbJFAsNvup-eu2LoFAnCKaFK63gyRou6Mfesh5RMvC0aoOrip2QEddDMzLNkpCPjKk2kSSXG1F0PLmfzJbCtsTwTVaUqqVRGHrqZAgtSif9e3Daftk_F3lywcqMPStLx5JDAqllbD96sYDjdHVLgpWyfpFJY2mrOJ0qizPIDdS-wUDSzaVzOCUDIZneTISVhtl_tnneLJ-YYtWVriBInUB6fpO1CCXrF0FD6H1GOtd-24vaGU5t2T9Sx2xG3yzB4OxMgktX62oEDu_sG0yiOw5PZzmGrWNCmmhT3oP1NrG0Jrts7_VxLx40lnMoIgwzWx987VdmTqlp8rpsQFb35nAPBTrGG6bMROgM3BHstKEJuqS5O5NfWM2MF1fZLyqjpfaVW5OjXX73zuL1tEh8oVj_eGy7u_aIeEvp48Q84H_ATdDEEOBxHx0Kle8aNice-JNMwSz9wCi84OZi2Z21nvoweFkJqO6UGdsAS4l-AgdY_w9JV8XxIyjpf4V69pPZUE23_FooeqQeQjkw16MKp_ipG_fkNlKb7udnONJPayh1XCQf85hpBAu59T2Y9E7FmLqwS_QmuUIp42dTeTuxPm3MLAKdA3sYiGDnnr2XiOClOpR4WE7qQloo05Ka221Mo4pLlX0dLzp-q2tKLljoEs-MaUwPQwoa1GdopRW0DRl4W4i330VcOOyZQvNYXeHK2Gid1I8jQ1s1SyKnJ4mGOYsgSWq6BxATf9RrtI4oS-AIpN1uj7Lkdu-rvjSvRvf944Jdmh2rUKYE0KQskba2TkIAVKw9yDtQN5mtKUYLmWL88eOkXT5BOBFIodfgNu-DnJMthDVWkzrSUsJYTRWRZ1_7x7-13lVomHA-h1fz7mbqejy232bibE4xfPZKJidpK4Qf-t-J31NbicqnfWefYBG-NcOS79xU5weZrdug25urPzmISoQmCqWxJY8T-q0kfVyZ3lPQ-cycDRpTjiOljSaPUV7l7dBDxaSu6j6ECbbmXHdJ6fmh6CbR3bJh8RBD2uoq05FCQ9wJE07GFx_6yCLnV3NCh9hRnWPrh00UbzEL3enLTM6jV2ZZVkLixeOOdp56zBE-pM_oJODL3aUyYqHL3MB4WV5oEeL-STNdZ40clrQ0O5zrvtkuhdnq8h97m3tvzOZ6AZY9sIA9fBn12r9TiJyUrkz2LSBKjntNGLiiD2nIFYirF4k5-WvkJ8vaUoI9MRmMf3H4KH3a1XuXLZ15cj2zZrthkBsOUwT9NR9QGnaGYDIGOPXNOsBqLieHeipHdc4Yl7rzQH_75zo6QmqbJeCd2ZSLGUQw69u2pkjXGN7yDBPsSwqJUrZuzu5dPayEv1XHLX0qsdv0Kmc=w1920-h917 " alt="Logo" className="absolute top-0 left-0 right-0 bottom-10 mx-auto w-2/5 md:w-1/2 lg:w-60 h-auto z-10" />
          <div className="bg-white shadow rounded-lg">
            <div className="px-5 py-7">
              <form onSubmit={handleSignIn}>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                <button
                  type="submit"
                  className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Login</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <p className="text-center mt-2 text-sm text-gray-600">Don&apos;t have an account? <Link href="/register" className='text-cyan-500'>Register</Link></p>
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
