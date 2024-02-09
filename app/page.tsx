import Image from 'next/image'

export default function Home() {
  return (
    <main 
    style={{
      backgroundImage: "linear-gradient(to right, red 10%, lightblue)" ,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}
    className="flex min-h-screen flex-col bg-gradient-to-tr items-center graden font-extrabold text-4xl justify-between p-24">
      <h1 className=''>WELCOME!...</h1>
    </main>
  )
}
