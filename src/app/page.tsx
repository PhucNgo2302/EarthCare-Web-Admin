import Link from "next/link";



export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-200 to-cyan-700">
      {/* Logo placed outside the content container */}      
      <div className="relative z-20"> {/* Content container */}
        <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-4 text-cyan-800">Welcome to Admin Page</h1>
          <div className="text-center">
            <Link href="/dashboard">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
