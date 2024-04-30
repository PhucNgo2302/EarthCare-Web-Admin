import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TopCards from "./components/TopCards";
import { auth } from "./config/firebase";
import { GetServerSidePropsContext } from "next";


export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <Sidebar> 
        <Header />
        <TopCards />
      </Sidebar>
      
    </main>
  )
}
