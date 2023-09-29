import Logout from "@/components/Logout"
import Link from "next/link"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <div className="min-h-screen bg-red-50">
      <div className="w-full h-16 bg-red-100  flex items-center pl-5 pr-10 justify-between fixed z-50">
      <Link href="/home"><h1 className="font-bold"><u>HRIS Argon</u></h1></Link>
        <div className="flex justify-around w-1/2 md:w-1/6">
        <Link href="/home/absen"><h1 className="font-bold"><u>Absen</u></h1></Link>
          <Logout/>
        </div>
      </div>
      {children}
   </div>
  )
}
