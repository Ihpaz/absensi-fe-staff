import Absen from "@/components/Absen";
import Avatar from "@/components/Avatar";
import { getCookie } from "cookies-next";
import { ApiData } from "../types";
import { useRouter } from "next/navigation";
import { cookies } from 'next/headers'
import { useState } from "react";
import Link from "next/link";
import { redirect } from 'next/navigation'




  const getProfile=async ()=>{
    
    const cookieStore = cookies()
    const id=cookieStore.get('id')?.value;
    const token=cookieStore.get('token')?.value;

    let data:ApiData;
    let dtFoto:string="";
    
    const dtProfile = await fetch(`${process.env.apiUrl}/karyawan/${id}`,{
        method:'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Set the Bearer token in the 'Authorization' header
            'Content-Type': 'application/json', // Adjust the content type as needed
          },
          cache:"no-store"
    })
    data = await dtProfile.json();

    if(dtProfile.ok){
      dtFoto=`${process.env.apiUrl}/${data.data.foto}`
      data.data['dtFoto']=dtFoto;
    }else{
        if(dtProfile.statusText=="Unauthorized"){
            redirect('/login')
        }
    }
    return data;
  }
 
  

export default  async function  Home() {
  let data:ApiData = await getProfile();

  return (
    <main className="flex max-h-screen flex-col items-center justify-normal p-24 bg-red-50">
      <Avatar data={data.data.dtFoto}/>
      <Link href="/home/profile"><h1 className="font-bold"><u>Update Profile</u></h1></Link>
      <Absen data={data.data}/>
    </main>
  )
}
