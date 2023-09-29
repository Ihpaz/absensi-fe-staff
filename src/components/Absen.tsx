"use client"
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

function Absen(props:any){
    const token=getCookie('token');
    const router = useRouter();

    let jamMasuk:string='00:00';
    let jamPulang:string='00:00';
    useEffect(()=>{
        router.refresh()
    },[])
    if(props.data.Absens.length > 0){
        const dtjammasuk = new Date(props.data.Absens[0].tglabsenmasuk).toLocaleTimeString('id'); 
        jamMasuk=dtjammasuk;

        if(props.data.Absens[0].tglabsenpulang){
            const dtjampulang = new Date(props.data.Absens[0].tglabsenpulang).toLocaleTimeString('id'); 
            jamPulang=dtjampulang;
        }
      
    }
    
    const  handleAbsen = async() => {
    
        const absen= await fetch(`${process.env.apiUrl}/absen`,{
          method:'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', 
          },
          cache:"no-store"
        });
    
        if(absen.ok){
            router.refresh()
        }
       
    }
   

    return (
       <div className="w-1/1 text-center space-y-5 my-5">

            <div className="flex flex-col justify-between">
                <h1>Hello {props.data.nama}</h1>
                <h1>{props.data.Posisi.posisi}</h1>
            </div>
           
    
            <div className="flex justify-between">
                <p>Masuk: {jamMasuk}  Pulang:{jamPulang}</p>
            </div>
            <button 
                onClick={handleAbsen}
                className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                    ABSEN
            </button>
       </div>
    )
}

export default Absen