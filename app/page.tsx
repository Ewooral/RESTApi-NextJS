import LandingPage from '@/components/LandingPage'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main 
    style={{
      backgroundImage: "linear-gradient(to right, red 10%, lightblue)" ,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}
    className='bg-gradient-to-tr'
    // className="flex h-screen flex-col bg-gradient-to-tr items-center graden font-extrabold text-4xl justify-between p-24"
    >
      {/* <h1 className='text-center'>PENTECOST UNIVERSITY <br /> 
      SCHOOL MANAGEMENT AND AUTOMATION SYSTEM...</h1>
      <Link href="/sign-up">
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
      Register or Sign Up
      </button>
      </Link> */}
      <LandingPage />
    </main>
  )
}
