import React from 'react'
import { ToastContainer,toast } from "react-toastify";



export default function Test() {
  const toasthandle = ()=>{
    toast.success('success')
  }
  return (
    <div>
      <button onClick={()=>toasthandle()}>Hello</button>
      <ToastContainer/> 
    </div>
  )
}
