"use client"

import { ApiData } from "@/app/types";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function DataAbsen() {
  const tgl=new Date();
  const tgl2=new Date();
  const currentDate = tgl.toISOString().substr(0, 10);
  tgl2.setDate(1);
  const firstDate = tgl2.toISOString().substr(0, 10);

  const [tglawal,setTglAwal]=useState(firstDate);
  const [tglakhir,setTglAkhir]=useState(currentDate);
  const [dtabsen,setDataAbsen]=useState([{tglkerja:"",tglabsenmasuk:"",tglabsenpulang:""}]);
  
  
  useEffect(()=>{
    handleFilter();
  },[])

  const handleFilter=async ()=>{
    const token=getCookie('token');
    const absen= await fetch(`${process.env.apiUrl}/absen?tglawal=${tglawal}&tglakhir=${tglakhir}`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      cache:"no-store"
    });

    const data:ApiData= await absen.json()
    if(absen.ok){
      for(const dt of data.data){
        dt['tglabsenmasuk']=new Date(dt.tglabsenmasuk).toLocaleTimeString();
        dt['tglabsenpulang']=new Date(dt.tglabsenpulang).toLocaleTimeString();
     }
      setDataAbsen(data.data)
    }

  }

  return (
    <div className="overflow-x-auto py-24 mx-4">
      <h1 className="text-center  text-gray-600 font-bold">List Data Absen</h1>
      <hr className="mt-5"></hr>
      <div className="flex flex-col md:flex-row md:space-x-4">
      
        <div className="mb-4 md:w-1/2">
          <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="tglawal">
            Start Date
          </label>
          <input
            type="date"
            id="tglawal"
            name="tglawal"
            value={tglawal}
            onChange={(e) => setTglAwal(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        
        <div className="mb-4 md:w-1/2">
          <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="endDate">
            End Date
          </label>
          <input
            type="date"
            id="tglakhir"
            name="tglakhir"
            value={tglakhir}
            onChange={(e) => setTglAkhir(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-4  md:w-1/6">
          <button
            type="button"
            onClick={handleFilter}
            className="w-full bg-blue-500 md:mt-4 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Filter
          </button>
        </div>
      </div>
     
      <table className="min-w-full divide-y divide-gray-200 overflow-scroll">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Tanggal Kerja
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Absen Masuk
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Absen Pulang
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {
          dtabsen.map((absen)=>(
            <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  {absen.tglkerja}  
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                {absen.tglabsenmasuk}  
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                {absen.tglabsenpulang}  
                </td>
            </tr>
          )
        )
        }
        
        {/* More table rows */}
      </tbody>
      </table>
  </div>
  )
}


