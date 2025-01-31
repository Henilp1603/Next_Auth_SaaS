"use client";
import Link from "next/link";
import { Button } from "../button"

interface BackBtnProps{
    href:string;
    label:string;
}

const BackBtn = ({href,label}:BackBtnProps) => {
  return (
    <Button variant="link" className="w-full font-normal" size="sm" asChild>
        <Link href={href}>{label}</Link>
    </Button>
  )
}

export default BackBtn