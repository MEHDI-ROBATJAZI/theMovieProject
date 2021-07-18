import {useState,useEffect} from "react"

export default function useDelayFetch(value,delay){

  const [data,setData] = useState(value)


  useEffect(()=>{
    const TimeOut = setTimeout(()=>{
      setData(value)
    },delay)


    return()=>{
      clearTimeout(TimeOut)
    }


  },[value,delay])
  

  return data

}
