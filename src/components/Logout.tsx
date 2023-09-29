"use client";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";


function Logout() {
  const router = useRouter();

  const handleLogout= async ()=>{
      localStorage.clear();
      console.log(getCookie('id'),'before')
      await deleteCookie('id');
      await deleteCookie('token');
      console.log(getCookie('id'),'after')
      router.replace('/login');
  }
  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 text-red-500 hover:text-red-700 focus:outline-none"
    >
      <ArrowRightOnRectangleIcon className="w-5 h-5" />
      Keluar
    </button>
  );
}

export default Logout;
