"use client"
import { ApiData } from "@/app/types";
import Avatar from "@/components/Avatar";
import { getCookie } from "cookies-next";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


export default function profile() {
  const router = useRouter();

  const [nama,setNama]= useState("");
  const [email,setEmail]= useState("");
  const [foto,setFoto]= useState("");
  const [notelp,setnoTelp]= useState("");
  const [newpassword,setNewPassword]= useState("");
  const [renewpassword,setReNewPassword]= useState("");
  const [file,setFile]=useState<any|null>(null);
  const [flag,setFlag]= useState(false);

  const id=getCookie('id');
  const token=getCookie('token');

  useEffect(()=>{
    const getProfile=async ()=>{
     
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
        setNama(data.data.nama)
        setEmail(data.data.email)
        setnoTelp(data.data.nohp)
        setFoto(dtFoto)
      }else{
          if(dtProfile.statusText=="Unauthorized"){
            router.replace('/login')
          }
      }
      
      
    }

    getProfile()
  },[])
  
  const handleChange= async (e:any) =>{
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  const handleUpload = async() => {
    const formData = new FormData();
    formData.append('Foto',file);
    
    const upload= await fetch(`${process.env.apiUrl}/uploadfoto`,{
      method:'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cache:"no-store",
      body: formData,
    });

   

    if(upload.ok){
      return true
    }
   
   
  }

  const  handleUpdate = async(e:any) => {
    e.preventDefault()
    
    const absen= await fetch(`${process.env.apiUrl}/karyawan/${id}`,{
      method:'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', 
      },
      cache:"no-store",
      body: JSON.stringify({ nohp:notelp, newpassword:newpassword,renewpassword:renewpassword }),
    });

    const data:ApiData = await absen.json();
    if(absen.ok){
        await handleUpload()
        setFlag(!flag)
        window.location.reload()
    }else{
      alert(data.message)
    }
   
  }
  

  return (
    <main className="flex flex-col items-center justify-normal p-24 bg-white-50">
      <Avatar data={foto}/>
      <h1>Update Profile</h1>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleUpdate}>
      <div>
          <label htmlFor="nama" className="block text-sm font-medium leading-6 text-white-900">
            Nama
          </label>
          <div className="mt-2">
            <input
              id="nama"
              name="nama"
              type="nama"
              value={nama}
              autoComplete="nama"
              readOnly
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              autoComplete="email"
              readOnly
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="foto" className="block text-sm font-medium leading-6 text-white-900">
            Foto
          </label>
          <div className="mt-2">
            <input
              id="foto"
              name="foto"
              type="file"
              onChange={handleChange}
              placeholder={foto}
              autoComplete="foto"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="notelp" className="block text-sm font-medium leading-6 text-white-900">
            No Telp
          </label>
          <div className="mt-2">
            <input
              id="notelp"
              name="notelp"
              type="text"
              value={notelp}
              onChange={(e) => setnoTelp(e.target.value)}
              autoComplete="notelp"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

       

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="newpassword" className="block text-sm font-medium leading-6 text-white-900">
              New Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="newpassword"
              name="newpassword"
              type="password"
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="renewpassword" className="block text-sm font-medium leading-6 text-white-900">
              Retype New Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="renewpassword"
              name="renewpassword"
              type="password"
              value={renewpassword}
              onChange={(e) => setReNewPassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
           Update
          </button>
        </div>
      </form>

    </div>
    </main>
  )
}
