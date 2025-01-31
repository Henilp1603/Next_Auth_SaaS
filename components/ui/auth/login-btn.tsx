"use client";

import { useRouter } from "next/navigation";
interface LoginBtnProps{

    children:React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
};


function LoginBtn({children,mode="redirect",asChild}:LoginBtnProps) {
    const router=useRouter();


    const onClick =()=>{
        router.push("/auth/login");
    }

    if (mode === "modal"){
        return(
            <span>modal</span>
        )
    }

  return (
    <span onClick={onClick} className="cursor-pointer">
        {children}
    </span>
  )
}

export default LoginBtn