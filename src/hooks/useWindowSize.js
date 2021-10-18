import {useState,useEffect} from 'react'


const useWindowSize = ()=>{

  const [width , setWidth] = useState(0)
  const [height,setHeight] = useState(0)

  useEffect(()=>{
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  },[])

  window.addEventListener("resize",(e)=>{
    setWidth(e.target.innerWidth);
    setHeight(e.target.innerHeight);
  })


  return [width,height]

}

export default useWindowSize
